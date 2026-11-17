import { FadeIn } from "@/components/ui/fade-in"
import type { StatItemContent } from "@/lib/cms/types"

function Cite({ href, num }: { href: string; num: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super ml-0.5">
            {num}
        </a>
    )
}

interface DataProvidersWhyNowProps {
    label: string
    stats: StatItemContent[]
    headline: string
    note?: string
}

export function DataProvidersWhyNow({ label, stats, headline, note }: DataProvidersWhyNowProps) {
    return (
        <section className="bg-blue-50 relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: "linear-gradient(135deg, transparent 20%, black 50%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 20%, black 50%)",
                }}
            >
                <div
                    className="absolute inset-0 bg-grid opacity-20"
                    style={{ "--grid-color": "var(--color-blue-400)" } as React.CSSProperties}
                />
            </div>
            <FadeIn>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">

                    <p className="text-caption text-blue-700">{label}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
                        {stats.map((s, index) => (
                            <div key={s.value + s.label} className="space-y-4 border-t-2 border-blue-200 pt-6">
                                <div className="space-y-1">
                                    <p className="text-7xl sm:text-8xl font-bold leading-none text-blue-900">
                                        {s.value}
                                    </p>
                                    <p className="text-sm font-medium text-blue-800">
                                        {s.label}
                                        {s.sourceUrl && <Cite href={s.sourceUrl} num={String(index + 1)} />}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-2xl sm:text-3xl text-blue-900">
                        {headline}
                        {note && (
                            <>
                                {" "}
                                <span className="font-bold text-blue-950">{note}</span>
                            </>
                        )}
                    </p>

                </div>
            </FadeIn>
        </section>
    )
}