import { getPosts, getSiteSettings } from "@/lib/cms/queries"
import { getNavWithAudiences } from "@/lib/cms/audiences"
import { Header } from "./header"

export async function HeaderWrapper() {
    // Fetch silently — if Sanity is unavailable, header still renders
    const [latestPosts, settings] = await Promise.all([
        getPosts().catch(() => []),
        getSiteSettings().catch(() => null),
    ])

    return <Header latestPosts={latestPosts} nav={getNavWithAudiences(settings)} />
}
