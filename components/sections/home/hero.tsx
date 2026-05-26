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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        trackHeroCtaClicked(email)
        if (email) {
            router.push(`/early-access?email=${encodeURIComponent(email)}`)
        }
    }

    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <HeroBackground />
                <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-xl space-y-10">

                        {/* Left — content */}
                        <div className="space-y-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-medium tracking-tight text-foreground leading-none">
                                Access premium consumer data.{" "}
                                <span className="block text-brand-bright">Pay-as-you-go.</span>
                            </h1>

                            <p className="text-lg text-foreground leading-relaxed max-w-sm">
                                ADXC connects your AI tools to industry-leading data providers.
                                Pay per query, no subscriptions, so you can access the insight needed
                                to grow your business.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs">
                            <Input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={trackHeroEmailStarted}
                            />
                            <Button type="submit" size="xl" className="w-full cursor-pointer">
                                Get early access
                            </Button>
                        </form>

                        {/* </div> */}
                    </div>

                    {/* Mobile — graphic below form */}
                    <div className="flex md:hidden justify-center w-full pt-36 pointer-events-none" aria-hidden>
                        <HeroGraphic />
                    </div>

                    {/* Tablet — graphic below text, full width */}
                    <div className="hidden md:flex xl:hidden justify-center w-full pt-36 pointer-events-none" aria-hidden>
                        <HeroGraphic />
                    </div>

                    {/* Desktop — graphic beside text, absolute */}
                    <div
                        className="hidden xl:flex absolute items-center pointer-events-none"
                        style={{
                            top: 'var(--hero-adxc-top)',
                            left: 'var(--hero-adxc-left)',
                            transform: 'translateY(-50%)',
                        }}

                        aria-hidden
                    >
                        <HeroGraphic />
                    </div>
                </div>
            </section>
        </FadeIn >
    )
}