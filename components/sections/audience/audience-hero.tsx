"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import type { AudienceConfig } from "@/config/audiences"

type Props = {
    config: AudienceConfig
}

export function AudienceHero({ config }: Props) {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            router.push(`/early-access?email=${encodeURIComponent(email)}`)
        }
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            {config.label}
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                            {config.headline}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {config.subheadline}
                        </p>
                    </div>

                    {/* Email capture */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="email"
                            placeholder="Enter your work email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 h-11"
                        />
                        <Button type="submit" size="lg" className="h-11 group shrink-0">
                            {config.cta.label}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </form>
                </div>

                {/* Right — placeholder */}
                <div className="aspect-square rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Brand graphic</p>
                </div>

            </div>
        </section>
    )
}