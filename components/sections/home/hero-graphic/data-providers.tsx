"use client"

import { cn } from "@/lib/utils"
import { PROVIDER_DOTS, QUESTION_PROVIDERS } from "./constants"

const WIDTH = 220
const HEIGHT = 380
const ORIGIN_X = -24
const ORIGIN_Y = HEIGHT / 2

interface DataProvidersProps {
    activeQuestion: number
}

export function DataProviders({ activeQuestion }: DataProvidersProps) {
    const idx = ((activeQuestion % QUESTION_PROVIDERS.length) + QUESTION_PROVIDERS.length) % QUESTION_PROVIDERS.length
    const active = new Set(QUESTION_PROVIDERS[idx])

    return (
        <div
            className="relative shrink-0"
            style={{ width: WIDTH, height: HEIGHT }}
            aria-label="Data providers"
        >
            <svg
                className="absolute inset-0 overflow-visible pointer-events-none"
                width={WIDTH}
                height={HEIGHT}
            >
                <defs>
                    <linearGradient
                        id="dp-line-grad"
                        gradientUnits="userSpaceOnUse"
                        x1="0" y1="0" x2="40" y2="0"
                        spreadMethod="repeat"
                    >
                        <stop offset="0%" stopColor="hsl(var(--gradient-flow-from))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--gradient-flow-from))" stopOpacity="1" />
                        <stop offset="100%" stopColor="hsl(var(--gradient-flow-to))" stopOpacity="0" />
                        <animateTransform
                            attributeName="gradientTransform"
                            type="translate"
                            from="0 0" to="40 0"
                            dur="1.4s"
                            repeatCount="indefinite"
                        />
                    </linearGradient>
                </defs>

                {PROVIDER_DOTS.map((p, i) => {
                    const cx = (p.x / 100) * WIDTH
                    const cy = (p.y / 100) * HEIGHT
                    const isActive = active.has(i)
                    const r = p.size / 2
                    const vx = cx - ORIGIN_X
                    const vy = cy - ORIGIN_Y
                    const len = Math.max(1, Math.hypot(vx, vy))
                    const tx = cx - (vx / len) * r
                    const ty = cy - (vy / len) * r
                    const dx = tx - ORIGIN_X
                    const c1x = ORIGIN_X + dx * 0.55
                    const c2x = ORIGIN_X + dx * 0.45
                    const d = `M ${ORIGIN_X} ${ORIGIN_Y} C ${c1x} ${ORIGIN_Y}, ${c2x} ${ty}, ${tx} ${ty}`

                    return (
                        <path
                            key={i}
                            d={d}
                            fill="none"
                            strokeLinecap="round"
                            stroke="url(#dp-line-grad)"
                            strokeWidth={1.75}
                            style={{
                                opacity: isActive ? 1 : 0,
                                transition: "opacity 700ms ease",
                            }}
                        />
                    )
                })}
            </svg>

            {PROVIDER_DOTS.map((p, i) => {
                const isActive = active.has(i)
                return (
                    <div
                        key={i}
                        className={cn(
                            "absolute rounded-full border flex items-center justify-center transition-all duration-700 ease-out",
                            isActive
                                ? "border-transparent text-white shadow-[0_0_20px_rgba(102,2,60,0.5)]"
                                : "border-border text-muted-foreground opacity-50"
                        )}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.08 : 1})`,
                            backgroundColor: isActive ? "#66023C" : "#EDE6EA",
                        }}
                    >
                        {p.label && (
                            <span
                                className="font-bold tracking-tight text-center leading-tight px-1"
                                style={{ fontSize: p.size * 0.2 }}
                            >
                                {p.label}
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}