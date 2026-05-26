import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

const partners = [
    { name: "Miro", logo: "/miro-logo.svg" },
    { name: "DEPT", logo: "/dept-logo.svg" },
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
]

export function DataProvidersStatement() {
    return (
        <FadeIn>
            <section className="bg-tyrian-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <div className="space-y-3 max-w-xl">
                            <p className="text-base text-center tracking-tight text-primary">
                                More data providers coming soon throughout 2026
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}