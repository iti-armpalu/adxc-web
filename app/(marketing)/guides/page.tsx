import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Guides",
    description: `Guides and tutorials for getting the most out of ${siteConfig.name}.`,
}

export default function GuidesPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
            <div className="max-w-3xl mb-16">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    Guides
                </p>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-6">
                    How to get the most from {siteConfig.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Step-by-step guides for brands, agencies, and data providers.
                    Full guide library coming soon.
                </p>
            </div>
        </div>
    )
}