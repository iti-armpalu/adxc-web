import { FadeIn } from "@/components/ui/fade-in"
import type { StatCardContent } from "@/lib/cms/types"

function Cite({ href, num }: { href: string; num: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super ml-0.5">
            {num}
        </a>
    )
}

interface AIPlatformsWhyNowProps {
    label: string
    cards: StatCardContent[]
}

export function AIPlatformsWhyNow({ label, cards }: AIPlatformsWhyNowProps) {
    // Citations are numbered in reading order across the whole section.
    let cite = 0
    const numbered = cards.map((c) => ({
        ...c,
        labelCite: c.labelSourceUrl ? ++cite : undefined,
        subtextCite: c.subtextSourceUrl ? ++cite : undefined,
    }))

    return (
        <section className="bg-cyan-50 relative overflow-hidden">
            <FadeIn>
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">

                    <p className="text-caption text-cyan-700">{label}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
                        {numbered.map((s) => (
                            <div key={s.value + s.label} className="space-y-4 border-t-2 border-cyan-200 pt-6">
                                <p className="text-7xl sm:text-8xl font-bold leading-none text-cyan-900">
                                    {s.value}
                                </p>
                                <p className="text-sm text-cyan-800 leading-relaxed">
                                    {s.label}
                                    {s.labelSourceUrl && <Cite href={s.labelSourceUrl} num={String(s.labelCite)} />}
                                </p>
                                <p className="text-base font-semibold text-cyan-950 leading-relaxed">
                                    {s.subtext}
                                    {s.subtextSourceUrl && <Cite href={s.subtextSourceUrl} num={String(s.subtextCite)} />}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </FadeIn>
        </section>
    )
}