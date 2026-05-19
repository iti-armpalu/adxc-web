export function PlatformOverview() {
    return (
        <section className="border-t border-border/50 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="max-w-3xl mx-auto space-y-8">

                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            How it works
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary leading-none">
                            Smart. Simple. Secure.
                        </h2>
                    </div>

                    <p className="text-lg text-neutral-600 leading-relaxed">
                        ADXC connects AI agents to industry-leading consumer data sources. It understands
                        questions in context, orchestrates data retrieval across multiple sources, and
                        returns synthesised answers. All while keeping the underlying data fully protected.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Patent-pending technology, built for the way AI agents work.
                    </p>

                </div>
            </div>
        </section>
    )
}