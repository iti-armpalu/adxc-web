import type { Metadata } from "next"
import AIPlatformsPageClient from "./page-client"

export const metadata: Metadata = {
    title: "For AI Platforms",
    description: "ADXC connects your platform to industry-leading consumer data sources.",
}

export default function AIPlatformsPage() {
    return <AIPlatformsPageClient />
}