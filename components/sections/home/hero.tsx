"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { ArrowRight } from "lucide-react"

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
        <FadeIn className="flex-1 flex items-center">
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 sm:pt-28 sm:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <div className="space-y-8">

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                            Access premium marketing data.{" "}
                            <span style={{ color: "#C46184" }}>Pay per answer.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            ADXC connects your AI agents to premium data providers. Ask a
                            question, see a price, pay and get an answer. No subscriptions.
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