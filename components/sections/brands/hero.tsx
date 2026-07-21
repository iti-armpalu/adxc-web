"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "../home/hero-background"

interface BrandsHeroProps {
    label: string
    headline: string
    subtext: string
}

export function BrandsHero({ label, headline, subtext }: BrandsHeroProps) {
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleSubmit = () => {
        const dest = email
            ? `/early-access?email=${encodeURIComponent(email)}`
            : "/early-access"
        router.push(dest)
    }

    return (
        <FadeIn>
            <section className="relative w-full mt-header">

                <HeroBackground
                    gradientFrom="var(--color-purple-700)"
                    gradientTo="var(--color-purple-950)"
                    glowColor="var(--color-purple-500)"
                />

                {/* Text content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(90dvh-var(--header-h))] flex flex-col justify-center py-16">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start h-full flex-1">
                        <div className="max-w-xl space-y-10">
                            <div className="space-y-6">
                                <p className="text-caption text-muted-foreground">
                                    {label}
                                </p>
                                <h1>
                                    {headline}
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
                                <Button size="xl" onClick={handleSubmit} className="shrink-0">
                                    Get early access
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Illustration — flows below text on mobile, absolute on xl */}
                <img
                    src="/illustration-brands.svg"
                    alt=""
                    aria-hidden="true"
                    className="relative w-[min(800px,160vw)] max-w-none ml-[calc(100%-min(800px,160vw))] xl:ml-0 xl:absolute xl:inset-y-0 xl:right-0 xl:w-auto xl:h-full xl:object-cover pointer-events-none select-none"
                    style={{
                        maskImage: "linear-gradient(to right, transparent 0%, black 25%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)",
                    }}
                />

            </section>
        </FadeIn>
    )
}