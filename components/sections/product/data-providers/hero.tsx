import { FadeIn } from "@/components/ui/fade-in";

export function DataProvidersHero() {
    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-3xl space-y-10">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-medium tracking-tight text-foreground leading-none">
                            Multiple industry-leading data providers.
                            <span className="block text-brand-bright">One connection.</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-xl">
                            The data providers connected to ADXC that you can access, pay-per-query.
                        </p>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}