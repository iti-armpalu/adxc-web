"use client"

import { useActionState, useRef, useState } from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { submitContact, type ContactState } from "@/lib/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"

const initialState: ContactState = { status: "idle" }

export function ContactForm() {
    const [state, action, isPending] = useActionState(submitContact, initialState)
    const [turnstileToken, setTurnstileToken] = useState<string>("")
    const turnstileRef = useRef<TurnstileInstance>(null)

    if (state.status === "success") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h3 className="text-xl font-medium text-foreground">Message sent</h3>
                <p className="text-muted-foreground max-w-sm">
                    Thanks for reaching out. We'll get back to you shortly.
                </p>
            </div>
        )
    }

    return (
        <form action={action} className="space-y-4">

            {/* Turnstile token as a real hidden input — gets picked up by FormData natively */}
            <input type="hidden" name="turnstileToken" value={turnstileToken} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Name <span className="text-destructive">*</span>
                    </label>
                    <Input name="name" placeholder="Your name" disabled={isPending} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Email <span className="text-destructive">*</span>
                    </label>
                    <Input name="email" type="email" placeholder="you@company.com" disabled={isPending} />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Company <span className="text-xs">(optional)</span>
                </label>
                <Input name="company" placeholder="Your company" disabled={isPending} />
            </div>

            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Message <span className="text-destructive">*</span>
                </label>
                <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help?"
                    disabled={isPending}
                    className={cn(
                        "w-full rounded-md border border-input bg-background px-3 py-2",
                        "text-sm text-foreground placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        "disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    )}
                />
            </div>

            <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken("")}
                onExpire={() => setTurnstileToken("")}
            />

            {state.status === "error" && (
                <p className="text-sm text-destructive">{state.error}</p>
            )}

            <Button
                type="submit"
                disabled={isPending || !turnstileToken}
                className="w-full group"
            >
                {isPending ? "Sending…" : "Send message"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

        </form>
    )
}