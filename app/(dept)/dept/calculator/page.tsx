"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

// ─── Constants ────────────────────────────────────────────────────────────────

const ADXC_NET_REVENUE_RATE = 0.50
const MAX_SPEND = 99_999_999

const TIER_1 = { id: 1, label: "Client Resell", description: "Clients use ADXC through D", rate: 0.25, rateLabel: "25%", note: "All direct client usage via D" }
const TIER_2 = { id: 2, label: "Internal Use", description: "DEPT® internal usage + topups via D", rate: 0.10, rateLabel: "10%", note: "All internal usage via D" }

const SUBTITLE_HEADING = "Calculate how much DEPT® can earn through usage of ADXC via DEPT®'s AI platform (D)."
const SUBTITLE_BODY = "ADXC pays DEPT® a platform fee, calculated as a % of ADXC net revenue*, based on usage type."

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`
    return `$${value.toFixed(0)}`
}

function formatCurrencyFull(value: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
}

function clampClients(v: number) { return Math.max(0, Math.min(50, Math.round(v))) }
function clampSpend(v: number) { return Math.max(0, Math.min(MAX_SPEND, v)) }

// ─── Types ────────────────────────────────────────────────────────────────────

type Tier1State = { clients: number; annualSpend: number }
type Tier2State = { annualSpend: number }

// ─── Earn Badge ───────────────────────────────────────────────────────────────

function EarnBadge({ rateLabel }: { rateLabel: string }) {
    return (
        <div className="pt-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Earn:</p>
            <p className="text-2xl font-bold text-primary tabular-nums leading-none">{rateLabel}</p>
        </div>
    )
}

// ─── Spend Input ──────────────────────────────────────────────────────────────

function SpendInput({ value, onChange, label = "Avg. annual spend per client", placeholder = "100,000" }: {
    value: number; onChange: (v: number) => void; label?: string; placeholder?: string
}) {
    const [str, setStr] = useState(String(value))
    const [focused, setFocused] = useState(false)
    const [atMax, setAtMax] = useState(false)
    const displayed = focused ? str : Number(str).toLocaleString("en-US")

    return (
        <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{label}</Label>
            <div className="inline-flex items-center rounded-xs border border-input bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 transition-colors">
                <span className="px-2.5 text-sm text-muted-foreground border-r border-input bg-muted/40 h-7 flex items-center rounded-l-xs select-none">$</span>
                <input
                    type="text" inputMode="numeric" value={displayed}
                    maxLength={focused ? 8 : undefined}
                    onFocus={() => { setFocused(true); setAtMax(false) }}
                    onChange={(e) => setStr(e.target.value.replace(/,/g, ""))}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setFocused(false)
                            const raw = Number(str.replace(/,/g, ""))
                            const clamped = clampSpend(raw)
                            setAtMax(raw > MAX_SPEND)
                            setStr(String(clamped))
                            onChange(clamped)
                            e.currentTarget.blur()
                        }
                    }}
                    onBlur={() => {
                        setFocused(false)
                        const raw = Number(str.replace(/,/g, ""))
                        const clamped = clampSpend(raw)
                        setAtMax(raw > MAX_SPEND)
                        setStr(String(clamped))
                        onChange(clamped)
                    }}
                    className="w-32 h-7 text-sm tabular-nums px-2 bg-transparent outline-none placeholder:text-muted-foreground"
                    placeholder={placeholder}
                />
            </div>
            {atMax && <p className="text-xs text-warning">Max. $99,999,999</p>}
        </div>
    )
}

// ─── Tier 1 Card ──────────────────────────────────────────────────────────────

function Tier1Card({ state, onChange }: { state: Tier1State; onChange: (next: Partial<Tier1State>) => void }) {
    const [clientsStr, setClientsStr] = useState(String(state.clients))

    return (
        <Card>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-border">
                    <div className="p-4 space-y-2">
                        <p className="text-sm font-semibold leading-snug">Tier {TIER_1.id} — {TIER_1.label}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{TIER_1.description}</p>
                        <p className="text-xs text-muted-foreground italic">{TIER_1.note}</p>
                        <EarnBadge rateLabel={TIER_1.rateLabel} />
                    </div>
                    <div className="p-4 space-y-4">
                        {/* No. of clients — input group + slider */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs text-muted-foreground">No. of clients</Label>
                                <div className="inline-flex items-center rounded-xs border border-input bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 transition-colors">
                                    <span className="px-2 text-sm text-muted-foreground border-r border-input bg-muted/40 h-7 flex items-center rounded-l-xs select-none">#</span>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={clientsStr}
                                        onChange={(e) => setClientsStr(e.target.value.replace(/[^0-9]/g, ""))}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const c = clampClients(Number(clientsStr))
                                                setClientsStr(String(c))
                                                onChange({ clients: c })
                                                e.currentTarget.blur()
                                            }
                                        }}
                                        onBlur={() => {
                                            const c = clampClients(Number(clientsStr))
                                            setClientsStr(String(c))
                                            onChange({ clients: c })
                                        }}
                                        className="w-10 h-7 text-sm tabular-nums px-2 bg-transparent outline-none text-center"
                                        placeholder="5"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Slider min={0} max={50} step={1} value={[state.clients]}
                                    onValueChange={([v]) => {
                                        setClientsStr(String(v))
                                        onChange({ clients: v })
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0</span><span>50</span>
                            </div>
                        </div>
                        <SpendInput value={state.annualSpend} onChange={(v) => onChange({ annualSpend: v })} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ─── Tier 2 Card ──────────────────────────────────────────────────────────────

function Tier2Card({ state, onChange }: { state: Tier2State; onChange: (next: Partial<Tier2State>) => void }) {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-border h-full">
                    <div className="p-4 space-y-2">
                        <p className="text-sm font-semibold leading-snug">Tier {TIER_2.id} — {TIER_2.label}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{TIER_2.description}</p>
                        <p className="text-xs text-muted-foreground italic">{TIER_2.note}</p>
                        <EarnBadge rateLabel={TIER_2.rateLabel} />
                    </div>
                    <div className="p-4 flex flex-col justify-center gap-3">
                        <SpendInput value={state.annualSpend} onChange={(v) => onChange({ annualSpend: v })} label="Annual spend by DEPT" placeholder="150,000" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ─── Summary Panel ────────────────────────────────────────────────────────────

function SummaryPanel({ tier1, tier2, tier1Result, tier2Result, view, setView, displayEarning, mobile = false }: {
    tier1: Tier1State; tier2: Tier2State
    tier1Result: { deptEarning: number }; tier2Result: { deptEarning: number }
    view: "annual" | "monthly"; setView: (v: "annual" | "monthly") => void
    displayEarning: number; mobile?: boolean
}) {
    const [breakdownOpen, setBreakdownOpen] = useState(false)

    const rows = [
        { tier: TIER_1, earning: tier1Result.deptEarning, detail: `${tier1.clients} client${tier1.clients !== 1 ? "s" : ""} × ${formatCurrency(tier1.annualSpend)} × ${TIER_1.rateLabel}` },
        { tier: TIER_2, earning: tier2Result.deptEarning, detail: `${formatCurrency(tier2.annualSpend)} × ${TIER_2.rateLabel}` },
    ]

    return (
        <div className="flex flex-col h-full py-1">
            {/* Toggle */}
            <div className="flex items-center gap-1 bg-primary-foreground/10 rounded-xs p-0.5 w-fit mb-4 sm:mb-8">
                {(["annual", "monthly"] as const).map((v) => (
                    <button key={v} onClick={() => setView(v)}
                        className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors capitalize ${view === v ? "bg-primary-foreground text-primary" : "text-primary-foreground/70 hover:text-primary-foreground"}`}
                    >{v}</button>
                ))}
            </div>

            {/* Hero */}
            <div className="space-y-1 mb-4 sm:mb-8">
                <p className="text-xs text-primary-foreground/60 uppercase tracking-widest">Estimated DEPT® earnings</p>
                <p className="text-5xl sm:text-7xl xl:text-9xl font-semibold tabular-nums tracking-tight leading-none">
                    {formatCurrency(displayEarning)}
                </p>
                <p className="text-base text-primary-foreground/70">{view === "annual" ? "per year" : "per month avg."}</p>
            </div>

            <Separator className="bg-primary-foreground/20 mb-4 sm:mb-6" />

            {/* Breakdown */}
            <div className="flex-1 space-y-2">
                {mobile && (
                    <button onClick={() => setBreakdownOpen((o) => !o)}
                        className="flex items-center justify-between w-full text-sm text-primary-foreground/80 font-medium mb-2"
                    >
                        <span>Breakdown by tier</span>
                        <ChevronDown size={16} className={`transition-transform ${breakdownOpen ? "rotate-180" : ""}`} />
                    </button>
                )}
                {(!mobile || breakdownOpen) && (
                    <div className="space-y-4">
                        {rows.map(({ tier, earning, detail }) => (
                            <div key={tier.id} className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-primary-foreground/80 font-medium">Tier {tier.id} — {tier.label}</span>
                                    <span className="text-sm tabular-nums font-semibold">{formatCurrencyFull(view === "annual" ? earning : earning / 12)}</span>
                                </div>
                                <p className="text-xs text-primary-foreground/50">{detail}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Note */}
            <div className="mt-auto pt-6">
                <Separator className="bg-primary-foreground/20 mb-3" />
                <p className="text-xs text-primary-foreground/50">*ADXC net revenue = 50% total revenue</p>
            </div>
        </div>
    )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DeptCalculatorPage() {
    const [tier1, setTier1] = useState<Tier1State>({ clients: 5, annualSpend: 100_000 })
    const [tier2, setTier2] = useState<Tier2State>({ annualSpend: 150_000 })
    const [view, setView] = useState<"annual" | "monthly">("annual")

    const tier1Result = { deptEarning: tier1.clients * tier1.annualSpend * ADXC_NET_REVENUE_RATE * TIER_1.rate }
    const tier2Result = { deptEarning: tier2.annualSpend * ADXC_NET_REVENUE_RATE * TIER_2.rate }
    const totalDeptEarning = tier1Result.deptEarning + tier2Result.deptEarning
    const displayEarning = view === "annual" ? totalDeptEarning : totalDeptEarning / 12
    const summaryProps = { tier1, tier2, tier1Result, tier2Result, view, setView, displayEarning }

    return (
        <div className="min-h-screen flex flex-col lg:h-screen lg:overflow-hidden">

            {/* Header */}
            <header className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-card sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                        <div className="flex items-center gap-3">
                            <Image src="/adxc-logo-primary-horizontal.svg" alt="ADXC" width={60} height={22} priority />
                            <span className="text-neutral-300 select-none">×</span>
                            <Image src="/dept-logo.svg" alt="DEPT®" width={60} height={22} />
                        </div>
                        <div className="hidden sm:block w-px h-5 bg-neutral-200 shrink-0" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">revenue calculator</span>
                    </div>
                </div>
            </header>

            {/* Body — full height split background */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">

                {/* LEFT — light background */}
                <div className="flex-1 bg-background px-6 sm:px-12 py-8 min-w-0 flex items-center justify-end lg:overflow-y-auto">
                    <div className="w-full max-w-lg pr-0 lg:pr-12 flex flex-col gap-5">

                        {/* Mobile summary */}
                        <div className="lg:hidden space-y-3">
                            <div className="space-y-1">
                                <p className="text-base font-semibold text-foreground">{SUBTITLE_HEADING}</p>
                                <p className="text-sm text-muted-foreground">{SUBTITLE_BODY}</p>
                            </div>
                            <div className="bg-primary text-primary-foreground rounded-xl p-4">
                                <SummaryPanel {...summaryProps} mobile />
                            </div>
                        </div>

                        {/* Subtitle — desktop */}
                        <div className="hidden lg:block space-y-1 mb-4">
                            <p className="text-base font-semibold text-foreground">{SUBTITLE_HEADING}</p>
                            <p className="text-sm text-muted-foreground">{SUBTITLE_BODY}</p>
                        </div>

                        {/* Tier cards */}
                        <div className="space-y-2 lg:space-y-3">
                            <Tier1Card state={tier1} onChange={(next) => setTier1((prev) => ({ ...prev, ...next }))} />
                            <Tier2Card state={tier2} onChange={(next) => setTier2((prev) => ({ ...prev, ...next }))} />
                        </div>
                    </div>
                </div>

                {/* RIGHT — full plum background */}
                <div className="hidden lg:flex w-[50vw] shrink-0 bg-primary text-primary-foreground px-12 xl:px-20 py-12 items-center justify-start overflow-y-auto">
                    <div className="w-full max-w-sm">
                        <SummaryPanel {...summaryProps} />
                    </div>
                </div>

            </div>

            {/* Footer */}
            <footer className="px-4 sm:px-6 py-4 border-t border-border bg-background">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-xs text-muted-foreground">Confidential. DEPT® internal use only</span>
                    <span className="text-xs text-muted-foreground" suppressHydrationWarning>© {new Date().getFullYear()} ADXC</span>
                </div>
            </footer>

        </div>
    )
}