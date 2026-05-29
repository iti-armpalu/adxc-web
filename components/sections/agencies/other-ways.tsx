import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const cards = [
    {
        title: "Become a referral partner",
        description: "Managing data spend on behalf of clients? Access our partner programme to earn cashback on spend via ADXC.",
        cta: "Get in touch",
        href: "/contact",
    },
    {
        title: "Building an AI platform?",
        description: "Get trusted consumer insight in the AI tools you're building.",
        cta: "ADXC for AI platforms",
        href: "/for/ai-platforms",
    },
]

export function AgenciesOtherWays() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-10 max-w-5xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-8 sm:gap-16">
                        <h2 className="text-primary">
                            Other ways to work with us
                        </h2>

                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cards.map((card) => (
                                <Card key={card.title} className="flex flex-col">
                                    <CardHeader className="flex-1">
                                        <CardTitle className="text-base leading-snug">{card.title}</CardTitle>
                                        <CardDescription className="leading-relaxed">{card.description}</CardDescription>
                                    </CardHeader>
                                    <div className="px-4 pb-4">
                                        <Link
                                            href={card.href}
                                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
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