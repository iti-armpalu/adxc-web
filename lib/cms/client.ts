import { createClient, type QueryParams } from "next-sanity"
import { draftMode } from "next/headers"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = "2025-04-01"

// Public client — reads only published content, cached at the CDN edge.
// This is what powers the live site outside of Draft Mode. Unchanged
// from before.
export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
})

// Preview client — reads draft content directly from Sanity's API,
// bypassing the CDN (drafts are never cached there). Requires a read
// token since draft content isn't public. Only ever used when Draft
// Mode is enabled.
const previewClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: "previewDrafts",
})

/**
 * Fetch wrapper — use this in queries.ts instead of calling
 * sanityClient.fetch() directly. Automatically reads drafts when
 * Next.js Draft Mode is on (i.e. Presentation mode enabled it),
 * otherwise reads published content as normal. This is the one place
 * that branch lives, so individual query functions don't need to know
 * about Draft Mode at all.
 */
export async function sanityFetch<QueryResponse>(
    query: string,
    params: QueryParams = {}
): Promise<QueryResponse> {
    const { isEnabled } = await draftMode()

    if (isEnabled) {
        if (!process.env.SANITY_API_READ_TOKEN) {
            throw new Error(
                "Draft Mode is enabled but SANITY_API_READ_TOKEN is not set — preview needs a read token to fetch draft content. Generate one at sanity.io/manage (Viewer permissions) and add it to your env vars."
            )
        }

        return previewClient.fetch<QueryResponse>(query, params, {
            cache: "no-store",
        })
    }

    return sanityClient.fetch<QueryResponse>(query, params)
}