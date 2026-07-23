"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { iconMap } from "@/lib/cms/icon-map"
import type { AudienceFeature } from "@/lib/cms/types"

interface PlatformHowItWorksProps {
    headline: string
    subtext: string
    steps: AudienceFeature[]
}

export function PlatformHowItWorks({ headline, subtext, steps }: PlatformHowItWorksProps) {
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
                        {headline}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        {subtext}
                    </p>
                </div>

                {/* Desktop — scrolling content */}
                <div className="hidden lg:block">
                    <div className="space-y-[30vh] pb-[15vh]">
                        {steps.map((step, i) => {
                            const Icon = iconMap[step.icon]
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
                        const Icon = iconMap[step.icon]
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