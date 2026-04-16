"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Props = {
    children: React.ReactNode
    className?: string
    delay?: number       // seconds — use for staggering children
    amount?: number      // 0-1 — how much of the element must be in view to trigger
}

export function FadeIn({ children, className, delay = 0, amount = 0.2 }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
        >
            {children}
        </motion.div>
    )
}

