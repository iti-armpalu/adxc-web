"use client"

import { useSyncExternalStore } from "react"

// Fixed 1920×1080 design canvas, scaled to fit whatever viewport shows it.
// The booth monitor is 1920×1080, but OS display scaling can report a smaller
// viewport — scaling keeps it pixel-identical (and previewable on a laptop).
// Uses `zoom`, not `transform`: a transform would create a stacking context
// and trap the hero graphic's HeroCut z-index.
export const STAGE_W = 1920
export const STAGE_H = 1080

function subscribe(onChange: () => void) {
    window.addEventListener("resize", onChange)
    return () => window.removeEventListener("resize", onChange)
}

const getScale = () => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)

export function ScreenStage({ children }: { children: React.ReactNode }) {
    const scale = useSyncExternalStore(subscribe, getScale, () => 1)

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-background cursor-none">
            <div
                className="relative shrink-0 overflow-hidden"
                style={{ width: STAGE_W, height: STAGE_H, zoom: scale }}
            >
                {children}
            </div>
        </div>
    )
}
