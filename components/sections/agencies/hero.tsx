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
                    gradientFrom="var(--color-orange-700)"
                    gradientTo="var(--color-orange-950)"
                    glowColor="var(--color-orange-500)"
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-xl space-y-10">

                        <div className="space-y-6">
                            <p className="text-caption text-muted-foreground">
                                For agencies
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl">
                                Premium consumer data. For every client, every brief.
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed">
                                ADXC connects your team's AI tools to industry-leading consumer data sources,
                                with one connection. Deliver evidence-backed work for clients of every type
                                and size — only paying for the data you actually use.
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
            </section>
        </FadeIn>
    )
}