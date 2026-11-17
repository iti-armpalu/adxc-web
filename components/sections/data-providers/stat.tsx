import { FadeIn } from "@/components/ui/fade-in"

interface DataProvidersStatProps {
    value: string
    label: string
    subtext: string
    note: string
}

export function DataProvidersStat({ value, label, subtext, note }: DataProvidersStatProps) {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">

                        {/* Left — stat. text-7xl/8xl intentionally exceeds DS scale for impact */}
                        <div className="space-y-2">
                            <p className="text-7xl sm:text-8xl font-semibold tracking-tight text-blue-900 leading-none">
                                {value}
                            </p>
                            <p className="text-sm md:text-base font-medium text-blue-950">
                                {label}
                            </p>
                        </div>

                        {/* Right — explainer */}
                        <div className="space-y-3">
                            <p className="text-lg text-blue-950 leading-relaxed ">
                                {subtext}
                            </p>
                            <p className="text-lg text-blue-950 leading-relaxed font-medium">
                                {note}
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}
