import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Home",
}

export default function HomePage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                Coming soon
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                {siteConfig.name}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {siteConfig.tagline}
            </p>
        </div>
    )
}