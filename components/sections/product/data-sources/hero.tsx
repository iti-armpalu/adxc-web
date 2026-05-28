import { FadeIn } from "@/components/ui/fade-in"

export function DataSourcesHero() {
    return (
        <FadeIn>
            <section className="relative w-full mt-header bg-background overflow-hidden">
                {/* Right side — glow + grid */}
                <div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
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
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-xl space-y-6">
                        <h1>
                            Multiple industry-leading data providers. One connection.
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed">
                            The data providers connected to ADXC that you can access, pay-per-query.
                        </p>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}