"use client"

import { useActionState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { submitContact, type ContactState } from "@/lib/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"
import { trackContactSubmitted, identifyUser } from "@/lib/analytics/events"

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email required"),
    company: z.string().min(1, "Company is required"),
    message: z.string().min(10, "Message is too short"),
})

type ContactFormData = z.infer<typeof schema>

const initialState: ContactState = { status: "idle" }

export function ContactForm() {
    const [state, action, isPending] = useActionState(submitContact, initialState)
    const turnstileRef = useRef<TurnstileInstance>(null)
    const turnstileTokenRef = useRef<string | null>(null)

    const {
        register,
        formState: { errors },
        reset,
        getValues,
    } = useForm<ContactFormData>({
        resolver: zodResolver(schema),
    })

    const handleAction = (formData: globalThis.FormData) => {
        if (turnstileTokenRef.current) {
            formData.set("turnstileToken", turnstileTokenRef.current)
        }
        return action(formData)
    }

    useEffect(() => {
        if (state.status === "success") {
            const { firstName, lastName, email, company } = getValues()

            trackContactSubmitted()

            identifyUser({
                email,
                name: `${firstName} ${lastName}`.trim(),
                company,
                companySize: "unknown",
                jobTitle: "unknown",
            })
        }
    }, [state.status, getValues])

    if (state.status === "success") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h3 className="text-xl font-medium text-foreground">Message sent</h3>
                <p className="text-muted-foreground max-w-sm">
                    Thanks for reaching out. We'll get back to you shortly.
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        reset()
                        turnstileRef.current?.reset()
                        turnstileTokenRef.current = null
                    }}
                >
                    Send another message
                </Button>
            </div>
        )
    }

    return (
        <form action={handleAction} className="space-y-4">

            {/* First name + Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        First name <span className="text-destructive">*</span>
                    </label>
                    <Input
                        {...register("firstName")}
                        name="firstName"
                        placeholder="Jane"
                        disabled={isPending}
                        className={cn(errors.firstName && "border-destructive")}
                    />
                    {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Last name <span className="text-destructive">*</span>
                    </label>
                    <Input
                        {...register("lastName")}
                        name="lastName"
                        placeholder="Smith"
                        disabled={isPending}
                        className={cn(errors.lastName && "border-destructive")}
                    />
                    {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Email <span className="text-destructive">*</span>
                </label>
                <Input
                    {...register("email")}
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    disabled={isPending}
                    className={cn(errors.email && "border-destructive")}
                />
                {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
            </div>

            {/* Company */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Company <span className="text-destructive">*</span>
                </label>
                <Input
                    {...register("company")}
                    name="company"
                    placeholder="Your company"
                    disabled={isPending}
                    className={cn(errors.company && "border-destructive")}
                />
                {errors.company && (
                    <p className="text-xs text-destructive">{errors.company.message}</p>
                )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Message <span className="text-destructive">*</span>
                </label>
                <textarea
                    {...register("message")}
                    name="message"
                    rows={5}
                    placeholder="How can we help?"
                    disabled={isPending}
                    className={cn(
                        "w-full rounded-md border border-border bg-input px-3 py-2",
                        "text-sm text-foreground placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                        errors.message && "border-destructive"
                    )}
                />
                {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
            </div>

            {/* Turnstile */}
            <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => { turnstileTokenRef.current = token }}
                onError={() => { turnstileTokenRef.current = null }}
                onExpire={() => { turnstileTokenRef.current = null }}
            />

            {/* Server-side error */}
            {state.status === "error" && (
                <p className="text-sm text-destructive">{state.error}</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full group">
                {isPending ? "Sending…" : "Send message"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

        </form>
    )
}