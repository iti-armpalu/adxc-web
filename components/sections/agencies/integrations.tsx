"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type Variant = "current" | "vertical" | "split" | "logo-hero" | "card"

const variants: { id: Variant; label: string }[] = [
    { id: "current", label: "A — Current" },
    { id: "vertical", label: "B — Vertical" },
    { id: "split", label: "C — Split" },
    { id: "logo-hero", label: "D — Logo hero" },
    { id: "card", label: "E — Card" },
]

const heading = "Available inside the tools your team already uses"
const subheading = "Your strategists can pull consumer data directly into briefs, workshops, and planning sessions. More platform integrations launching throughout 2026."

function CurrentLayout() {
    return (
        <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center gap-12 max-w-2xl mx-auto">
            <Image src="/miro-logo.svg" alt="Miro" width={100} height={36} className="h-10 w-auto object-contain shrink-0" />
            <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">ADXC is integrated with Miro Sidekick</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{subheading}</p>
            </div>
        </div>
    )
}

function VerticalLayout() {
    return (
        <div className="flex flex-col items-center gap-12 max-w-2xl mx-auto text-center">
            <div className="space-y-3">
                <h2 className="text-foreground">{heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{subheading}</p>
            </div>
            <div className="flex flex-col items-center gap-3">
                <p className="text-caption text-orange-700">Launching with</p>
                <Image src="/miro-logo.svg" alt="Miro" width={140} height={48} className="h-14 w-auto object-contain" />
                <p className="text-sm text-muted-foreground">More integrations coming soon</p>
            </div>
        </div>
    )
}

function SplitLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-4xl mx-auto">
            <div className="space-y-4">
                <h2 className="text-foreground">{heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{subheading}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 bg-orange-100 rounded-lg p-12">
                <p className="text-caption text-orange-700">Launching with</p>
                <Image src="/miro-logo.svg" alt="Miro" width={140} height={48} className="h-12 w-auto object-contain" />
            </div>
        </div>
    )
}

function LogoHeroLayout() {
    return (
        <div className="flex flex-col items-center gap-16 max-w-3xl mx-auto text-center">
            <div className="space-y-3">
                <h2 className="text-foreground">{heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{subheading}</p>
            </div>
            <div className="flex flex-col items-center gap-6 w-full">
                <p className="text-caption text-orange-700">Launching with</p>
                <Image src="/miro-logo.svg" alt="Miro" width={240} height={80} className="h-20 w-auto object-contain opacity-90" />
                <p className="text-sm text-muted-foreground">More integrations coming soon</p>
            </div>
        </div>
    )
}

function CardLayout() {
    return (
        <div className="flex flex-col items-center gap-12 max-w-3xl mx-auto text-center">
            <div className="space-y-3">
                <h2 className="text-foreground">{heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{subheading}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <Card className="flex flex-col items-center justify-center gap-4 p-8 border-orange-200">
                    <Image src="/miro-logo.svg" alt="Miro" width={100} height={36} className="h-8 w-auto object-contain" />
                    <Badge variant="secondary" className="text-xs">Available now</Badge>
                </Card>
                <Card className="flex flex-col items-center justify-center gap-4 p-8 border-dashed border-orange-200 opacity-50">
                    <p className="text-sm text-orange-700 font-medium">Coming soon</p>
                </Card>
                <Card className="flex flex-col items-center justify-center gap-4 p-8 border-dashed border-orange-200 opacity-50">
                    <p className="text-sm text-orange-700 font-medium">Coming soon</p>
                </Card>
            </div>
        </div>
    )
}

export function AgenciesIntegrations() {
    const [active, setActive] = useState<Variant>("current")

    return (
        <section className="bg-orange-50">
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

            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    {/* Section header — shown for all except Current which has its own layout */}
                    {active === "current" && (
                        <div className="space-y-3 text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-foreground">{heading}</h2>
                        </div>
                    )}
                    {active === "current" && <CurrentLayout />}
                    {active === "vertical" && <VerticalLayout />}
                    {active === "split" && <SplitLayout />}
                    {active === "logo-hero" && <LogoHeroLayout />}
                    {active === "card" && <CardLayout />}
                </div>
            </FadeIn>
        </section>
    )
}