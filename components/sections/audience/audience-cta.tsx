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

export function AudienceCTA({ config }: Props) {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            router.push(`/early-access?email=${encodeURIComponent(email)}`)
        }
    }

    return (
        <section className="border-t border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="max-w-2xl space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                            Get early access to ADXC
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Join the beta and be one of the first to access premium marketing
                            data through your AI agents.
                        </p>
                    </div>

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
            </div>
        </section>
    )
}