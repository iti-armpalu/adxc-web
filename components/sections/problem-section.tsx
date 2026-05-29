import { FadeIn } from "@/components/ui/fade-in"

type ProblemSectionProps = {
    eyebrow?: string
    stat: string
    statLabel: string
    body: string
    closer: string
    background: string
    statColor: string
    labelColor: string
    bodyColor: string
    closerColor: string
    dividerColor: string
    eyebrowColor?: string
}

export function ProblemSection({
    eyebrow,
    stat,
    statLabel,
    body,
    closer,
    background,
    statColor,
    labelColor,
    bodyColor,
    closerColor,
    dividerColor,
    eyebrowColor,
}: ProblemSectionProps) {
    return (
        <section className={background}>
            <FadeIn>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center md:divide-x ${dividerColor}`}>

                        {/* Left — stat */}
                        <div className="flex flex-col space-y-6">
                            {eyebrow && (
                                <p className={`text-caption ${eyebrowColor}`}>{eyebrow}</p>
                            )}
                            <div className="space-y-2 md:pr-12">
                                {/* text size intentionally exceeds DS scale for stat impact */}
                                <p className={`text-5xl sm:text-6xl font-semibold tracking-tight leading-none ${statColor}`}>
                                    {stat}
                                </p>
                                <p className={`text-base ${labelColor}`}>
                                    {statLabel}
                                </p>
                            </div>
                        </div>

                        {/* Mobile divider */}
                        <hr className={`md:hidden border-0 border-t ${dividerColor.replace('divide-', 'border-')}`} />

                        {/* Right — copy */}
                        <div className="space-y-6 md:pl-12">
                            <p className={`text-lg sm:text-xl ${bodyColor}`}>{body}</p>
                            <p className={`text-lg sm:text-xl font-semibold ${closerColor}`}>{closer}</p>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}