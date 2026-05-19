import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Database, Cpu } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"

const audiences = [
    {
        icon: TrendingUp,
        label: "For brands",
        title: "Real data. Real answers. For real budgets.",
        description: "Access premium consumer insight on demand, pay only for what you use.",
        href: "/for/brands",
    },
    {
        icon: Users,
        label: "For agencies",
        title: "Premium consumer data for every client, every brief.",
        description: "Unified data access across all your clients through your existing AI tools.",
        href: "/for/agencies",
    },
    {
        icon: Database,
        label: "For data providers",
        title: "Unlock a market your enterprise model can't reach.",
        description: "Incremental revenue, your existing model stays untouched.",
        href: "/for/data-providers",
    },
    {
        icon: Cpu,
        label: "For AI platforms",
        title: "Consumer insight, built for AI agents.",
        description: "One connection to multiple premium consumer data sources.",
        href: "/for/ai-platforms",
    },
]

export function PlatformAudiences() {
    return (
        <FadeIn>
            <section className="border-t border-border/50 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-10">

                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                See how ADXC works
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary max-w-xl leading-none">
                                Built for every part
                                <span className="block"> of the data ecosystem.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {audiences.map((audience) => {
                                const Icon = audience.icon
                                return (
                                    <Card key={audience.label} className="flex flex-col group hover:border-primary/50 transition-colors">
                                        <CardHeader className="flex-1">
                                            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                                                <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                                            </div>
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                                                {audience.label}
                                            </p>
                                            <CardTitle className="text-sm leading-snug sm:min-h-[38.5px]">{audience.title}</CardTitle>
                                            <CardDescription className="text-xs leading-relaxed mt-1">
                                                {audience.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <div className="px-4 pb-4">
                                            <Link href={audience.href}
                                                className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                                Learn more
                                                <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}