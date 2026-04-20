const useCases = [
    {
        title: "Audience research",
        description: "Understand who your buyers are, what they believe, and what drives their decisions — without commissioning a study.",
        bullets: [
            "Size and segment your total addressable market",
            "Uncover beliefs, barriers, and motivations",
            "Deliver ready-to-use personas in minutes",
        ],
    },
    {
        title: "Competitive intelligence",
        description: "Know where you stand in the category and where your competitors are vulnerable.",
        bullets: [
            "Track share of voice and brand perception",
            "Identify competitor weaknesses and gaps",
            "Monitor category trends in real time",
        ],
    },
    {
        title: "Brief development",
        description: "Ground your briefs in real data, not assumptions. Give your creative teams the insight they need to do their best work.",
        bullets: [
            "Validate strategic territories before briefing",
            "Rank messaging against audience priorities",
            "Back every claim with a citable source",
        ],
    },
    {
        title: "Campaign planning",
        description: "Plan media and activation with confidence, using data that reflects how your audience actually behaves.",
        bullets: [
            "Model reach and frequency across channels",
            "Identify high-value audience intersections",
            "Optimise budget allocation before you spend",
        ],
    },
]

export function UseCasesSection() {
    return (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {useCases.map((useCase) => (
                    <div
                        key={useCase.title}
                        className="flex flex-col gap-5 p-8 rounded-2xl border border-border/50"
                    >
                        <h3 className="text-lg font-medium text-foreground">
                            {useCase.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {useCase.description}
                        </p>
                        <ul className="space-y-2.5 pt-2 border-t border-border/40">
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
                ))}
            </div>
        </section>
    )
}