import { FadeIn } from "@/components/ui/fade-in"

interface AboutHeroProps {
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string[]
}

export function AboutHero({ headlineLine1, headlineLine2, headlineLine3, subtext }: AboutHeroProps) {
    const headlineLines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean)

    return (
        <FadeIn>
            <section className="bg-background relative overflow-hidden">
                {/* Diagonal grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                        WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                    }}
                >
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div
                        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, var(--color-brand-200) 0%, transparent 70%)",
                            opacity: 0.4,
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                    <div className="space-y-8">
                        <h1 className="leading-[1.05] tracking-tight text-foreground">
                            {headlineLines.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < headlineLines.length - 1 && <br />}
                                </span>
                            ))}
                        </h1>
                        <div className="space-y-4">
                            {subtext.map((paragraph, i) => (
                                <p key={i} className="text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}