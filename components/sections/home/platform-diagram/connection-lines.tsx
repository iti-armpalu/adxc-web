"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

type Path = { d: string; isOneWay?: boolean }

type Props = {
    containerRef: React.RefObject<HTMLDivElement | null>
    adxcRef: React.RefObject<HTMLDivElement | null>
    internalDataRef: React.RefObject<HTMLDivElement | null>
    providerContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    agentContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    highlightedAgentIndex: number
    highlightedProviderIndex: number[]
    taskColumnEl: HTMLElement | null
    tasksScrollRef: React.RefObject<HTMLDivElement | null>
}

function createCurvedPath(x1: number, y1: number, x2: number, y2: number): string {
    const midY = y1 + (y2 - y1) * 0.5
    const cornerRadius = Math.min(Math.abs(x2 - x1) * 0.3, Math.abs(y2 - y1) * 0.3, 30)
    const goingUp = y2 < y1
    const goingRight = x2 > x1

    if (goingUp) {
        const cornerY = midY + cornerRadius
        const cornerEndY = midY - cornerRadius
        return `M ${x1} ${y1} L ${x1} ${cornerY} Q ${x1} ${midY}, ${x1 + (goingRight ? cornerRadius : -cornerRadius)} ${midY} L ${x2 - (goingRight ? cornerRadius : -cornerRadius)} ${midY} Q ${x2} ${midY}, ${x2} ${cornerEndY} L ${x2} ${y2}`
    } else {
        const cornerY = midY - cornerRadius
        const cornerEndY = midY + cornerRadius
        return `M ${x1} ${y1} L ${x1} ${cornerY} Q ${x1} ${midY}, ${x1 + (goingRight ? cornerRadius : -cornerRadius)} ${midY} L ${x2 - (goingRight ? cornerRadius : -cornerRadius)} ${midY} Q ${x2} ${midY}, ${x2} ${cornerEndY} L ${x2} ${y2}`
    }
}

export function ConnectionLines({
    containerRef, adxcRef, internalDataRef,
    providerContainerRefs, agentContainerRefs,
    highlightedAgentIndex, highlightedProviderIndex,
    taskColumnEl, tasksScrollRef,
}: Props) {
    const [paths, setPaths] = useState<Path[]>([])

    const recalc = useCallback(() => {
        const container = containerRef.current
        const adxc = adxcRef.current
        const internalData = internalDataRef.current
        const agentContainer = agentContainerRefs.current[highlightedAgentIndex]
        if (!container || !adxc || !agentContainer || !taskColumnEl) return

        const containerRect = container.getBoundingClientRect()
        const adxcRect = adxc.getBoundingClientRect()
        const taskRect = taskColumnEl.getBoundingClientRect()
        const agentRect = agentContainer.getBoundingClientRect()

        const newPaths: Path[] = []

        const taskX = taskRect.left - containerRect.left + taskRect.width / 2
        const taskY = taskRect.top - containerRect.top
        const agentX = agentRect.left - containerRect.left + agentRect.width / 2
        const agentTopY = agentRect.top - containerRect.top
        const agentBottomY = agentRect.bottom - containerRect.top
        const adxcX = adxcRect.left - containerRect.left + adxcRect.width / 2
        const adxcTopY = adxcRect.top - containerRect.top
        const adxcBottomY = adxcRect.bottom - containerRect.top

        newPaths.push({ d: createCurvedPath(taskX, taskY, agentX, agentBottomY + 5) })
        newPaths.push({ d: createCurvedPath(agentX, agentTopY - 5, adxcX, adxcBottomY + 5) })

        highlightedProviderIndex.forEach((providerIndex) => {
            const providerContainer = providerContainerRefs.current[providerIndex]
            if (!providerContainer) return
            const r = providerContainer.getBoundingClientRect()
            const px = r.left - containerRect.left + r.width / 2
            const py = r.bottom - containerRect.top
            newPaths.push({ d: createCurvedPath(adxcX, adxcTopY - 5, px, py + 5) })
        })

        if (internalData) {
            const internalRect = internalData.getBoundingClientRect()
            const internalLeftX = internalRect.left - containerRect.left
            const adxcRightX = adxcRect.right - containerRect.left
            const adxcCenterY = adxcRect.top - containerRect.top + adxcRect.height / 2
            newPaths.push({
                d: `M ${internalLeftX - 5} ${adxcCenterY} L ${adxcRightX + 5} ${adxcCenterY}`,
                isOneWay: true,
            })
        }

        setPaths(newPaths)
    }, [containerRef, adxcRef, internalDataRef, providerContainerRefs, agentContainerRefs, highlightedAgentIndex, highlightedProviderIndex, taskColumnEl])

    useEffect(() => { recalc() }, [recalc])

    useEffect(() => {
        const scroller = tasksScrollRef.current
        if (!scroller) return
        let raf = 0
        const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(recalc) }
        scroller.addEventListener("scroll", onScroll, { passive: true })
        return () => { cancelAnimationFrame(raf); scroller.removeEventListener("scroll", onScroll) }
    }, [tasksScrollRef, recalc])

    return (
        <>
            {paths.map((path, index) => (
                <g key={index}>
                    <motion.path
                        id={`connection-path-${index}`}
                        d={path.d}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="2"
                        strokeDasharray="1 8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
                    />
                    <circle r="4" fill="hsl(var(--foreground))" fillOpacity="0.15">
                        <animateMotion dur="3s" repeatCount="indefinite" begin={`${index * 0.15 + 0.4}s`}>
                            <mpath href={`#connection-path-${index}`} />
                        </animateMotion>
                    </circle>
                    {!path.isOneWay && (
                        <circle r="4" fill="hsl(var(--foreground))" fillOpacity="0.4">
                            <animateMotion dur="3s" repeatCount="indefinite" begin={`${index * 0.15 + 0.4 + 1.5}s`} keyPoints="1;0" keyTimes="0;1">
                                <mpath href={`#connection-path-${index}`} />
                            </animateMotion>
                        </circle>
                    )}
                </g>
            ))}
            {paths.map((path, index) => {
                const parts = path.d.split(/[MLQ,\s]+/).filter(Boolean).map(Number)
                const startX = parts[0], startY = parts[1]
                const endX = parts[parts.length - 2], endY = parts[parts.length - 1]
                return (
                    <g key={`dots-${index}`}>
                        <motion.circle cx={startX} cy={startY} r="3" fill="hsl(var(--foreground))" fillOpacity="0.3"
                            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.15 }} />
                        <motion.circle cx={endX} cy={endY} r="3" fill="hsl(var(--foreground))" fillOpacity="0.3"
                            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.15 + 0.35 }} />
                    </g>
                )
            })}
        </>
    )
}