"use client"

// ─── Traditional Panel ───────────────────────────────────────────────────────

function TraditionalPanel() {
    const buyers = 4
    const W = 280
    const H = 200
    const cx = W / 2
    const cy = 50

    const paths = Array.from({ length: buyers }, (_, i) => {
        const x = ((i + 1) * W) / (buyers + 1)
        const y = H - 28
        // Path goes FROM buyer (x,y) TO provider (cx,cy) — reversed direction
        const d = `M ${x} ${y - 18} C ${x} ${y - 75}, ${cx} ${cy + 85}, ${cx} ${cy + 28}`
        return { x, y, d, dur: 2.8 + i * 0.4, delay: i * 0.7 }
    })

    return (
        <div className="rounded-lg border border-border bg-background p-4 flex flex-col gap-3 flex-1">

            <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Traditional</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">Few buyers, large transactions</p>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full flex-1" aria-label="Traditional model">

                {paths.map(({ x, y, d, dur, delay }, i) => (
                    <g key={i}>
                        {/* Static path */}
                        <path
                            d={d}
                            stroke="hsl(343 97% 17%)"
                            strokeWidth="0.8"
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.3"
                        />
                        {/* Travelling dot */}
                        <circle r="1.8" fill="hsl(343 97% 17%)">
                            <animateMotion
                                dur={`${dur}s`}
                                repeatCount="indefinite"
                                begin={`${delay}s`}
                                path={d}
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.05;0.9;1"
                                dur={`${dur}s`}
                                repeatCount="indefinite"
                                begin={`${delay}s`}
                            />
                        </circle>
                        {/* Buyer node */}
                        <rect
                            x={x - 20} y={y - 14}
                            width="40" height="24" rx="4"
                            fill="hsl(343 97% 17%)"
                            opacity="0.1"
                            // stroke="hsl(343 10% 82%)"
                            strokeWidth="1"
                        />
                    </g>
                ))}

                {/* Provider node — rendered last so it sits on top */}
                <circle cx={cx} cy={cy} r={28} fill="hsl(343 97% 17%)" />
                <text x={cx} y={cy - 3} textAnchor="middle" fontSize="7"
                    fontWeight={600} fill="hsl(0 0% 100%)" letterSpacing="0.05em">
                    DATA
                </text>
                <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7"
                    fontWeight={600} fill="hsl(0 0% 100%)" letterSpacing="0.05em">
                    PROVIDER
                </text>

            </svg>

            {/* Bottom stats — one row */}
            <div className="border-t border-border pt-3 flex items-center justify-center gap-3">
                <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground">Model</p>
                    <p className="text-xs font-medium text-foreground">Annual reports</p>
                </div>
                <div className="w-px h-4 bg-border shrink-0" />
                <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-foreground">Buyers</p>
                    <p className="text-xs font-semibold text-foreground tabular-nums">Few</p>
                </div>
            </div>

        </div>
    )
}

// ─── ADXC Panel ──────────────────────────────────────────────────────────────

function AdxcPanel() {
    const streams = 32
    const W = 280
    const H = 200
    const cx = W / 2
    const cy = 50

    const dots = Array.from({ length: streams }, (_, i) => {
        const t = (i + 0.5) / streams
        const x = 16 + t * (W - 32)
        const y = H - 18 - ((i * 31) % 55)
        const d = `M ${x} ${y} C ${x} ${(cy + y) / 2}, ${cx} ${(cy + y) / 2}, ${cx} ${cy + 28}`
        return { x, y, d, delay: (i * 0.11) % 2.2, dur: 2.0 + (i % 6) * 0.25 }
    })

    return (
        <div className="rounded-lg border border-primary/30 bg-primary p-4 flex flex-col gap-3 flex-1">

            <div>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60">With ADXC</p>
                <p className="text-sm font-semibold text-primary-foreground mt-0.5">Many buyers, small transactions</p>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full flex-1" aria-label="ADXC model">
                <defs>
                    <radialGradient id="adxc-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#C46184" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#C46184" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx={cx} cy={cy} r={70} fill="url(#adxc-glow)" />

                {dots.map((s, i) => (
                    <g key={i}>
                        <path d={s.d} stroke="#C46184" strokeOpacity="0.3" strokeWidth="0.8" fill="none" />
                        <circle cx={s.x} cy={s.y} r="1.6" fill="#C46184" opacity="0.55" />
                        <circle r="1.8" fill="#C46184">
                            <animateMotion
                                dur={`${s.dur}s`}
                                repeatCount="indefinite"
                                begin={`${s.delay}s`}
                                path={s.d}
                            />
                        </circle>
                    </g>
                ))}

                {/* Provider node — rendered last */}
                <circle cx={cx} cy={cy} r={28} fill="hsl(0 0% 100%)" />
                <text x={cx} y={cy - 3} textAnchor="middle" fontSize="7"
                    fontWeight={700} fill="hsl(343 97% 17%)" letterSpacing="0.05em">
                    DATA
                </text>
                <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7"
                    fontWeight={700} fill="hsl(343 97% 17%)" letterSpacing="0.05em">
                    PROVIDER
                </text>

            </svg>

            {/* Bottom stats — one row */}
            <div className="border-t border-white/10 pt-3 flex items-center justify-center gap-3">
                <div className="flex items-center gap-1.5">
                    <p className="text-xs text-primary-foreground/60">Model</p>
                    <p className="text-xs font-medium text-primary-foreground">Pay-per-query</p>
                </div>
                <div className="w-px h-4 bg-white/20 shrink-0" />
                <div className="flex items-center gap-1.5">
                    <p className="text-xs text-primary-foreground/60">Buyers</p>
                    <p className="text-xs font-semibold text-primary-foreground tabular-nums">Many</p>
                </div>
            </div>

        </div>
    )
}

// ─── Revenue Model Visual ────────────────────────────────────────────────────

export function RevenueModelVisual() {
    return (
        <div className="w-full h-full flex flex-col sm:flex-row gap-3 p-4 overflow-y-auto">
            <TraditionalPanel />
            <AdxcPanel />
        </div>
    )
}