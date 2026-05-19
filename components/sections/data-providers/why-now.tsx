import { FadeIn } from "@/components/ui/fade-in";
import { Separator } from "@/components/ui/separator";

export function DataProvidersWhyNow() {
    return (
        <FadeIn>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-12 sm:space-y-16 max-w-3xl mx-auto">

                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                            Why is this important now?
                        </h2>
                    </div>

                    <div>
                        <Separator />
                        {/* Stat 1 */}

                        <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
                            <div>
                                <div className="text-4xl font-bold leading-none text-foreground md:text-5xl">80%</div>
                                <div className="mt-2 text-sm font-medium text-foreground md:text-base">of businesses</div>
                            </div>
                            <p className="text-base text-foreground md:text-lg leading-relaxed">
                                <span className="font-semibold">are now using AI in their day-to-day work.</span>{" "}
                                <a
                                    href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
                                >
                                    1
                                </a>
                                <br />
                                <span className="text-muted-foreground leading-relaxed">
                                    AI agents are running campaigns, writing briefs, analysing markets. They need data to do it well.
                                </span>
                            </p>
                        </div>

                        <Separator />
                        {/* Stat 2 */}

                        <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
                            <div>
                                <div className="text-4xl font-bold leading-none text-foreground md:text-5xl">#2</div>
                                <div className="mt-2 text-sm font-medium text-foreground md:text-base">top concern</div>
                            </div>
                            <p className="text-base text-foreground md:text-lg">
                                <span className="font-semibold">Lack of quality data is the second biggest barrier marketers face with AI.</span>{" "}
                                <a
                                    href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
                                >
                                    2
                                </a>
                                <br />
                                <span className="text-muted-foreground">
                                    They know what they need. They just can't access or afford it. That's the gap you fill.
                                </span>
                            </p>
                        </div>


                        <Separator />

                        {/* Footnotes */}
                        <div className="space-y-1 pt-4 flex flex-col flex-end sm:flex-row sm:justify-end sm:gap-4">
                            <p className="text-xs text-muted-foreground/60">
                                1{" "}
                                <a
                                    href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                                >
                                    MIT Nanda 2025 AI Report
                                </a>
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                                2{" "}
                                <a
                                    href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                                >
                                    Salesforce State of Marketing Report 2025
                                </a>
                            </p>
                        </div>

                    </div>


                    <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                        SMEs don't have the data to fuel these agents.{" "}
                        <span className="text-brand-bright">You do.</span>
                    </p>


                </div>
            </section>
        </FadeIn>
    )
}