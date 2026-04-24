"use client"

import { useEffect, useRef, useCallback } from "react"
import { Check, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { QUESTIONS, STEP_MS } from "./constants"

const VISIBLE = 5
const HIGHLIGHT_INDEX = 2

const ARC_X = 55

const ROW_HEIGHT = 64
const FADE_MASK =
    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"

interface QuestionCarouselProps {
    step: number
    onStep: (next: number) => void
    onPillWidth?: (width: number) => void
}

export function QuestionCarousel({ step, onStep, onPillWidth }: QuestionCarouselProps) {
    const highlightRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const id = setInterval(() => onStep(step + 1), STEP_MS)
        return () => clearInterval(id)
    }, [step, onStep])

    // Measure highlighted pill width after render and on resize
    const measure = useCallback(() => {
        if (highlightRef.current && onPillWidth) {
            onPillWidth(highlightRef.current.offsetWidth)
        }
    }, [onPillWidth])

    useEffect(() => {
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [measure, step]) // re-measure when step changes (new question = new width)

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
                style={{ WebkitMaskImage: FADE_MASK, maskImage: FADE_MASK }}
            >
                {items.map(({ q, pos, key }) => {
                    const distance = pos - HIGHLIGHT_INDEX
                    const absDist = Math.abs(distance)

                    const arcX = -Math.pow(absDist, 1.6) * (ARC_X / 4)

                    const y = pos * ROW_HEIGHT + 20
                    const scale = Math.max(0.78, 1 - absDist * 0.07)
                    const opacity =
                        pos < 0 || pos >= VISIBLE ? 0 : Math.max(0.3, 1 - absDist * 0.22)
                    const isHighlight = pos === HIGHLIGHT_INDEX

                    return (
                        <div
                            key={key}
                            className="absolute inset-x-0 flex justify-end"
                            style={{
                                // transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                transform: `translate3d(${arcX}px, ${y}px, 0) scale(${scale})`,
                                opacity,
                                transition:
                                    "transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
                                willChange: "transform, opacity",
                            }}
                        >
                            <div
                                ref={isHighlight ? highlightRef : undefined}
                                className={cn(
                                    "pl-1.5 pr-3 py-1.5 rounded-full border-2 bg-background whitespace-nowrap text-sm font-medium text-foreground",
                                    "flex items-center gap-3",
                                    "transition-colors duration-1000 ease-out",
                                    isHighlight ? "border-brand-dark shadow-lg" : "border-border"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold shrink-0",
                                        "bg-secondary text-secondary-foreground border border-border"
                                    )}
                                >
                                    {initial(q.name)}
                                </span>
                                <span>{q.text}</span>
                                <span
                                    className={cn(
                                        "ml-2 flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-500 shrink-0",
                                        distance < 0 && "bg-primary/10 border-primary/40 text-primary",
                                        distance === 0 && "bg-secondary border-border text-muted-foreground",
                                        distance > 0 && "bg-background border-border text-muted-foreground"
                                    )}
                                    aria-label={distance < 0 ? "received" : distance === 0 ? "waiting" : "send"}
                                >
                                    {distance < 0 ? (
                                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    ) : distance === 0 ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                        <Send className="h-3.5 w-3.5" />
                                    )}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}