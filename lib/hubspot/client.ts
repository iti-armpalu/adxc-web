// Path in your project: lib/hubspot/client.ts
// Import as: import { upsertHubspotContact } from "@/lib/hubspot/client"
//
// Minimal HubSpot CRM helper. Uses the batch "upsert" endpoint so a submission
// either creates a new contact or updates an existing one, keyed on email —
// no need to search-then-create/update yourself.
//
// Requires a HubSpot private app access token with the crm.objects.contacts.write
// scope. See setup notes in chat.

export type HubspotContactInput = {
    email: string
    firstName?: string
    lastName?: string
    company?: string
    /** Maps to HubSpot's built-in "Job Title" property (jobtitle) */
    jobTitle?: string
    /** Custom contact property `website_company_size` — create it in HubSpot first
     *  (`company_size` is already taken by the Facebook Ads property group) */
    companySize?: string
    message?: string
    /** e.g. "lead" — only set this if you've mapped it to a real lifecycle stage in HubSpot */
    lifecycleStage?: string
    /** Free-form source tag, e.g. "contact_form", "brand_signup" — helps segment contacts by which form created them */
    source?: string
}

export async function upsertHubspotContact(input: HubspotContactInput) {
    const token = process.env.HUBSPOT_ACCESS_TOKEN

    if (!token) {
        // Don't throw — a missing token shouldn't break form submission.
        console.error("[hubspot] HUBSPOT_ACCESS_TOKEN is not set, skipping CRM sync")
        return
    }

    const properties: Record<string, string> = {
        email: input.email,
    }

    if (input.firstName) properties.firstname = input.firstName
    if (input.lastName) properties.lastname = input.lastName
    if (input.company) properties.company = input.company
    if (input.jobTitle) properties.jobtitle = input.jobTitle
    if (input.companySize) properties.website_company_size = input.companySize
    if (input.lifecycleStage) properties.lifecyclestage = input.lifecycleStage

    // These are CUSTOM properties — create them in HubSpot first under
    // Settings > Properties > Contact properties, or drop the relevant lines.
    if (input.message) properties.contact_form_message = input.message
    if (input.source) properties.form_source = input.source

    // Always set on every call, even for repeat submitters whose form_source
    // value wouldn't otherwise change. A workflow trigger watching THIS
    // property for "has been updated" will re-fire on every submission —
    // triggering on a static value like form_source alone would only fire
    // once per contact, since HubSpot enrollment is edge-triggered on change.
    properties.last_contact_form_submission_at = new Date().toISOString()

    const res = await fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                inputs: [
                    {
                        idProperty: "email",
                        id: input.email,
                        properties,
                    },
                ],
            }),
        }
    )

    if (!res.ok) {
        const body = await res.text().catch(() => "")
        throw new Error(`HubSpot upsert failed: ${res.status} ${body}`)
    }

    const data = await res.json()
    // Return the HubSpot contact ID so callers (e.g. deal creation) can
    // associate other objects to this exact record without a second lookup.
    return data?.results?.[0]?.id as string | undefined
}

type CreateDealInput = {
    /** HubSpot contact ID returned from upsertHubspotContact */
    contactId: string
    dealName: string
    /** Internal pipeline ID from HubSpot (not the display label) */
    pipelineId: string
    /** Internal stage ID from HubSpot (not the display label) */
    dealStageId: string
    /** Goes into the deal's built-in "Description" field — no custom property needed */
    description?: string
}

export async function createDealForContact(input: CreateDealInput) {
    const token = process.env.HUBSPOT_ACCESS_TOKEN

    if (!token) {
        console.error("[hubspot] HUBSPOT_ACCESS_TOKEN is not set, skipping deal creation")
        return
    }

    const res = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            properties: {
                dealname: input.dealName,
                pipeline: input.pipelineId,
                dealstage: input.dealStageId,
                ...(input.description ? { description: input.description } : {}),
            },
            // Associates the new deal to the existing contact in the same call —
            // 3 is HubSpot's stable built-in "Deal to Contact" association type.
            associations: [
                {
                    to: { id: input.contactId },
                    types: [
                        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 },
                    ],
                },
            ],
        }),
    })

    if (!res.ok) {
        const body = await res.text().catch(() => "")
        throw new Error(`HubSpot deal create failed: ${res.status} ${body}`)
    }

    return res.json()
}