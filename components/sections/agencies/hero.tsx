"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"

export function AgenciesHero() {
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
            <section className="relative w-full max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] mt-header flex flex-col justify-center pt-10 xl:pt-0 py-8">
                <div className="max-w-2xl space-y-10">

                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            For agencies
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-none font-medium">
                            Premium consumer data.
                            <span className="block text-brand-bright">For every client, every brief.</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                            ADXC connects your team's AI tools to industry-leading consumer data sources,
                            with one connection. Deliver evidence-backed work for clients of every type
                            and size — only paying for the data you actually use.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex flex-col gap-3 max-w-xs">
                            <Input
                                type="email"
                                placeholder="Enter your work email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" size="xl" className="shrink-0">
                                Get early access
                            </Button>
                        </div>
                    </form>

                </div>
            </section>
        </FadeIn>
    )
}