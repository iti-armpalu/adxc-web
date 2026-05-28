"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"

export function HomeCTASection() {
    return (
        <FadeIn>
            <section className="bg-brand-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center space-y-8">
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-primary">
                            Want early access?
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
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