const useCases = [
    {
        title: "Audience research",
        description: "Understand who your buyers are, what they believe, and what drives their decisions.",
        bullets: [
            "Profile and segment your target audience",
            "Uncover behaviours, beliefs, barriers and motivations",
            "Build data-backed personas in minutes",
        ],
    },
    {
        title: "Competitive intelligence",
        description: "Know where you stand in the category and where your competitors are vulnerable.",
        bullets: [
            "Track trending topics and conversations in your category",
            "Identify competitor weaknesses and gaps",
            "Understand brand sentiment and perception",
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
        title: "Ideation and innovation",
        description: "Test ideas before you invest in them. Understand what resonates with your audience before the brief leaves the building.",
        bullets: [
            "Explore new markets and categories with real data",
            "Validate claims and messaging before you commit to them",
            "Stress test creative territories with real audience data",
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
                {useCases.map((useCase, i) => (
                    <div
                        key={useCase.title}
                        className="flex flex-col gap-6 p-8 rounded-2xl"
                        style={{ backgroundColor: "#EDE6EA" }}
                    >
                        {/* Number + title row */}
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-semibold text-foreground leading-snug">
                                {useCase.title}
                            </h3>
                            <span
                                className="text-4xl font-bold tracking-tighter select-none leading-none shrink-0 mt-1"
                                style={{ color: "#C46184", opacity: 0.25 }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <p className="text-base text-foreground/80 leading-relaxed">
                            {useCase.description}
                        </p>

                        <ul className="space-y-2.5 pt-4 border-t border-black/10">
                            {useCase.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="7" stroke="#66023C" strokeWidth="1.5" strokeOpacity="0.4" />
                                        <path d="M5 8l2 2 4-4" stroke="#66023C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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