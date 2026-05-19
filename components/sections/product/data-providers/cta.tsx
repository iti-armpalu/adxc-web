"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"

export function DataProvidersCTA() {
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
            <section className="border-t border-border/50 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="flex flex-col items-center text-center gap-10 max-w-2xl mx-auto">

                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                                Start accessing these data providers,
                                <span className="block text-brand-bright">pay-as-you-go.</span>
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                            <Input
                                type="email"
                                placeholder="Enter your work email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 bg-background"
                            />
                            <Button type="submit" size="lg" className="shrink-0">
                                Get early access
                            </Button>
                        </form>

                        <p className="text-xs text-muted-foreground">
                            We'll be in touch within 2 business days.
                        </p>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}