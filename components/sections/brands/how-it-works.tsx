"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, Coins, ShieldCheck, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
    index: number
    icon: LucideIcon
    label: string
    title: string
    lead: string
    description: string
}

const steps: Step[] = [
    {
        index: 0,
        icon: Search,
        label: "Insight",
        title: "Answer the questions your business depends on",
        lead: "Audience research, competitive intelligence, market sizing.",
        description:
            "Real answers to the questions that shape your strategy, your briefs, and your campaigns.",
    },
    {
        index: 1,
        icon: Coins,
        label: "Pricing",
        title: "Only pay for the answers you use",
        lead: "No subscriptions or annual contracts.",
        description:
            "Spend $20 when you need an answer, not $200k in case you might.",
    },
    {
        index: 2,
        icon: ShieldCheck,
        label: "Trust",
        title: "Answers you can stand behind",
        lead: "ADXC pulls from premium, recognised data sources, like YouGov.",
        description:
            `So when someone asks "what's this based on?", you can answer confidently.`,
    },
]

function StepVisual({ index }: { index: number }) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-3 opacity-40">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                    <span className="text-2xl font-semibold text-primary">{index + 1}</span>
                </div>
                <p className="text-xs text-muted-foreground/60 max-w-[200px]">Visual TBC</p>
            </div>
        </div>
    )
}

function StepIndicator({ steps, active, onChange }: {
    steps: Step[]
    active: number
    onChange: (i: number) => void
}) {
    return (
        <div className="flex items-center gap-2">
            {steps.map((step, i) => {
                const Icon = step.icon
                return (
                    <button key={i} onClick={() => onChange(i)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                            active === i
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                        )}>
                        <Icon className="w-3 h-3 shrink-0" strokeWidth={2} />
                        {step.label}
                    </button>
                )
            })}
        </div>
    )
}

export function BrandsHowItWorks() {
    const [activeStep, setActiveStep] = useState(0)
    const sectionRef = useRef<HTMLDivElement>(null)
    const stepRefs = useRef<(HTMLDivElement | null)[]>([])

    const handleScroll = useCallback(() => {
        const viewportMid = window.innerHeight * 0.5
        stepRefs.current.forEach((el, i) => {
            if (!el) return
            const { top, bottom } = el.getBoundingClientRect()
            if (top <= viewportMid && bottom >= viewportMid) setActiveStep(i)
        })
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    const scrollToStep = (index: number) => {
        stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
        setActiveStep(index)
    }

    return (
        <section ref={sectionRef} className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                {/* Section header */}
                <div className="space-y-3 mb-16">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary max-w-xl leading-none">
                        How ADXC works for you
                    </h2>
                </div>

                {/* Desktop sticky scroll */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
                    <div className="space-y-[30vh] py-[15vh]">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            return (
                                <div key={i} ref={el => { stepRefs.current[i] = el }}
                                    className={cn("space-y-4 transition-opacity duration-500", activeStep === i ? "opacity-100" : "opacity-30")}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-colors duration-300",
                                            activeStep === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        )}>
                                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground leading-snug">{step.title}</h3>
                                    <p className="text-sm font-medium text-foreground">{step.lead}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="relative">
                        <div className="sticky top-[15vh] h-[55vh] flex flex-col gap-4">
                            <StepIndicator steps={steps} active={activeStep} onChange={scrollToStep} />
                            <div className="relative flex-1 rounded-xl border border-border bg-muted overflow-hidden">
                                {steps.map((_, i) => (
                                    <div key={i} className={cn(
                                        "absolute inset-0 transition-opacity duration-500",
                                        activeStep === i ? "opacity-100" : "opacity-0 pointer-events-none"
                                    )}>
                                        <StepVisual index={i} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="lg:hidden space-y-12">
                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={i} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{step.label}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground leading-snug">{step.title}</h3>
                                <p className="text-sm font-medium text-foreground">{step.lead}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                <div className="rounded-xl border border-border bg-muted overflow-hidden h-[600px] sm:h-80">
                                    <StepVisual index={i} />
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}