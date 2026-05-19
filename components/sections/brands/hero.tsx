"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

const dataProviders = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Reddit", logo: "/reddit-logo-horizontal.png" },
    { name: "X", logo: "/x-logo.jpg" },
    { name: "Quid", logo: "/quid-logo.svg" },
]

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
            <section className="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                    <div className="max-w-2xl space-y-10">

                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                For brands
                            </p>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-none font-medium">
                                Real data. Real answers.
                                <span className="block text-brand-bright">For real budgets.</span>
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                                ADXC is built for businesses who need consumer insight on demand, but
                                don't want annual data subscriptions. Connect your AI agents to
                                industry-leading providers, and pay only for the answers you need.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                                <Input
                                    type="email"
                                    placeholder="Enter your work email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12"
                                />
                                <Button type="submit" size="xl" className="shrink-0">
                                    Get early access
                                </Button>
                            </div>
                        </form>

                        {/* Data providers */}
                        <div className="space-y-3 pt-2">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Access data from
                            </p>
                            <div className="flex flex-wrap items-center gap-6">
                                {dataProviders.map((p) => (
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={80}
                                        height={28}
                                        className="h-6 w-auto object-contain"
                                    />
                                ))}
                                <span className="text-sm text-muted-foreground">TikTok, Instagram and more</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Brand video placeholder */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                    <div className="rounded-xl border border-border bg-muted h-[400px] sm:h-[500px] flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Brand video — coming soon</p>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}