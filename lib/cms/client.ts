import { createClient } from "next-sanity"

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2025-04-01",
    useCdn: true, // cache at CDN edge — fine for public marketing content
})