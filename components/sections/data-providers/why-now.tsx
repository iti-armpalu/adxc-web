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
        number: "80%",
        label: "Businesses using AI",
        cite: "1",
        citeHref: "https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf",
    },
    {
        number: "#2",
        label: "Lack of necessary data is the no. 2 concern using AI tools for marketers.",
        cite: "2",
        citeHref: "https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf",
    },
]


export function DataProvidersWhyNow() {
    return (
        <section className="bg-blue-50">
            <FadeIn>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">

                    <p className="text-caption text-blue-700">Why is this important now?</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
                        {stats.map((s) => (
                            <div key={s.number} className="space-y-4 border-t-2 border-blue-200 pt-6">
                                <div className="space-y-1">
                                    <p className="text-7xl sm:text-8xl font-bold leading-none text-blue-900">
                                        {s.number}
                                    </p>
                                    <p className="text-sm font-medium text-blue-800">
                                        {s.label}<Cite href={s.citeHref} num={s.cite} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-2xl sm:text-3xl text-blue-900">
                        SMEs don't have the data to fuel these agents.{" "}
                        <span className="font-bold text-blue-950">You do.</span>
                    </p>

                </div>
            </FadeIn>
        </section>
    )
}