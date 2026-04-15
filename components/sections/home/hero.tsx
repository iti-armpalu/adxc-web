"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const bullets = [
    "Multiple data sources, one connection",
    "Answers in seconds",
    "See the price before you approve",
]

const dataProviders = ["YouGov", "Reddit", "X"]

export function HeroSection() {
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
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                            Access the world's best data providers. Pay per answer
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            ADXC connects your AI agents to premium data sources so you can
                            make better marketing decisions affordably.
                        </p>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-3">
                        {bullets.map((bullet) => (
                            <li key={bullet} className="flex items-center gap-3 text-sm text-foreground">
                                <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                                {bullet}
                            </li>
                        ))}
                    </ul>

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
                            Get early access
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </form>

                    {/* Data providers */}
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                            Access data from
                        </p>
                        <div className="flex items-center gap-3">
                            {dataProviders.map((provider) => (
                                <span
                                    key={provider}
                                    className="text-xs font-medium text-muted-foreground border border-border/50 rounded-md px-2.5 py-1"
                                >
                                    {provider}
                                </span>
                            ))}
                            <span className="text-xs text-muted-foreground">
                                + more coming soon
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right — brand graphic placeholder */}
                <div className="aspect-square rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Brand graphic</p>
                </div>

            </div>
        </section>
    )
}