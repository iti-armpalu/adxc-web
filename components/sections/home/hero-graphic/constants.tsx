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
    { x: 36, y: 6, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 60, y: 16, size: 18 },
    { x: 42, y: 32, size: 20 },
    { x: 72, y: 38, size: 50, label: "X", logo: "/x-logo.jpg" },
    { x: 38, y: 50, size: 26 },
    { x: 62, y: 62, size: 60, label: "US Census Bureau", logo: "/us-census-bureau-logo.png" },
    { x: 40, y: 68, size: 22 },
    { x: 70, y: 90, size: 54, label: "Reddit", logo: "/reddit-logo.png" },
    { x: 42, y: 96, size: 36 },
]

// Maps each question index to which provider dots are highlighted
export const QUESTION_PROVIDERS: number[][] = [
    [0, 4, 2],   // attitudes & behaviours → YouGov, Statista, dot
    [4, 7, 5],   // market size → Statista, Experian, dot
    [0, 2, 6],   // barriers to purchase → YouGov, dots
    [0, 4, 7],   // brand perception → YouGov, Statista, Experian
    [0, 4, 3],   // messaging → YouGov, Statista, dot
    [2, 5, 8],   // trending → dots
]