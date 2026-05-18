// import { FadeIn } from "@/components/ui/fade-in"
// import Image from "next/image"

// const partners = [
//     { name: "YouGov", logo: "/yougov-logo.jpg" },
//     { name: "Quid", logo: "/quid-logo.svg" },
//     { name: "Miro", logo: "/miro-logo.png" },
//     { name: "DEPT", logo: "/dept-logo.jpg" },
// ]

// export function DataProvidersPartners() {
//     return (
//         <FadeIn>
//             <section className="border-t border-border/50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

//                     <div className="space-y-10">
//                         <p className="text-xs uppercase tracking-widest text-muted-foreground">
//                             Join a network of leading data and technology partners
//                         </p>

//                         <div className="flex flex-wrap items-center gap-10">
//                             {partners.map((p) => (
//                                 <Image
//                                     key={p.name}
//                                     src={p.logo}
//                                     alt={p.name}
//                                     width={100}
//                                     height={36}
//                                     className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                 </div>
//             </section>
//         </FadeIn>
//     )
// }

import Image from "next/image"

const partners = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Quid", logo: "/quid-logo.svg" },
    { name: "Miro", logo: "/miro-logo.png" },
    { name: "DEPT", logo: "/dept-logo.svg" },
]

export function DataProvidersPartners() {
    return (
        <section className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="flex flex-col items-center text-center gap-12">

                    <div className="space-y-3 max-w-xl">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                            Join a network of leading data
                            <span className="block text-brand-bright">and technology partners</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-20">
                        {partners.map((p) => (
                            <Image
                                key={p.name}
                                src={p.logo}
                                alt={p.name}
                                width={100}
                                height={36}
                                className="h-10 w-auto object-contain"
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}