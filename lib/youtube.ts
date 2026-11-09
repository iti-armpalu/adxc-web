// Plain (server-safe) helper — used by server components to decide whether to render a video.
/** Extracts the video ID from youtube.com/watch?v=, youtu.be/, /embed/, /shorts/ or /live/ links. */
export function getYouTubeId(url: string): string | null {
    try {
        const u = new URL(url)
        if (u.hostname === "youtu.be") return u.pathname.slice(1) || null
        if (u.hostname.endsWith("youtube.com")) {
            const v = u.searchParams.get("v")
            if (v) return v
            const m = u.pathname.match(/^\/(embed|shorts|live)\/([^/?]+)/)
            if (m) return m[2]
        }
    } catch {
        // not a valid URL
    }
    return null
}
