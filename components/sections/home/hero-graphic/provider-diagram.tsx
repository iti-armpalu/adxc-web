"use client"

import { memo, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { QUESTION_PROVIDERS, STEP_MS } from "./constants"
import { ProviderLogo } from "./provider-logo"
import type { ProviderLayout } from "./provider-layouts"

const DUR = 900
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)"

interface ProviderDiagramProps {
    layout: ProviderLayout
    activeQuestion: number
    className?: string
    style?: CSSProperties
}

// Shared renderer for the horizontal (desktop) and vertical (mobile) provider diagrams.
export function ProviderDiagram({ layout, activeQuestion, className, style }: ProviderDiagramProps) {
    const idx = ((activeQuestion % QUESTION_PROVIDERS.length) + QUESTION_PROVIDERS.length) % QUESTION_PROVIDERS.length
    const active = new Set(QUESTION_PROVIDERS[idx])
    const cycleDur = `${(STEP_MS * 0.9) / 1000}s`

    return (
        <div className={cn("relative", className)} style={style} aria-label="Data providers">
            <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                viewBox={`0 0 ${layout.width} ${layout.height}`}
            >
                <Baselines paths={layout.paths} />

                {/* Re-keyed each step so the one-shot SMIL animations restart */}
                <g key={activeQuestion}>
                    {layout.paths.map((d, i) =>
                        active.has(i) ? (
                            <g key={i}>
                                <path d={d} fill="none" strokeLinecap="round" className="stroke-brand-500" strokeWidth={2} opacity={0.9} />

                                {/* Outbound query */}
                                <circle r="3.5" className="fill-brand-100 stroke-brand-400" strokeWidth="1" fillOpacity={0.5} strokeOpacity={0.5}>
                                    <animate attributeName="opacity" values="0;0;1;1;0;0"
                                        keyTimes="0;0.249;0.25;0.499;0.5;1" dur={cycleDur} repeatCount="1" fill="freeze" />
                                    <animateMotion path={d} dur={cycleDur}
                                        keyPoints="0;0;1;1;1;1" keyTimes="0;0.25;0.5;0.5;0.75;1"
                                        calcMode="linear" repeatCount="1" fill="freeze" />
                                </circle>

                                {/* Returning answer */}
                                <circle r="3.5" className="fill-white stroke-brand-400" strokeWidth="1">
                                    <animate attributeName="opacity" values="0;0;1;1;0;0"
                                        keyTimes="0;0.499;0.5;0.749;0.75;1" dur={cycleDur} repeatCount="1" fill="freeze" />
                                    <animateMotion path={d} dur={cycleDur}
                                        keyPoints="1;1;0;0;0;0" keyTimes="0;0.5;0.75;0.75;1;1"
                                        calcMode="linear" repeatCount="1" fill="freeze" />
                                </circle>
                            </g>
                        ) : null,
                    )}
                </g>
            </svg>

            {layout.providers.map((p, i) => {
                const isActive = active.has(i)
                const color = p.logo ? "var(--color-neutral-400)" : (p.color ?? "var(--color-brand-400)")
                return (
                    <div
                        key={i}
                        className="absolute aspect-square rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${(layout.dotSizes[i] / layout.width) * 100}%`,
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.05 : 1})`,
                            transition: `transform ${DUR}ms ${EASE}`,
                            backgroundColor: p.logo ? "transparent" : color,
                            opacity: isActive ? 1 : 0.35,
                            boxShadow: isActive && !p.logo ? `0 0 20px oklch(from ${color} l c h / 0.5)` : "none",
                        }}
                    >
                        {p.logo ? <ProviderLogo src={p.logo} alt={p.label ?? ""} size={p.size} /> : null}
                    </div>
                )
            })}
        </div>
    )
}

// Dashed guide lines — static, rendered once per layout.
const Baselines = memo(function Baselines({ paths }: { paths: string[] }) {
    return (
        <>
            {paths.map((d, i) => (
                <path key={i} d={d} fill="none" strokeLinecap="round"
                    className="stroke-brand-400" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="3 4" />
            ))}
        </>
    )
})
