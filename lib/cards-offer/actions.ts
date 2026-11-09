"use server"

import { z } from "zod"
import { Resend } from "resend"
import { siteConfig } from "@/config/site"
import { upsertHubspotContact, createDealForContact } from "@/lib/hubspot/client"
import { pipelineForFormSource } from "@/lib/hubspot/pipelines"
// Reuses the early access company size list so the two forms stay identical.
import { companySizes } from "@/lib/early-access/constants"

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    company: z.string().min(1, "Company is required"),
    companySize: z.string().refine(
        (val) => (companySizes as readonly string[]).includes(val),
        { message: "Please select a company size" }
    ),
    jobTitle: z.string().min(1, "Job title is required"),
    useCase: z.string().min(10, "Please tell us a bit more"),
    turnstileToken: z.string().min(1),
})

export type CardsOfferState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; error: string }

export async function submitCardsOffer(
    _prev: CardsOfferState,
    formData: FormData
): Promise<CardsOfferState> {
    try {
        const parsed = schema.safeParse({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            company: formData.get("company"),
            companySize: formData.get("companySize"),
            jobTitle: formData.get("jobTitle"),
            useCase: formData.get("useCase"),
            turnstileToken: formData.get("turnstileToken"),
        })

        if (!parsed.success) {
            const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
            return { status: "error", error: first ?? "Invalid input" }
        }

        const { firstName, lastName, email, company, companySize, jobTitle, useCase, turnstileToken } = parsed.data
        const name = `${firstName} ${lastName}`

        const verified = await verifyTurnstile(turnstileToken)
        if (!verified) {
            return { status: "error", error: "Bot verification failed" }
        }

        // HubSpot sync: contact upsert, then a Sales pipeline deal linked to it
        // (needs the contact ID, so sequenced). Errors are caught and logged so
        // a CRM problem never blocks the submission — only a Resend failure does.
        const formSource = "cards_offer_form"
        const hubspotSync = (async () => {
            const contactId = await upsertHubspotContact({
                email,
                firstName,
                lastName,
                company,
                jobTitle,
                companySize,
                source: formSource,
            })

            if (!contactId) return

            const { pipelineId, stageId } = pipelineForFormSource(formSource)

            await createDealForContact({
                contactId,
                dealName: `Cards offer: ${name} — ${company}`,
                pipelineId,
                dealStageId: stageId,
                description: useCase,
                extraProperties: {
                    // "Type of Deal" dropdown (internal name interaction_type)
                    interaction_type: "Integration - Sale",
                    // "Deal Source" dropdown (internal name deal_source)
                    deal_source: "Marketing/Inbound",
                },
            })
        })().catch((err) => {
            console.error("[cards-offer] hubspot error:", err)
        })

        // Awaited together so the HubSpot calls finish before the function
        // returns (serverless can stop work once the response is sent).
        const [{ error: resendError }] = await Promise.all([
            resend.emails.send({
                from: `${siteConfig.name} <${siteConfig.contactEmail}>`,
                to: siteConfig.contactEmail,
                replyTo: email,
                subject: `Cards offer: ${name} — ${company}`,
                text: [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Company: ${company}`,
                    `Company size: ${companySize}`,
                    `Job title: ${jobTitle}`,
                    ``,
                    `Use case:`,
                    useCase,
                ].join("\n"),
            }),
            hubspotSync,
        ])

        if (resendError) {
            console.error("[cards-offer] resend error:", resendError)
            return { status: "error", error: "Failed to send email. Please try again." }
        }

        return { status: "success" }
    } catch (err) {
        console.error("[cards-offer] error:", err)
        return { status: "error", error: "Something went wrong. Please try again." }
    }
}

async function verifyTurnstile(token: string): Promise<boolean> {
    if (process.env.NODE_ENV === "development") return true

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
        }),
    })

    const data = await res.json()
    return data.success === true
}