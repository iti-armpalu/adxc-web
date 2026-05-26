"use client"

import { useRef } from "react"
import { Search, Coins, ShieldCheck, type LucideIcon } from "lucide-react"
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

export function BrandsHowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <FadeIn>
            <section ref={sectionRef} className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                    {/* Section header */}
                    <div className="space-y-3 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary max-w-xl leading-none">
                            How ADXC works for you
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {benefits.map((benefit, i) => {
                            const Icon = benefit.icon
                            return (
                                <Card key={i}>
                                    <CardHeader>
                                        <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center mb-4 shrink-0">
                                            <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                                        </div>
                                        <CardTitle className="text-base">{benefit.title}</CardTitle>
                                        <p className="text-sm font-medium text-foreground mt-1">
                                            {benefit.lead}
                                        </p>
                                        <CardDescription className="text-sm mt-1">
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