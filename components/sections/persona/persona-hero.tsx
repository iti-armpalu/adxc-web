import { FadeIn } from "@/components/ui/fade-in"
import { HeroEmailCapture } from "@/components/sections/hero-email-capture"
import { cn } from "@/lib/utils"
import { HeroBackground } from "@/components/sections/home/hero-background"

export type Persona = "brands" | "agencies" | "ai-platforms" | "data-providers"

type PersonaTheme = {
    // DS colour scale: 700 → 950 gradient, 500 glow
    color: "purple" | "orange" | "cyan" | "blue"
    illustration: string
    // Width/offset of the desktop illustration (literal classes so Tailwind generates them)
    illustrationClassName: string
    illustrationMask: string
    // TODO(design): the two fields below differ between personas today and are kept
    // so this refactor changes nothing visually. Align them, then drop the fields.
    minHeightClassName: string
    headlineClassName?: string
}

const THEMES: Record<Persona, PersonaTheme> = {
    brands: {
        color: "purple",
        illustration: "/illustration-brands.svg",
        illustrationClassName: "right-0 w-[60%]",
        illustrationMask: "linear-gradient(to right, transparent 0%, black 25%)",
        minHeightClassName: "min-h-[calc(90dvh-var(--header-h))]",
    },
    agencies: {
        color: "orange",
        illustration: "/illustration-agencies.svg",
        illustrationClassName: "right-0 w-[90%]",
        illustrationMask: "linear-gradient(to right, transparent 25%, black 55%)",
        minHeightClassName: "min-h-[calc(90dvh-var(--header-h))]",
        headlineClassName: "text-3xl sm:text-4xl md:text-5xl",
    },
    "ai-platforms": {
        color: "cyan",
        illustration: "/illustration-ai-platforms.svg",
        illustrationClassName: "right-0 w-[80%]",
        illustrationMask: "linear-gradient(to right, transparent 25%, black 55%)",
        minHeightClassName: "min-h-[calc(100dvh-var(--header-h))]",
        headlineClassName: "text-3xl sm:text-4xl md:text-5xl",
    },
    "data-providers": {
        color: "blue",
        illustration: "/illustration-data-providers.svg",
        illustrationClassName: "right-30 w-[70%]",
        illustrationMask: "linear-gradient(to right, transparent 25%, black 55%)",
        minHeightClassName: "min-h-[calc(90dvh-var(--header-h))]",
        headlineClassName: "text-3xl sm:text-4xl md:text-5xl",
    },
}

interface PersonaHeroProps {
    persona: Persona
    label: string
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string
    // Default: the email goes to /early-access. With a handoff, it's passed to the
    // page's own form instead and the page scrolls to it. Contains a function, so
    // only pages whose parent is a client component (AI Platforms, Data Providers) can pass it.
    emailHandoff?: {
        buttonLabel: string
        scrollToId: string
        onSubmit: (email: string) => void
    }
}

export function PersonaHero({
    persona,
    label,
    headlineLine1,
    headlineLine2,
    headlineLine3,
    subtext,
    emailHandoff,
}: PersonaHeroProps) {
    const theme = THEMES[persona]
    const headlineLines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean)

    return (
        <FadeIn>
            <section className="relative w-full mt-header">
                <HeroBackground
                    gradientFrom={`var(--color-${theme.color}-700)`}
                    gradientTo={`var(--color-${theme.color}-950)`}
                    glowColor={`var(--color-${theme.color}-500)`}
                />

                <div className={cn("relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center py-16", theme.minHeightClassName)}>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start h-full flex-1">
                        <div className="max-w-xl space-y-10">
                            <div className="space-y-6">
                                <p className="text-caption text-muted-foreground">{label}</p>
                                <h1 className={theme.headlineClassName}>
                                    {headlineLines.map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < headlineLines.length - 1 && <br />}
                                        </span>
                                    ))}
                                </h1>
                                <p className="text-lg text-foreground leading-relaxed max-w-md">{subtext}</p>
                            </div>

                            <HeroEmailCapture
                                buttonLabel={emailHandoff?.buttonLabel}
                                buttonClassName="shrink-0"
                                handoff={emailHandoff && { scrollToId: emailHandoff.scrollToId, onSubmit: emailHandoff.onSubmit }}
                            />
                        </div>
                    </div>
                </div>

                {/* Illustration — desktop only */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={theme.illustration}
                    alt=""
                    aria-hidden="true"
                    className={cn(
                        "hidden xl:block absolute inset-y-0 h-full object-cover pointer-events-none select-none",
                        theme.illustrationClassName,
                    )}
                    style={{ maskImage: theme.illustrationMask, WebkitMaskImage: theme.illustrationMask }}
                />
            </section>
        </FadeIn>
    )
}
