import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

const stats = [
    { value: "100M+", label: "marketers on Miro" },
]

export function DataProvidersDistribution() {
    return (
        <section
            style={{
                background: "linear-gradient(200deg, var(--color-blue-900) 0%, var(--color-blue-600) 50%, var(--color-blue-400) 100%)",
            }}
        >
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        {/* Left — copy */}
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-foreground leading-none">
                                    Built-in distribution from day one.
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <p className="text-lg text-neutral-100 font-medium leading-relaxed">
                                    ADXC is integrated with Miro, putting your data within reach of 100M marketers
                                    who plan, create and make decisions there every day.
                                </p>
                                <p className="text-sm text-neutral-200 leading-relaxed">
                                    Your data is available to them the moment they need it, inside the
                                    tool they're already using, without asking them to change how they work.
                                </p>
                                <p className="text-sm text-neutral-200 leading-relaxed">
                                    More platform integrations are launching throughout 2026.
                                </p>
                            </div>

                            {/* Stats row */}
                            <div className="flex items-center gap-10 pt-2">
                                <div className="space-y-2">
                                    <p className="text-xs text-primary-foreground uppercase tracking-widest">Integrated with</p>
                                    <Image
                                        src="/miro-logo.svg"
                                        alt="Miro"
                                        width={60}
                                        height={20}
                                        className="h-8 w-auto object-contain"
                                    />
                                </div>
                                {stats.map((s) => (
                                    <div key={s.label} className="border-l border-border pl-10 space-y-2">
                                        <p className="text-3xl font-semibold text-primary-foreground">{s.value}</p>
                                        <p className="text-xs text-primary-foreground uppercase tracking-widest">{s.label}</p>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Right — canvas image */}
                        <div>
                            <Image
                                src="/miro-canvas-marketing.webp"
                                alt="ADXC inside Miro canvas"
                                width={800}
                                height={560}
                                className="w-full rounded-xl object-cover shadow-lg"
                            />
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}