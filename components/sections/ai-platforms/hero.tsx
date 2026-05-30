"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "@/components/sections/home/hero-background"

type Props = {
    onEmailSubmit: (email: string) => void
}

export function AIPlatformsHero({ onEmailSubmit }: Props) {
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        onEmailSubmit(email)
        setEmail("")
        document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <HeroBackground
                    gradientFrom="var(--color-cyan-700)"
                    gradientTo="var(--color-cyan-950)"
                    glowColor="var(--color-cyan-500)"
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-xl space-y-10 pt-8 xl:pt-16 pb-48 sm:pb-0">

                        <div className="space-y-6">
                            <p className="text-caption text-muted-foreground">
                                For AI platforms
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl">
                                Consumer insight, built for AI agents.
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed">
                                ADXC connects your platform to industry-leading consumer data sources,
                                with one connection, so your AI agents can pull real research into the
                                work, right when users need it.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 max-w-xs">
                            <Input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button size="xl" onClick={handleSubmit}>
                                Talk with our team
                            </Button>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}