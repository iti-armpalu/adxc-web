import { FadeIn } from "@/components/ui/fade-in"

function Cite({ href, num }: { href: string; num: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super ml-0.5">
            {num}
        </a>
    )
}

const stats = [
    {
        number: "#1",
        lead: "Output quality is the no. 1 barrier to AI adoption in marketing.",
        body: "Output quality is still the primary limiting factor for AI agents, and it's limiting use: only 5% of businesses have integrated AI into core workflows.",
        cite: "1",
        citeHref: "https://www.jasper.ai/blog/2025-ai-marketing-trends-insights-report",
        cite2: "2",
        citeHref2: "https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf",
    },
    {
        number: "#2",
        lead: "Lack of necessary data is the no. 2 concern when using AI tools for marketers.",
        body: "Data can be the unlock. Businesses need a range of different data across the marketing process, from different providers. When each costs $200k+, the data is out of reach. ADXC solves this.",
        cite: "3",
        citeHref: "https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf",
        cite2: undefined,
        citeHref2: undefined,
    },
]

export function AIPlatformsWhyNow() {
    return (
        <section className="bg-cyan-50 relative overflow-hidden">
            {/* Diagonal grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: "linear-gradient(135deg, transparent 20%, black 50%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 20%, black 50%)",
                }}
            >
                <div
                    className="absolute inset-0 bg-grid opacity-20"
                    style={{ "--grid-color": "var(--color-cyan-400)" } as React.CSSProperties}
                />
            </div>
            <FadeIn>
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">

                    <p className="text-caption text-cyan-700">Why this matters now.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
                        {stats.map((s) => (
                            <div key={s.number} className="space-y-4 border-t-2 border-cyan-200 pt-6">
                                <p className="text-7xl sm:text-8xl font-bold leading-none text-cyan-900">
                                    {s.number}
                                </p>
                                <p className="text-sm text-cyan-800 leading-relaxed">
                                    {s.lead}
                                    <Cite href={s.citeHref} num={s.cite} />
                                </p>
                                <p className="text-base font-semibold text-cyan-950 leading-relaxed">
                                    {s.body}
                                    {s.cite2 && s.citeHref2 && <Cite href={s.citeHref2} num={s.cite2} />}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </FadeIn>
        </section>
    )
}