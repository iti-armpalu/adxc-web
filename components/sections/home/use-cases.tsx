"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"
import { Card, CardContent } from "@/components/ui/card"
import type { UseCase } from "@/lib/cms/types"

interface UseCasesSectionProps {
    headline: string
    subtext: string
    useCases: UseCase[]
}

// Tab "value" is derived from the title here — not stored in Sanity —
// so growth editing a title doesn't require touching a separate slug field.
function slugify(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-")
}

function UseCaseCard({ uc }: { uc: UseCase }) {
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

export function UseCasesSection({ headline, subtext, useCases }: UseCasesSectionProps) {
    const [active, setActive] = useState(slugify(useCases[0].title))

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
                                {headline}
                            </h2>
                            <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
                                {subtext}
                            </p>
                        </div>

                        {/* Mobile — stacked cards */}
                        <div className="flex flex-col gap-10 w-full md:hidden">
                            {useCases.map((uc) => (
                                <div key={uc.title}>
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
                                            key={uc.title}
                                            value={slugify(uc.title)}
                                            className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary-foreground data-[state=active]:text-foreground data-[state=inactive]:bg-primary-foreground/20 data-[state=inactive]:text-primary-foreground cursor-pointer"
                                        >
                                            {uc.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {useCases.map((uc) => (
                                <TabsContent
                                    key={uc.title}
                                    value={slugify(uc.title)}
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