import { FadeIn } from "@/components/ui/fade-in";

export function ProblemSection() {
    return (
        <section
            style={{
                background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 80%)",
            }}
        >
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-primary-foreground">

                        {/* Left — stat */}
                        <div className="space-y-6 text-center md:text-left">
                            <div className="inline-flex items-center px-3 py-1 rounded-md bg-tyrian-100 text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                                The problem
                            </div>
                            <div className="space-y-2">
                                <p className="text-7xl sm:text-8xl font-semibold tracking-tight text-primary-foreground">
                                    $200k+
                                </p>
                                <p className="text-base text-primary-foreground/70 leading-relaxed max-w-sm">
                                    Price for enterprise subscriptions to premium marketing data providers
                                </p>
                            </div>
                        </div>

                        {/* Right — copy */}
                        <div className="space-y-8">
                            <p className="text-2xl sm:text-3xl font-medium leading-snug text-primary-foreground/70">
                                99% of businesses can't afford the insight they need to make better
                                marketing decisions. This limits your growth.
                            </p>
                            <p className="text-3xl sm:text-4xl font-semibold leading-tight">
                                ADXC was built for the{" "}
                                <span className="text-brand-bright">99%</span>
                                .
                            </p>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}


// "use client"

// import { Separator } from "@/components/ui/separator"
// import { useEffect, useRef, useState } from "react"

// export function ProblemSection() {
//     const ref = useRef<HTMLElement>(null)
//     const [isDark, setIsDark] = useState(false)

//     useEffect(() => {
//         const el = ref.current
//         if (!el) return

//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 setIsDark(entry.isIntersecting)
//             },
//             { threshold: 0.90 }
//         )

//         observer.observe(el)
//         return () => observer.disconnect()
//     }, [])

//     return (
//         <section ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">

//             {/* Always rendered, opacity toggles */}
//             <div
//                 className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 ease-in-out"
//                 style={{
//                     background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 100%)",
//                     opacity: isDark ? 1 : 0,
//                 }}
//             />

//             {/* Content — always same className, color via style */}
//             <div
//                 className="space-y-12 sm:space-y-16 max-w-3xl mx-auto transition-colors duration-700"
//                 style={{ color: isDark ? "var(--color-primary-foreground)" : "var(--color-foreground)" }}
//             >

//                 <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
//                     The problem
//                 </h2>

//                 <div>
//                     <Separator className={isDark ? "bg-primary-foreground/20" : ""} />
//                     <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
//                         <div className="text-4xl font-bold leading-none md:text-5xl">$200k+</div>
//                         <p className="text-base md:text-lg leading-relaxed">
//                             <span className={isDark ? "text-primary-foreground/70" : ""}>Price for enterprise subscriptions to premium marketing data providers.</span>
//                         </p>
//                     </div>
//                     <Separator className={isDark ? "bg-primary-foreground/20" : ""} />

//                     <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
//                         <div>
//                             <div className="text-4xl font-bold leading-none md:text-5xl">99%</div>
//                             <div className="mt-2 text-sm font-medium md:text-base">of businesses</div>
//                         </div>
//                         <p className="text-base md:text-lg">
//                             <span className={isDark ? "text-primary-foreground/70" : ""}>Can't afford the insight they need to make better marketing decisions. This wastes resources and limits your growth.</span>
//                         </p>
//                     </div>
//                     <Separator className={isDark ? "bg-primary-foreground/20" : ""} />
//                 </div>

//                 <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
//                     ADXC was built for the{" "}
//                     <span className="text-brand-bright">99%.</span>
//                 </p>

//             </div>
//         </section>
//     )
// }



// "use client"

// import { FadeIn } from "@/components/ui/fade-in"
// import { Separator } from "@/components/ui/separator"

// export function ProblemSection() {

//     return (
//         <section
//             style={{
//                 background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 80%)",
//             }}
//         >
//             <FadeIn>
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
//                     <div
//                         className="space-y-12 sm:space-y-16 max-w-3xl mx-auto text-primary-foreground"
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
//                             The problem
//                         </h2>
//                         <div>
//                             <Separator className="bg-primary-foreground/20" />
//                             <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
//                                 <div className="text-4xl font-bold leading-none md:text-5xl">$200k+</div>
//                                 <p className="text-base md:text-lg leading-relaxed">
//                                     <span className="text-primary-foreground/70">Price for enterprise subscriptions to premium marketing data providers.</span>
//                                 </p>
//                             </div>
//                             <Separator className="bg-primary-foreground/20" />

//                             <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-[220px_1fr] md:items-center">
//                                 <div>
//                                     <div className="text-4xl font-bold leading-none md:text-5xl">99%</div>
//                                     <div className="mt-2 text-sm font-medium md:text-base">of businesses</div>
//                                 </div>
//                                 <p className="text-base md:text-lg">
//                                     <span className="text-primary-foreground/70">Can't afford the insight they need to make better marketing decisions. This wastes resources and limits your growth.</span>
//                                 </p>
//                             </div>
//                             <Separator className="bg-primary-foreground/20" />
//                         </div>

//                         <p className="text-3xl sm:text-4xl font-semibold tracking-tight">
//                             ADXC was built for the{" "}
//                             <span className="text-brand-bright">99%.</span>
//                         </p>

//                     </div>
//                 </div>
//             </FadeIn>
//         </section>

//     )
// }