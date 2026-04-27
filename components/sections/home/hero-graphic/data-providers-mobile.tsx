"use client"

import Image from "next/image"
import { QUESTION_PROVIDERS, STEP_MS } from "./constants"
import type { ProviderDot } from "./types"

// Mobile layout — wide shallow grid, ADXC above, lines fan downward
// Two rows: top row (closer to ADXC) gets outer fan, bottom row gets inner fan
const PROVIDERS: ProviderDot[] = [
    // Top row — closer to ADXC
    { x: 6, y: 40, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 20, y: 40, size: 20, color: "343 70% 40%" },   // tyrian-600
    { x: 54, y: 40, size: 26, color: "174 55% 35%" },   // cyan-700
    { x: 80, y: 40, size: 22, color: "214 38% 22%" },   // blue-600
    { x: 96, y: 40, size: 36, color: "16 55% 40%" },   // orange-800
    // Bottom row — farther from ADXC
    // { x: 6, y: 40, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 18, y: 75, size: 18, color: "42 100% 42%" },   // gold
    // { x: 30, y: 40, size: 20, color: "343 70% 40%" },   // tyrian-600
    { x: 42, y: 65, size: 50, label: "X", logo: "/x-logo.jpg" },
    // { x: 54, y: 40, size: 26, color: "174 55% 35%" },   // cyan-700
    { x: 66, y: 85, size: 60, label: "US Census Bureau", logo: "/us-census-bureau-logo.png" },
    // { x: 76, y: 40, size: 22, color: "214 38% 22%" },   // blue-600
    { x: 88, y: 75, size: 54, label: "Reddit", logo: "/reddit-logo.png" },
    // { x: 96, y: 40, size: 36, color: "16 55% 40%" },   // orange-800
]

const WIDTH = 360
const HEIGHT = 220
const BALL_CX = WIDTH / 2
const BALL_CY = -110
const BALL_R = 96
const TOP_COUNT: number = 5

interface Props {
    activeQuestion: number
}

export function DataProvidersMobile({ activeQuestion }: Props) {
    const idx = ((activeQuestion % QUESTION_PROVIDERS.length) + QUESTION_PROVIDERS.length) % QUESTION_PROVIDERS.length
    const active = new Set(QUESTION_PROVIDERS[idx])
    const cycleDur = (STEP_MS * 0.9) / 1000
    const BOTTOM_COUNT = PROVIDERS.length - TOP_COUNT

    return (
        <div
            className="relative shrink-0 mx-auto"
            style={{ width: WIDTH, height: HEIGHT }}
            aria-label="Data providers"
        >
            <svg
                key={activeQuestion}
                className="absolute inset-0 overflow-visible pointer-events-none"
                width={WIDTH}
                height={HEIGHT}
            >
                {PROVIDERS.map((p, i) => {
                    const cx = (p.x / 100) * WIDTH
                    const cy = (p.y / 100) * HEIGHT
                    const isActive = active.has(i)
                    const r = p.size / 2
                    const color = p.logo ? "343 10% 75%" : (p.color ?? "343 47% 58%")

                    const isTop = i < TOP_COUNT
                    let angle: number
                    if (isTop) {
                        const t = TOP_COUNT === 1 ? 0.5 : i / (TOP_COUNT - 1)
                        angle = (110 - t * 40) * (Math.PI / 180)
                    } else {
                        const j = i - TOP_COUNT
                        const t = BOTTOM_COUNT === 1 ? 0.5 : j / (BOTTOM_COUNT - 1)
                        angle = (97 - t * 14) * (Math.PI / 180)
                    }

                    const ox = BALL_CX + Math.cos(angle) * BALL_R
                    const oy = BALL_CY + Math.sin(angle) * BALL_R

                    const vx = cx - ox
                    const vy = cy - oy
                    const len = Math.max(1, Math.hypot(vx, vy))
                    const tx = cx - (vx / len) * r
                    const ty = cy - (vy / len) * r

                    const dy = ty - oy
                    const sideBias = isTop ? (cx - BALL_CX) * 0.08 : 0
                    const c1x = ox + sideBias
                    const c1y = oy + dy * 0.35
                    const c2x = tx - sideBias * 0.4
                    const c2y = oy + dy * 0.7
                    const d = `M ${ox} ${oy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`

                    return (
                        <g key={i}>
                            {/* Dashed baseline */}
                            <path d={d} fill="none" strokeLinecap="round"
                                stroke="#C46184" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="3 4" />
                            {/* Active line */}
                            <path d={d} fill="none" strokeLinecap="round"
                                stroke="#C46184" strokeWidth={2}
                                style={{ opacity: isActive ? 0.9 : 0, transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)" }} />
                            {/* Travelling dots */}
                            {isActive && (
                                <>
                                    <circle r="3.5" fill="#F9EEF5" stroke="#C46184" strokeWidth="1" strokeOpacity="0.5" opacity="0">
                                        <animate attributeName="opacity" values="0;0;1;1;0;0"
                                            keyTimes="0;0.249;0.25;0.499;0.5;1" dur={`${cycleDur}s`} repeatCount="1" fill="freeze" />
                                        <animateMotion path={d} dur={`${cycleDur}s`}
                                            keyPoints="0;0;1;1;1;1" keyTimes="0;0.25;0.5;0.5;0.75;1"
                                            calcMode="linear" repeatCount="1" fill="freeze" />
                                    </circle>
                                    <circle r="3.5" fill="#C46184" opacity="0">
                                        <animate attributeName="opacity" values="0;0;1;1;0;0"
                                            keyTimes="0;0.499;0.5;0.749;0.75;1" dur={`${cycleDur}s`} repeatCount="1" fill="freeze" />
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

            {PROVIDERS.map((p, i) => {
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
                            boxShadow: isActive && !p.logo ? `0 0 20px hsl(${color} / 0.5)` : "none",
                        }}
                    >
                        {p.logo ? (
                            <Image src={p.logo} alt={p.label ?? ""}
                                width={p.size} height={p.size}
                                className="rounded-full object-cover w-full h-full" />
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}