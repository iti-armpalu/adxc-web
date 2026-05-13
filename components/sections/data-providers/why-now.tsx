// import { FadeIn } from "@/components/ui/fade-in";

// export function DataProvidersWhyNow() {
//     return (
//         <FadeIn>
//             <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
//                 <div className="space-y-12">

//                     <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
//                         Why is this important now?
//                     </h2>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">

//                         <div className="space-y-3">
//                             <p className="text-6xl font-semibold tracking-tight text-foreground">
//                                 80%
//                             </p>
//                             <p className="text-base text-muted-foreground leading-relaxed">
//                                 Businesses are now using AI.{" "}
//                                 <a
//                                     href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
//                                 >
//                                     1
//                                 </a>
//                             </p>
//                         </div>

//                         <div className="space-y-3">
//                             <p className="text-6xl font-semibold tracking-tight text-foreground">
//                                 #2
//                             </p>
//                             <p className="text-base text-muted-foreground leading-relaxed">
//                                 Lack of necessary data is the no. 2 concern when using AI tools for
//                                 marketers.{" "}
//                                 <a
//                                     href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
//                                 >
//                                     2
//                                 </a>
//                             </p>
//                         </div>

//                     </div>

//                     <p className="text-xl sm:text-2xl font-medium text-foreground leading-snug max-w-2xl">
//                         SMEs don't have the data to fuel these agents.{" "}
//                         <span className="text-brand-bright">You do.</span>
//                     </p>

//                     {/* Footnotes */}
//                     <div className="space-y-1 pt-4">
//                         <p className="text-xs text-muted-foreground/60">
//                             1{" "}
//                             <a
//                                 href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
//                             >
//                                 MIT Nanda 2025 AI Report
//                             </a>
//                         </p>
//                         <p className="text-xs text-muted-foreground/60">
//                             2{" "}
//                             <a
//                                 href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
//                             >
//                                 Salesforce State of Marketing Report 2025
//                             </a>
//                         </p>
//                     </div>

//                 </div>
//             </section>
//         </FadeIn>
//     )
// }



export function DataProvidersWhyNow() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <div className="space-y-16 max-w-5xl mx-auto">

                <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                        The moment AI became mainstream,
                        <span className="block text-brand-bright">your data became essential.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">

                    <div className="bg-background p-8 space-y-3">
                        <div className="flex items-baseline gap-3">
                            <span className="text-5xl font-semibold text-foreground">80%</span>
                            <span className="text-sm text-muted-foreground">of businesses</span>
                        </div>
                        <p className="text-base text-foreground leading-relaxed">
                            are now using AI in their day-to-day work.{" "}
                            <a
                                href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
                            >
                                1
                            </a>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            AI agents are running campaigns, writing briefs, analysing markets.
                            They need data to do it well.
                        </p>
                    </div>

                    <div className="bg-background p-8 space-y-3">
                        <div className="flex items-baseline gap-3">
                            <span className="text-5xl font-semibold text-foreground">#2</span>
                            <span className="text-sm text-muted-foreground">top concern</span>
                        </div>
                        <p className="text-base text-foreground leading-relaxed">
                            Lack of quality data is the second biggest barrier marketers face
                            with AI.{" "}
                            <a
                                href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors align-super"
                            >
                                2
                            </a>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            They know what they need. They just can't access or afford it.
                            That's the gap you fill.
                        </p>
                    </div>

                </div>


                <p className="text-2xl sm:text-4xl font-semibold text-foreground leading-snug">
                    SMEs don't have the data to fuel their AI agents.{" "}
                    <span className="text-brand-bright">You do.</span>
                </p>

                {/* Footnotes */}
                <div className="space-y-1">
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
        </section>
    )
}