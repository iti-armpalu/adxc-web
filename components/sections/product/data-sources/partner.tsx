"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { submitDataProviderEnquiry, type DataProviderEnquiryState } from "@/lib/data-provider-enquiry/actions"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormError } from "@/components/ui/form-error"
import { ArrowRight, CheckCircle } from "lucide-react"
import { identifyUser } from "@/lib/analytics/events"
import { FadeIn } from "@/components/ui/fade-in"
import { Card, CardContent } from "@/components/ui/card"

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    company: z.string().min(1, "Company is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const initialState: DataProviderEnquiryState = { status: "idle" }

export function DataProvidersPartner() {
    const [state, action, isPending] = useActionState(submitDataProviderEnquiry, initialState)
    const [localStatus, setLocalStatus] = useState<DataProviderEnquiryState>(initialState)
    const [turnstileToken, setTurnstileToken] = useState("")
    const turnstileRef = useRef<TurnstileInstance>(null)

    const {
        register,
        formState: { errors, isValid },
        getValues,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {},
        mode: "onChange",
    })

    const handleAction = (formData: globalThis.FormData) => {
        formData.set("turnstileToken", turnstileToken)
        formData.append("dataTypes", "Partner enquiry")
        return action(formData)
    }

    useEffect(() => {
        if (state.status !== "idle") {
            setLocalStatus(state)
            if (state.status === "success") {
                const { firstName, lastName, email, company, jobTitle } = getValues()
                identifyUser({ email, name: `${firstName} ${lastName}`.trim(), company, companySize: "unknown", jobTitle })
            }
        }
    }, [state, getValues])

    return (
        <FadeIn>
            <section className="bg-brand-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 max-w-5xl mx-auto">

                        {/* Left */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-caption text-muted-foreground">
                                    Become a data partner
                                </p>
                                <h2 className="text-primary">
                                    Are you a data provider interested in joining?
                                </h2>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Become a partner and unlock a new market for your data.
                            </p>
                        </div>

                        {/* Right — form */}
                        <div>
                            {localStatus.status === "success" ? (
                                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                                    <CheckCircle className="w-10 h-10 text-success" />
                                    <h3 className="text-xl font-semibold text-foreground">Enquiry received</h3>
                                    <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                                        Thanks for reaching out. We'll be in touch within 2 business days.
                                    </p>
                                </div>
                            ) : (

                                <Card>
                                    <CardContent>

                                        <form action={handleAction} className="space-y-4">

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <Label>First name <span className="text-destructive">*</span></Label>
                                                    <Input {...register("firstName")} name="firstName" placeholder="Jane"
                                                        disabled={isPending} aria-invalid={!!errors.firstName} />
                                                    <FormError message={errors.firstName?.message} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Last name <span className="text-destructive">*</span></Label>
                                                    <Input {...register("lastName")} name="lastName" placeholder="Smith"
                                                        disabled={isPending} aria-invalid={!!errors.lastName} />
                                                    <FormError message={errors.lastName?.message} />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label>Email <span className="text-destructive">*</span></Label>
                                                <Input {...register("email")} name="email" type="email" placeholder="you@company.com"
                                                    disabled={isPending} aria-invalid={!!errors.email} />
                                                <FormError message={errors.email?.message} />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <Label>Company <span className="text-destructive">*</span></Label>
                                                    <Input {...register("company")} name="company" placeholder="Company name"
                                                        disabled={isPending} aria-invalid={!!errors.company} />
                                                    <FormError message={errors.company?.message} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Job title <span className="text-destructive">*</span></Label>
                                                    <Input {...register("jobTitle")} name="jobTitle" placeholder="Head of Partnerships"
                                                        disabled={isPending} aria-invalid={!!errors.jobTitle} />
                                                    <FormError message={errors.jobTitle?.message} />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label>
                                                    Message <span className="text-muted-foreground/60 text-xs">(optional)</span>
                                                </Label>
                                                <Textarea {...register("message")} name="message" rows={4}
                                                    placeholder="Tell us about your data..."
                                                    disabled={isPending} className="resize-none" />
                                            </div>

                                            <Turnstile ref={turnstileRef} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                                onSuccess={(token) => setTurnstileToken(token)}
                                                onError={() => setTurnstileToken("")}
                                                onExpire={() => setTurnstileToken("")} />

                                            {localStatus.status === "error" && (
                                                <p className="text-sm text-destructive">{localStatus.error}</p>
                                            )}

                                            <Button type="submit" disabled={isPending || !turnstileToken || !isValid}
                                                className="w-full group" size="lg">
                                                {isPending ? "Sending…" : "Become a partner"}
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </Button>

                                            {!isValid && (
                                                <p className="text-xs text-muted-foreground text-center">
                                                    Please fill in all the fields above before submitting.
                                                </p>
                                            )}

                                        </form>

                                    </CardContent>
                                </Card>

                            )}
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}