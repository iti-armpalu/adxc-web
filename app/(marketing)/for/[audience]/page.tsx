import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { audienceConfig, validAudiences } from "@/config/audiences"
import type { Audience } from "@/types/content"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"


type Props = {
    params: Promise<{ audience: string }>
}

export async function generateStaticParams() {
    return validAudiences.map((audience) => ({ audience }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { audience } = await params
    const config = audienceConfig[audience as Audience]
    if (!config) return {}

    return {
        title: config.label,
        description: config.description,
    }
}

export default async function AudiencePage({ params }: Props) {
    const { audience } = await params
    const config = audienceConfig[audience as Audience]

    if (!config) notFound()

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Hero */}
            <section className="py-24 sm:py-32 max-w-3xl">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    {config.label}
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    {config.headline}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {config.subheadline}
                </p>
                <Button asChild size="lg">
                    <Link href={config.cta.href} className="group">
                        {config.cta.label}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </section>

            {/* Description */}
            <section className="py-16 border-t border-border/50">
                <div className="max-w-2xl">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {config.description}
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 border-t border-border/50">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12">
                    Why ADXC
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {config.benefits.map((benefit) => (
                        <div key={benefit.title} className="space-y-3">
                            <h3 className="text-base font-medium text-foreground">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                            Ready to get started?
                        </h2>
                        <p className="text-muted-foreground">
                            Get in touch and we'll walk you through everything.
                        </p>
                    </div>
                    <Button asChild size="lg" className="shrink-0">
                        <Link href={config.cta.href} className="group">
                            {config.cta.label}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}