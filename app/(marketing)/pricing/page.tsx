import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Pricing",
    description: `${siteConfig.name} pricing — pay only for the data you use.`,
}

export default function PricingPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
            <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    Pricing
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    Pay only for what you use
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Pricing details coming soon. No contracts, no minimums.
                </p>
            </div>
        </div>
    )
}