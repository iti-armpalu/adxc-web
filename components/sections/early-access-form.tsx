"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { submitEarlyAccess, type EarlyAccessState } from "@/lib/early-access/actions"
import { companySizes } from "@/lib/early-access/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { trackEarlyAccessSubmitted, identifyUser } from "@/lib/analytics/events"

const initialState: EarlyAccessState = { status: "idle" }

type Props = {
    prefillEmail?: string
}

export function EarlyAccessForm({ prefillEmail }: Props) {
    const [state, action, isPending] = useActionState(submitEarlyAccess, initialState)
    const [localStatus, setLocalStatus] = useState<EarlyAccessState>(initialState)
    const [turnstileToken, setTurnstileToken] = useState<string>("")
    const turnstileRef = useRef<TurnstileInstance>(null)

    useEffect(() => {
        if (state.status !== "idle") {
            setLocalStatus(state)
            if (state.status === "success") {
                const get = (selector: string) =>
                    (document.querySelector(selector) as HTMLInputElement | HTMLSelectElement)?.value ?? "unknown"

                const firstName = get("input[name=firstName]")
                const lastName = get("input[name=lastName]")
                const email = get("input[name=email]")
                const company = get("input[name=company]")
                const companySize = get("select[name=companySize]")
                const jobTitle = get("input[name=jobTitle]")

                trackEarlyAccessSubmitted({ companySize, jobTitle, company })

                identifyUser({
                    email,
                    name: `${firstName} ${lastName}`.trim(),
                    company,
                    companySize,
                    jobTitle,
                })
            }
        }
    }, [state])

    if (localStatus.status === "success") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-10 h-10 text-success" />
                <h3 className="text-xl font-semibold text-foreground">You're on the list!</h3>
                <div className="text-muted-foreground max-w-sm space-y-2 text-sm leading-relaxed">
                    <p>If selected, you get $200 in free ADXC credit, no card needed.</p>
                    <p>We ask one thing in return: a 30-minute feedback call.</p>
                    <p>We'll email you more details soon.</p>
                </div>
            </div>
        )
    }

    return (
        <form action={action} className="space-y-4">
            <input type="hidden" name="turnstileToken" value={turnstileToken} />

            {/* First name + Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        First name <span className="text-destructive">*</span>
                    </label>
                    <Input
                        name="firstName"
                        placeholder="Jane"
                        disabled={isPending}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Last name <span className="text-destructive">*</span>
                    </label>
                    <Input
                        name="lastName"
                        placeholder="Smith"
                        disabled={isPending}
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Work email <span className="text-destructive">*</span>
                </label>
                <Input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    defaultValue={prefillEmail}
                    disabled={isPending}
                />
            </div>

            {/* Company + Company size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Company <span className="text-destructive">*</span>
                    </label>
                    <Input
                        name="company"
                        placeholder="Company name"
                        disabled={isPending}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Company size <span className="text-destructive">*</span>
                    </label>
                    <select
                        name="companySize"
                        disabled={isPending}
                        defaultValue=""
                        className={cn(
                            "h-8 w-full rounded-lg border border-border bg-input px-2.5 py-1",
                            "text-sm text-foreground transition-colors outline-none",
                            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
                        )}
                    >
                        <option value="" disabled className="text-muted-foreground">Select size</option>
                        {companySizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Job title */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Job title <span className="text-destructive">*</span>
                </label>
                <Input
                    name="jobTitle"
                    placeholder="Marketing Director"
                    disabled={isPending}
                />
            </div>

            {/* Use case */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    What will you use ADXC for? <span className="text-destructive">*</span>
                </label>
                <Textarea
                    name="useCase"
                    rows={4}
                    placeholder="Tell us about your data needs and what you're hoping to achieve..."
                    disabled={isPending}
                    className="resize-none"
                />
            </div>

            <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken("")}
                onExpire={() => setTurnstileToken("")}
            />

            {localStatus.status === "error" && (
                <p className="text-sm text-destructive">{localStatus.error}</p>
            )}

            <Button
                type="submit"
                disabled={isPending || !turnstileToken}
                className="w-full group"
                size="lg"
            >
                {isPending ? "Submitting…" : "Request early access"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
                We'll review your application and be in touch within 2 business days.
            </p>
        </form>
    )
}