import { ProblemSection } from "@/components/sections/problem-section"

interface BrandsProblemProps {
    label?: string
    stat: string
    statLabel: string
    subtext: string
    note: string
}

export function BrandsProblem({ label, stat, statLabel, subtext, note }: BrandsProblemProps) {
    return (
        <ProblemSection
            eyebrow={label}
            stat={stat}
            statLabel={statLabel}
            body={subtext}
            closer={note}
            background="bg-purple-50"
            statColor="text-purple-800"
            labelColor="text-purple-700"
            bodyColor="text-purple-950"
            closerColor="text-purple-950"
            dividerColor="divide-purple-200"
            eyebrowColor="text-purple-500"
        />
    )
}
