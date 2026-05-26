import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import { siteConfig } from "@/config/site"
import { iconMap } from "@/lib/icon-map"
import Link from "next/link"

const audiences = (siteConfig.nav.find((g) => g.label === "Why ADXC")?.items ?? [])

export function AudienceCardsSection() {
    return (
        <FadeIn>
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary text-center">
                        Who it's for
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {audiences.map((audience) => {
                            const Icon = audience.icon ? iconMap[audience.icon] : null
                            return (
                                <Card key={audience.href} className="gap-1 transition-all duration-150 hover:border-primary/50">
                                    <Link href={audience.href} className="flex flex-col h-full">
                                        <CardHeader>
                                            <div className="flex flex-col items-center gap-3 text-center">
                                                {Icon && (
                                                    <div
                                                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                                        style={{ backgroundColor: audience.color }}
                                                    >
                                                        <Icon className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
                                                    </div>
                                                )}
                                                <CardTitle className="text-base font-semibold text-foreground">
                                                    {audience.label}
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-sm text-neutral-600 leading-relaxed text-center">
                                                {audience.longDescription}
                                            </CardDescription>
                                        </CardContent>
                                    </Link>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}