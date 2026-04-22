"use client"

import { cn } from "@/lib/utils"
import { PROVIDER_DOTS, QUESTION_PROVIDERS } from "./constants"

const WIDTH = 280
const HEIGHT = 380
// ADXC ball centre and radius (origin of lines)
const BALL_CX = -110
const BALL_CY = HEIGHT / 2
const BALL_R = 96

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

                {(() => {
                    const order = PROVIDER_DOTS
                        .map((p, i) => ({ i, y: p.y }))
                        .sort((a, b) => a.y - b.y)
                        .map((o) => o.i)
                    const rankOf: number[] = []
                    order.forEach((origIdx, rank) => { rankOf[origIdx] = rank })

                    return PROVIDER_DOTS.map((p, i) => {
                        const cx = (p.x / 100) * WIDTH
                        const cy = (p.y / 100) * HEIGHT
                        const isActive = active.has(i)
                        const r = p.size / 2

                        // Ranked anchor on the right arc of the ADXC ball — lines fan top→bottom
                        const t = PROVIDER_DOTS.length === 1 ? 0.5 : rankOf[i] / (PROVIDER_DOTS.length - 1)
                        const angle = (-Math.PI / 8) + t * (Math.PI / 4) // ~-22deg to +22deg
                        const ox = BALL_CX + Math.cos(angle) * BALL_R
                        const oy = BALL_CY + Math.sin(angle) * BALL_R

                        const vx = cx - ox
                        const vy = cy - oy
                        const len = Math.max(1, Math.hypot(vx, vy))
                        const tx = cx - (vx / len) * r
                        const ty = cy - (vy / len) * r

                        const dx = tx - ox
                        const separation = (t - 0.5) * 28
                        const c1x = ox + dx * 0.32
                        const c1y = oy + separation
                        const c2x = ox + dx * 0.7
                        const c2y = ty - separation * 0.35
                        const d = `M ${ox} ${oy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`

                        return (
                            <g key={i}>
                                {/* Faint dashed baseline — hidden while active to avoid double-line */}
                                <path
                                    d={d}
                                    fill="none"
                                    strokeLinecap="round"
                                    stroke="#BFA7B6"
                                    strokeOpacity={0.5}
                                    strokeWidth={1}
                                    strokeDasharray="3 4"
                                    style={{
                                        opacity: isActive ? 0 : 0.35,
                                        transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                />
                                {/* Animated gradient overlay for active providers */}
                                <path
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
                            </g>
                        )
                    })
                })()}
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