"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { QUESTIONS, STEP_MS } from "./constants"

const VISIBLE = 5
const HIGHLIGHT_INDEX = 2
const ROW_HEIGHT = 64
const ARC_X = 70
const FADE_MASK =
    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"

interface QuestionCarouselProps {
    step: number
    onStep: (next: number) => void
}

export function QuestionCarousel({ step, onStep }: QuestionCarouselProps) {
    useEffect(() => {
        const id = setInterval(() => onStep(step + 1), STEP_MS)
        return () => clearInterval(id)
    }, [step, onStep])

    const total = VISIBLE + 2
    const items = Array.from({ length: total }, (_, i) => {
        const qIndex = ((step + i) % QUESTIONS.length + QUESTIONS.length) % QUESTIONS.length
        const cycle = Math.floor((step + i) / QUESTIONS.length)
        return { q: QUESTIONS[qIndex], pos: i - 1, key: `${cycle}-${qIndex}` }
    })

    const initial = (name: string) => name.charAt(0).toUpperCase()

    return (
        <div
            className="relative w-full max-w-xl mx-auto"
            style={{ height: VISIBLE * ROW_HEIGHT + 40 }}
        >
            <div
                className="absolute inset-0"
                style={{
                    WebkitMaskImage: FADE_MASK,
                    maskImage: FADE_MASK,
                }}
            >
                {items.map(({ q, pos, key }) => {
                    const distance = pos - HIGHLIGHT_INDEX
                    const absDist = Math.abs(distance)
                    // const arcX = -Math.pow(absDist, 1.6) * (ARC_X / 4)
                    const y = pos * ROW_HEIGHT + 20
                    const scale = Math.max(0.78, 1 - absDist * 0.07)
                    const opacity =
                        pos < 0 || pos >= VISIBLE ? 0 : Math.max(0.3, 1 - absDist * 0.22)
                    const isHighlight = pos === HIGHLIGHT_INDEX

                    return (
                        <div
                            key={key}
                            className="absolute inset-x-0 flex justify-end pr-2"
                            style={{
                                // transform: `translate3d(${arcX}px, ${y}px, 0) scale(${scale})`,
                                transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                opacity,
                                transition:
                                    "transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
                                willChange: "transform, opacity",
                            }}
                        >
                            <div
                                className={cn(
                                    "pl-1.5 pr-6 py-1.5 rounded-full border-2 bg-background whitespace-nowrap text-sm font-medium text-foreground",
                                    "flex items-center gap-3",
                                    "transition-colors duration-1000 ease-out",
                                    isHighlight
                                        ? "border-foreground/70 shadow-xl"
                                        : "border-border/50"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold shrink-0",
                                        "bg-muted text-foreground border border-border"
                                    )}
                                >
                                    {initial(q.name)}
                                </span>
                                <span className="text-xs">{q.text}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}