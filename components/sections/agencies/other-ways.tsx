import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const cards = [
    {
        label: "Become a referral partner",
        title: "Managing data spend on behalf of clients?",
        description:
            "Access our partner programme to earn cashback on spend via ADXC.",
        cta: "Get in touch",
        href: "/contact",
    },
    {
        label: "Building an AI platform?",
        title: "See how ADXC integrates with the tools you're building.",
        description:
            "Get trusted consumer insight in the AI tools you're building.",
        cta: "ADXC for AI platforms",
        href: "/for/ai-platforms",
    },
]

export function AgenciesOtherWays() {
    return (
        <section className="bg-yellow-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-10 max-w-5xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] items-start">

                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-yellow-900 leading-none sm:pr-16 mb-6 sm:mb-0">
                            Other ways to work with us
                        </h2>

                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cards.map((card) => (
                                <Card key={card.label} className="flex flex-col">
                                    <CardHeader className="flex-1">
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                                            {card.label}
                                        </p>
                                        <CardTitle className="text-base leading-snug">{card.title}</CardTitle>
                                        <CardDescription className="leading-relaxed">{card.description}</CardDescription>
                                    </CardHeader>
                                    <div className="px-4 pb-4">
                                        <Link href={card.href}
                                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                            {card.cta}
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}