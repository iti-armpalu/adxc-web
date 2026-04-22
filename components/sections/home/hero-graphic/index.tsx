"use client"

import { useState } from "react"



import SectionLabel from "./section-label"

import { QuestionCarousel } from "./question-carousel"
import { ConnectingLine } from "./connecting-line"
import { AdxcUnit } from "./adxc-unit"
import { DataProviders } from "./data-providers"
import { QUESTIONS } from "./constants"


export function HeroGraphic() {
    const [step, setStep] = useState(0)
    const activeQuestion = step % QUESTIONS.length

    return (

        <>
            <div className="w-[460px] pointer-events-auto relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                    <SectionLabel>Marketing Questions</SectionLabel>
                </div>
                <QuestionCarousel step={step} onStep={setStep} />
            </div>
            <div className="-translate-y-[10px] flex items-center pointer-events-auto">
                <ConnectingLine />
                <div className="relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                        <SectionLabel>AI Agents and Tools</SectionLabel>
                    </div>
                    <AdxcUnit />
                </div>

                <div className="ml-6 relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
                        <SectionLabel>Data Providers</SectionLabel>
                    </div>
                    <DataProviders activeQuestion={activeQuestion} />
                </div>

            </div>
        </>
    )
}