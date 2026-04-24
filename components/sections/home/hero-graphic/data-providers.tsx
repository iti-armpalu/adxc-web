"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { PROVIDER_DOTS, QUESTION_PROVIDERS, STEP_MS } from "./constants"

const WIDTH = 240
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
    const cycleDur = (STEP_MS * 0.9) / 1000

    // Pre-compute ranked anchor points
    const order = PROVIDER_DOTS
        .map((p, i) => ({ i, y: p.y }))
        .sort((a, b) => a.y - b.y)
        .map((o) => o.i)
    const rankOf: number[] = []
    order.forEach((origIdx, rank) => { rankOf[origIdx] = rank })

    return (
        <div
            className="relative shrink-0"
            style={{ width: WIDTH, height: HEIGHT }}
            aria-label="Data providers"
        >
            <svg
                key={activeQuestion}
                className="absolute inset-0 overflow-visible pointer-events-none"
                width={WIDTH}
                height={HEIGHT}
            >
                {PROVIDER_DOTS.map((p, i) => {
                    const cx = (p.x / 100) * WIDTH
                    const cy = (p.y / 100) * HEIGHT
                    const isActive = active.has(i)
                    const r = p.size / 2
                    // Dots with logos use a neutral fallback colour — the logo provides the identity
                    const color = p.logo ? "343 10% 75%" : (p.color ?? "343 47% 58%")

                    const t = PROVIDER_DOTS.length === 1 ? 0.5 : rankOf[i] / (PROVIDER_DOTS.length - 1)
                    const angle = (-Math.PI / 8) + t * (Math.PI / 4)
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
                            {/* Always-visible dashed baseline — muted tyrian-400 */}
                            <path
                                d={d}
                                fill="none"
                                strokeLinecap="round"
                                stroke="#C46184"
                                strokeOpacity={0.2}
                                strokeWidth={1}
                                strokeDasharray="3 4"
                            />
                            {/* Active solid line — tyrian-400 */}
                            <path
                                d={d}
                                fill="none"
                                strokeLinecap="round"
                                stroke="#C46184"
                                strokeWidth={2}
                                style={{
                                    opacity: isActive ? 0.9 : 0,
                                    transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            />
                            {/* Travelling dots — only when active */}
                            {isActive && (
                                <>
                                    {/* Empty dot: ADXC → provider — light vessel */}
                                    <circle r="3.5" fill="#F9EEF5" stroke="#C46184" strokeWidth="1" strokeOpacity="0.5" opacity="0">
                                        <animate attributeName="opacity"
                                            values="0;0;1;1;0;0"
                                            keyTimes="0;0.249;0.25;0.499;0.5;1"
                                            dur={`${cycleDur}s`} repeatCount="1" fill="freeze" />
                                        <animateMotion path={d} dur={`${cycleDur}s`}
                                            keyPoints="0;0;1;1;1;1" keyTimes="0;0.25;0.5;0.5;0.75;1"
                                            calcMode="linear" repeatCount="1" fill="freeze" />
                                    </circle>
                                    {/* Filled dot: provider → ADXC — solid tyrian-400 */}
                                    <circle r="3.5" fill="#C46184" opacity="0">
                                        <animate attributeName="opacity"
                                            values="0;0;1;1;0;0"
                                            keyTimes="0;0.499;0.5;0.749;0.75;1"
                                            dur={`${cycleDur}s`} repeatCount="1" fill="freeze" />
                                        <animateMotion path={d} dur={`${cycleDur}s`}
                                            keyPoints="1;1;0;0;0;0" keyTimes="0;0.5;0.75;0.75;1;1"
                                            calcMode="linear" repeatCount="1" fill="freeze" />
                                    </circle>
                                </>
                            )}
                        </g>
                    )
                })}
            </svg>

            {PROVIDER_DOTS.map((p, i) => {
                const isActive = active.has(i)
                const color = p.logo ? "343 10% 75%" : (p.color ?? "343 47% 58%")
                const DUR = 900
                const EASE = "cubic-bezier(0.4, 0, 0.2, 1)"

                return (
                    <div
                        key={i}
                        className="absolute rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.05 : 1})`,
                            transition: `transform ${DUR}ms ${EASE}`,
                            willChange: "transform",
                            backgroundColor: p.logo ? "transparent" : `hsl(${color})`,
                            opacity: isActive ? 1 : 0.35,
                            boxShadow: isActive && !p.logo
                                ? `0 0 20px hsl(${color} / 0.5)`
                                : "none",
                        }}
                    >
                        {p.logo ? (
                            <Image
                                src={p.logo}
                                alt={p.label ?? ""}
                                width={p.size}
                                height={p.size}
                                className="rounded-full object-cover w-full h-full"
                            />
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}
