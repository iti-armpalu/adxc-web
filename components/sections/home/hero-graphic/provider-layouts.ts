import { PROVIDER_DOTS } from "./constants"
import type { ProviderDot } from "./types"

// Geometry for the provider diagram, computed once per layout (not per animation step).
// Coordinates are in the SVG's own units: px for horizontal, design units for vertical.
export type ProviderLayout = {
    width: number
    height: number
    providers: ProviderDot[]
    dotSizes: number[] // rendered diameter per provider, same units as width
    paths: string[]    // curve from the ADXC unit to each provider, same order
}

const BALL_R = 96

// Ends a curve on the dot's edge rather than its centre.
function edgePoint(ox: number, oy: number, cx: number, cy: number, r: number) {
    const vx = cx - ox
    const vy = cy - oy
    const len = Math.max(1, Math.hypot(vx, vy))
    return { tx: cx - (vx / len) * r, ty: cy - (vy / len) * r }
}

// ─── Horizontal (tablet/desktop): ADXC on the left, lines fan right ──────────

export const HORIZONTAL_BASE = { width: 240, height: 380 }
const H_BALL_CX = -110

function buildHorizontal(scale: number): ProviderLayout {
    const width = Math.round(HORIZONTAL_BASE.width * scale)
    const height = Math.round(HORIZONTAL_BASE.height * scale)
    const ballCx = Math.round(H_BALL_CX * scale)
    const ballCy = height / 2
    const n = PROVIDER_DOTS.length

    // Fan origins follow the dots' vertical order so lines don't cross
    const rankOf: number[] = []
    PROVIDER_DOTS.map((p, i) => ({ i, y: p.y }))
        .sort((a, b) => a.y - b.y)
        .forEach((o, rank) => { rankOf[o.i] = rank })

    const dotSizes = PROVIDER_DOTS.map((p) => p.size * scale)
    const paths = PROVIDER_DOTS.map((p, i) => {
        const cx = (p.x / 100) * width
        const cy = (p.y / 100) * height
        const t = n === 1 ? 0.5 : rankOf[i] / (n - 1)
        const angle = -Math.PI / 8 + t * (Math.PI / 4)
        const ox = ballCx + Math.cos(angle) * BALL_R
        const oy = ballCy + Math.sin(angle) * BALL_R
        const { tx, ty } = edgePoint(ox, oy, cx, cy, dotSizes[i] / 2)

        const dx = tx - ox
        const separation = (t - 0.5) * 28
        return `M ${ox} ${oy} C ${ox + dx * 0.32} ${oy + separation}, ${ox + dx * 0.7} ${ty - separation * 0.35}, ${tx} ${ty}`
    })

    return { width, height, providers: PROVIDER_DOTS, dotSizes, paths }
}

const horizontalCache = new Map<number, ProviderLayout>()

export function horizontalLayout(scale: number): ProviderLayout {
    let layout = horizontalCache.get(scale)
    if (!layout) {
        layout = buildHorizontal(scale)
        horizontalCache.set(scale, layout)
    }
    return layout
}

// ─── Vertical (mobile): ADXC above, lines fan downward ────────────────────────
// Two rows: top row (closer to ADXC) gets the outer fan, bottom row the inner fan.
// Renders at up to 350 wide and scales down with its container (viewBox + % sizing).

const VERTICAL_PROVIDERS: ProviderDot[] = [
    // Top row — closer to ADXC
    { x: 6, y: 40, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 20, y: 40, size: 20, color: "var(--color-brand-600)" },
    { x: 54, y: 40, size: 26, color: "var(--color-cyan-700)" },
    { x: 80, y: 40, size: 22, color: "var(--color-blue-600)" },
    { x: 96, y: 40, size: 36, label: "Data Comms", logo: "/data-comms-logo.svg" },
    // Bottom row — farther from ADXC
    { x: 18, y: 75, size: 18, color: "var(--color-orange-600)" },
    { x: 42, y: 65, size: 50, color: "var(--color-purple-600)" },
    { x: 66, y: 85, size: 60, label: "Quid", logo: "/quid-logo-square.svg" },
    { x: 88, y: 75, size: 54, color: "var(--color-orange-700)" },
]
const V_TOP_COUNT: number = 5

function buildVertical(): ProviderLayout {
    const width = 350
    const height = 220
    const ballCx = width / 2
    const ballCy = -110
    const bottomCount = VERTICAL_PROVIDERS.length - V_TOP_COUNT

    const dotSizes = VERTICAL_PROVIDERS.map((p) => p.size)
    const paths = VERTICAL_PROVIDERS.map((p, i) => {
        const cx = (p.x / 100) * width
        const cy = (p.y / 100) * height
        const isTop = i < V_TOP_COUNT

        let angle: number
        if (isTop) {
            const t = V_TOP_COUNT === 1 ? 0.5 : i / (V_TOP_COUNT - 1)
            angle = (110 - t * 40) * (Math.PI / 180)
        } else {
            const t = bottomCount === 1 ? 0.5 : (i - V_TOP_COUNT) / (bottomCount - 1)
            angle = (97 - t * 14) * (Math.PI / 180)
        }

        const ox = ballCx + Math.cos(angle) * BALL_R
        const oy = ballCy + Math.sin(angle) * BALL_R
        const { tx, ty } = edgePoint(ox, oy, cx, cy, dotSizes[i] / 2)

        const dy = ty - oy
        const sideBias = isTop ? (cx - ballCx) * 0.08 : 0
        return `M ${ox} ${oy} C ${ox + sideBias} ${oy + dy * 0.35}, ${tx - sideBias * 0.4} ${oy + dy * 0.7}, ${tx} ${ty}`
    })

    return { width, height, providers: VERTICAL_PROVIDERS, dotSizes, paths }
}

export const VERTICAL_LAYOUT = buildVertical()
