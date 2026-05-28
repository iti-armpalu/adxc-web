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

function CurrentLayout() {
    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="space-y-3 text-center">
                <h2 className="text-purple-800">
                    Available inside the tools you already use
                </h2>
                <p className="text-lg text-purple-950 leading-relaxed">
                    Use ADXC through the tools you already know.
                </p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <p className="text-sm font-medium text-purple-950">Access via</p>
                <Image src="/miro-logo.svg" alt="Miro" width={100} height={36} className="h-10 w-auto object-contain" />
            </div>
        </div>
    )
}

function VerticalLayout() {
    return (
        <div className="flex flex-col items-center gap-12 max-w-2xl mx-auto text-center">
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-purple-800 leading-none">
                    Available inside the tools you already use
                </h2>
                <p className="text-lg text-purple-950 leading-relaxed">
                    Use ADXC through the tools you already know.
                </p>
            </div>
            <div className="flex flex-col items-center gap-3">
                <p className="text-caption text-purple-700">Launching with</p>
                <Image src="/miro-logo.svg" alt="Miro" width={140} height={48} className="h-14 w-auto object-contain" />
                <p className="text-sm text-purple-700">More integrations coming soon</p>
            </div>
        </div>
    )
}

function SplitLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-4xl mx-auto">
            <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-purple-800 leading-none">
                    Available inside the tools you already use
                </h2>
                <p className="text-lg text-purple-950 leading-relaxed">
                    Use ADXC through the tools you already know. Launching with Miro Sidekick, with more integrations on the way.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 bg-purple-100 rounded-lg p-12">
                <p className="text-caption text-purple-700">Launching with</p>
                <Image src="/miro-logo.svg" alt="Miro" width={140} height={48} className="h-12 w-auto object-contain" />
            </div>
        </div>
    )
}

function LogoHeroLayout() {
    return (
        <div className="flex flex-col items-center gap-16 max-w-3xl mx-auto text-center">
            <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-purple-800 leading-none">
                    Available inside the tools you already use
                </h2>
                <p className="text-caption text-purple-700">Launching with</p>
                <Image src="/miro-logo.svg" alt="Miro" width={240} height={80} className="h-20 w-auto object-contain opacity-90" />
                <p className="text-sm text-purple-700">More integrations coming soon</p>
            </div>
        </div>
    )
}

function CardLayout() {
    return (
        <div className="flex flex-col items-center gap-12 max-w-3xl mx-auto text-center">
            <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-purple-800 leading-none">
                    Available inside the tools you already use
                </h2>
                <p className="text-lg text-purple-950 leading-relaxed">
                    Use ADXC through the tools you already know.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <Card className="flex flex-col items-center justify-center gap-4 p-8 border-purple-200">
                    <Image src="/miro-logo.svg" alt="Miro" width={100} height={36} className="h-8 w-auto object-contain" />
                    <Badge variant="secondary" className="text-xs">Available now</Badge>
                </Card>
                <Card className="flex flex-col items-center justify-center gap-4 p-8 border-dashed border-purple-200 opacity-50">
                    <p className="text-sm text-purple-700 font-medium">Coming soon</p>
                </Card>
                <Card className="flex flex-col items-center justify-center gap-4 p-8 border-dashed border-purple-200 opacity-50">
                    <p className="text-sm text-purple-700 font-medium">Coming soon</p>
                </Card>
            </div>
        </div>
    )
}

export function BrandsIntegrations() {
    const [active, setActive] = useState<Variant>("current")

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

            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
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