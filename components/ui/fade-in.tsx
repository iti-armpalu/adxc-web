"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode
    className?: string
    delay?: number       // seconds — use for staggering children
    amount?: number      // 0-1 — how far into the viewport the element must come before it reveals
    // "default": subtle 12px / 0.5s. "build": Apple-style build-in — 30px rise, 0.7s move,
    // 0.9s fade, slow-fast-slow easing, triggers as soon as the element enters (measured on apple.com/mac).
    variant?: "default" | "build"
}

const BUILD_EASE = "cubic-bezier(0.45, 0, 0.55, 1)"

// Visible by default: the server HTML never hides content, so if JS is slow
// (or the page is still hydrating) everything is still readable.
// After mount, only elements that start BELOW the viewport are hidden and then
// revealed on scroll. Elements already on screen are left alone (no flash).
// Uses a native IntersectionObserver + CSS transition — no framer-motion.
type State = "static" | "hidden" | "shown"

export function FadeIn({ children, className, delay = 0, amount, variant = "default" }: Props) {
    const build = variant === "build"
    const threshold = amount ?? (build ? 0.05 : 0.2)
    const ref = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<State>("static")

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (el.getBoundingClientRect().top < window.innerHeight) return

        setState("hidden")

        // rootMargin instead of threshold so very tall elements still reveal:
        // fires once the element's top is `amount` of the viewport above the bottom edge.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState("shown")
                    observer.disconnect()
                }
            },
            { rootMargin: `0px 0px -${Math.round(threshold * 100)}% 0px`, threshold: 0 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    const transitionDelay = state === "shown" ? delay : 0
    const style: React.CSSProperties | undefined = build
        ? state === "static"
            ? undefined
            : {
                transition: `opacity 0.9s ${BUILD_EASE} ${transitionDelay}s, transform 0.7s ${BUILD_EASE} ${transitionDelay}s`,
                ...(state === "hidden" && { opacity: 0, transform: "translate3d(0, 30px, 0)" }),
            }
        : transitionDelay ? { transitionDelay: `${transitionDelay}s` } : undefined

    return (
        <div
            ref={ref}
            className={cn(
                !build && state !== "static" &&
                "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
                !build && state === "hidden" && "opacity-0 translate-y-3",
                className
            )}
            style={style}
        >
            {children}
        </div>
    )
}