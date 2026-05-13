// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card"
// import { FadeIn } from "@/components/ui/fade-in"
// import { Workflow, Banknote, ShieldCheck } from "lucide-react"

// const benefits = [
//     {
//         icon: Workflow,
//         title: "Be where the strategic work happens",
//         description:
//             "Integrate your data into the workflow tools marketers use to plan, create, and make decisions. Starting with Miro.",
//     },
//     {
//         icon: Banknote,
//         title: "New revenue from a new market",
//         description:
//             "Connect your data to a new buyer with a different need: SMEs paying per query — who don't need, and can't afford, bells-and-whistles subscriptions.",
//     },
//     {
//         icon: ShieldCheck,
//         title: "Your IP and brand stay fully protected",
//         description:
//             "Datasets are never copied, stored, or exposed to end users. ADXC queries your data via API/MCP and returns only synthesised answers. Your brand is attributed to every answer.",
//     },
// ]

// export function DataProvidersHowItWorks() {
//     return (
//         <FadeIn>
//             <section className="border-t border-border/50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

//                     <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-16">
//                         How ADXC works for you
//                     </h2>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         {benefits.map((benefit, i) => {
//                             const Icon = benefit.icon
//                             return (
//                                 <Card key={i} className="bg-muted border-0 shadow-none">
//                                     <CardHeader>
//                                         <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center mb-4">
//                                             <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
//                                         </div>
//                                         <CardTitle>{benefit.title}</CardTitle>
//                                         <CardDescription className="text-base">
//                                             {benefit.description}
//                                         </CardDescription>
//                                     </CardHeader>
//                                 </Card>
//                             )
//                         })}
//                     </div>

//                 </div>
//             </section>
//         </FadeIn>
//     )
// }


// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card"
// import { Workflow, Banknote, ShieldCheck } from "lucide-react"

// const benefits = [
//     {
//         icon: Workflow,
//         title: "Be where the strategic work happens",
//         lead: "Marketers are planning, creating and deciding inside workflow tools.",
//         description:
//             "ADXC integrates your data directly into the tools they're already using, starting with Miro. No new apps for them to learn, no friction to adoption.",
//     },
//     {
//         icon: Banknote,
//         title: "New revenue from a market you can't currently serve",
//         lead: "SMEs need your data but can't afford your subscriptions.",
//         description:
//             "ADXC gives them access on a pay-per-query basis, a completely new buyer with a different need. Incremental revenue, zero cannibalisation of your existing model.",
//     },
//     {
//         icon: ShieldCheck,
//         title: "Your IP stays yours. Always.",
//         lead: "Datasets are never copied, stored, or exposed.",
//         description:
//             "ADXC queries your data via API or MCP and returns only synthesised answers. End users never see your raw data. Your brand is attributed to every answer delivered.",
//     },
// ]

// export function DataProvidersHowItWorks() {
//     return (
//         <section className="border-t border-border/50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

//                 <div className="space-y-16">

//                     <div className="space-y-3">
//                         <p className="text-xs uppercase tracking-widest text-muted-foreground">
//                             How ADXC works for you
//                         </p>
//                         <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-xl">
//                             Simple to join.{" "}
//                             <span className="block text-brand-bright">Valuable from day one.</span>
//                         </h2>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         {benefits.map((benefit, i) => {
//                             const Icon = benefit.icon
//                             return (
//                                 <Card key={i} className="bg-muted border-0 shadow-none">
//                                     <CardHeader>
//                                         <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center mb-4 shrink-0">
//                                             <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
//                                         </div>
//                                         <CardTitle className="text-base">{benefit.title}</CardTitle>
//                                         <p className="text-sm font-medium text-foreground mt-1">
//                                             {benefit.lead}
//                                         </p>
//                                         <CardDescription className="text-sm mt-1">
//                                             {benefit.description}
//                                         </CardDescription>
//                                     </CardHeader>
//                                 </Card>
//                             )
//                         })}
//                     </div>

//                 </div>

//             </div>
//         </section>
//     )
// }


"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Workflow, Banknote, ShieldCheck, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { RevenueModelVisual } from "./visuals/revenue-model"
import { IPProtectionVisual } from "./visuals/ip-protection"

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
        icon: Workflow,
        label: "Distribution",
        title: "Be where the strategic work happens",
        lead: "Marketers are planning, creating and deciding inside workflow tools.",
        description:
            "ADXC integrates your data directly into the tools they're already using — starting with Miro. No new apps for them to learn, no friction to adoption.",
    },
    {
        index: 1,
        icon: Banknote,
        label: "Revenue",
        title: "New revenue from a market you can't currently serve",
        lead: "SMEs need your data but can't afford your subscriptions.",
        description:
            "ADXC gives them access on a pay-per-query basis — a completely new buyer with a different need. Incremental revenue, zero cannibalisation of your existing model.",
    },
    {
        index: 2,
        icon: ShieldCheck,
        label: "Protection",
        title: "Your IP stays yours. Always.",
        lead: "Datasets are never copied, stored, or exposed.",
        description:
            "ADXC queries your data via API or MCP and returns only synthesised answers. End users never see your raw data. Your brand is attributed to every answer delivered.",
    },
]

// ─── Placeholder visuals — replace with your interactive components ──────────

function StepVisual({ index }: { index: number }) {
    if (index === 1) return <RevenueModelVisual />
    if (index === 2) return <IPProtectionVisual />

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-3 opacity-40">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                    <span className="text-2xl font-semibold text-primary">{index + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">Visual {index + 1}</p>
                <p className="text-xs text-muted-foreground/60 max-w-[200px]">
                    Replace with your interactive component
                </p>
            </div>
        </div>
    )
}

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({
    steps,
    active,
    onChange,
}: {
    steps: Step[]
    active: number
    onChange: (i: number) => void
}) {
    return (
        <div className="flex items-center gap-2">
            {steps.map((step, i) => {
                const Icon = step.icon
                return (
                    <button
                        key={i}
                        onClick={() => onChange(i)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                            active === i
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                        )}
                    >
                        <Icon className="w-3 h-3 shrink-0" strokeWidth={2} />
                        {step.label}
                    </button>
                )
            })}
        </div>
    )
}

// ─── Main component ──────────────────────────────────────────────────────────

export function DataProvidersHowItWorks() {
    const [activeStep, setActiveStep] = useState(0)
    const sectionRef = useRef<HTMLDivElement>(null)
    const stepRefs = useRef<(HTMLDivElement | null)[]>([])

    // Scroll observer — update active step based on which text panel is in view
    const handleScroll = useCallback(() => {
        const section = sectionRef.current
        if (!section) return

        const sectionTop = section.getBoundingClientRect().top
        const viewportMid = window.innerHeight * 0.5

        stepRefs.current.forEach((el, i) => {
            if (!el) return
            const { top, bottom } = el.getBoundingClientRect()
            if (top <= viewportMid && bottom >= viewportMid) {
                setActiveStep(i)
            }
        })
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    // Click on indicator — scroll to that step
    const scrollToStep = (index: number) => {
        stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
        setActiveStep(index)
    }

    return (
        <section ref={sectionRef} className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                {/* Section header */}
                <div className="space-y-3 mb-16">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        How it works for you
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-xl">
                        Simple to join.{" "}
                        <span className="text-brand-bright">Valuable from day one.</span>
                    </h2>
                </div>

                {/* Desktop sticky scroll — hidden on mobile */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">

                    {/* Left — scrolling text panels, narrower */}
                    <div className="space-y-[30vh] py-[15vh]">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            return (
                                <div
                                    key={i}
                                    ref={el => { stepRefs.current[i] = el }}
                                    className={cn(
                                        "space-y-4 transition-opacity duration-500",
                                        activeStep === i ? "opacity-100" : "opacity-30"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-colors duration-300",
                                            activeStep === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        )}>
                                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                            Step {i + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-medium text-foreground">
                                        {step.lead}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right — sticky visual, wider */}
                    <div className="relative">
                        <div className="sticky top-[15vh] h-[55vh] flex flex-col gap-4">
                            {/* Step indicator */}
                            <StepIndicator steps={steps} active={activeStep} onChange={scrollToStep} />
                            {/* Visual area — relative so absolute children position correctly */}
                            <div className="relative flex-1 rounded-xl border border-border bg-muted overflow-hidden">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "absolute inset-0 transition-opacity duration-500",
                                            activeStep === i ? "opacity-100" : "opacity-0 pointer-events-none"
                                        )}
                                    >
                                        <StepVisual index={i} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Mobile — fully stacked steps */}
                <div className="lg:hidden space-y-12">
                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={i} className="space-y-4">

                                {/* Step label */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Step {i + 1}
                                    </span>
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-semibold text-foreground leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-sm font-medium text-foreground">{step.lead}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                                {/* Visual */}
                                <div className={cn(
                                    "rounded-xl border border-border bg-muted overflow-hidden",
                                    i === 1 ? "h-[560px] sm:h-80" : "h-80"
                                )}>
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