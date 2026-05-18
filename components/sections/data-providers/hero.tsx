"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataProvidersHero() {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const dest = email
            ? `/for/data-providers/enquiry?email=${encodeURIComponent(email)}`
            : "/for/data-providers/enquiry"
        router.push(dest)
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-3xl space-y-8">

                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                        Unlock a market your
                        <span className="block text-brand-bright">enterprise model can't reach.</span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                        ADXC connects your data to the AI agents and workflows shaping
                        marketing decisions for SMEs. Get paid per query, with your IP fully protected.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs">
                    <Input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-background"
                    // onFocus={trackHeroEmailStarted}
                    />
                    <Button type="submit" size="xl" className="w-full cursor-pointer">
                        Talk with our team
                    </Button>
                </form>

            </div>
        </section>
    )
}