import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

export function AgenciesPartners() {
    return (
        <FadeIn>
            <section className="bg-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-orange-950 shrink-0 max-w-xs">
                            Join leading agencies using ADXC
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            <Image
                                src="/dept-logo.svg"
                                alt="DEPT"
                                width={100}
                                height={36}
                                className="h-4 sm:h-6 w-auto object-contain"
                            />
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}