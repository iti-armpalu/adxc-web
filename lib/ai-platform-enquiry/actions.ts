"use server"

import { z } from "zod"
import { Resend } from "resend"
import { siteConfig } from "@/config/site"

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    company: z.string().min(1, "Company is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    message: z.string().optional(),
    turnstileToken: z.string().min(1),
})

export type AIPlatformEnquiryState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; error: string }

export async function submitAIPlatformEnquiry(
    _prev: AIPlatformEnquiryState,
    formData: FormData
): Promise<AIPlatformEnquiryState> {
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
        if (!verified) return { status: "error", error: "Bot verification failed" }

        const { error: resendError } = await resend.emails.send({
            from: `${siteConfig.name} <${siteConfig.contactEmail}>`,
            to: siteConfig.contactEmail,
            replyTo: email,
            subject: `AI platform enquiry: ${name} — ${company}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Company: ${company}`,
                `Job title: ${jobTitle}`,
                ``,
                `Message:`,
                message ?? "—",
            ].join("\n"),
        })

        if (resendError) return { status: "error", error: "Failed to send email. Please try again." }
        return { status: "success" }
    } catch (err) {
        console.error("[ai-platform-enquiry] error:", err)
        return { status: "error", error: "Something went wrong. Please try again." }
    }
}

async function verifyTurnstile(token: string): Promise<boolean> {
    if (process.env.NODE_ENV === "development") return true
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
    })
    const data = await res.json()
    return data.success === true
}