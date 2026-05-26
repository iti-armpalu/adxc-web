"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "../home/hero-background"

export function AgenciesHero() {
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
                    gradientFrom="var(--color-yellow-700)"
                    gradientTo="var(--color-yellow-950)"
                    glowColor="var(--color-yellow-500)"
                />
                <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-2xl space-y-10">

                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                For agencies
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-medium tracking-tight text-foreground leading-none">
                                <span className="block text-yellow-600">Premium consumer data.</span>
                                For every client, every brief.
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed max-w-xl">
                                ADXC connects your team's AI tools to industry-leading consumer data sources,
                                with one connection. Deliver evidence-backed work for clients of every type
                                and size — only paying for the data you actually use.
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