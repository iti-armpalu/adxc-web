import { FadeIn } from "@/components/ui/fade-in"

interface PlatformOverviewProps {
    headline: string
    subtext: string
    note?: string
}

export function PlatformOverview({ headline, subtext, note }: PlatformOverviewProps) {
    return (
        <section className="bg-brand-50">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-8">

                        <h2 className="text-primary">
                            {headline}
                        </h2>

                        <p className="text-lg text-foreground leading-relaxed">
                            {subtext}
                        </p>

                        {note && (
                            <p className="text-sm font-medium text-foreground">
                                {note}
                            </p>
                        )}

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}