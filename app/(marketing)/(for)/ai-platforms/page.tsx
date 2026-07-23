import type { Metadata } from "next"
import { getAIPlatformsPage, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import AIPlatformsPageClient from "./page-client"

export async function generateMetadata(): Promise<Metadata> {
    const [aiPlatforms, siteSeo] = await Promise.all([getAIPlatformsPage(), getSiteSeo()])
    return buildMetadata({ seo: aiPlatforms?.seo, siteSeo, path: "/ai-platforms" })
}

export default async function AIPlatformsPage() {
    const aiPlatforms = await getAIPlatformsPage()

    if (!aiPlatforms) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getAIPlatformsPage() returned null — has the audience-ai-platforms document been created in Sanity Studio?"
            )
        }

        console.error("[AIPlatformsPage] getAIPlatformsPage() returned null in production")

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We're having trouble loading this page. Please try again shortly.
                </p>
            </section>
        )
    }

    return <AIPlatformsPageClient data={aiPlatforms} />
}