import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { LinkCardContent } from "@/lib/cms/types"

interface AgenciesOtherWaysProps {
    headline: string
    cards: LinkCardContent[]
}

export function AgenciesOtherWays({ headline, cards }: AgenciesOtherWaysProps) {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-10 max-w-5xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-8 sm:gap-16">
                        <h2 className="text-primary">
                            {headline}
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
                                            href={card.linkHref}
                                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            {card.linkLabel}
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