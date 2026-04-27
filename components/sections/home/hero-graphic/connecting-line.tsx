"use client"

import { STEP_MS } from "./constants"

interface ConnectingLineProps {
    activeQuestion: number
    width?: number
    vertical?: boolean
}

export function ConnectingLine({ activeQuestion, width = 64, vertical = false }: ConnectingLineProps) {
    const dur = (STEP_MS * 0.9) / 1000

    if (vertical) {
        const height = 48
        return (
            <div className="relative shrink-0 mx-auto" style={{ width: 24, height }} aria-hidden>
                <svg
                    key={activeQuestion}
                    className="absolute inset-0 overflow-visible"
                    width={24}
                    height={height}
                >
                    <line
                        x1="12" y1="0" x2="12" y2={height}
                        stroke="#C46184"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    {/* Empty dot going down */}
                    <circle r="3.5" cx="12" fill="#F9EEF5" stroke="#C46184" strokeWidth="1.5" strokeOpacity="0.6">
                        <animate attributeName="cy" values={`0;${height};${height}`} keyTimes="0;0.25;1"
                            dur={`${dur}s`} repeatCount="1" fill="freeze" />
                        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.249;0.25;1"
                            dur={`${dur}s`} repeatCount="1" fill="freeze" />
                    </circle>
                    {/* Filled dot going up */}
                    <circle r="3.5" cx="12" fill="#C46184">
                        <animate attributeName="cy" values={`${height};${height};0;0`} keyTimes="0;0.75;1;1"
                            dur={`${dur}s`} repeatCount="1" fill="freeze" />
                        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.749;0.75;0.999;1"
                            dur={`${dur}s`} repeatCount="1" fill="freeze" />
                    </circle>
                </svg>
            </div>
        )
    }

    return (
        <div className="relative shrink-0" style={{ width, height: 24 }} aria-hidden>
            <svg
                key={activeQuestion}
                className="absolute inset-0 overflow-visible"
                width={width}
                height={24}
            >
                <line
                    x1="0" y1="12" x2={width} y2="12"
                    stroke="#C46184"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle r="3.5" cy="12" fill="#F9EEF5" stroke="#C46184" strokeWidth="1.5" strokeOpacity="0.6">
                    <animate attributeName="cx" values={`0;${width};${width}`} keyTimes="0;0.25;1"
                        dur={`${dur}s`} repeatCount="1" fill="freeze" />
                    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.249;0.25;1"
                        dur={`${dur}s`} repeatCount="1" fill="freeze" />
                </circle>
                <circle r="3.5" cy="12" fill="#C46184">
                    <animate attributeName="cx" values={`${width};${width};0;0`} keyTimes="0;0.75;1;1"
                        dur={`${dur}s`} repeatCount="1" fill="freeze" />
                    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.749;0.75;0.999;1"
                        dur={`${dur}s`} repeatCount="1" fill="freeze" />
                </circle>
            </svg>
        </div>
    )
}