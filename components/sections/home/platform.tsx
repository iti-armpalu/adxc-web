const steps = [
    {
        number: "1",
        title: "You ask a question",
        description: "through your AI agent",
    },
    {
        number: "2",
        title: "ADXC finds the data",
        description: "across multiple premium sources",
    },
    {
        number: "3",
        title: "You see the answer and price",
        description: "before you commit",
    },
    {
        number: "4",
        title: "You approve and pay",
        description: "only for what you use",
    },
]

export function PlatformSection() {
    return (
        <section className="border-y border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-4 mb-16">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        The platform
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl">
                        The ADXC platform
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        ADXC is the data exchange connecting premium marketing data
                        providers and SMEs via AI agents, on a pay-per-use model.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Diagram placeholder */}
                    <div className="aspect-[4/3] rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Platform diagram</p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-6">
                        {steps.map((step) => (
                            <div key={step.number} className="flex items-start gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center">
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {step.number}
                                    </span>
                                </div>
                                <div className="space-y-0.5 pt-1">
                                    <p className="text-sm font-medium text-foreground">
                                        {step.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}