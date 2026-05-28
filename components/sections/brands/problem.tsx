import { FadeIn } from "@/components/ui/fade-in"
import { Separator } from "@/components/ui/separator"

export function BrandsProblem() {
    const scenarios = [
        "You've been quoted $100K for a data subscription you'd use twice a year.",
        "You've built a brief as best you can using gut instinct and the data your LLM can gather (the killer stat is, on checking, a hallucination…).",
        "You've spent half a Tuesday hunting for category stats across PDFs, free trials, and outdated reports.",
    ]

    return (
        <section
            style={{
                background: "linear-gradient(135deg, var(--color-purple-800) 0%, var(--color-purple-600) 80%)",
            }}
        >
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-8 text-primary-foreground">
                        {scenarios.map((scenario, i) => (
                            <div key={i}>
                                <p className="text-lg sm:text-xl leading-relaxed pb-8">
                                    {scenario}
                                </p>
                                <Separator />
                            </div>
                        ))}
                        <p className="text-2xl sm:text-3xl font-semibold">
                            Sound familiar?
                        </p>
                    </div>
                </div>
            </FadeIn>
        </section>

    )
}