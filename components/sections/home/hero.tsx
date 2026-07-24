"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroGraphic } from "./hero-graphic"
import { trackHeroCtaClicked, trackHeroEmailStarted } from "@/lib/analytics/events"
import { HeroBackground } from "./hero-background"

interface HeroSectionProps {
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string
}

export function HeroSection({ headlineLine1, headlineLine2, headlineLine3, subtext }: HeroSectionProps) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const headlineLines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean)

    const handleSubmit = () => {
        trackHeroCtaClicked(email)
        if (email) {
            router.push(`/early-access?email=${encodeURIComponent(email)}`)
        }
    }

    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <HeroBackground />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(90dvh-var(--header-h))] flex flex-col justify-center py-16">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start h-full flex-1">

                        {/* Left — content, starts from top */}
                        <div className="max-w-xl space-y-10">
                            <div className="space-y-6">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl">
                                    {headlineLines.map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < headlineLines.length - 1 && <br />}
                                        </span>
                                    ))}
                                </h1>
                                <p className="text-lg text-foreground leading-relaxed max-w-md">
                                    {subtext}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 max-w-xs">
                                <Input
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={trackHeroEmailStarted}
                                />
                                <Button size="xl" onClick={handleSubmit}>
                                    Get early access
                                </Button>
                            </div>
                        </div>

                        {/* Right — graphic, centred in its column */}
                        <div className="flex justify-center pointer-events-none self-center" aria-hidden>
                            <HeroGraphic />
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}