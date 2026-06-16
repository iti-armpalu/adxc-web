"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroGraphic } from "./hero-graphic"
import { trackHeroCtaClicked, trackHeroEmailStarted } from "@/lib/analytics/events"
import { HeroBackground } from "./hero-background"

export function HeroSection() {
    const router = useRouter()
    const [email, setEmail] = useState("")

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
                                    Premium consumer data.{" "}
                                    <span className="text-brand-400">Pay per answer.</span>
                                </h1>
                                <p className="text-lg text-foreground leading-relaxed max-w-md">
                                    Connect your AI tools to industry-leading data providers to make important business decisions backed by real, trusted data. Only pay for what you need.
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