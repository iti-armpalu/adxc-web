import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "FAQs",
    description: `Frequently asked questions about ${siteConfig.name}.`,
}

export default function FAQPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
            <div className="mb-16">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    FAQs
                </p>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-6">
                    Common questions
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Answers to the most frequent questions about {siteConfig.name}.
                    Full FAQ coming soon.
                </p>
            </div>
        </div>
    )
}