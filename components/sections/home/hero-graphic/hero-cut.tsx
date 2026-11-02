import { HERO_COLORS } from "../hero-background"

// Large enough to cover the hero from any pivot point, up to ultra-wide screens.
const SIZE = 4000

// Dark half of the home hero, drawn by the graphic itself.
// It pivots on its parent's centre (the ADXC unit), so the diagonal cuts through
// ADXC at every breakpoint by construction — no measuring, works in server HTML.
//
// Requirements:
// - Must sit inside the hero's `relative z-10` content layer with NO stacking
//   context in between (no transform / opacity / filter on ancestors), so -z-10
//   places it behind all hero content but above HeroBackground.
// - The hero <section> must clip it (overflow-hidden).
export function HeroCut() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10
            [--cut-tilt:64deg] sm:[--cut-tilt:50deg] md:[--cut-tilt:36deg] lg:[--cut-tilt:34deg] xl:[--cut-tilt:32deg]"
        >
            {/* Square whose left edge is the cut line through the pivot, filling to the right */}
            <div
                className="absolute overflow-hidden"
                style={{
                    left: 0,
                    top: -SIZE / 2,
                    width: SIZE,
                    height: SIZE,
                    transformOrigin: "0 50%",
                    transform: "rotate(var(--cut-tilt))",
                    background: `radial-gradient(circle 600px at 0 50%, oklch(from ${HERO_COLORS.glow} l c h / 0.3), transparent),
                        linear-gradient(to right, ${HERO_COLORS.from}, ${HERO_COLORS.to} 600px)`,
                }}
            >
                {/* Counter-rotated so the grid stays axis-aligned with the page */}
                <div
                    className="bg-grid absolute opacity-30"
                    style={{
                        left: -SIZE,
                        top: -SIZE / 2,
                        width: SIZE * 2,
                        height: SIZE * 2,
                        transform: "rotate(calc(-1 * var(--cut-tilt)))",
                    }}
                />
            </div>
        </div>
    )
}
