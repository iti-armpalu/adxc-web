import { HeroGraphic } from "./hero-graphic"
import { HeroBackground } from "./hero-background"
import { HeroEmailCapture } from "@/components/sections/hero-email-capture"

interface HeroSectionProps {
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string
}

export function HeroSection({ headlineLine1, headlineLine2, headlineLine3, subtext }: HeroSectionProps) {
    const headlineLines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean)

    // No FadeIn here on purpose: the hero is above the fold and must be visible
    // in the server HTML immediately (perceived speed + LCP).
    return (
        // Starts at the page top (under the fixed header) and clips, so the
        // graphic's HeroCut can extend behind the header but not past the hero.
        <section className="relative w-full pt-header overflow-hidden">
            <HeroBackground showCut={false} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(90dvh-var(--header-h))] flex flex-col justify-center py-16">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start h-full flex-1">

                    {/* Left — content, starts from top */}
                    <div className="max-w-xl space-y-10">
                        <div className="space-y-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl">
                                {headlineLines.map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < headlineLines.length - 1 && <br />}
                                    </span>
                                ))}
                            </h1>
                            <p className="text-lg text-foreground leading-relaxed max-w-md">
                                {subtext}
                            </p>
                        </div>

                        <HeroEmailCapture homeHero />
                    </div>

                    {/* Right — graphic, centred in its column */}
                    <div className="flex justify-center pointer-events-none self-center" aria-hidden>
                        <HeroGraphic />
                    </div>

                </div>
            </div>
        </section>
    )
}