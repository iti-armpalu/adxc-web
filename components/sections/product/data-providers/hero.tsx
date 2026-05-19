import { FadeIn } from "@/components/ui/fade-in";

export function DataProvidersHero() {
    return (
        <FadeIn>
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-none">
                        Multiple industry-leading
                        <span className="block text-brand-bright">data providers. One connection.</span>
                    </h1>
                    <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                        The data providers connected to ADXC that you can access, pay per query.
                    </p>
                </div>
            </section>
        </FadeIn>
    )
}