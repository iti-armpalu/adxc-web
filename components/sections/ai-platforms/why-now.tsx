import { FadeIn } from "@/components/ui/fade-in";
import { Separator } from "@/components/ui/separator";

export function AIPlatformsWhyNow() {
    return (
        <section
            style={{
                background: "linear-gradient(135deg, var(--color-cyan-900) 0%, var(--color-cyan-600) 80%)",
            }}
        >
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">


                    <div className="space-y-12 sm:space-y-16 max-w-3xl mx-auto">

                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-widest text-neutral-200">
                                Why this matters now
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-foreground">
                                Output quality is limiting AI adoption.
                                <span className="block">Data can be the unlock.</span>
                            </h2>
                        </div>

                        <div>
                            <Separator className="bg-primary-foreground/20" />

                            <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
                                <div>
                                    <div className="text-4xl font-bold leading-none text-primary-foreground md:text-5xl">#1</div>
                                    <div className="mt-2 text-sm font-medium text-primary-foreground md:text-base">barrier to adoption</div>
                                </div>
                                <p className="text-base text-primary-foreground md:text-lg">
                                    <span className="font-semibold">Output quality is the number one barrier to AI adoption in marketing.</span>{" "}
                                    <a
                                        href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
                                    >
                                        1
                                    </a>
                                    <br />
                                    <span className="text-primary-foreground/70">
                                        Only 5% of businesses have integrated AI into core workflows — and poor output quality is the primary reason why.
                                    </span>
                                </p>
                            </div>

                            <Separator className="bg-primary-foreground/20" />

                            <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
                                <div>
                                    <div className="text-4xl font-bold leading-none text-primary-foreground md:text-5xl">#2</div>
                                    <div className="mt-2 text-sm font-medium text-primary-foreground md:text-base">top concern</div>
                                </div>
                                <p className="text-base text-primary-foreground md:text-lg">
                                    <span className="font-semibold">Lack of necessary data is the second biggest concern when using AI tools for marketers.</span>{" "}
                                    <a
                                        href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
                                    >
                                        1
                                    </a>
                                    <br />
                                    <span className="text-primary-foreground/70">
                                        Businesses need a range of different data across the marketing process, from different providers. When each costs $200k+, the data is out of reach. ADXC solves this.
                                    </span>
                                </p>
                            </div>

                            <Separator className="bg-primary-foreground/20" />

                            {/* Footnotes */}
                            <div className="space-y-1 pt-4 flex flex-col flex-end sm:flex-row sm:justify-end sm:gap-4">
                                <p className="text-xs text-primary-foreground/50">
                                    1{" "}
                                    <a
                                        href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                                    >
                                        MIT Nanda 2025 AI Report
                                    </a>
                                    {" · "}
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

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}