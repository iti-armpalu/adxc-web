"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Database, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ConnectionLines } from "./connection-lines"
import {
    ANIMATION_DURATION, ANIMATION_EASING,
    PROVIDER_SCATTERED_POSITIONS, AGENT_SCATTERED_POSITIONS,
    PROVIDERS_ALL, AGENTS_ALL, WORKFLOW_TASKS, DEFAULT_SUBTASK_LABEL,
} from "./constants"
import type { AnimationState, SquarePosition } from "./types"

function useIsSm() {
    const [isSm, setIsSm] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 640px)")
        const onChange = () => setIsSm(mq.matches)
        onChange()
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])
    return isSm
}

export function PlatformDiagram() {
    const isSm = useIsSm()
    const prefersReducedMotion = useReducedMotion()
    const SIZE = isSm ? 36 : 52
    const providers = PROVIDERS_ALL
    const providerCount = providers.length

    // Refs
    const containerRef = useRef<HTMLDivElement>(null)
    const cardWrapRef = useRef<HTMLDivElement>(null)
    const slotRefs = useRef<(HTMLDivElement | null)[]>([])
    const agentSlotRefs = useRef<(HTMLDivElement | null)[]>([])
    const providerContainerRefs = useRef<(HTMLDivElement | null)[]>([])
    const agentContainerRefs = useRef<(HTMLDivElement | null)[]>([])
    const adxcRef = useRef<HTMLDivElement>(null)
    const internalDataRef = useRef<HTMLDivElement>(null)
    const taskColumnRefs = useRef<(HTMLDivElement | null)[]>([])
    const tasksScrollRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef(false)
    // Tracks when user explicitly cleared a selection — prevents auto-select re-firing
    const userClearedRef = useRef(false)

    // Selection state
    const [selectedSubtaskLabel, setSelectedSubtaskLabel] = useState<string | null>(null)
    const [selectedTaskColumnEl, setSelectedTaskColumnEl] = useState<HTMLElement | null>(null)
    const [highlightedAgentIndex, setHighlightedAgentIndex] = useState(0)
    const [highlightedProviderIndex, setHighlightedProviderIndex] = useState<number[]>([])
    const isActive = !!selectedSubtaskLabel && !!selectedTaskColumnEl

    // Animation state
    const scatteredPositions = useRef<SquarePosition[]>([])
    const slottedPositions = useRef<SquarePosition[]>([])
    const agentScatteredPositions = useRef<SquarePosition[]>([])
    const agentSlottedPositions = useRef<SquarePosition[]>([])
    const [animationState, setAnimationState] = useState<AnimationState>("scattered")
    const currentStateRef = useRef<AnimationState>("scattered")
    const [providerSquarePositions, setProviderSquarePositions] = useState<SquarePosition[]>([])
    const [agentSquarePositions, setAgentSquarePositions] = useState<SquarePosition[]>([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        slotRefs.current = slotRefs.current.slice(0, providerCount)
        providerContainerRefs.current = providerContainerRefs.current.slice(0, providerCount)
        agentSlotRefs.current = agentSlotRefs.current.slice(0, AGENTS_ALL.length)
        agentContainerRefs.current = agentContainerRefs.current.slice(0, AGENTS_ALL.length)
    }, [providerCount])

    const calculateProviderScattered = useCallback((): SquarePosition[] => {
        if (!containerRef.current) return []
        const rect = containerRef.current.getBoundingClientRect()
        return PROVIDER_SCATTERED_POSITIONS.slice(0, providerCount).map((pos) => ({
            x: (parseFloat(pos.x) / 100) * rect.width - SIZE / 2,
            y: (parseFloat(pos.y) / 100) * rect.height - SIZE / 2,
            rotate: pos.rotate, scale: 1,
        }))
    }, [providerCount, SIZE])

    const calculateProviderSlotted = useCallback((): SquarePosition[] => {
        if (!containerRef.current) return []
        const containerRect = containerRef.current.getBoundingClientRect()
        return slotRefs.current.slice(0, providerCount).map((slot) => {
            if (!slot) return { x: 0, y: 0, rotate: 0, scale: 1 }
            const r = slot.getBoundingClientRect()
            return { x: r.left - containerRect.left, y: r.top - containerRect.top, rotate: 0, scale: 1 }
        })
    }, [providerCount])

    const calculateAgentScattered = useCallback((): SquarePosition[] => {
        if (!containerRef.current) return []
        const rect = containerRef.current.getBoundingClientRect()
        return AGENT_SCATTERED_POSITIONS.slice(0, AGENTS_ALL.length).map((pos) => ({
            x: (parseFloat(pos.x) / 100) * rect.width - SIZE / 2,
            y: (parseFloat(pos.y) / 100) * rect.height - SIZE / 2,
            rotate: pos.rotate, scale: 1,
        }))
    }, [SIZE])

    const calculateAgentSlotted = useCallback((): SquarePosition[] => {
        if (!containerRef.current) return []
        const containerRect = containerRef.current.getBoundingClientRect()
        return agentSlotRefs.current.map((slot) => {
            if (!slot) return { x: 0, y: 0, rotate: 0, scale: 1 }
            const r = slot.getBoundingClientRect()
            return { x: r.left - containerRect.left, y: r.top - containerRect.top, rotate: 0, scale: 1 }
        })
    }, [])

    // Init + resize
    useEffect(() => {
        const init = () => {
            if (!containerRef.current) return
            const pScatter = calculateProviderScattered()
            const pSlot = calculateProviderSlotted()
            const aScatter = calculateAgentScattered()
            const aSlot = calculateAgentSlotted()
            if (pScatter.length === 0 || pSlot.length === 0) return
            scatteredPositions.current = pScatter
            slottedPositions.current = pSlot
            agentScatteredPositions.current = aScatter
            agentSlottedPositions.current = aSlot
            currentStateRef.current = "scattered"
            setAnimationState("scattered")
            setProviderSquarePositions(pScatter)
            setAgentSquarePositions(aScatter)
            setIsReady(true)
        }
        requestAnimationFrame(() => requestAnimationFrame(init))

        const onResize = () => {
            const pScatter = calculateProviderScattered()
            const pSlot = calculateProviderSlotted()
            const aScatter = calculateAgentScattered()
            const aSlot = calculateAgentSlotted()
            if (pScatter.length) scatteredPositions.current = pScatter
            if (pSlot.length) slottedPositions.current = pSlot
            if (aScatter.length) agentScatteredPositions.current = aScatter
            if (aSlot.length) agentSlottedPositions.current = aSlot
            setProviderSquarePositions(currentStateRef.current === "scattered" ? pScatter : pSlot)
            setAgentSquarePositions(currentStateRef.current === "scattered" ? aScatter : aSlot)
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [calculateProviderScattered, calculateProviderSlotted, calculateAgentScattered, calculateAgentSlotted])

    // IntersectionObserver — scatter ↔ slot on scroll
    useEffect(() => {
        if (!isReady || !cardWrapRef.current) return
        const triggerRatio = isSm ? 0.35 : 0.6
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (!entry) return
            const shouldSlot = entry.isIntersecting && entry.intersectionRatio >= triggerRatio
            const newState: AnimationState = shouldSlot ? "slotted" : "scattered"
            if (newState === currentStateRef.current) return
            currentStateRef.current = newState
            setAnimationState(newState)
            const p = newState === "scattered" ? scatteredPositions.current : slottedPositions.current
            const a = newState === "scattered" ? agentScatteredPositions.current : agentSlottedPositions.current
            if (p.length) setProviderSquarePositions(p)
            if (a.length) setAgentSquarePositions(a)
        }, { threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1] })
        observer.observe(cardWrapRef.current)
        return () => observer.disconnect()
    }, [isReady, isSm])

    // Subtask lookup
    const getRouteForSubtask = useCallback((label: string) => {
        return WORKFLOW_TASKS.flatMap((t) => t.subtasks).find((s) => s.label === label) ?? null
    }, [])

    // Auto-select default subtask once slotted — only if user hasn't explicitly cleared
    useEffect(() => {
        if (animationState !== "slotted") return
        if (selectedSubtaskLabel) return
        if (userClearedRef.current) return
        const route = getRouteForSubtask(DEFAULT_SUBTASK_LABEL)
        if (!route) return
        const taskIdx = WORKFLOW_TASKS.findIndex((t) => t.subtasks.some((s) => s.label === DEFAULT_SUBTASK_LABEL))
        if (taskIdx === -1) return
        const colEl = taskColumnRefs.current[taskIdx]
        if (!colEl) return
        setSelectedSubtaskLabel(DEFAULT_SUBTASK_LABEL)
        setSelectedTaskColumnEl(colEl)
        setHighlightedAgentIndex(route.agentIndex)
        setHighlightedProviderIndex(route.providerIndex)
    }, [animationState, selectedSubtaskLabel, getRouteForSubtask])

    // Click handler
    const handleSubtaskSelect = useCallback((subtaskLabel: string, taskColumnEl: HTMLElement) => {
        if (currentStateRef.current !== "slotted") return
        if (selectedSubtaskLabel === subtaskLabel) {
            // User explicitly toggled off — remember so auto-select doesn't re-fire
            userClearedRef.current = true
            setSelectedSubtaskLabel(null)
            setSelectedTaskColumnEl(null)
            setHighlightedProviderIndex([])
            setHighlightedAgentIndex(0)
            return
        }
        // User selected something new — clear the explicit-clear flag
        userClearedRef.current = false
        const route = getRouteForSubtask(subtaskLabel)
        if (!route) return
        setSelectedSubtaskLabel(subtaskLabel)
        setSelectedTaskColumnEl(taskColumnEl)
        setHighlightedAgentIndex(route.agentIndex)
        setHighlightedProviderIndex(route.providerIndex)
    }, [getRouteForSubtask, selectedSubtaskLabel])

    const squareBase = "absolute z-20 rounded-lg flex items-center justify-center transition-colors duration-300"
    const squareActive = "bg-foreground/10 border-2 border-foreground/40"
    const squareInactive = "bg-muted border border-border"

    return (
        <div ref={containerRef} className="relative w-full">

            {/* Connection lines */}
            {animationState === "slotted" && isActive && (
                <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full text-foreground">
                    <ConnectionLines
                        containerRef={containerRef}
                        adxcRef={adxcRef}
                        internalDataRef={internalDataRef}
                        providerContainerRefs={providerContainerRefs}
                        agentContainerRefs={agentContainerRefs}
                        highlightedAgentIndex={highlightedAgentIndex}
                        highlightedProviderIndex={highlightedProviderIndex}
                        taskColumnEl={selectedTaskColumnEl}
                        tasksScrollRef={tasksScrollRef}
                    />
                </svg>
            )}

            {/* Provider squares */}
            {isReady && providerSquarePositions.slice(0, providerCount).map((pos, index) => {
                const isHighlighted = isActive && highlightedProviderIndex.includes(index)
                return (
                    <motion.div
                        key={`provider-${index}`}
                        className={`${squareBase} ${isHighlighted ? squareActive : squareInactive}`}
                        style={{ width: SIZE, height: SIZE, willChange: isAnimating.current ? "transform" : "auto" }}
                        initial={false}
                        animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: isHighlighted ? 1.1 : pos.scale }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
                        onAnimationStart={() => { isAnimating.current = true }}
                        onAnimationComplete={() => { isAnimating.current = false }}
                    >
                        <Database className={`w-5 h-5 transition-colors duration-300 ${isHighlighted ? "text-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
                    </motion.div>
                )
            })}

            {/* Agent squares */}
            {isReady && agentSquarePositions.map((pos, index) => {
                const isHighlighted = isActive && highlightedAgentIndex === index
                return (
                    <motion.div
                        key={`agent-${index}`}
                        className={`${squareBase} ${isHighlighted ? squareActive : squareInactive}`}
                        style={{ width: SIZE, height: SIZE, willChange: isAnimating.current ? "transform" : "auto" }}
                        initial={false}
                        animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: isHighlighted ? 1.1 : pos.scale }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
                        onAnimationStart={() => { isAnimating.current = true }}
                        onAnimationComplete={() => { isAnimating.current = false }}
                    >
                        <Sparkles className={`w-5 h-5 transition-colors duration-300 ${isHighlighted ? "text-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
                    </motion.div>
                )
            })}

            {/* Card */}
            <div ref={cardWrapRef} className="relative z-0 flex justify-center">
                <Card className="bg-background border border-border/40 shadow-none py-0 max-w-full">
                    <CardContent className="relative p-4 md:p-8">

                        {/* Data Providers */}
                        <div className="space-y-2">
                            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
                                Example data providers
                            </h3>
                            <div className="rounded-xl p-2 border border-border/30">
                                <div className="flex gap-4 sm:gap-8 md:gap-16 justify-center">
                                    {providers.map((provider, index) => (
                                        <div
                                            key={provider.name}
                                            className="flex flex-col items-center gap-3 w-[50px] md:w-[70px]"
                                            ref={(el) => { providerContainerRefs.current[index] = el }}
                                        >
                                            <div
                                                ref={(el) => { slotRefs.current[index] = el }}
                                                className={`rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/40"}`}
                                                style={{ width: SIZE, height: SIZE }}
                                            />
                                            <p className="text-xs text-muted-foreground text-center">{provider.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ADXC + Internal Data */}
                        <div className="mt-16 sm:mt-12 relative">
                            <div className="grid grid-cols-[2fr_auto_1fr] gap-0 items-center">
                                <motion.div
                                    ref={adxcRef}
                                    className="w-full bg-foreground rounded-xl flex items-center justify-center p-2 sm:p-4"
                                >
                                    <span className="text-xl sm:text-3xl text-background font-semibold tracking-widest">
                                        ADXC
                                    </span>
                                </motion.div>

                                <div className="flex items-center justify-center px-4">
                                    <div className="w-4 sm:w-16 h-[1px]"
                                        style={{ background: "repeating-linear-gradient(90deg, hsl(var(--border)) 0, hsl(var(--border)) 4px, transparent 4px, transparent 12px)" }}
                                    />
                                </div>

                                <div ref={internalDataRef}>
                                    <div className="w-full bg-muted rounded-xl flex items-center justify-center p-2 sm:p-4 border border-border">
                                        <span className="text-xs md:text-sm font-medium text-muted-foreground text-center">
                                            Internal / 1P Data
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Agentic Ecosystem */}
                        <div className="mt-12 sm:mt-8 space-y-2">
                            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
                                Your AI agentic ecosystem
                            </h3>
                            <div className="rounded-xl p-2 border border-border/30">
                                <div className="flex gap-4 sm:gap-8 md:gap-16 justify-center">
                                    {AGENTS_ALL.map((agent, index) => (
                                        <div
                                            key={agent.name}
                                            className="flex flex-col items-center gap-3 w-[60px]"
                                            ref={(el) => { agentContainerRefs.current[index] = el }}
                                        >
                                            <div
                                                ref={(el) => { agentSlotRefs.current[index] = el }}
                                                className={`rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/30"}`}
                                                style={{ width: SIZE, height: SIZE }}
                                            />
                                            <p className="text-xs text-muted-foreground text-center">
                                                {agent.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Workflow Tasks */}
                        <div className="mt-12 sm:mt-8 space-y-2">
                            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
                                Example marketing tasks by stage
                            </h3>
                            <div className="rounded-xl border border-border/30 p-2">
                                <div ref={tasksScrollRef} className="-mx-2 overflow-x-auto px-2">
                                    <div className="grid grid-cols-5 gap-1" style={{ minWidth: 900 }}>
                                        {WORKFLOW_TASKS.map((item, taskIdx) => (
                                            <div
                                                key={item.task}
                                                className="p-2"
                                                data-task-column
                                                ref={(el) => { taskColumnRefs.current[taskIdx] = el }}
                                            >
                                                <p className="mb-3 flex min-h-[40px] w-full items-center justify-center rounded-full bg-muted px-2 text-center text-xs font-medium text-foreground">
                                                    {item.task}
                                                </p>
                                                <div className="flex flex-col items-center gap-2">
                                                    {item.subtasks.map((subtask) => {
                                                        const isSelected = selectedSubtaskLabel === subtask.label
                                                        return (
                                                            <span
                                                                key={subtask.label}
                                                                className={`relative flex w-full cursor-pointer items-center justify-center rounded-full border px-1 py-1 text-center text-xs transition-colors duration-200 ${isSelected
                                                                        ? "border-foreground/40 bg-foreground/10 text-foreground"
                                                                        : "border-transparent bg-muted/60 text-muted-foreground hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
                                                                    }`}
                                                                onClick={(e) => {
                                                                    const col = e.currentTarget.closest("[data-task-column]") as HTMLElement | null
                                                                    if (!col) return
                                                                    handleSubtaskSelect(subtask.label, col)
                                                                }}
                                                            >
                                                                <span className="relative">{subtask.label}</span>
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground opacity-60" />
                                </span>
                                <p className="text-xs text-muted-foreground/80">
                                    Click on different subtasks to see how data flows change
                                </p>
                            </div>
                        </div>

                        <p className="mx-auto mt-6 max-w-3xl text-center text-xs italic text-muted-foreground">
                            For illustrative purposes only
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}