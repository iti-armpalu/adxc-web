"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { Database, Timer, KeyRound } from "lucide-react"

const bullets = [
    { icon: Database, label: "Multiple data sources, one connection" },
    { icon: Timer, label: "Answers in seconds" },
    { icon: KeyRound, label: "See the price before you approve" },
]

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
        <FadeIn>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <div className="space-y-8">

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                            Access the world's best data providers.{" "}
                            <span style={{ color: "#C46184" }}>Pay per answer.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            ADXC connects your AI agents to premium data sources so you can
                            make better marketing decisions affordably.
                        </p>

                        {/* Email + CTA stacked */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
                            <Input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-background"
                            />
                            <Button
                                type="submit"
                                className="h-12 w-full text-base font-medium"
                                style={{ backgroundColor: "#66023C" }}
                            >
                                Get early access
                            </Button>
                        </form>

                        {/* Bullets */}
                        <ul className="space-y-3">
                            {bullets.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Icon className="w-4 h-4 shrink-0" style={{ color: "#66023C" }} />
                                    {label}
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Right — brand graphic placeholder */}
                    <div className="aspect-square rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Brand graphic</p>
                    </div>

                </div>
            </section>
        </FadeIn>
    )
}