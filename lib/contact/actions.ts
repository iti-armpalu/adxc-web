"use server"

import { z } from "zod"
import { Resend } from "resend"
import { siteConfig } from "@/config/site"

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email required"),
    company: z.string().min(1, "Company is required"),
    message: z.string().min(10, "Message is too short"),
    turnstileToken: z.string().min(1),
})

export type ContactState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; error: string }

export async function submitContact(
    _prev: ContactState,
    formData: FormData
): Promise<ContactState> {
    try {
        const parsed = schema.safeParse({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            company: formData.get("company"),
            message: formData.get("message"),
            turnstileToken: formData.get("turnstileToken"),
        })

        if (!parsed.success) {
            const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
            return { status: "error", error: first ?? "Invalid input" }
        }

        const { firstName, lastName, email, company, message, turnstileToken } = parsed.data
        const name = `${firstName} ${lastName}`

        const verified = await verifyTurnstile(turnstileToken)
        if (!verified) {
            return { status: "error", error: "Bot verification failed" }
        }

        await resend.emails.send({
            // TODO: switch once adxc.ai is verified in Resend dashboard
            from: `${siteConfig.name} <contact@adxc.ai>`,
            // from: "onboarding@resend.dev",
            to: siteConfig.contactEmail,
            replyTo: email,
            subject: `Contact: ${name}${company ? ` — ${company}` : ""}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Company: ${company ?? "—"}`,
                ``,
                message,
            ].join("\n"),
        })

        return { status: "success" }
    } catch (err) {
        console.error("[contact] email error:", err)
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