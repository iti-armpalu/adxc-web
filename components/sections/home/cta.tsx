"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function HomeCTASection() {
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center space-y-8">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                        Ready to access better data?
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Join the brands, agencies, and AI platforms already on the waitlist.
                        No contracts, no minimums — pay only for what you use.
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                    <Input
                        type="email"
                        placeholder="Enter your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-11 bg-background"
                    />
                    <Button type="submit" size="lg" className="h-11 group shrink-0">
                        Get early access
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </form>
            </div>
        </section>
    )
}