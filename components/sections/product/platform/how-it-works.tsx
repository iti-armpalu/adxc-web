"use client"

import { useRef } from "react"
import { Brain, Zap, Lock, type LucideIcon } from "lucide-react"
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

export function PlatformHowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <FadeIn>
            <section ref={sectionRef} className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
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