"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react"
import { cn } from "@/lib/utils"
import SectionLabel from "./section-label"
import { QuestionCarousel } from "./question-carousel"
import { ConnectingLine } from "./connecting-line"
import { AdxcUnit } from "./adxc-unit"
import { DataProviders } from "./data-providers"
import { DataProvidersMobile } from "./data-providers-mobile"
import { QUESTIONS } from "./constants"

type Layout = "mobile" | "md" | "xl"

const MD_QUERY = "(min-width: 768px)"
const XL_QUERY = "(min-width: 1280px)"
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

// Fixed-height parts of the mobile stack (everything except the provider grid,
// which scales with width). Keep in sync with MobileGraphic:
// label 24 + gap 12 + carousel 196 (3 rows) + line 48 + ADXC 120 + gap 24 + gap 12 + label 24
const MOBILE_FIXED_H = 460

function subscribeMedia(queries: string[]) {
    return (onChange: () => void) => {
        const mqls = queries.map((q) => window.matchMedia(q))
        mqls.forEach((m) => m.addEventListener("change", onChange))
        return () => mqls.forEach((m) => m.removeEventListener("change", onChange))
    }
}

const subscribeLayout = subscribeMedia([MD_QUERY, XL_QUERY])
const subscribeReducedMotion = subscribeMedia([REDUCED_MOTION_QUERY])

function subscribeVisibility(onChange: () => void) {
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
}

function getLayout(): Layout {
    if (window.matchMedia(XL_QUERY).matches) return "xl"
    if (window.matchMedia(MD_QUERY).matches) return "md"
    return "mobile"
}

// Server has no viewport → null (placeholder). Client picks the one layout to mount.
function useLayout() {
    return useSyncExternalStore<Layout | null>(subscribeLayout, getLayout, () => null)
}

function useReducedMotion() {
    return useSyncExternalStore(
        subscribeReducedMotion,
        () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
        () => false,
    )
}

function usePageVisible() {
    return useSyncExternalStore(
        subscribeVisibility,
        () => document.visibilityState === "visible",
        () => true,
    )
}

// `seen` latches once the graphic is near the viewport (lazy mount);
// `inView` tracks it continuously (pause when scrolled away).
function useNearViewport(ref: RefObject<HTMLElement | null>) {
    const [state, setState] = useState({ seen: false, inView: false })
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => setState((prev) => ({ seen: prev.seen || entry.isIntersecting, inView: entry.isIntersecting })),
            { rootMargin: "200px 0px" },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [ref])
    return state
}

export function HeroGraphic() {
    const ref = useRef<HTMLDivElement>(null)
    const [step, setStep] = useState(0)
    const activeQuestion = step % QUESTIONS.length
    const layout = useLayout()
    const reducedMotion = useReducedMotion()
    const pageVisible = usePageVisible()
    const { seen, inView } = useNearViewport(ref)

    const playing = inView && pageVisible && !reducedMotion
    const ready = layout !== null && seen

    return (
        <div
            ref={ref}
            className={cn(
                "flex justify-center w-full",
                // Freezes CSS animations (ADXC ring, spinner) while paused
                !playing && "[&_*]:[animation-play-state:paused]",
            )}
        >
            {!ready ? (
                <GraphicPlaceholder />
            ) : layout === "mobile" ? (
                <MobileGraphic step={step} onStep={setStep} activeQuestion={activeQuestion} paused={!playing} />
            ) : (
                <DesktopGraphic step={step} onStep={setStep} activeQuestion={activeQuestion} paused={!playing} isXl={layout === "xl"} />
            )}
        </div>
    )
}

// Reserves the exact footprint of whichever layout will mount, in server HTML,
// so the hero text doesn't shift when the graphic appears.
// md row = carousel 300 (5 rows); xl row = providers 380.
function GraphicPlaceholder() {
    return (
        <div className="w-full flex flex-col items-center md:h-[300px] xl:h-[380px]" aria-hidden>
            <div className="md:hidden" style={{ height: MOBILE_FIXED_H }} />
            <div className="md:hidden w-full max-w-[350px] aspect-[350/220]" />
        </div>
    )
}

interface GraphicProps {
    step: number
    onStep: (next: number) => void
    activeQuestion: number
    paused: boolean
}

function MobileGraphic({ step, onStep, activeQuestion, paused }: GraphicProps) {
    return (
        <div className="flex flex-col items-center pointer-events-auto w-full">
            <div className="h-6 flex items-center">
                <SectionLabel>Your key questions</SectionLabel>
            </div>
            <div className="w-full max-w-xl mt-3">
                <QuestionCarousel step={step} onStep={onStep} paused={paused} visible={3} highlightIndex={2} fadeMask={false} />
            </div>
            <ConnectingLine activeQuestion={activeQuestion} vertical />
            <AdxcUnit />
            <div className="w-full max-w-[350px] mt-6">
                <DataProvidersMobile activeQuestion={activeQuestion} />
            </div>
            <div className="h-6 mt-3 flex items-center">
                <SectionLabel>Data Providers</SectionLabel>
            </div>
        </div>
    )
}

function DesktopGraphic({ step, onStep, activeQuestion, paused, isXl }: GraphicProps & { isXl: boolean }) {
    const carouselWidth = isXl ? 420 : 340
    const adxcSize = isXl ? 140 : 110
    const dataScale = isXl ? 1 : 0.75

    return (
        <div className="flex items-center pointer-events-auto">
            <div className="pointer-events-auto relative" style={{ width: carouselWidth }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <SectionLabel>Your key questions</SectionLabel>
                </div>
                <QuestionCarousel step={step} onStep={onStep} paused={paused} visible={5} highlightIndex={2} />
            </div>
            <div className="-translate-y-[6px] flex items-center pointer-events-auto">
                <ConnectingLine activeQuestion={activeQuestion} width={24} />
                <div className="relative">
                    <AdxcUnit size={adxcSize} />
                </div>
                <div className="ml-6 relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                        <SectionLabel>Data Providers</SectionLabel>
                    </div>
                    <DataProviders activeQuestion={activeQuestion} scale={dataScale} />
                </div>
            </div>
        </div>
    )
}
