import type { Metadata } from "next"
import DataProvidersPageClient from "./page-client"

export const metadata: Metadata = {
    title: "For Data Providers",
    description: "Unlock a market your enterprise model can't reach. ADXC connects your data to the AI agents and workflows shaping marketing decisions for SMEs.",
}

export default function AIPlatformsPage() {
    return <DataProvidersPageClient />
}