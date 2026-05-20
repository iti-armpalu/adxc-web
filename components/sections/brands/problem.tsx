import { FadeIn } from "@/components/ui/fade-in"

export function BrandsProblem() {
    const scenarios = [
        "You've been quoted $100K for a data subscription you'd use twice a year.",
        "You've built a brief as best you can using gut instinct and the data your LLM can gather (the killer stat is, on checking, a hallucination…).",
        "You've spent half a Tuesday hunting for category stats across PDFs, free trials, and outdated reports.",
    ]

    return (
        <FadeIn>
            <section className="border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {scenarios.map((scenario, i) => (
                            <div key={i} className="border-t border-foreground/80 pt-8">
                                <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                                    {scenario}
                                </p>
                            </div>
                        ))}
                        <div className="border-t border-foreground/80 pt-8">
                            <p className="text-2xl sm:text-3xl font-semibold text-brand-bright">
                                Sound familiar?
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}