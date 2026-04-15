import type { AudienceConfig } from "@/config/audiences"

type Props = {
    config: AudienceConfig
}

export function AudienceProblem({ config }: Props) {
    if (!config.problemStatements?.length) return null

    const statements = config.problemStatements.slice(0, -1)
    const punchline = config.problemStatements[config.problemStatements.length - 1]

    return (
        <section className="border-y border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

                    {/* Left — label */}
                    <div className="lg:pt-3">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            The reality
                        </p>
                    </div>

                    {/* Right — statements */}
                    <div className="space-y-0 divide-y divide-border/40">
                        {statements.map((statement, i) => (
                            <div
                                key={i}
                                className="py-8 first:pt-0 last:pb-0"
                            >
                                <p className="text-xl sm:text-2xl text-foreground leading-snug">
                                    {statement}
                                </p>
                            </div>
                        ))}

                        {/* Punchline — visually separated */}
                        <div className="pt-10">
                            <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground italic">
                                {punchline}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}