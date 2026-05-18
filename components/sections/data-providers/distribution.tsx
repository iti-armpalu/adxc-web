// import { FadeIn } from "@/components/ui/fade-in"
// import Image from "next/image"

// export function DataProvidersDistribution() {
//     return (
//         <FadeIn>
//             <section className="border-t border-border/50 bg-muted/30">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

//                         <div className="space-y-6">
//                             <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
//                                 Built in distribution
//                                 <span className="block text-brand-bright">from day one</span>
//                             </h2>
//                             <p className="text-lg text-muted-foreground leading-relaxed">
//                                 ADXC is integrated with Miro, putting your data within reach of
//                                 100M marketers using AI agents in their daily workflows.
//                             </p>
//                             <p className="text-base text-muted-foreground leading-relaxed">
//                                 More platform integrations launching throughout 2026.
//                             </p>
//                         </div>

//                         <div className="flex items-center justify-center">
//                             <div className="bg-background rounded-xl border border-border p-8 inline-flex items-center gap-4">
//                                 <Image
//                                     src="/miro-logo.png"
//                                     alt="Miro"
//                                     width={120}
//                                     height={40}
//                                     className="h-10 w-auto object-contain"
//                                 />
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </section>
//         </FadeIn>
//     )
// }


import Image from "next/image"

const stats = [
    { value: "100M+", label: "marketers on Miro" },
    // { value: "2026", label: "more integrations launching" },
]

export function DataProvidersDistribution() {
    return (
        <section className="border-t border-border/50 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left — copy */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                                Built-in distribution from
                                <span className="block text-brand-bright">day one.</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg text-foreground font-medium leading-relaxed">
                                ADXC is integrated with Miro, putting your data within reach of 100M marketers
                                who plan, create and make decisions there every day.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Your data is available to them the moment they need it, inside the
                                tool they're already using, without asking them to change how they work.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                More platform integrations are launching throughout 2026, each one
                                a new channel for your data, with zero additional effort from you.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="flex gap-10 pt-2">
                            {stats.map((s) => (
                                <div key={s.label} className="space-y-1">
                                    <p className="text-3xl font-semibold text-foreground">{s.value}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Miro logo card */}
                    <div className="flex items-center justify-center">
                        <div className="bg-background rounded-xl border border-border p-12 flex flex-col items-center gap-6 w-full max-w-xs">
                            <Image
                                src="/miro-logo.png"
                                alt="Miro"
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                            <p className="text-xs text-center text-muted-foreground leading-relaxed">
                                Integrated with Miro — the collaborative workspace used by 100M+ marketers worldwide.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}