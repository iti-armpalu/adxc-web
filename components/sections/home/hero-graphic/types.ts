export type Question = {
    text: string
    name: string
}

export type ProviderDot = {
    x: number
    y: number
    size: number
    label?: string
    logo?: string
    color?: string  // HSL values e.g. "343 47% 58%" — omit if dot has a logo
}