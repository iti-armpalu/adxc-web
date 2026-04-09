import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Product",
    description: `How ${siteConfig.name} works — the data exchange infrastructure built for modern marketing.`,
}

export default function ProductPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
            <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    Product
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    Built for the way data actually moves
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Full product details coming soon.
                </p>
            </div>
        </div>
    )
}