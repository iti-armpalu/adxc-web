import { FadeIn } from "@/components/ui/fade-in";

export function PlatformHero() {
    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex flex-col justify-center pt-10 xl:pt-0 py-8">
                    <div className="max-w-xl space-y-10">

                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            The platform
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                            ADXC: The Agentic
                            <span className="block text-brand-bright">Data Exchange</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Consumer insight for AI agents.
                        </p>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}