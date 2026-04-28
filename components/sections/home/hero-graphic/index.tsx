"use client"

import { useCallback, useState } from "react"

import SectionLabel from "./section-label"

import { QuestionCarousel } from "./question-carousel"
import { ConnectingLine } from "./connecting-line"
import { AdxcUnit } from "./adxc-unit"
import { DataProviders } from "./data-providers"
import { QUESTIONS } from "./constants"
import { DataProvidersMobile } from "./data-providers-mobile"


export function HeroGraphic() {
    const [step, setStep] = useState(0)
    const activeQuestion = step % QUESTIONS.length

    return (
        <>
            {/* Mobile only — vertical stack, labels in flow */}
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

            {/* Tablet + Desktop — horizontal layout, labels absolute */}
            <div className="hidden md:flex items-center pointer-events-auto">
                <div className="w-[400px] lg:w-[460px] pointer-events-auto relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                        <SectionLabel>Your key questions</SectionLabel>
                    </div>
                    <QuestionCarousel step={step} onStep={setStep} visible={5} highlightIndex={2} />
                </div>
                <div className="-translate-y-[10px] flex items-center pointer-events-auto">
                    <ConnectingLine activeQuestion={activeQuestion} width={24} />
                    <div className="relative">
                        <AdxcUnit />
                    </div>
                    <div className="ml-6 relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                            <SectionLabel>Data Providers</SectionLabel>
                        </div>
                        <DataProviders activeQuestion={activeQuestion} />
                    </div>
                </div>
            </div>
        </>

    )
}