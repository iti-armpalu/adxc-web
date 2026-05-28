"use client"

import { useState, useEffect } from "react"
import SectionLabel from "./section-label"
import { QuestionCarousel } from "./question-carousel"
import { ConnectingLine } from "./connecting-line"
import { AdxcUnit } from "./adxc-unit"
import { DataProviders } from "./data-providers"
import { QUESTIONS } from "./constants"
import { DataProvidersMobile } from "./data-providers-mobile"

function useBreakpoint() {
    const [bp, setBp] = useState<"md" | "lg" | "xl">("lg")
    useEffect(() => {
        const update = () => {
            if (window.innerWidth >= 1280) setBp("xl")
            else if (window.innerWidth >= 1024) setBp("lg")
            else setBp("md")
        }
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])
    return bp
}

export function HeroGraphic() {
    const [step, setStep] = useState(0)
    const activeQuestion = step % QUESTIONS.length
    const bp = useBreakpoint()

    const isXl = bp === "xl"

    const carouselWidth = isXl ? 420 : 340
    const adxcSize = isXl ? 140 : 110
    const dataScale = isXl ? 1 : 0.75

    return (
        <>
            {/* Mobile only — vertical stack */}
            <div className="flex md:hidden flex-col items-center pointer-events-auto w-full">
                <div className="flex flex-col items-center gap-3 w-full max-w-xl">
                    <SectionLabel>Your key questions</SectionLabel>
                    <QuestionCarousel step={step} onStep={setStep} visible={3} highlightIndex={2} />
                </div>
                <ConnectingLine activeQuestion={activeQuestion} vertical />
                <div className="flex flex-col items-center gap-3">
                    <AdxcUnit />
                </div>
                <div className="flex flex-col items-center gap-3 pt-6">
                    <DataProvidersMobile activeQuestion={activeQuestion} />
                    <SectionLabel>Data Providers</SectionLabel>
                </div>
            </div>

            {/* Tablet + Desktop — horizontal layout */}
            <div className="hidden md:flex items-center pointer-events-auto">
                <div className="pointer-events-auto relative" style={{ width: carouselWidth }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                        <SectionLabel>Your key questions</SectionLabel>
                    </div>
                    <QuestionCarousel step={step} onStep={setStep} visible={5} highlightIndex={2} />
                </div>
                <div className="-translate-y-[8px] flex items-center pointer-events-auto">
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
        </>
    )
}