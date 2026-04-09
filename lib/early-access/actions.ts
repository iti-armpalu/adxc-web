"use server"

import { z } from "zod"
import { Resend } from "resend"
import { siteConfig } from "@/config/site"

const resend = new Resend(process.env.RESEND_API_KEY)

import { companySizes } from "./constants"
export type { CompanySize } from "./constants"

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid work email required"),
    company: z.string().min(1, "Company is required"),
    companySize: z.string().refine(
        (val) => (companySizes as readonly string[]).includes(val),
        { message: "Please select a company size" }
    ),
    jobTitle: z.string().min(1, "Job title is required"),
    useCase: z.string().min(10, "Please tell us a bit more"),
    turnstileToken: z.string().min(1),
})

export type EarlyAccessState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; error: string }

export async function submitEarlyAccess(
    _prev: EarlyAccessState,
    formData: FormData
): Promise<EarlyAccessState> {
    try {
        const parsed = schema.safeParse({
            name: formData.get("name"),
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

        const { name, email, company, companySize, jobTitle, useCase, turnstileToken } = parsed.data

        const verified = await verifyTurnstile(turnstileToken)
        if (!verified) {
            return { status: "error", error: "Bot verification failed" }
        }

        await resend.emails.send({
            from: "onboarding@resend.dev", // TODO: switch to verified domain
            to: siteConfig.contactEmail,
            replyTo: email,
            subject: `Early access: ${name} — ${company}`,
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
        })

        return { status: "success" }
    } catch (err) {
        console.error("[early-access] error:", err)
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