"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"

type Props = {
    onEmailSubmit: (email: string) => void
}

export function AIPlatformsHero({ onEmailSubmit }: Props) {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onEmailSubmit(email)
        setEmail("") // clear the input
        document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <FadeIn>
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="max-w-lg space-y-10">

                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            For AI platforms
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-none font-medium">
                            Consumer insight,
                            <span className="block text-brand-bright">built for AI agents.</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                            ADXC connects your platform to industry-leading consumer data sources,
                            with one connection, so your AI agents can pull real research into the
                            work — right when users need it.
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
                                Talk with our team
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </FadeIn>
    )
}