"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroGraphic } from "./hero-graphic"

export function HeroSection() {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            router.push(`/early-access?email=${encodeURIComponent(email)}`)
        }
    }

    return (
        <FadeIn className="flex-1 flex items-center">
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative min-h-[600px] flex flex-col lg:block">

                {/* Left — content */}
                <div className="space-y-8 w-full lg:max-w-[460px]">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                        Access premium marketing data.{" "}
                        <span className="text-brand-bright">Pay per answer.</span>
                    </h1>

                    <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                        ADXC connects your AI agents to premium data providers. Ask a
                        question, see a price, pay and get an answer. No subscriptions.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs">
                        <Input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 bg-background"
                        />
                        <Button type="submit" size="xl" className="w-full cursor-pointer">
                            Get early access
                        </Button>
                    </form>

                </div>

                {/* Mobile — graphic below form */}
                <div className="flex md:hidden justify-center w-full pt-16 pointer-events-none" aria-hidden>
                    <HeroGraphic />
                </div>

                {/* Tablet — graphic below text, full width */}
                <div className="hidden md:flex xl:hidden justify-center w-full pt-36 pointer-events-none" aria-hidden>
                    <HeroGraphic />
                </div>

                {/* Desktop — graphic beside text, absolute */}
                <div
                    className="hidden xl:flex absolute bottom-15 right-0 xl:-right-25 items-center pointer-events-none"
                    aria-hidden
                >
                    <HeroGraphic />
                </div>

            </section>
        </FadeIn>
    )
}