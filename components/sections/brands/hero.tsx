"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "../home/hero-background"

export function BrandsHero() {
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
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
                <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-2xl space-y-10">

                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                For brands
                            </p>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-none font-medium">
                                Real data. Real answers.
                                <span className="block text-purple-400">For real budgets.</span>
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                                ADXC is built for businesses who need consumer insight on demand, but
                                don't want annual data subscriptions. Connect your AI agents to
                                industry-leading providers, and pay only for the answers you need.
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
                                <Button type="submit" size="xl" className="shrink-0">
                                    Get early access
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}