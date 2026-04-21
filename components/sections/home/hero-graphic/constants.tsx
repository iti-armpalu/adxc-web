import type { Question, ProviderDot } from "./types"

export const QUESTIONS: Question[] = [
    { text: "What are the key attitudes and behaviours of my target audience?", name: "Sarah" },
    { text: "How big is the market for my product?", name: "Marcus" },
    { text: "What are the biggest barriers to purchase in my category?", name: "Aisha" },
    { text: "How is my brand perceived vs the competition?", name: "James" },
    { text: "What messaging will resonate with my audience?", name: "Rosa" },
    { text: "What's trending in my category?", name: "Kai" },
]

export const STEP_MS = 3000

export const PROVIDER_DOTS: ProviderDot[] = [
    { x: 36, y: 6, size: 56, label: "YouGov" },
    { x: 60, y: 16, size: 16 },
    { x: 38, y: 26, size: 18 },
    { x: 62, y: 38, size: 20 },
    { x: 38, y: 50, size: 52, label: "Statista" },
    { x: 62, y: 62, size: 18 },
    { x: 40, y: 74, size: 20 },
    { x: 60, y: 84, size: 54, label: "Experian" },
    { x: 42, y: 96, size: 16 },
]

// Maps each question index to which provider dots are highlighted
export const QUESTION_PROVIDERS: number[][] = [
    [0, 4, 2],   // attitudes & behaviours → YouGov, Statista, dot
    [4, 7, 5],   // market size → Statista, Experian, dot
    [0, 2, 6],   // barriers to purchase → YouGov, dots
    [0, 4, 7],   // brand perception → YouGov, Statista, Experian
    [0, 4, 1],   // messaging → YouGov, Statista, dot
    [2, 5, 8],   // trending → dots
]