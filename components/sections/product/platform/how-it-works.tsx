"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Brain, Lock, Zap, type LucideIcon } from "lucide-react"
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
        label: "context",
        title: "Understands questions in their full context",
        lead: "When a user asks a question through their AI agent, ADXC reads the work surrounding it too.",
        description: "The brief, the audience, the brand, whatever's in the workflow. This enables ADXC to find the specific, relevant data to the question at hand.",
    },
    {
        index: 1,
        icon: Zap,
        label: "connection",
        title: "One connection. Every data source.",
        lead: "One connection via API/MCP gives your AI agents access to every data source ADXC supports.",
        description: "ADXC takes a single question, breaks it down into subqueries to help find the most relevant data, and returns a single answer. Natural language in, synthesised answer out.",
    },
    {
        index: 2,
        icon: Lock,
        label: "security",
        title: "Data that never leaves the provider's control",
        lead: "Data providers' raw datasets are never copied, stored, or exposed to end users.",
        description: "ADXC retrieves only what's needed to answer each specific question, and returns synthesised answers, keeping the underlying data fully within the provider's control.",
    },
]

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

    return (
        <section ref={sectionRef} className="bg-white">
            <div className="max-w-3xl mx-auto py-24">

                <div className="space-y-3 mb-16">
                    <h2 className="text-primary">
                        How ADXC works for you
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        ADXC connects your platform to multiple premium consumer data providers via a single connection.
                    </p>
                </div>

                {/* Desktop — scrolling content */}
                <div className="hidden lg:block">
                    <div className="space-y-[30vh] pb-[15vh]">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            return (
                                <div key={i} ref={el => { stepRefs.current[i] = el }}
                                    className={cn("max-w-2xl space-y-4 transition-opacity duration-500", activeStep === i ? "opacity-100" : "opacity-30")}>
                                    <div className={cn(
                                        "w-9 h-9 rounded-xs flex items-center justify-center shrink-0 transition-colors duration-300",
                                        activeStep === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-foreground leading-snug">{step.title}</h3>
                                    <p className="text-sm font-medium text-foreground">{step.lead}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile */}
                <div className="lg:hidden space-y-12">
                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={i} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xs bg-primary flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-caption text-muted-foreground">{step.label}</span>
                                </div>
                                <h3 className="text-foreground leading-snug">{step.title}</h3>
                                <p className="text-sm font-medium text-foreground">{step.lead}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}