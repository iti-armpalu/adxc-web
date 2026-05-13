// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card"
// import { FadeIn } from "@/components/ui/fade-in"
// import { Workflow, Banknote, ShieldCheck } from "lucide-react"

// const benefits = [
//     {
//         icon: Workflow,
//         title: "Be where the strategic work happens",
//         description:
//             "Integrate your data into the workflow tools marketers use to plan, create, and make decisions. Starting with Miro.",
//     },
//     {
//         icon: Banknote,
//         title: "New revenue from a new market",
//         description:
//             "Connect your data to a new buyer with a different need: SMEs paying per query — who don't need, and can't afford, bells-and-whistles subscriptions.",
//     },
//     {
//         icon: ShieldCheck,
//         title: "Your IP and brand stay fully protected",
//         description:
//             "Datasets are never copied, stored, or exposed to end users. ADXC queries your data via API/MCP and returns only synthesised answers. Your brand is attributed to every answer.",
//     },
// ]

// export function DataProvidersHowItWorks() {
//     return (
//         <FadeIn>
//             <section className="border-t border-border/50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

//                     <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-16">
//                         How ADXC works for you
//                     </h2>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         {benefits.map((benefit, i) => {
//                             const Icon = benefit.icon
//                             return (
//                                 <Card key={i} className="bg-muted border-0 shadow-none">
//                                     <CardHeader>
//                                         <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center mb-4">
//                                             <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
//                                         </div>
//                                         <CardTitle>{benefit.title}</CardTitle>
//                                         <CardDescription className="text-base">
//                                             {benefit.description}
//                                         </CardDescription>
//                                     </CardHeader>
//                                 </Card>
//                             )
//                         })}
//                     </div>

//                 </div>
//             </section>
//         </FadeIn>
//     )
// }


import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Workflow, Banknote, ShieldCheck } from "lucide-react"

const benefits = [
    {
        icon: Workflow,
        title: "Be where the strategic work happens",
        lead: "Marketers are planning, creating and deciding inside workflow tools.",
        description:
            "ADXC integrates your data directly into the tools they're already using, starting with Miro. No new apps for them to learn, no friction to adoption.",
    },
    {
        icon: Banknote,
        title: "New revenue from a market you can't currently serve",
        lead: "SMEs need your data but can't afford your subscriptions.",
        description:
            "ADXC gives them access on a pay-per-query basis, a completely new buyer with a different need. Incremental revenue, zero cannibalisation of your existing model.",
    },
    {
        icon: ShieldCheck,
        title: "Your IP stays yours. Always.",
        lead: "Datasets are never copied, stored, or exposed.",
        description:
            "ADXC queries your data via API or MCP and returns only synthesised answers. End users never see your raw data. Your brand is attributed to every answer delivered.",
    },
]

export function DataProvidersHowItWorks() {
    return (
        <section className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                <div className="space-y-16">

                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            How ADXC works for you
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-xl">
                            Simple to join.{" "}
                            <span className="block text-brand-bright">Valuable from day one.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {benefits.map((benefit, i) => {
                            const Icon = benefit.icon
                            return (
                                <Card key={i} className="bg-muted border-0 shadow-none">
                                    <CardHeader>
                                        <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center mb-4 shrink-0">
                                            <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                                        </div>
                                        <CardTitle className="text-base">{benefit.title}</CardTitle>
                                        <p className="text-sm font-medium text-foreground mt-1">
                                            {benefit.lead}
                                        </p>
                                        <CardDescription className="text-sm mt-1">
                                            {benefit.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>

                </div>

            </div>
        </section>
    )
}