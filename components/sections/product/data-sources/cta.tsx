"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"

export function DataSourcesCTA() {
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleSubmit = () => {
        const dest = email
            ? `/early-access?email=${encodeURIComponent(email)}`
            : "/early-access"
        router.push(dest)
    }

    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="flex flex-col items-center text-center gap-10 max-w-2xl mx-auto">

                        <div className="space-y-4">
                            <h2 className="text-primary">
                                Start accessing these data providers,
                                <span className="block">pay-as-you-go</span>
                            </h2>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                            <Input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10"
                            />
                            <Button size="lg" onClick={handleSubmit} className="shrink-0 h-10">
                                Get early access
                            </Button>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}