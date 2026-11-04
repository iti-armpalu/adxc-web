"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface HomeProblemSectionProps {
    sentenceOne: string
    sentenceTwo: string
    sentenceThree: string
    punchline: string
    solution: string
}

// Pinned scroll sequence, scrubbed by scroll position: each sentence fades in while
// rising, holds, then fades out moving up — as one block (no word-by-word reveal).
// The first sentence is already visible when the section pins; the last never fades out.
//
// Performance (mobile Safari):
// - Scroll progress is read once per animation frame and written straight to the DOM
//   via refs. No React state per scroll, so nothing re-renders (only the progress dots,
//   5 times per full pass).
// - Hidden sentences get visibility:hidden so the browser skips painting them.
//
// Labels are derived here, not stored in Sanity — only the three problems are numbered.

// Scroll distance per sentence, in svh. Original was 120; lower = quicker to pass.
const SLIDE_VH = 60
const SHIFT_PX = 40   // rise in from below / exit upward
const FADE = 0.15     // share of each sentence's scroll range spent fading in/out

// Type scale mirrors the home hero h1 (30px → 48px at sm): the punchline matches it at
// every size; statements stay one step below (24px → text-statement 40px at sm).
// Nothing here is bigger than the page's h1.
const STATEMENT_CLASS = "font-heading font-medium text-brand-900 leading-[1.15] tracking-[-0.03em] text-2xl sm:text-statement"
const PUNCHLINE_CLASS = "font-heading font-bold text-primary tracking-[-0.04em] leading-none text-3xl sm:text-4xl text-center"

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const invLerp = (a: number, b: number, v: number) => (b === a ? 0 : clamp01((v - a) / (b - a)))

function slideState(index: number, count: number, progress: number) {
    const slice = 1 / count
    const fade = slice * FADE
    const start = index * slice
    const end = start + slice
    const isFirst = index === 0
    const isLast = index === count - 1

    if (!isFirst && progress < start) return { opacity: 0, y: SHIFT_PX }
    if (!isFirst && progress < start + fade) {
        const t = invLerp(start, start + fade, progress)
        return { opacity: t, y: SHIFT_PX * (1 - t) }
    }
    if (isLast || progress < end - fade) return { opacity: 1, y: 0 }
    const t = invLerp(end - fade, end, progress)
    return { opacity: 1 - t, y: -SHIFT_PX * t }
}

function Statement({ label, text }: { label?: string; text: string }) {
    return (
        <div className="flex flex-col md:flex-row items-start gap-3 md:gap-10">
            {/* Mobile: label stacks above the text. md+: label sits left; unlabelled
                statements keep the empty column so the text stays aligned. */}
            <span
                className={`font-mono text-xs tracking-[0.15em] text-brand-400 shrink-0 md:min-w-10 md:pt-1.5 ${label ? "" : "hidden md:block"}`}
            >
                {label}
            </span>
            <p className={STATEMENT_CLASS}>{text}</p>
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
    const slides = [
        { label: "01", text: sentenceOne },
        { label: "02", text: sentenceTwo },
        { label: "03", text: sentenceThree },
        { text: punchline, isPunchline: true },
        { text: solution },
    ]
    const count = slides.length

    const containerRef = useRef<HTMLElement>(null)
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeDot, setActiveDot] = useState(0)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        let frame = 0

        const update = () => {
            frame = 0
            const scrollable = el.offsetHeight - window.innerHeight
            const progress = scrollable > 0 ? clamp01(-el.getBoundingClientRect().top / scrollable) : 0

            for (let i = 0; i < count; i++) {
                const node = slideRefs.current[i]
                if (!node) continue
                const { opacity, y } = slideState(i, count, progress)
                node.style.opacity = String(opacity)
                node.style.transform = `translate3d(0, ${y}px, 0)`
                node.style.visibility = opacity === 0 ? "hidden" : "visible"
            }
            // React skips the render when the value is unchanged
            setActiveDot(Math.min(count - 1, Math.floor(progress * count)))
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (frame) cancelAnimationFrame(frame)
        }
    }, [count])

    return (
        <section
            ref={containerRef}
            className="relative bg-brand-50"
            style={{ height: `calc(100svh + ${count * SLIDE_VH}svh)` }}
        >
            {/* Full text for screen readers and search — the visual slides are aria-hidden */}
            <div className="sr-only">
                {slides.map((s, i) => <p key={i}>{s.text}</p>)}
            </div>

            {/* Sticky viewport — svh avoids jumps when the iOS toolbar shows/hides */}
            <div className="sticky top-0 h-svh w-full overflow-hidden flex items-center justify-center">
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

                {/* Slides stacked in one grid cell: the box is as tall as the tallest slide.
                    Server HTML shows the first sentence; scroll takes over after hydration. */}
                <div className="relative z-10 grid w-full max-w-5xl px-8 md:px-16" aria-hidden>
                    {slides.map((s, i) => (
                        <div
                            key={i}
                            ref={(node) => { slideRefs.current[i] = node }}
                            className={cn("col-start-1 row-start-1 self-center pointer-events-none", i > 0 && "opacity-0 invisible")}
                        >
                            {s.isPunchline ? (
                                <p className={PUNCHLINE_CLASS}>{s.text}</p>
                            ) : (
                                <Statement label={s.label} text={s.text} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Progress dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" aria-hidden>
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                                i === activeDot ? "w-7 bg-brand-600" : "w-1.5 bg-brand-200",
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
