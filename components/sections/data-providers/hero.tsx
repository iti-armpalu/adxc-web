"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "../home/hero-background"

type Props = {
    onEmailSubmit: (email: string) => void
}

export function DataProvidersHero({ onEmailSubmit }: Props) {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onEmailSubmit(email)
        setEmail("") // clear the input
        document.getElementById("cta-data-rovider")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <HeroBackground
                    gradientFrom="var(--color-blue-700)"
                    gradientTo="var(--color-blue-950)"
                    glowColor="var(--color-blue-500)"
                />
                <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-2xl space-y-10">

                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                For data providers
                            </p>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-medium tracking-tight text-foreground leading-none">
                                <span className="text-blue-400">Unlock a market</span>{" "}
                                your enterprise model can't reach.
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed max-w-xl">
                                ADXC connects your data to the AI agents and workflows shaping
                                marketing decisions for SMEs. Get paid per query, with your IP fully protected.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="flex flex-col gap-3 max-w-xs">

                                <Input
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button type="submit" size="xl" className="w-full cursor-pointer">
                                    Talk with our team
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}