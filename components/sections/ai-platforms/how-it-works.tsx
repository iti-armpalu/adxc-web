"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { BarChart3, Brain, Layers, type LucideIcon } from "lucide-react"
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
        icon: BarChart3,
        label: "Better outputs",
        title: "Dramatically better outputs",
        lead: "AI agents deliver materially better results when powered by trusted, premium consumer data.",
        description:
            "Users stay inside your workflows because the answers are actually useful.",
    },
    {
        index: 1,
        icon: Brain,
        label: "Context-aware",
        title: "Context-aware answers",
        lead: "ADXC reads what users are working on to tailor the data retrieval to that context.",
        description:
            "Users get answers specific to their work, not generic dumps. The right data, at the right moment, in the right format.",
    },
    {
        index: 2,
        icon: Layers,
        label: "Differentiation",
        title: "Product differentiation",
        lead: "Data can be a moat.",
        description:
            "Access to trusted consumer data creates differentiation vs blunt outputs from generic co-pilots. Give your platform something competitors can't easily replicate.",
    },
]

export function AIPlatformsHowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <FadeIn>
            <section ref={sectionRef} className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                    <div className="space-y-3 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cyan-800 max-w-2xl leading-none">
                            How ADXC works for you
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
                            ADXC connects your platform to multiple premium consumer data providers via a single connection.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {benefits.map((benefit, i) => {
                            const Icon = benefit.icon
                            return (
                                <Card key={i}>
                                    <CardHeader>
                                        <div className="w-10 h-10 rounded-md bg-cyan-600 flex items-center justify-center mb-4 shrink-0">
                                            <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                                        </div>
                                        <CardTitle className="text-base text-cyan-900">{benefit.title}</CardTitle>
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