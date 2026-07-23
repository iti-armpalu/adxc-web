import { sanityClient } from "@/lib/cms/client"
import { defineEnableDraftMode } from "next-sanity/draft-mode"

// Called by the Presentation tool when an editor opens the preview.
// defineEnableDraftMode handles the handshake: it verifies the request
// actually came from a legitimate Studio session (not a random visitor
// hitting this URL), then turns on Next.js Draft Mode and redirects
// back to the page being previewed.
export const { GET } = defineEnableDraftMode({
    client: sanityClient.withConfig({
        token: process.env.SANITY_API_READ_TOKEN || "",
    }),
})