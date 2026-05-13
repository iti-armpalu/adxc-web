// import { Button } from "@/components/ui/button"
// import { FadeIn } from "@/components/ui/fade-in"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"

// export function DataProvidersCTA() {
//     return (
//         <FadeIn>
//             <section className="border-t border-border/50 bg-muted/30">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
//                     <div className="max-w-2xl space-y-8">

//                         <div className="space-y-4">
//                             <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
//                                 Become a data partner
//                             </h2>
//                             <p className="text-lg text-muted-foreground leading-relaxed">
//                                 Talk to our team about how ADXC can put your data inside the workflows
//                                 shaping marketing decisions for SMEs.
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-3 max-w-md">
//                             <Input
//                                 type="email"
//                                 placeholder="Enter your email..."
//                                 className="h-11 bg-background"
//                             />
//                             <Button asChild size="lg" className="shrink-0">
//                                 <Link href="#">
//                                     Get in touch
//                                 </Link>
//                             </Button>
//                         </div>

//                     </div>
//                 </div>
//             </section>
//         </FadeIn>
//     )
// }


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataProvidersCTA() {
    return (
        <section className="border-t border-border/50 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="flex flex-col items-center text-center gap-10 max-w-2xl mx-auto">

                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            Become a data partner
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                            Put your data inside the workflows
                            <span className="block text-brand-bright">shaping marketing decisions.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Talk to our team about how ADXC can open a new market for your data,
                            without disrupting your existing model.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                        <Input
                            type="email"
                            placeholder="Enter your email..."
                            className="h-11 bg-background"
                        />
                        <Button size="lg" className="shrink-0" asChild>
                            <a href="#">Get in touch</a>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}