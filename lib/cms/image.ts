import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

// Deliberately does NOT import ./client — that module pulls in
// next/headers (for Draft Mode), which is server-only. urlFor is used
// by components that end up in client bundles (e.g. sections rendered
// from a "use client" page-client.tsx), and the URL builder only needs
// the project id and dataset, both public env vars.
const builder = createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
})

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}
