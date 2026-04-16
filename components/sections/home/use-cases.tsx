import { FadeIn } from "@/components/ui/fade-in"

const useCases = [
    {
        title: "Segmentation",
        bullets: [
            "Size total addressable buyers",
            "Cluster by behavior, needs",
            "Deliver ready-to-use personas",
        ],
    },
    {
        title: "Positioning",
        bullets: [
            "Surface beliefs and barriers",
            "Rank category entry points",
            "Align messages to segments",
        ],
    },
    {
        title: "Creative",
        bullets: [
            "Score ads on ABLE",
            "Compare variants quickly",
            "Approve only high-impact assets",
        ],
    },
]

export function UseCasesSection() {
    return (
        <FadeIn>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-3xl">
                        Get the data you need for your critical marketing tasks
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        From simple fact finding, to deep audience understanding, to category
                        trends, ADXC helps you get the answers you need instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {useCases.map((useCase) => (
                        <div
                            key={useCase.title}
                            className="flex flex-col gap-6 p-6 rounded-2xl border border-border/50 bg-muted/20"
                        >
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-foreground">
                                    {useCase.title}
                                </h3>
                                <ul className="space-y-2.5">
                                    {useCase.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                            <svg className="w-4 h-4 shrink-0 mt-0.5 text-foreground" viewBox="0 0 16 16" fill="none">
                                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Placeholder for use case image */}
                            <div className="aspect-[4/3] rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center mt-auto">
                                <p className="text-xs text-muted-foreground">{useCase.title} example</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </FadeIn>
    )
}