"use client"

import { useRef } from "react"
import { Workflow, Banknote, ShieldCheck, type LucideIcon } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"

type Benefit = {
    index: number
    icon: LucideIcon
    label: string
    title: string
    lead: string
    description: string
}

const benefits: Benefit[] = [
    {
        index: 0,
        icon: Workflow,
        label: "Distribution",
        title: "Be where the strategic work happens",
        lead: "Marketers are planning, creating and deciding inside workflow tools.",
        description:
            "ADXC integrates your data directly into the tools they're already using, starting with Miro.",
    },
    {
        index: 1,
        icon: Banknote,
        label: "Revenue",
        title: "New revenue from a market you can't currently serve",
        lead: "SMEs need your data but can't afford your subscriptions.",
        description:
            "ADXC gives them access on a pay-per-query basis, a completely new buyer with a different need.",
    },
    {
        index: 2,
        icon: ShieldCheck,
        label: "Protection",
        title: "Your IP and brand stay fully protected.",
        lead: "Datasets are never copied, stored, or exposed.",
        description:
            "ADXC queries your data via API or MCP and returns only synthesised answers. End users never see your raw data. Your brand is attributed to every answer delivered.",
    },
]

// ─── Main component ──────────────────────────────────────────────────────────

export function DataProvidersHowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <FadeIn>
            <section ref={sectionRef} className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                    {/* Section header */}
                    <div className="space-y-3 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-blue-900 max-w-xl leading-none">
                            How ADXC works for you
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {benefits.map((benefit, i) => {
                            const Icon = benefit.icon
                            return (
                                <Card key={i}>
                                    <CardHeader>
                                        <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center mb-4 shrink-0">
                                            <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                                        </div>
                                        <CardTitle className="text-base text-blue-900">{benefit.title}</CardTitle>
                                        <p className="text-sm font-medium text-foreground mt-1">
                                            {benefit.lead}
                                        </p>
                                        <CardDescription className="text-sm mt-1 text-neutral-600">
                                            {benefit.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>

                </div>
            </section>
        </FadeIn>
    )
}