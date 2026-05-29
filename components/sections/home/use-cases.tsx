"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"
import { Card, CardContent } from "@/components/ui/card"

const useCases = [
    {
        value: "audience",
        title: "Audience research",
        description: "Understand who your buyers are, what they believe, and what drives their decisions.",
        bullets: [
            "Profile and segment your target audience",
            "Uncover behaviours, beliefs, barriers and motivations",
            "Build data-backed personas in minutes",
        ],
    },
    {
        value: "competitive",
        title: "Competitive intelligence",
        description: "Know where you stand in the category and where your competitors are vulnerable.",
        bullets: [
            "Track trending topics and conversations in your category",
            "Identify competitor weaknesses and gaps",
            "Understand brand sentiment and perception",
        ],
    },
    {
        value: "brief",
        title: "Brief development",
        description: "Ground your briefs in real data, not assumptions. Give your creative teams the insight they need to do their best work.",
        bullets: [
            "Validate strategic territories before briefing",
            "Rank messaging against audience priorities",
            "Back every claim with a citable source",
        ],
    },
    {
        value: "ideation",
        title: "Ideation and innovation",
        description: "Evaluate new markets and new ideas before you invest in them.",
        bullets: [
            "Explore new markets and categories with real data",
            "Validate claims and messaging before you commit to them",
            "Stress test creative territories with real audience data",
        ],
    },
]

function UseCaseCard({ uc }: { uc: typeof useCases[number] }) {
    return (
        <Card>
            <CardContent>
                <div className="flex flex-col gap-6 min-h-[260px] p-4">
                    <div className="space-y-4">
                        <p className="text-caption text-primary">
                            {uc.title}
                        </p>
                        <h3 className="text-xl font-semibold text-foreground leading-snug">
                            {uc.description}
                        </h3>
                    </div>
                    <ul className="space-y-3 flex-1">
                        {uc.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <svg className="w-4 h-4 shrink-0 mt-0.5 text-primary" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
                                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {bullet}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export function UseCasesSection() {
    const [active, setActive] = useState(useCases[0].value)

    return (
        <section
            style={{
                background: "linear-gradient(200deg, var(--color-brand-900) 0%, var(--color-brand-700) 70%, var(--color-brand-600) 100%)",
            }}
        >
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="flex flex-col items-center">

                        {/* Header */}
                        <div className="space-y-4 mb-12 text-center">
                            <h2 className="text-primary-foreground">
                                Get the data you need for your critical marketing tasks
                            </h2>
                            <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
                                From simple fact finding, to deep audience understanding, to category
                                trends, ADXC helps you get the answers you need instantly.
                            </p>
                        </div>

                        {/* Mobile — stacked cards */}
                        <div className="flex flex-col gap-10 w-full md:hidden">
                            {useCases.map((uc) => (
                                <div key={uc.value}>
                                    <UseCaseCard uc={uc} />
                                </div>
                            ))}
                        </div>

                        {/* Tablet + Desktop — tabs */}
                        <Tabs
                            value={active}
                            onValueChange={setActive}
                            className="hidden md:block w-full max-w-4xl"
                        >
                            <div className="flex justify-center mb-10">
                                <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
                                    {useCases.map((uc) => (
                                        <TabsTrigger
                                            key={uc.value}
                                            value={uc.value}
                                            className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary-foreground data-[state=active]:text-foreground data-[state=inactive]:bg-primary-foreground/20 data-[state=inactive]:text-primary-foreground cursor-pointer"
                                        >
                                            {uc.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {useCases.map((uc) => (
                                <TabsContent
                                    key={uc.value}
                                    value={uc.value}
                                    className={cn("mt-0 animate-in fade-in-0 slide-in-from-bottom-2 duration-300")}
                                >
                                    <UseCaseCard uc={uc} />
                                </TabsContent>
                            ))}
                        </Tabs>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}