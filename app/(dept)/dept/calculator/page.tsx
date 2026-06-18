"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"

// ─── Constants ────────────────────────────────────────────────────────────────

const ADXC_NET_REVENUE_RATE = 0.50 // hidden from UI

const TIERS = [
    {
        id: 1,
        label: "Client Resell",
        description: "Clients use ADXC through D",
        rate: 0.25,
        rateLabel: "25%",
        note: "All direct client usage via D",
    },
    {
        id: 2,
        label: "Internal Use",
        description: "DEPT® internal usage + topups through D",
        rate: 0.10,
        rateLabel: "10%",
        note: "All internal usage via D",
    },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`
    return `$${value.toFixed(0)}`
}

function formatCurrencyFull(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value)
}

function clampClients(v: number) {
    return Math.max(0, Math.min(50, Math.round(v)))
}

function clampSpend(v: number) {
    return Math.max(0, v)
}

// ─── Copy ─────────────────────────────────────────────────────────────────────

const SUBTITLE = "Calculate how much DEPT® can earn through usage of ADXC via DEPT®'s AI platform (D). ADXC pays DEPT® a platform fee, calculated as a % of ADXC net revenue*, based on usage type."

type TierState = {
    clients: number
    annualSpend: number
}

// ─── Tier Input Card ──────────────────────────────────────────────────────────

function TierInputCard({
    tier,
    state,
    onChange,
}: {
    tier: typeof TIERS[0]
    state: TierState
    onChange: (next: Partial<TierState>) => void
}) {
    const [clientsStr, setClientsStr] = useState(String(state.clients))
    const [spendStr, setSpendStr] = useState(String(state.annualSpend))

    return (
        <Card>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-border">

                    {/* LEFT — tier info */}
                    <div className="p-4 space-y-1.5">
                        <Badge variant="default" className="text-xs font-semibold tabular-nums">
                            {tier.rateLabel}
                        </Badge>
                        <p className="text-sm font-semibold leading-snug">
                            Tier {tier.id} — {tier.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                            {tier.description}
                        </p>
                        <p className="text-xs text-muted-foreground italic">{tier.note}</p>
                    </div>

                    {/* RIGHT — inputs */}
                    <div className="p-4 space-y-4">

                        {/* Number of clients — slider + input */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs text-muted-foreground">No. of clients</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={50}
                                    value={clientsStr}
                                    onChange={(e) => setClientsStr(e.target.value)}
                                    onBlur={() => {
                                        const clamped = clampClients(Number(clientsStr))
                                        setClientsStr(String(clamped))
                                        onChange({ clients: clamped })
                                    }}
                                    className="w-20 h-7 text-sm text-right tabular-nums px-2"
                                />
                            </div>
                            <Slider
                                min={0}
                                max={50}
                                step={1}
                                value={[state.clients]}
                                onValueChange={([v]) => {
                                    setClientsStr(String(v))
                                    onChange({ clients: v })
                                }}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0</span><span>50</span>
                            </div>
                        </div>

                        {/* Avg annual spend — text input only */}
                        <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Avg. annual spend per client</Label>
                            <div className="inline-flex items-center rounded-xs border border-input bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 transition-colors">
                                <span className="px-2.5 text-sm text-muted-foreground border-r border-input bg-muted/40 h-7 flex items-center rounded-l-xs select-none">
                                    $
                                </span>
                                <input
                                    type="number"
                                    min={0}
                                    value={spendStr}
                                    onChange={(e) => setSpendStr(e.target.value)}
                                    onBlur={() => {
                                        const clamped = clampSpend(Number(spendStr))
                                        setSpendStr(String(clamped))
                                        onChange({ annualSpend: clamped })
                                    }}
                                    className="w-32 h-7 text-sm tabular-nums px-2 bg-transparent outline-none placeholder:text-muted-foreground"
                                    placeholder="100,000"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ─── Summary Panel ────────────────────────────────────────────────────────────

function SummaryPanel({
    tiers,
    tierResults,
    view,
    setView,
    totalDeptEarning,
    displayEarning,
    mobile = false,
}: {
    tiers: TierState[]
    tierResults: { deptEarning: number }[]
    view: "annual" | "monthly"
    setView: (v: "annual" | "monthly") => void
    totalDeptEarning: number
    displayEarning: number
    mobile?: boolean
}) {
    const [breakdownOpen, setBreakdownOpen] = useState(false)

    return (
        <Card className="overflow-hidden bg-primary text-primary-foreground border-0 h-full flex flex-col">
            <CardContent className="p-5 sm:p-8 flex flex-col flex-1">

                {/* Toggle */}
                <div className="flex items-center gap-1 bg-primary-foreground/10 rounded-xs p-0.5 w-fit mb-10">
                    {(["annual", "monthly"] as const).map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors capitalize ${view === v
                                ? "bg-primary-foreground text-primary"
                                : "text-primary-foreground/70 hover:text-primary-foreground"
                                }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                {/* Hero number */}
                <div className="space-y-2 mb-6 sm:mb-12">
                    <p className="text-xs text-primary-foreground/60 uppercase tracking-widest">
                        Estimated DEPT® earnings
                    </p>
                    <p className="text-5xl sm:text-7xl lg:text-8xl font-semibold tabular-nums tracking-tight leading-none">
                        {formatCurrency(displayEarning)}
                    </p>
                    <p className="text-sm text-primary-foreground/60">
                        {view === "annual" ? "per year" : "per month avg."}
                    </p>
                </div>

                <Separator className="bg-primary-foreground/20 mb-8" />

                {/* Per-tier breakdown — collapsible on mobile */}
                <div className="space-y-4 flex-1">
                    {mobile && (
                        <button
                            onClick={() => setBreakdownOpen((o) => !o)}
                            className="flex items-center justify-between w-full text-sm text-primary-foreground/80 font-medium"
                        >
                            <span>Breakdown by tier</span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${breakdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                    )}

                    {(!mobile || breakdownOpen) && (
                        <div className="space-y-6">
                            {TIERS.map((tier, i) => (
                                <div key={tier.id} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-primary-foreground/80 font-medium">
                                            Tier {tier.id} — {tier.label}
                                        </span>
                                        <span className="tabular-nums font-semibold">
                                            {formatCurrencyFull(
                                                view === "annual"
                                                    ? tierResults[i].deptEarning
                                                    : tierResults[i].deptEarning / 12
                                            )}
                                        </span>
                                    </div>
                                    <p className="text-xs text-primary-foreground/50">
                                        {tiers[i].clients} client{tiers[i].clients !== 1 ? "s" : ""} × {formatCurrency(tiers[i].annualSpend)} × {tier.rateLabel}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Note — pinned to bottom */}
                <div className="mt-auto pt-8">
                    <Separator className="bg-primary-foreground/20 mb-4" />
                    <p className="text-xs text-primary-foreground/50 leading-relaxed">
                        *ADXC net revenue = 50% total revenue
                    </p>
                </div>

            </CardContent>
        </Card>
    )
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

const DEFAULT_STATE: TierState[] = [
    { clients: 5, annualSpend: 100_000 },
    { clients: 3, annualSpend: 100_000 },
]

export default function DeptCalculatorPage() {
    const [tiers, setTiers] = useState<TierState[]>(DEFAULT_STATE)
    const [view, setView] = useState<"annual" | "monthly">("annual")

    function updateTier(index: number, next: Partial<TierState>) {
        setTiers((prev) => prev.map((t, i) => (i === index ? { ...t, ...next } : t)))
    }

    const tierResults = TIERS.map((tier, i) => {
        const adxcNetRevenue = tiers[i].clients * tiers[i].annualSpend * ADXC_NET_REVENUE_RATE
        const deptEarning = adxcNetRevenue * tier.rate
        return { adxcNetRevenue, deptEarning }
    })

    const totalDeptEarning = tierResults.reduce((s, r) => s + r.deptEarning, 0)
    const displayEarning = view === "annual" ? totalDeptEarning : totalDeptEarning / 12

    const summaryProps = { tiers, tierResults, view, setView, totalDeptEarning, displayEarning }

    return (
        <div className="min-h-screen flex flex-col bg-background">

            {/* Header */}
            <header className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-card sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/adxc-logo-primary-horizontal.svg"
                                alt="ADXC"
                                width={60}
                                height={22}
                            />
                            <span className="text-neutral-300 select-none">×</span>
                            <Image
                                src="/dept-logo.svg"
                                alt="DEPT®"
                                width={60}
                                height={22}
                            />
                        </div>
                        <div className="hidden sm:block w-px h-5 bg-neutral-200 shrink-0" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
                            revenue calculator
                        </span>
                    </div>
                </div>
            </header>

            {/* Body */}
            <main className="flex-1 px-4 py-8 md:px-8 md:py-16">
                <div className="max-w-6xl mx-auto">

                    {/* Mobile: subtitle + summary on top */}
                    <div className="lg:hidden mb-6 space-y-4">
                        <p className="text-sm text-muted-foreground">{SUBTITLE}</p>
                        <SummaryPanel {...summaryProps} mobile />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6 items-stretch">

                        {/* ── LEFT: Inputs ── */}
                        <div className="flex flex-col justify-between gap-4">
                            <p className="text-sm text-muted-foreground hidden lg:block max-w-md mb-2">{SUBTITLE}</p>
                            <div className="space-y-4">
                                {TIERS.map((tier, i) => (
                                    <TierInputCard
                                        key={tier.id}
                                        tier={tier}
                                        state={tiers[i]}
                                        onChange={(next) => updateTier(i, next)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: Summary (desktop only) ── */}
                        <div className="hidden lg:flex flex-col lg:sticky lg:top-[73px]">
                            <SummaryPanel {...summaryProps} />
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-4 sm:px-6 py-4 border-t border-border">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-xs text-muted-foreground">
                        Confidential. DEPT® internal use only
                    </span>
                    <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                        © {new Date().getFullYear()} ADXC
                    </span>
                </div>
            </footer>

        </div>
    )
}