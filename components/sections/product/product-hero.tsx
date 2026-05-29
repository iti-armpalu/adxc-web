import { FadeIn } from "@/components/ui/fade-in"

type ProductHeroProps = {
    eyebrow?: string
    title: string
    description: string
}

export function ProductHero({ eyebrow, title, description }: ProductHeroProps) {
    return (
        <section className="relative w-full mt-header bg-background overflow-hidden">
            {/* Diagonal glow + grid */}
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

            <FadeIn>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 xl:py-32">
                    <div className="max-w-xl space-y-6">
                        {eyebrow && (
                            <p className="text-caption text-muted-foreground">{eyebrow}</p>
                        )}
                        <h1>{title}</h1>
                        <p className="text-lg text-foreground leading-relaxed">{description}</p>
                    </div>
                </div>
            </FadeIn>
        </section>
    )
}