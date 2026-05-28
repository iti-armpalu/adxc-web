import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

export function AIPlatformsPartners() {
    return (
        <FadeIn>
            <section className="bg-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-cyan-950 shrink-0 max-w-xs">
                            Join leading AI platforms integrated with ADXC
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            <Image
                                src="/miro-logo.svg"
                                alt="Miro"
                                width={100}
                                height={36}
                                className="h-4 sm:h-8 w-auto object-contain"
                            />
                            <p className="text-sm text-cyan-950">More coming soon</p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}