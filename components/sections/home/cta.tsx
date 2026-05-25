"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"

export function HomeCTASection() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center space-y-8">
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
                            Want early access?
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            For more information on how ADXC can work for you, and to get early access.
                        </p>
                    </div>
                    <Button asChild size="xl">
                        <Link href="/contact">
                            Contact us
                        </Link>
                    </Button>
                </div>
            </section>
        </FadeIn>
    )
}