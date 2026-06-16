import { ProblemSection } from "@/components/sections/problem-section"

export function BrandsProblem() {
    return (
        <ProblemSection
            eyebrow="The problem"
            stat="$200k+"
            statLabel="Price for enterprise subscriptions to premium consumer data providers"
            body="99% of businesses can't afford the insight they need to make better marketing decisions. This wastes resources and limits your growth."
            closer="ADXC was built for the 99%."
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