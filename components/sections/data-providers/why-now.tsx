"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"
import { Card } from "@/components/ui/card"

type Variant = "stacked" | "side-by-side" | "large-type" | "card"

const variants: { id: Variant; label: string }[] = [
    { id: "stacked", label: "A — Stacked" },
    { id: "side-by-side", label: "B — Side by side" },
    { id: "large-type", label: "C — Large type" },
    { id: "card", label: "D — Card" },
]

const stats = [
    {
        number: "80%",
        label: "of businesses",
        lead: "are now using AI in their day-to-day work.",
        body: "AI agents are running campaigns, writing briefs, analysing markets. They need data to do it well.",
        cite: "1",
        citeHref: "https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf",
    },
    {
        number: "#2",
        label: "top concern",
        lead: "Lack of quality data is the second biggest barrier marketers face with AI.",
        body: "They know what they need. They just can't access or afford it. That's the gap you fill.",
        cite: "2",
        citeHref: "https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf",
    },
]

const footnotes = [
    { num: "1", label: "MIT Nanda 2025 AI Report", href: "https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" },
    { num: "2", label: "Salesforce State of Marketing Report 2025", href: "https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf" },
]

function Cite({ href, num }: { href: string; num: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super ml-0.5">
            {num}
        </a>
    )
}

function Footnotes() {
    return (
        <div className="pt-4 flex flex-col sm:flex-row sm:justify-end sm:gap-4 space-y-1 sm:space-y-0">
            {footnotes.map((f) => (
                <p key={f.num} className="text-xs text-muted-foreground">
                    {f.num}{" "}
                    <a href={f.href} target="_blank" rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground transition-colors">
                        {f.label}
                    </a>
                </p>
            ))}
        </div>
    )
}

function Closer() {
    return (
        <p className="text-2xl sm:text-3xl font-semibold text-blue-900/70">
            SMEs don't have the data to fuel these agents.{" "}
            <span className="text-blue-900">You do.</span>
        </p>
    )
}

const title = <h2 className="text-blue-900">Why is this important now?</h2>

function StackedLayout() {
    return (
        <div className="space-y-12">
            {title}
            {stats.map((s) => (
                <div key={s.number} className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:items-start gap-4">
                    <div className="space-y-1">
                        <p className="text-5xl font-bold leading-none text-blue-900">{s.number}</p>
                        <p className="text-sm md:text-base font-medium text-blue-800">{s.label}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-base md:text-lg font-semibold text-blue-950 leading-relaxed">
                            {s.lead}<Cite href={s.citeHref} num={s.cite} />
                        </p>
                        <p className="text-base text-blue-900/70 leading-relaxed">{s.body}</p>
                    </div>
                </div>
            ))}
            <Footnotes />
            <Closer />
        </div>
    )
}

function SideBySideLayout() {
    return (
        <div className="space-y-12">
            {title}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {stats.map((s) => (
                    <div key={s.number} className="space-y-4 border-t-2 border-blue-200 pt-6">
                        <div className="space-y-1">
                            <p className="text-5xl font-bold leading-none text-blue-900">{s.number}</p>
                            <p className="text-sm font-medium text-blue-800">{s.label}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-base font-semibold text-blue-950 leading-relaxed">
                                {s.lead}<Cite href={s.citeHref} num={s.cite} />
                            </p>
                            <p className="text-sm text-blue-900/70 leading-relaxed">{s.body}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Footnotes />
            <Closer />
        </div>
    )
}

function LargeTypeLayout() {
    return (
        <div className="space-y-12">
            {title}
            {stats.map((s) => (
                <div key={s.number} className="space-y-2">
                    <p className="text-7xl sm:text-8xl font-bold leading-none text-blue-900">{s.number}</p>
                    <p className="text-lg font-semibold text-blue-950">
                        {s.lead}<Cite href={s.citeHref} num={s.cite} />
                    </p>
                    <p className="text-base text-blue-900/70 leading-relaxed">{s.body}</p>
                </div>
            ))}
            <Footnotes />
            <Closer />
        </div>
    )
}

function CardLayoutView() {
    return (
        <div className="space-y-12">
            {title}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((s) => (
                    <Card key={s.number} className="p-6 space-y-4">
                        <div className="space-y-1">
                            <p className="text-5xl font-bold leading-none text-blue-900">{s.number}</p>
                            <p className="text-sm font-medium text-blue-800">{s.label}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-base font-semibold text-blue-950 leading-relaxed">
                                {s.lead}<Cite href={s.citeHref} num={s.cite} />
                            </p>
                            <p className="text-sm text-blue-900/70 leading-relaxed">{s.body}</p>
                        </div>
                    </Card>
                ))}
            </div>
            <Footnotes />
            <Closer />
        </div>
    )
}

export function DataProvidersWhyNow() {
    const [active, setActive] = useState<Variant>("stacked")

    return (
        <section className="bg-blue-50">
            {/* Toggle — visible in dev/staging, remove before final launch */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex justify-end">
                <div className="flex flex-wrap gap-2">
                    {variants.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setActive(v.id)}
                            className={cn(
                                "px-3 py-1.5 text-xs rounded-full border transition-all duration-150 cursor-pointer",
                                active === v.id
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                            )}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
            </div>
            <FadeIn>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    {active === "stacked" && <StackedLayout />}
                    {active === "side-by-side" && <SideBySideLayout />}
                    {active === "large-type" && <LargeTypeLayout />}
                    {active === "card" && <CardLayoutView />}
                </div>
            </FadeIn>
        </section>
    )
}