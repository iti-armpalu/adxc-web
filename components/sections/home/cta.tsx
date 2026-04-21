"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HomeCTASection() {
    return (
        <section className="border-t border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center space-y-8">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                        Want early access?
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        For more information on how ADXC can work for you, and to get early access.
                    </p>
                </div>
                <Button asChild size="lg" className="group">
                    <Link href="/contact">
                        Contact us
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}