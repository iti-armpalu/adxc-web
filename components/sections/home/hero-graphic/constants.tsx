import type { Question, ProviderDot } from "./types"

export const QUESTIONS: Question[] = [
    { text: "Define my audience's key attitudes and behaviours", name: "Sarah" },
    { text: "How big is the market for my product?", name: "Marcus" },
    { text: "What are the biggest barriers to purchase?", name: "Aisha" },
    { text: "How is my brand perceived vs the competition?", name: "James" },
    { text: "What messaging will resonate with my audience?", name: "Rosa" },
    { text: "What's trending in my category?", name: "Kai" },
]

export const STEP_MS = 5000

export const PROVIDER_DOTS: ProviderDot[] = [
    { x: 36, y: 6, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 60, y: 16, size: 18, color: "42 100% 42%" },   // gold
    { x: 42, y: 32, size: 20, color: "343 70% 40%" },   // tyrian-600
    { x: 72, y: 38, size: 50, label: "X", logo: "/x-logo.jpg" },
    { x: 38, y: 50, size: 26, color: "174 55% 35%" },   // cyan-700
    { x: 62, y: 62, size: 60, label: "US Census Bureau", logo: "/us-census-bureau-logo.png" },
    { x: 40, y: 68, size: 22, color: "214 38% 22%" },   // blue-600
    { x: 70, y: 90, size: 54, label: "Reddit", logo: "/reddit-logo.png" },
    { x: 42, y: 96, size: 36, color: "16 55% 40%" },   // orange-800
]

// Mobile layout — dots spread horizontally, lines come from above
// x: 6-96% spread across width, y: zigzag vertically (two rows)
export const PROVIDER_DOTS_HORIZONTAL: ProviderDot[] = [
    { x: 6, y: 40, size: 56, label: "YouGov", logo: "/yougov-logo.jpg" },
    { x: 18, y: 75, size: 18, color: "42 100% 42%" },   // gold
    { x: 30, y: 40, size: 20, color: "343 70% 40%" },   // tyrian-600
    { x: 42, y: 75, size: 50, label: "X", logo: "/x-logo.jpg" },
    { x: 54, y: 40, size: 26, color: "174 55% 35%" },   // cyan-700
    { x: 66, y: 75, size: 60, label: "US Census Bureau", logo: "/us-census-bureau-logo.png" },
    { x: 76, y: 40, size: 22, color: "214 38% 22%" },   // blue-600
    { x: 88, y: 75, size: 54, label: "Reddit", logo: "/reddit-logo.png" },
    { x: 96, y: 40, size: 36, color: "16 55% 40%" },   // orange-800
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