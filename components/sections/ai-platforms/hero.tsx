"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "@/components/sections/home/hero-background"

type Props = {
    label: string
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string
    onEmailSubmit: (email: string) => void
}

export function AIPlatformsHero({ label, headlineLine1, headlineLine2, headlineLine3, subtext, onEmailSubmit }: Props) {
    const [email, setEmail] = useState("")
    const headlineLines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean)

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
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center py-16">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start h-full flex-1">
                        <div className="max-w-xl space-y-10">

                            <div className="space-y-6">
                                <p className="text-caption text-muted-foreground">
                                    {label}
                                </p>
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
                                />
                                <Button size="xl" onClick={handleSubmit}>
                                    Talk with our team
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Illustration — desktop only */}
                <img
                    src="/illustration-ai-platforms.svg"
                    alt=""
                    aria-hidden="true"
                    className="hidden xl:flex relative w-[min(800px,160vw)] max-w-none ml-[calc(100%-min(800px,160vw))] xl:absolute xl:inset-y-0 xl:right-0 xl:w-[80%] xl:h-full xl:object-cover pointer-events-none select-none"
                    style={{
                        maskImage: "linear-gradient(to right, transparent 25%, black 55%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 25%, black 55%)",
                    }}
                />

            </section>
        </FadeIn>
    )
}