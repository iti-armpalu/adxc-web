"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroBackground } from "../home/hero-background"

export function BrandsHero() {
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
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(90dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-16">
                    <div className="max-w-xl space-y-10 pt-8 xl:pt-16 pb-48 sm:pb-0">

                        <div className="space-y-6">
                            <p className="text-caption text-muted-foreground">
                                For brands
                            </p>
                            <h1>
                                Real data. Real answers. For real budgets.
                            </h1>
                            <p className="text-lg">
                                ADXC is built for businesses who need consumer insight on demand, but
                                don't want annual data subscriptions. Connect your AI agents to
                                industry-leading providers, and pay only for the answers you need.
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