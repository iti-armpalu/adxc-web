import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

export function AIPlatformsPartners() {
    return (
        <FadeIn>
            <section className="border-t border-border/50 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="flex flex-col items-center text-center gap-10 max-w-2xl mx-auto">

                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Our network
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
                                Join leading AI platforms
                                <span className="block">integrated with ADXC</span>
                            </h2>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-10">
                            <Image
                                src="/miro-logo.png"
                                alt="Miro"
                                width={100}
                                height={36}
                                className="h-8 w-auto object-contain"
                            />
                            <div className="text-sm text-muted-foreground">
                                More coming soon
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}