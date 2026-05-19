"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"

export function AgenciesCTA() {
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
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="flex flex-col items-center text-center gap-10 max-w-2xl mx-auto">

                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary leading-none">
                                Want early access?
                            </h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Get early access and start using ADXC inside Miro for your client work.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full max-w-md">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10"
                                />
                                <Button type="submit" size="lg" className="shrink-0">
                                    Get early access
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}