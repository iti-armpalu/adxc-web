"use client"

import { useRef } from "react"
import { Layers, Coins, SlidersHorizontal, type LucideIcon } from "lucide-react"
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
        icon: Layers,
        label: "Data access",
        title: "Varied work. Varied clients. Varied data needs.",
        lead: "No two briefs ask the same question.",
        description:
            "ADXC gives your team access to the right data for each one, through your existing AI tools. Audience, category and competition, trends and more — the same data used by the world's largest brands, now available for every client.",
    },
    {
        index: 1,
        icon: Coins,
        label: "Pricing",
        title: "Only pay for the data you need",
        lead: "Top up from as little as $50 and use it as briefs come in.",
        description:
            "No subscriptions, no annual commitments, no minimum spend per provider. Your data costs match the shape of your work: varied, project-based, and only when it matters.",
    },
    {
        index: 2,
        icon: SlidersHorizontal,
        label: "Controls",
        title: "Spend controls across your team",
        lead: "Set spend caps by client, project, or team.",
        description:
            "Track usage in real time. Bill back to client engagements with full transparency — no more buried data costs in agency overhead.",
    },
]

export function AgenciesHowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <FadeIn>
            <section ref={sectionRef} className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                    {/* Section header */}
                    <div className="space-y-3 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-yellow-900 max-w-xl leading-none">
                            How ADXC works for you
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {benefits.map((benefit, i) => {
                            const Icon = benefit.icon
                            return (
                                <Card key={i}>
                                    <CardHeader>
                                        <div className="w-10 h-10 rounded-md bg-yellow-600 flex items-center justify-center mb-4 shrink-0">
                                            <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                                        </div>
                                        <CardTitle className="text-base text-yellow-900">{benefit.title}</CardTitle>
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