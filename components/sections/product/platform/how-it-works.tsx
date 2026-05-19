"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Brain, Zap, Lock, type LucideIcon } from "lucide-react"
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
        icon: Brain,
        label: "Smart",
        title: "Understands questions in their full context",
        lead: "When a user asks a question through their AI agent, ADXC reads the work surrounding it too.",
        description:
            "The brief, the audience, the brand, whatever's in the workflow. This enables ADXC to find the specific, relevant data to the question at hand.",
    },
    {
        index: 1,
        icon: Zap,
        label: "Simple",
        title: "One connection. Every data source.",
        lead: "One connection via API/MCP gives your AI agents access to every data source ADXC supports.",
        description:
            "ADXC takes a single question, breaks it down into subqueries to help find the most relevant data, and returns a single answer. Natural language in, synthesised answer out.",
    },
    {
        index: 2,
        icon: Lock,
        label: "Secure",
        title: "Data that never leaves the provider's control",
        lead: "Data providers' raw datasets are never copied, stored, or exposed to end users.",
        description:
            "ADXC retrieves only what's needed to answer each specific question, and returns synthesised answers, keeping the underlying data fully within the provider's control.",
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

export function PlatformHowItWorks() {
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
                                        <span className="text-xs uppercase tracking-widest text-muted-foreground">{step.label}</span>
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