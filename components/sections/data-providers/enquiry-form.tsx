"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { submitDataProviderEnquiry, type DataProviderEnquiryState } from "@/lib/data-provider-enquiry/actions"
import { dataTypes } from "@/lib/data-provider-enquiry/constants"
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
    email: z.string().email("Valid work email required"),
    company: z.string().min(1, "Company is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    dataTypes: z.array(z.string()).min(1, "Please select at least one data type"),
    message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const initialState: DataProviderEnquiryState = { status: "idle" }

type Props = { prefillEmail?: string }

export function DataProviderEnquiryForm({ prefillEmail }: Props) {
    const [state, action, isPending] = useActionState(submitDataProviderEnquiry, initialState)
    const [localStatus, setLocalStatus] = useState<DataProviderEnquiryState>(initialState)
    const [turnstileToken, setTurnstileToken] = useState("")
    const turnstileRef = useRef<TurnstileInstance>(null)

    const {
        register,
        formState: { errors, isValid },
        getValues,
        watch,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { email: prefillEmail ?? "", dataTypes: [] },
        mode: "onChange",
    })

    const selectedDataTypes = watch("dataTypes")

    const handleAction = (formData: globalThis.FormData) => {
        formData.set("turnstileToken", turnstileToken)
        // Append checked data types
        selectedDataTypes.forEach((dt) => formData.append("dataTypes", dt))
        return action(formData)
    }

    const toggleDataType = (type: string) => {
        const current = getValues("dataTypes")
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type]
        setValue("dataTypes", updated, { shouldValidate: true })
    }

    useEffect(() => {
        if (state.status !== "idle") {
            setLocalStatus(state)
            if (state.status === "success") {
                const { firstName, lastName, email, company, jobTitle } = getValues()
                identifyUser({
                    email,
                    name: `${firstName} ${lastName}`.trim(),
                    company,
                    companySize: "unknown",
                    jobTitle,
                })
            }
        }
    }, [state, getValues])

    if (localStatus.status === "success") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-10 h-10 text-success" />
                <h3 className="text-xl font-semibold text-foreground">Enquiry received</h3>
                <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                    Thanks for reaching out. We'll review your details and be in touch within 2 business days.
                </p>
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
                    <Input {...register("firstName")} name="firstName" placeholder="Jane"
                        disabled={isPending} aria-invalid={!!errors.firstName} />
                    <FormError message={errors.firstName?.message} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Last name <span className="text-destructive">*</span>
                    </label>
                    <Input {...register("lastName")} name="lastName" placeholder="Smith"
                        disabled={isPending} aria-invalid={!!errors.lastName} />
                    <FormError message={errors.lastName?.message} />
                </div>
            </div>

            {/* Work email */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Work email <span className="text-destructive">*</span>
                </label>
                <Input {...register("email")} name="email" type="email" placeholder="you@company.com"
                    disabled={isPending} aria-invalid={!!errors.email} />
                <FormError message={errors.email?.message} />
            </div>

            {/* Company + Job title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Company <span className="text-destructive">*</span>
                    </label>
                    <Input {...register("company")} name="company" placeholder="Company name"
                        disabled={isPending} aria-invalid={!!errors.company} />
                    <FormError message={errors.company?.message} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                        Job title <span className="text-destructive">*</span>
                    </label>
                    <Input {...register("jobTitle")} name="jobTitle" placeholder="Head of Partnerships"
                        disabled={isPending} aria-invalid={!!errors.jobTitle} />
                    <FormError message={errors.jobTitle?.message} />
                </div>
            </div>

            {/* Data types — multi-select checkboxes */}
            <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                    Types of data you provide <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dataTypes.map((type) => {
                        const selected = selectedDataTypes.includes(type)
                        return (
                            <button
                                key={type}
                                type="button"
                                onClick={() => toggleDataType(type)}
                                disabled={isPending}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-sm text-left transition-colors",
                                    selected
                                        ? "border-primary bg-primary/5 text-foreground"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded shrink-0 border transition-colors flex items-center justify-center",
                                    selected ? "bg-primary border-primary" : "border-border"
                                )}>
                                    {selected && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                {type}
                            </button>
                        )
                    })}
                </div>
                {/* Hidden inputs for form submission */}
                {selectedDataTypes.map((type) => (
                    <input key={type} type="hidden" name="dataTypes" value={type} />
                ))}
                <FormError message={errors.dataTypes?.message} />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                    Message <span className="text-muted-foreground/60 text-xs">(optional)</span>
                </label>
                <Textarea {...register("message")} name="message" rows={4}
                    placeholder="Tell us about your data and what you're hoping to achieve..."
                    disabled={isPending} className="resize-none" />
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
                {isPending ? "Sending…" : "Get in touch"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

            {!isValid && (
                <p className="text-xs text-muted-foreground text-center">
                    Please fill in all the fields above before submitting.
                </p>
            )}

        </form>
    )
}