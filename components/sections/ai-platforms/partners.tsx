import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

export function AIPlatformsPartners() {
    return (

        <FadeIn>
            <section className="bg-tyrian-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <div className="space-y-3 max-w-xl">
                            <p className="text-base text-center tracking-tight text-primary">
                                Join leading AI platforms
                                <span className="block">integrated with ADXC</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            <Image
                                src="/miro-logo.svg"
                                alt="Miro"
                                width={100}
                                height={36}
                                className="h-4 sm:h-8 w-auto object-contain"
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