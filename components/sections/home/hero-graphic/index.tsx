"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react"
import { cn } from "@/lib/utils"
import SectionLabel from "./section-label"
import { QuestionCarousel, carouselHeight } from "./question-carousel"
import { ConnectingLine, VERTICAL_LINE_H } from "./connecting-line"
import { AdxcUnit, ADXC_DEFAULT_SIZE, ADXC_PAD } from "./adxc-unit"
import { DataProviders, BASE_WIDTH, BASE_HEIGHT } from "./data-providers"
import { DataProvidersMobile } from "./data-providers-mobile"
import { HeroCut } from "./hero-cut"
import { QUESTIONS } from "./constants"

type Layout = "mobile" | "md" | "xl"

const MD_QUERY = "(min-width: 768px)"
const XL_QUERY = "(min-width: 1280px)"
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

// ─── Geometry ─────────────────────────────────────────────────────────────────
// Single source for the sizes below, so the placeholder reserves the exact
// footprint and puts the HeroCut pivot exactly where the ADXC centre will be.

const LABEL_H = 24          // h-6 label rows (mobile)
const LINE_W = 24           // horizontal ConnectingLine width (desktop)
const PROVIDERS_GAP = 24    // ml-6 before the provider grid (desktop)
const ADXC_LIFT = 6         // right-hand group sits 6px higher (desktop)

// Mobile stack: label · 12 · carousel · line · ADXC · 24 · providers (scales) · 12 · label
const MOBILE_ABOVE_ADXC = LABEL_H + 12 + carouselHeight(3) + VERTICAL_LINE_H
const MOBILE_FIXED_H = MOBILE_ABOVE_ADXC + ADXC_DEFAULT_SIZE + 24 + 12 + LABEL_H
const MOBILE_PIVOT = { x: 0, y: MOBILE_ABOVE_ADXC + ADXC_DEFAULT_SIZE / 2 }

const DESKTOP_SIZES = {
    md: { carousel: 340, adxc: 110, dataScale: 0.75 },
    xl: { carousel: 420, adxc: 140, dataScale: 1 },
}

// Row is centred in its column; pivot x is relative to that centre, y to the row top.
function desktopGeometry({ carousel, adxc, dataScale }: (typeof DESKTOP_SIZES)["md"]) {
    const providersW = Math.round(BASE_WIDTH * dataScale)
    const providersH = Math.round(BASE_HEIGHT * dataScale)
    const rowW = carousel + LINE_W + ADXC_PAD + adxc + PROVIDERS_GAP + providersW
    const rowH = Math.max(carouselHeight(5), providersH, adxc)
    return {
        rowH,
        pivotX: carousel + LINE_W + ADXC_PAD + adxc / 2 - rowW / 2,
        pivotY: rowH / 2 - ADXC_LIFT,
    }
}

const MD = desktopGeometry(DESKTOP_SIZES.md)
const XL = desktopGeometry(DESKTOP_SIZES.xl)

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
// so the hero text doesn't shift when the graphic appears. Also draws the
// HeroCut at the future ADXC centre, so the dark half is right from first paint.
function GraphicPlaceholder() {
    return (
        <div
            className="relative w-full flex flex-col items-center md:h-[var(--h-md)] xl:h-[var(--h-xl)]"
            style={{ "--h-md": `${MD.rowH}px`, "--h-xl": `${XL.rowH}px` } as React.CSSProperties}
            aria-hidden
        >
            <div className="md:hidden" style={{ height: MOBILE_FIXED_H }} />
            <div className="md:hidden w-full max-w-[350px] aspect-[350/220]" />

            <div
                className="absolute
                left-[calc(50%+var(--px))] top-[var(--py)]
                md:left-[calc(50%+var(--px-md))] md:top-[var(--py-md)]
                xl:left-[calc(50%+var(--px-xl))] xl:top-[var(--py-xl)]"
                style={{
                    "--px": `${MOBILE_PIVOT.x}px`, "--py": `${MOBILE_PIVOT.y}px`,
                    "--px-md": `${MD.pivotX}px`, "--py-md": `${MD.pivotY}px`,
                    "--px-xl": `${XL.pivotX}px`, "--py-xl": `${XL.pivotY}px`,
                } as React.CSSProperties}
            >
                <HeroCut />
            </div>
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
            <AdxcUnit cut pad={0} />
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
    const { carousel: carouselWidth, adxc: adxcSize, dataScale } = isXl ? DESKTOP_SIZES.xl : DESKTOP_SIZES.md

    return (
        <div className="flex items-center pointer-events-auto">
            <div className="pointer-events-auto relative" style={{ width: carouselWidth }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <SectionLabel>Your key questions</SectionLabel>
                </div>
                <QuestionCarousel step={step} onStep={onStep} paused={paused} visible={5} highlightIndex={2} />
            </div>
            {/* relative/top instead of translate: a transform would trap HeroCut's z-index */}
            <div className="relative flex items-center pointer-events-auto" style={{ top: -ADXC_LIFT }}>
                <ConnectingLine activeQuestion={activeQuestion} width={24} />
                <div className="relative">
                    <AdxcUnit size={adxcSize} cut />
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
