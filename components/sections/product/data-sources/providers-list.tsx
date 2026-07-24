import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/fade-in"
import { urlFor } from "@/lib/cms/image"
import type { DataProviderContent } from "@/lib/cms/types"

interface DataProvidersListProps {
    headline: string
    providers: DataProviderContent[]
}

export function DataProvidersList({ headline, providers }: DataProvidersListProps) {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">

                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">
                            {headline}
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {providers.map((provider) => (
                            <Card key={provider.name}>
                                <CardContent className="p-6 sm:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12">

                                        {/* Left — logo + name + tagline */}
                                        <div className="space-y-4">
                                            <img
                                                src={urlFor(provider.logo).width(400).auto("format").url()}
                                                alt={provider.name}
                                                className="h-7 w-auto object-contain"
                                            />
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-foreground">{provider.name}</p>
                                                <p className="text-sm text-muted-foreground leading-snug">{provider.tagline}</p>
                                            </div>
                                        </div>

                                        {/* Right — description + capabilities */}
                                        <div className="space-y-4">
                                            <p className="text-sm text-foreground leading-relaxed">{provider.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {provider.capabilities.map((cap) => (
                                                    <Badge key={cap} variant="secondary">{cap}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            </section>
        </FadeIn>
    )
}