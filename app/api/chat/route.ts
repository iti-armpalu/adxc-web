import { ADXC_SYSTEM_PROMPT } from "@/lib/ai/context"
import Anthropic from "@anthropic-ai/sdk"


const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
})

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        if (!messages || !Array.isArray(messages)) {
            return new Response("Invalid request", { status: 400 })
        }

        // Limit conversation history to last 10 messages to control token usage
        const recentMessages = messages.slice(-10)

        const stream = await anthropic.messages.stream({
            model: "claude-sonnet-4-20250514",
            max_tokens: 400,
            system: ADXC_SYSTEM_PROMPT,
            messages: recentMessages,
        })

        // Stream the response as plain text chunks
        const encoder = new TextEncoder()
        const readable = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    if (
                        chunk.type === "content_block_delta" &&
                        chunk.delta.type === "text_delta"
                    ) {
                        controller.enqueue(encoder.encode(chunk.delta.text))
                    }
                }
                controller.close()
            },
        })

        return new Response(readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        })
    } catch (err) {
        console.error("[chat] error:", err)
        return new Response("Something went wrong", { status: 500 })
    }
}