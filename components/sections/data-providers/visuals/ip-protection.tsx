"use client"

import { Lock, Database, User } from "lucide-react"
import { AdxcUnit } from "../../home/hero-graphic/adxc-unit"

export function IPProtectionVisual() {
    return (
        <div className="relative w-full h-full p-4 sm:pt-12">
            <style>{`
        .adxc-loop {
          animation-duration: 6s;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        }
        @keyframes adxc-report {
          0%        { offset-distance: 0%;   opacity: 0; }
          6%        { opacity: 1; }
          40%       { offset-distance: 100%; opacity: 1; }
          45%, 100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes adxc-answer {
          0%, 48%   { offset-distance: 0%;   opacity: 0; }
          54%       { opacity: 1; }
          90%       { offset-distance: 100%; opacity: 1; }
          95%, 100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes adxc-pulse-hub {
          0%, 38%   { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
          44%       { transform: scale(1.06); filter: drop-shadow(0 0 18px hsl(343 47% 58% / 0.6)); }
          52%       { transform: scale(1); }
          100%      { transform: scale(1); }
        }
        @keyframes adxc-vault-glow {
          0%        { box-shadow: 0 0 0 0 hsl(343 97% 20% / 0), inset 0 0 0 1px hsl(343 97% 20% / 0.15); }
          4%        { box-shadow: 0 0 0 6px hsl(343 47% 58% / 0.18), inset 0 0 0 1px hsl(343 97% 20% / 0.35); }
          14%, 100% { box-shadow: 0 0 0 0 hsl(343 97% 20% / 0), inset 0 0 0 1px hsl(343 97% 20% / 0.15); }
        }
        @keyframes adxc-row-scan {
          0%, 38%, 60%, 100% { opacity: 0.35; }
          44%, 52%           { opacity: 1; }
        }
        @keyframes adxc-answer-arrive {
            0%, 85%   { box-shadow: 0 0 0 0 oklch(0.78 0.11 350 / 0); border-color: var(--color-border); }
            90%       { box-shadow: 0 0 0 4px oklch(0.78 0.11 350 / 0.35); border-color: oklch(0.32 0.11 340 / 0.5); }
            98%, 100% { box-shadow: 0 0 0 0 oklch(0.78 0.11 350 / 0); border-color: var(--color-border); }
        }
      `}</style>
            {/* <div className="relative w-full h-full"> */}
            <div className="relative w-full h-full hidden md:block">

                {/* SVG layer for paths + traveling tokens */}
                <svg
                    viewBox="0 0 1000 560"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="plumGrad" x1="0" x2="1">
                            <stop offset="0%" stopColor="hsl(343 97% 20%)" stopOpacity="0.0" />
                            <stop offset="50%" stopColor="hsl(343 97% 20%)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="hsl(343 97% 20%)" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>

                    {/* Static guide line: provider -> ADXC -> user */}
                    {/* Dotted travel paths */}
                    {/* Provider -> ADXC */}
                    <path
                        d="M 230 280 C 320 280, 400 280, 500 280"
                        fill="none"
                        stroke="oklch(0.32 0.11 340 / 0.55)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                    />
                    {/* ADXC -> End user */}
                    <path
                        d="M 500 280 C 640 280, 720 280, 850 280"
                        fill="none"
                        stroke="oklch(0.32 0.11 340 / 0.55)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                    />

                    {/* Phase 1 — Full report token travels provider -> ADXC */}
                    <g
                        className="adxc-loop"
                        style={{
                            offsetPath: "path('M 230 280 C 320 280, 400 280, 500 280')",
                            animationName: "adxc-report",
                        } as React.CSSProperties}
                    >
                        {/* <ellipse rx="36" ry="34" fill="hsl(343 97% 20% / 0.10)" /> */}
                        <rect x="-26" y="-26" width="48" height="60" rx="4"
                            fill="hsl(343 10% 96%)" stroke="hsl(343 97% 20% / 0.4)" strokeWidth="1" />
                        <rect x="-30" y="-30" width="48" height="60" rx="4"
                            fill="hsl(0 0% 100%)" stroke="hsl(343 97% 20%)" strokeWidth="1.5" />
                        <rect x="-25" y="-25" width="22" height="3" rx="1.5" fill="hsl(343 97% 20%)" />
                        <rect x="-25" y="-19" width="38" height="2" rx="1" fill="hsl(343 97% 20% / 0.45)" />
                        {[
                            { y: -12, w: 38 }, { y: -8, w: 38 }, { y: -4, w: 34 },
                            { y: 0, w: 38 }, { y: 4, w: 30 }, { y: 8, w: 38 }, { y: 12, w: 26 },
                        ].map((r, i) => (
                            <rect key={i} x="-25" y={r.y} width={r.w} height={1.8} rx={0.9}
                                fill="hsl(343 47% 58% / 0.7)" />
                        ))}
                        <rect x="-25" y="17" width="18" height="10" rx="1.5" fill="hsl(343 10% 92%)" />
                        <rect x="-5" y="17" width="20" height="1.8" rx="0.9" fill="hsl(343 47% 58% / 0.6)" />
                        <rect x="-5" y="21" width="16" height="1.8" rx="0.9" fill="hsl(343 47% 58% / 0.6)" />
                        <rect x="-5" y="25" width="18" height="1.8" rx="0.9" fill="hsl(343 47% 58% / 0.6)" />
                    </g>

                    {/* Phase 2 — Synthesised answer token travels ADXC -> end user */}
                    <g
                        className="adxc-loop"
                        style={{
                            offsetPath: "path('M 500 280 C 640 280, 720 280, 850 280')",
                            animationName: "adxc-answer",
                        } as React.CSSProperties}
                    >
                        <rect x="-26" y="-14" width="52" height="28" rx="8" fill="hsl(343 97% 20%)" />
                        <rect x="-20" y="-8" width="22" height="3" rx="1.5" fill="hsl(0 0% 99% / 0.95)" />
                        <rect x="-20" y="-1" width="32" height="2.5" rx="1.25" fill="hsl(0 0% 99% / 0.65)" />
                        <rect x="-20" y="5" width="16" height="2.5" rx="1.25" fill="hsl(343 47% 58%)" />
                    </g>
                </svg>

                <div className="absolute top-2 left-0 w-[30%] text-center">
                    <p className="text-sm font-medium text-foreground">Data provider</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Sends full report</p>
                </div>

                {/* LEFT: data provider vault */}
                <div className="absolute left-0 top-1/2 w-[30%] -translate-y-1/2">
                    <div className="flex flex-col items-center gap-8">
                        {/* <div className="text-center"> */}


                        <div className="relative rounded-2xl bg-card p-5 adxc-loop"
                            style={{ animationName: "adxc-vault-glow" } as React.CSSProperties}>
                            <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground whitespace-nowrap">
                                <Lock className="h-3 w-3" />
                                Protected
                            </div>

                            <div className="flex w-44 flex-col gap-2 rounded-lg border border-border bg-background p-3">
                                <div className="flex items-center gap-2">
                                    <Database className="h-3.5 w-3.5 text-primary" />
                                    <span className="text-xs font-semibold text-foreground">Dataset</span>
                                    <span className="ml-auto text-[10px] text-muted-foreground">in place</span>
                                </div>
                                <div className="space-y-1.5">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="adxc-loop flex items-center gap-1.5"
                                            style={{ animationName: "adxc-row-scan", animationDelay: `${i * 0.08}s` } as React.CSSProperties}>
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-bright" />
                                            <div className="h-1.5 flex-1 rounded-full bg-muted" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-1">
                                <div className="h-2 w-2 rounded-sm bg-primary" />
                                <span className="text-[10px] font-semibold tracking-wide text-foreground">
                                    PROVIDER A
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="text-center"> */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-sm font-medium text-foreground">ADXC</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Retrieves and synthesises</p>
                </div>

                {/* CENTER: ADXC hub */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col items-center gap-3">
                        <AdxcUnit size={120} ring={6} />
                    </div>
                </div>

                <div className="absolute top-2 right-0 w-[30%] text-center">
                    <p className="text-sm font-medium text-foreground">End user</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Receives synthesised answer</p>
                </div>

                {/* RIGHT: end user */}
                <div className="absolute right-0 top-1/2 w-[30%] -translate-y-1/2">
                    <div className="flex flex-col items-center gap-8">
                        {/* <div className="text-center"> */}


                        <div className="flex w-full max-w-[15rem] flex-col gap-3">
                            <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
                                <div className="flex items-start gap-2">

                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                                        <User className="h-3 w-3 text-primary" />
                                    </div>
                                    <div className="flex-1 rounded-lg bg-muted px-2.5 py-1.5">
                                        <div className="space-y-1">
                                            <div className="h-1.5 w-full rounded-full bg-muted-foreground/30" />
                                            <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/30" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-start gap-2">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                                        <span className="text-[10px] font-bold text-primary-foreground">A</span>
                                    </div>
                                    <div
                                        className="adxc-loop flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5"
                                        style={{ animationName: "adxc-answer-arrive" }}
                                    >
                                        <div className="space-y-1">
                                            <div className="h-1.5 w-full rounded-full bg-muted" />
                                            <div className="h-1.5 w-5/6 rounded-full bg-muted" />
                                            <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                                        </div>
                                        <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-1.5">
                                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                                                Source
                                            </span>
                                            <div className="ml-auto flex items-center gap-1 rounded bg-muted px-1.5 py-0.5">
                                                <div className="h-1.5 w-1.5 rounded-sm bg-primary" />
                                                <span className="text-[9px] font-semibold tracking-wide text-foreground">
                                                    PROVIDER A
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* MOBILE: vertical stacked layout */}
            <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-0.5 md:hidden">
                {/* Provider */}
                <div className="flex flex-col items-center gap-8">

                    <div className="text-center">
                        <p className="text-sm font-medium text-foreground">Data provider</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Sends full report</p>
                    </div>
                    <div
                        className="relative rounded-2xl bg-card p-5 adxc-loop"
                        style={{
                            animationName: "adxc-vault-glow",
                            boxShadow: "inset 0 0 0 1px oklch(0.32 0.11 340 / 0.15)",
                        }}
                    >
                        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                            <Lock className="h-3 w-3" />
                            Protected
                        </div>
                        <div className="flex w-44 flex-col gap-2 rounded-lg border border-border bg-background p-3">
                            <div className="flex items-center gap-2">
                                <Database className="h-3.5 w-3.5 text-primary" />
                                <span className="text-xs font-semibold text-foreground">Dataset</span>
                                <span className="ml-auto text-[10px] text-muted-foreground">in place</span>
                            </div>
                            <div className="space-y-1.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="adxc-loop flex items-center gap-1.5"
                                        style={{ animationName: "adxc-row-scan", animationDelay: `${i * 0.08}s` }}
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-rose" />
                                        <div className="h-1.5 flex-1 rounded-full bg-secondary" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2 py-1">
                            <div className="h-2 w-2 rounded-sm bg-primary" />
                            <span className="text-[10px] font-semibold tracking-wide text-foreground">
                                PROVIDER&nbsp;BRAND
                            </span>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        sends full report
                    </div> */}
                </div>

                {/* Vertical dotted connector + traveling report */}
                <svg viewBox="0 0 60 120" className="h-18 w-12" aria-hidden="true">
                    <path
                        d="M 30 0 L 30 120"
                        fill="none"
                        stroke="oklch(0.32 0.11 340 / 0.55)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                    />
                    <g
                        className="adxc-loop"
                        style={{
                            offsetPath: "path('M 30 0 L 30 120')", offsetRotate: "0deg",
                            animationName: "adxc-report",
                        }}
                    >
                        <ellipse rx="20" ry="18" fill="oklch(0.32 0.11 340 / 0.10)" />
                        <rect x="-14" y="-16" width="26" height="32" rx="3" fill="oklch(0.96 0.015 340)" stroke="oklch(0.32 0.11 340 / 0.4)" strokeWidth="1" />
                        <rect x="-16" y="-18" width="26" height="32" rx="3" fill="oklch(1 0 0)" stroke="oklch(0.32 0.11 340)" strokeWidth="1.5" />
                        <rect x="-13" y="-14" width="14" height="2" rx="1" fill="oklch(0.32 0.11 340)" />
                        <rect x="-13" y="-9" width="20" height="1.5" rx="0.75" fill="oklch(0.78 0.11 350 / 0.7)" />
                        <rect x="-13" y="-5" width="20" height="1.5" rx="0.75" fill="oklch(0.78 0.11 350 / 0.7)" />
                        <rect x="-13" y="-1" width="16" height="1.5" rx="0.75" fill="oklch(0.78 0.11 350 / 0.7)" />
                        <rect x="-13" y="3" width="20" height="1.5" rx="0.75" fill="oklch(0.78 0.11 350 / 0.7)" />
                    </g>
                </svg>

                {/* ADXC */}


                <div className="flex flex-col items-center gap-3">
                    <div className="text-center">
                        <p className="text-sm font-medium text-foreground">ADXC</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Retrieves and synthesises</p>
                    </div>
                    <AdxcUnit size={120} ring={6} />
                </div>



                {/* Vertical dotted connector + traveling answer */}
                <svg viewBox="0 0 60 120" className="h-18 w-12" aria-hidden="true">
                    <path
                        d="M 30 0 L 30 120"
                        fill="none"
                        stroke="oklch(0.32 0.11 340 / 0.55)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                    />
                    <g
                        className="adxc-loop"
                        style={{
                            offsetPath: "path('M 30 0 L 30 120')", offsetRotate: "0deg",
                            animationName: "adxc-answer",
                        }}
                    >
                        <rect x="-22" y="-10" width="44" height="20" rx="6" fill="oklch(0.32 0.11 340)" />
                        <rect x="-17" y="-5" width="18" height="2.5" rx="1.25" fill="oklch(0.99 0.005 320 / 0.95)" />
                        <rect x="-17" y="0" width="26" height="2" rx="1" fill="oklch(0.99 0.005 320 / 0.65)" />
                        <rect x="-17" y="4" width="14" height="2" rx="1" fill="oklch(0.78 0.11 350)" />
                    </g>
                </svg>

                {/* End user */}
                <div className="flex w-full flex-col items-center gap-3">
                    <div className="text-center">
                        <p className="text-sm font-medium text-foreground">End user</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Receives synthesised answer</p>
                    </div>
                    <div className="w-full max-w-[15rem] rounded-2xl border border-border bg-card p-3 shadow-sm">
                        <div className="flex items-start gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                                <User className="h-3 w-3 text-primary" />
                            </div>
                            <div className="flex-1 rounded-lg rounded-tl-sm bg-secondary px-2.5 py-1.5">
                                <div className="space-y-1">
                                    <div className="h-1.5 w-full rounded-full bg-muted-foreground/30" />
                                    <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/30" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-start gap-2">
                            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                                <span className="text-[10px] font-bold text-primary-foreground">A</span>
                                <span
                                    className="adxc-loop pointer-events-none absolute inset-0 rounded-full ring-2 ring-rose"
                                    style={{ animationName: "adxc-answer-ping" }}
                                />
                            </div>
                            <div
                                className="adxc-loop flex-1 rounded-lg rounded-tl-sm border border-border bg-background px-2.5 py-1.5"
                                style={{ animationName: "adxc-answer-arrive" }}
                            >
                                <div className="space-y-1">
                                    <div className="h-1.5 w-full rounded-full bg-secondary" />
                                    <div className="h-1.5 w-5/6 rounded-full bg-secondary" />
                                    <div className="h-1.5 w-2/3 rounded-full bg-secondary" />
                                </div>
                                <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-1.5">
                                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                                        Source
                                    </span>
                                    <div className="ml-auto flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5">
                                        <div className="h-1.5 w-1.5 rounded-sm bg-primary" />
                                        <span className="text-[9px] font-semibold tracking-wide text-foreground">
                                            PROVIDER&nbsp;BRAND
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
