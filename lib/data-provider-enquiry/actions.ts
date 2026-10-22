"use server"

import { z } from "zod"
import { Resend } from "resend"
import { siteConfig } from "@/config/site"
import { upsertHubspotContact, createDealForContact } from "@/lib/hubspot/client"
import { pipelineForFormSource } from "@/lib/hubspot/pipelines"

const resend = new Resend(process.env.RESEND_API_KEY)

// Note: the live form has no "data types" field, so it is no longer required
// or sent here (it used to be required, which would have rejected every submission).
const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    company: z.string().min(1, "Company is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    message: z.string().optional(),
    turnstileToken: z.string().min(1),
})

export type DataProviderEnquiryState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; error: string }

export async function submitDataProviderEnquiry(
    _prev: DataProviderEnquiryState,
    formData: FormData
): Promise<DataProviderEnquiryState> {
    try {
        const parsed = schema.safeParse({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            company: formData.get("company"),
            jobTitle: formData.get("jobTitle"),
            message: formData.get("message"),
            turnstileToken: formData.get("turnstileToken"),
        })

        if (!parsed.success) {
            const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
            return { status: "error", error: first ?? "Invalid input" }
        }

        const { firstName, lastName, email, company, jobTitle, message, turnstileToken } = parsed.data
        const name = `${firstName} ${lastName}`

        const verified = await verifyTurnstile(turnstileToken)
        if (!verified) {
            return { status: "error", error: "Bot verification failed" }
        }

        // HubSpot sync: contact upsert, then a deal in the Data Provider
        // pipeline linked to it (needs the contact ID, so sequenced). Errors
        // are caught and logged so a CRM problem never blocks the submission —
        // only a Resend failure does.
        const formSource = "data_providers_form"
        const hubspotSync = (async () => {
            const contactId = await upsertHubspotContact({
                email,
                firstName,
                lastName,
                company,
                jobTitle,
                source: formSource,
            })

            if (!contactId) return

            const { pipelineId, stageId } = pipelineForFormSource(formSource)

            await createDealForContact({
                contactId,
                dealName: `Data provider: ${name} — ${company}`,
                pipelineId,
                dealStageId: stageId,
                description: message || undefined,
            })
        })().catch((err) => {
            console.error("[data-provider-enquiry] hubspot error:", err)
        })

        // Awaited together so the HubSpot calls finish before the function
        // returns (serverless can stop work once the response is sent).
        const [{ error: resendError }] = await Promise.all([
            resend.emails.send({
                from: `${siteConfig.name} <${siteConfig.contactEmail}>`,
                to: siteConfig.contactEmail,
                replyTo: email,
                subject: `Data provider enquiry: ${name} — ${company}`,
                text: [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Company: ${company}`,
                    `Job title: ${jobTitle}`,
                    ``,
                    `Message:`,
                    message || "—",
                ].join("\n"),
            }),
            hubspotSync,
        ])

        if (resendError) {
            console.error("[data-provider-enquiry] resend error:", resendError)
            return { status: "error", error: "Failed to send email. Please try again." }
        }

        return { status: "success" }
    } catch (err) {
        console.error("[data-provider-enquiry] error:", err)
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