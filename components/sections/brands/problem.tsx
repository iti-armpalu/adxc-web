"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const scenarios = [
    "You've been quoted $100K for a data subscription you'd use twice a year.",
    "You've built a brief as best you can using gut instinct and the data your LLM can gather (the killer stat is, on checking, a hallucination…).",
    "You've spent half a Tuesday hunting for category stats across PDFs, free trials, and outdated reports.",
]

type Variant = "numbered" | "large-type" | "split" | "highlighted" | "asymmetric" | "cinematic"

const variants: { id: Variant; label: string }[] = [
    { id: "numbered", label: "A — Numbered" },
    { id: "large-type", label: "B — Large type" },
    { id: "split", label: "C — Split" },
    { id: "highlighted", label: "D — Highlighted" },
    { id: "asymmetric", label: "E — Asymmetric" },
    { id: "cinematic", label: "F — Cinematic" },
]

function Highlight({ children }: { children: React.ReactNode }) {
    return (
        <mark className="bg-purple-100 text-purple-800 px-1 rounded-xs not-italic">
            {children}
        </mark>
    )
}

function HighlightedScenarios() {
    return (
        <>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                You've been quoted <Highlight>$100K</Highlight> for a data subscription you'd use <Highlight>twice a year</Highlight>.
            </p>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                You've built a brief as best you can using gut instinct and the data your LLM can gather (the killer stat is, on checking, <Highlight>a hallucination…</Highlight>).
            </p>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                You've spent <Highlight>half a Tuesday</Highlight> hunting for category stats across PDFs, free trials, and outdated reports.
            </p>
        </>
    )
}

function NumberedLayout() {
    return (
        <div className="space-y-6">
            {scenarios.map((s, i) => (
                <div key={i} className="flex gap-6 items-start">
                    <span className="text-5xl font-semibold leading-none text-purple-200 shrink-0 w-12 text-right">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg sm:text-xl text-foreground leading-relaxed pt-1">{s}</p>
                </div>
            ))}
            <p className="text-2xl sm:text-3xl font-semibold text-primary ml-[4.5rem] pt-2">
                Sound familiar?
            </p>
        </div>
    )
}

function LargeTypeLayout() {
    return (
        <div className="space-y-6">
            {scenarios.map((s, i) => (
                <p key={i} className="text-xl sm:text-2xl font-medium text-foreground leading-snug">{s}</p>
            ))}
            <p className="text-3xl sm:text-4xl font-semibold text-primary pt-4">
                Sound familiar?
            </p>
        </div>
    )
}

function SplitLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-12">
            <div className="md:pt-1">
                <span className="text-caption text-primary border-t-2 border-primary pt-2 inline-block">
                    The problem
                </span>
            </div>
            <div className="space-y-6">
                {scenarios.map((s, i) => (
                    <p key={i} className="text-lg sm:text-xl text-foreground leading-relaxed pb-6 border-b border-border last:border-none last:pb-0">
                        {s}
                    </p>
                ))}
                <p className="text-2xl sm:text-3xl font-semibold text-primary pt-2">
                    Sound familiar?
                </p>
            </div>
        </div>
    )
}

function HighlightedLayout() {
    return (
        <div className="space-y-6">
            <HighlightedScenarios />
            <p className="text-2xl sm:text-3xl font-semibold text-primary pt-2">
                Sound familiar?
            </p>
        </div>
    )
}

function AsymmetricLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
                {scenarios.map((s, i) => (
                    <p key={i} className="text-lg text-foreground leading-relaxed pb-6 border-b border-border last:border-none last:pb-0">
                        {s}
                    </p>
                ))}
            </div>
            <div className="flex items-center justify-center md:justify-start">
                <p className="text-4xl sm:text-5xl font-semibold text-primary leading-tight">
                    Sound<br />familiar?
                </p>
            </div>
        </div>
    )
}

function CinematicLayout() {
    const [activeIndex, setActiveIndex] = useState(0)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])
    const allItems = [...scenarios, "Sound familiar?"]

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        itemRefs.current.forEach((el, i) => {
            if (!el) return
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveIndex(i)
                },
                { threshold: 0.6 }
            )
            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    return (
        <div>
            {allItems.map((text, i) => {
                const isFinal = i === allItems.length - 1
                return (
                    <div
                        key={i}
                        ref={(el) => { itemRefs.current[i] = el }}
                        className={cn(
                            "min-h-[60vh] flex items-center transition-all duration-700",
                            activeIndex === i ? "opacity-100" : "opacity-20"
                        )}
                    >
                        <p className={cn(
                            "leading-tight transition-all duration-700",
                            isFinal
                                ? "text-4xl sm:text-5xl font-semibold text-primary"
                                : "text-2xl sm:text-3xl font-medium text-foreground",
                            activeIndex === i && !isFinal && "text-3xl sm:text-4xl"
                        )}>
                            {text}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export function BrandsProblem() {
    const [active, setActive] = useState<Variant>("numbered")

    return (
        <section className="bg-purple-50">
            {/* Toggle — visible in dev/staging, remove before final launch */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex justify-end">
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <div className={cn("mx-auto", active === "cinematic" ? "max-w-2xl" : "max-w-3xl")}>
                    {active === "numbered" && <NumberedLayout />}
                    {active === "large-type" && <LargeTypeLayout />}
                    {active === "split" && <SplitLayout />}
                    {active === "highlighted" && <HighlightedLayout />}
                    {active === "asymmetric" && <AsymmetricLayout />}
                    {active === "cinematic" && <CinematicLayout />}
                </div>
            </div>
        </section>
    )
}