import { FadeIn } from "@/components/ui/fade-in"

interface HomeProblemSectionProps {
    sentenceOne: string
    sentenceTwo: string
    sentenceThree: string
    punchline: string
    solution: string
}

// Normal document flow, no scroll-jacking: each block builds in once (Apple-style
// 30px rise + fade, see FadeIn variant="build") as it enters the viewport (FadeIn = IntersectionObserver + CSS transition, no per-frame JS).
// All text is in the server HTML and visible without JavaScript.
// Labels are derived here, not stored in Sanity — only the three problems are numbered.

// Type scale mirrors the home hero h1 (30px → 48px at sm): the punchline matches it at
// every size; statements stay one step below (24px → text-statement 40px at sm).
// Nothing here is bigger than the page's h1.
const STATEMENT_CLASS = "font-heading font-medium text-brand-900 leading-[1.15] tracking-[-0.03em] text-2xl sm:text-statement"

function Statement({ label, text }: { label?: string; text: string }) {
    return (
        <div className="flex flex-col md:flex-row items-start gap-3 md:gap-10">
            {/* Mobile: label stacks above the text. md+: label sits left; unlabelled
                statements keep the empty column so the text stays aligned. */}
            <span
                className={`font-mono text-xs tracking-[0.15em] text-brand-400 shrink-0 md:min-w-10 md:pt-1.5 ${label ? "" : "hidden md:block"}`}
                aria-hidden={!label}
            >
                {label}
            </span>
            <p className={STATEMENT_CLASS}>
                {text}
            </p>
        </div>
    )
}

export function HomeProblemSection({
    sentenceOne,
    sentenceTwo,
    sentenceThree,
    punchline,
    solution,
}: HomeProblemSectionProps) {
    const problems = [sentenceOne, sentenceTwo, sentenceThree]

    return (
        <section className="relative overflow-hidden bg-brand-50">
            {/* Diagonal grid overlay */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                }}
            >
                <div className="absolute inset-0 bg-grid opacity-20" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 py-24 md:py-36">
                <ol className="space-y-12 md:space-y-16">
                    {problems.map((text, i) => (
                        <li key={i}>
                            <FadeIn variant="build" delay={i * 0.1}>
                                <Statement label={String(i + 1).padStart(2, "0")} text={text} />
                            </FadeIn>
                        </li>
                    ))}
                </ol>

                <FadeIn variant="build" className="my-24 md:my-32 text-center">
                    <p
                        className="font-heading font-bold text-primary tracking-[-0.04em] leading-none text-3xl sm:text-4xl"
                    >
                        {punchline}
                    </p>
                </FadeIn>

                <FadeIn variant="build">
                    <Statement text={solution} />
                </FadeIn>
            </div>
        </section>
    )
}
