import type { Question, ProviderDot } from "./types"

export const QUESTIONS: Question[] = [
    { text: "Define my audience's key attitudes and behaviours", name: "Sarah" },
    { text: "How big is the market for my product?", name: "Marcus" },
    { text: "What are the biggest barriers to purchase?", name: "Aisha" },
    { text: "How is my brand perceived vs the competition?", name: "James" },
    { text: "What messaging will resonate with my audience?", name: "Rosa" },
    { text: "What's trending in my category?", name: "Kai" },
]

export const STEP_MS = 2600

export const PROVIDER_DOTS: ProviderDot[] = [
    { x: 46, y: 6, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 50, y: 20, size: 18, color: "var(--color-orange-600)" },
    { x: 32, y: 32, size: 20, color: "var(--color-cyan-600)" },
    { x: 62, y: 38, size: 50, color: "var(--color-purple-600)" },
    { x: 28, y: 50, size: 26, color: "var(--color-brand-400)" },
    { x: 52, y: 62, size: 60, label: "Quid", logo: "/quid-logo-square.svg" },
    { x: 30, y: 68, size: 22, color: "var(--color-blue-600)" },
    { x: 60, y: 90, size: 54, color: "var(--color-orange-600)" },
    { x: 32, y: 96, size: 36, label: "Data Comms", logo: "/data-comms-logo.svg" },
]

export const PROVIDER_DOTS_HORIZONTAL: ProviderDot[] = [
    { x: 6, y: 40, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 18, y: 75, size: 18, color: "var(--color-orange-600)" },
    { x: 30, y: 40, size: 20, color: "var(--color-cyan-600)" },
    { x: 42, y: 75, size: 50, color: "var(--color-purple-600)" },
    { x: 54, y: 40, size: 26, color: "var(--color-brand-400)" },
    { x: 66, y: 75, size: 60, label: "Quid", logo: "/quid-logo-square.svg" },
    { x: 76, y: 40, size: 22, color: "var(--color-blue-600)" },
    { x: 88, y: 75, size: 54, color: "var(--color-orange-600)" },
    { x: 96, y: 40, size: 36, label: "Data Comms", logo: "/data-comms-logo.svg" },
]

export const QUESTION_PROVIDERS: number[][] = [
    [0, 4, 2],   // attitudes & behaviours → YouGov, orange dot, brand dot
    [4, 7, 5],   // market size → cyan dot, Reddit, Census
    [0, 2, 6],   // barriers to purchase → YouGov, brand dot, blue dot
    [0, 4, 7],   // brand perception → YouGov, cyan dot, Reddit
    [0, 4, 3],   // messaging → YouGov, cyan dot, X
    [2, 5, 8],   // trending → brand dot, Census, Data Comms
]