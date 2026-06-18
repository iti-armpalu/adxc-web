"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// ─── Constants ────────────────────────────────────────────────────────────────

const ADXC_NET_REVENUE_RATE = 0.50 // hidden from UI — ADXC takes 50% of total spend as net revenue

const TIERS = [
    {
        id: 1,
        label: "Introduce",
        description: "Simple intro; DEPT® not materially involved in billing, usage and topups",
        rate: 0.10,
        rateLabel: "10%",
        note: "First 24 months",
    },
    {
        id: 2,
        label: "Manage",
        description: "DEPT® drives deal and manages billing, usage and topups",
        rate: 0.12,
        rateLabel: "12%",
        note: "As long as relationship maintained",
    },
    {
        id: 3,
        label: "Integrate",
        description: "Clients use ADXC through DEPT®'s AI platform",
        rate: 0.25,
        rateLabel: "25%",
        note: "All usage via platform",
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
    return Math.max(0, Math.min(500_000, Math.round(v / 1000) * 1000))
}

// ─── Types ────────────────────────────────────────────────────────────────────

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
                        <Badge variant="secondary" className="text-xs font-semibold tabular-nums">
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

                    {/* RIGHT — sliders */}
                    <div className="p-4 space-y-4">

                        {/* Number of clients */}
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

                        {/* Avg annual spend */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs text-muted-foreground">Avg. annual spend</Label>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-muted-foreground">$</span>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={500_000}
                                        step={1000}
                                        value={spendStr}
                                        onChange={(e) => setSpendStr(e.target.value)}
                                        onBlur={() => {
                                            const clamped = clampSpend(Number(spendStr))
                                            setSpendStr(String(clamped))
                                            onChange({ annualSpend: clamped })
                                        }}
                                        className="w-28 h-7 text-sm text-right tabular-nums px-2"
                                    />
                                </div>
                            </div>
                            <Slider
                                min={0}
                                max={500_000}
                                step={1000}
                                value={[state.annualSpend]}
                                onValueChange={([v]) => {
                                    setSpendStr(String(v))
                                    onChange({ annualSpend: v })
                                }}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>$0</span><span>$500k</span>
                            </div>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

const DEFAULT_STATE: TierState[] = [
    { clients: 5, annualSpend: 100_000 },
    { clients: 3, annualSpend: 100_000 },
    { clients: 2, annualSpend: 100_000 },
]

// Display order: Tier 3 → 2 → 1 (reversed)
const DISPLAY_TIERS = [...TIERS].reverse()

export default function DeptCalculatorPage() {
    const [tiers, setTiers] = useState<TierState[]>(DEFAULT_STATE)
    const [view, setView] = useState<"annual" | "monthly">("annual")

    function updateTier(index: number, next: Partial<TierState>) {
        setTiers((prev) => prev.map((t, i) => (i === index ? { ...t, ...next } : t)))
    }

    // Calculations always use TIERS order (0=Introduce, 1=Manage, 2=Integrate)
    const tierResults = TIERS.map((tier, i) => {
        const adxcNetRevenue = tiers[i].clients * tiers[i].annualSpend * ADXC_NET_REVENUE_RATE
        const deptEarning = adxcNetRevenue * tier.rate
        return { adxcNetRevenue, deptEarning }
    })

    const totalDeptEarning = tierResults.reduce((s, r) => s + r.deptEarning, 0)
    const displayEarning = view === "annual" ? totalDeptEarning : totalDeptEarning / 12

    return (
        <div className="min-h-screen flex flex-col bg-background">

            {/* Header */}
            <header className="px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
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
                        <div className="w-px h-6 bg-neutral-200" />
                        <span className="text-caption text-muted-foreground block">
                            revenue calculator
                        </span>
                    </div>
                </div>
            </header>

            {/* Body */}
            <main className="flex-1 px-4 py-8 md:px-8 md:py-10">
                <div className="max-w-7xl mx-auto">

                    <p className="text-sm text-muted-foreground mb-6">
                        Estimate DEPT®'s annual revenue share based on client portfolio and engagement tier.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 items-stretch">

                        {/* ── LEFT: Inputs — displayed Tier 3 → 2 → 1 ── */}
                        <div className="space-y-4">
                            {DISPLAY_TIERS.map((tier) => {
                                const i = TIERS.indexOf(tier)
                                return (
                                    <TierInputCard
                                        key={tier.id}
                                        tier={tier}
                                        state={tiers[i]}
                                        onChange={(next) => updateTier(i, next)}
                                    />
                                )
                            })}
                        </div>

                        {/* ── RIGHT: Summary ── */}
                        <div className="lg:sticky lg:top-[73px]">
                            <Card className="overflow-hidden bg-primary text-primary-foreground border-0 h-full">
                                <CardContent className="p-8 space-y-8">

                                    {/* Toggle */}
                                    <div className="flex items-center gap-1 bg-primary-foreground/10 rounded-xs p-0.5 w-fit">
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
                                    <div className="space-y-1">
                                        <p className="text-xs text-primary-foreground/60 uppercase tracking-widest">
                                            Estimated DEPT® earnings
                                        </p>
                                        <p className="text-6xl font-semibold tabular-nums tracking-tight">
                                            {formatCurrency(displayEarning)}
                                        </p>
                                        <p className="text-sm text-primary-foreground/60">
                                            {view === "annual" ? "per year" : "per month avg."}
                                        </p>
                                    </div>

                                    <Separator className="bg-primary-foreground/20" />

                                    {/* Per-tier breakdown — also Tier 3 → 2 → 1 */}
                                    <div className="space-y-6">
                                        {DISPLAY_TIERS.map((tier) => {
                                            const i = TIERS.indexOf(tier)
                                            return (
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
                                            )
                                        })}
                                    </div>

                                    <Separator className="bg-primary-foreground/20" />

                                    {/* Note */}
                                    <p className="text-xs text-primary-foreground/50 leading-relaxed">
                                        ADXC pays DEPT® a fee for getting clients to use ADXC, calculated as a % of ADXC net revenue. The % is based on DEPT®'s level of involvement.
                                    </p>

                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-4 border-t border-border mt-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
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