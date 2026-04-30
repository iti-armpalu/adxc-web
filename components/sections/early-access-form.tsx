"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { submitEarlyAccess, type EarlyAccessState } from "@/lib/early-access/actions"
import { companySizes } from "@/lib/early-access/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormError } from "@/components/ui/form-error"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"
import { trackEarlyAccessSubmitted, identifyUser } from "@/lib/analytics/events"

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    company: z.string().min(1, "Company is required"),
    companySize: z.string().min(1, "Please select a company size"),
    jobTitle: z.string().min(1, "Job title is required"),
    useCase: z.string().min(10, "Please tell us a bit more"),
})

type FormData = z.infer<typeof schema>

const initialState: EarlyAccessState = { status: "idle" }

type Props = { prefillEmail?: string }

export function EarlyAccessForm({ prefillEmail }: Props) {
    const [state, action, isPending] = useActionState(submitEarlyAccess, initialState)
    const [localStatus, setLocalStatus] = useState<EarlyAccessState>(initialState)
    const [turnstileToken, setTurnstileToken] = useState<string>("")
    const turnstileRef = useRef<TurnstileInstance>(null)

    const {
        register,
        formState: { errors, isValid },
        getValues,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { email: prefillEmail ?? "" },
        mode: "onChange",
    })

    const handleAction = (formData: globalThis.FormData) => {
        formData.set("turnstileToken", turnstileToken)
        return action(formData)
    }

    useEffect(() => {
        if (state.status !== "idle") {
            setLocalStatus(state)
            if (state.status === "success") {
                const { firstName, lastName, email, company, companySize, jobTitle } = getValues()
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
    }, [state, getValues])

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
        <form action={handleAction} className="space-y-4">
            <input type="hidden" name="turnstileToken" value={turnstileToken} />

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
                        aria-invalid={!!errors.firstName}
                    />
                    <FormError message={errors.firstName?.message} />
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
                        aria-invalid={!!errors.lastName}
                    />
                    <FormError message={errors.lastName?.message} />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Work email <span className="text-destructive">*</span>
                </label>
                <Input
                    {...register("email")}
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    disabled={isPending}
                    aria-invalid={!!errors.email}
                />
                <FormError message={errors.email?.message} />
            </div>

            {/* Company + Company size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Company <span className="text-destructive">*</span>
                    </label>
                    <Input
                        {...register("company")}
                        name="company"
                        placeholder="Company name"
                        disabled={isPending}
                        aria-invalid={!!errors.company}
                    />
                    <FormError message={errors.company?.message} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Company size <span className="text-destructive">*</span>
                    </label>
                    <select
                        {...register("companySize")}
                        name="companySize"
                        disabled={isPending}
                        defaultValue=""
                        aria-invalid={!!errors.companySize}
                        className="h-8 w-full rounded-lg border border-input bg-input px-2.5 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                    >
                        <option value="" disabled>Select size</option>
                        {companySizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <FormError message={errors.companySize?.message} />
                </div>
            </div>

            {/* Job title */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Job title <span className="text-destructive">*</span>
                </label>
                <Input
                    {...register("jobTitle")}
                    name="jobTitle"
                    placeholder="Marketing Director"
                    disabled={isPending}
                    aria-invalid={!!errors.jobTitle}
                />
                <FormError message={errors.jobTitle?.message} />
            </div>

            {/* Use case */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    What will you use ADXC for? <span className="text-destructive">*</span>
                </label>
                <Textarea
                    {...register("useCase")}
                    name="useCase"
                    rows={4}
                    placeholder="Tell us about your data needs and what you're hoping to achieve..."
                    disabled={isPending}
                    aria-invalid={!!errors.useCase}
                    className="resize-none"
                />
                <FormError message={errors.useCase?.message} />
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
                disabled={isPending || !turnstileToken || !isValid}
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