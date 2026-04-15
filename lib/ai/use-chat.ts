"use client"

import { useState, useRef, useCallback } from "react"

export type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

export function useChat(surface: "faq" | "widget" = "widget") {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isStreaming, setIsStreaming] = useState(false)
    const abortRef = useRef<AbortController | null>(null)

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isStreaming) return

        import("@/lib/analytics/events").then(({ trackAIQuestionAsked }) => {
            trackAIQuestionAsked(surface)
        })

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: text.trim(),
        }

        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "",
        }

        setMessages((prev) => [...prev, userMessage, assistantMessage])
        setInput("")
        setIsStreaming(true)

        abortRef.current = new AbortController()

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(({ role, content }) => ({
                        role,
                        content,
                    })),
                }),
                signal: abortRef.current.signal,
            })

            if (!res.ok || !res.body) throw new Error("Request failed")

            const reader = res.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === assistantMessage.id
                            ? { ...m, content: m.content + chunk }
                            : m
                    )
                )
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") return
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === assistantMessage.id
                        ? { ...m, content: "Sorry, something went wrong. Please try again." }
                        : m
                )
            )
        } finally {
            setIsStreaming(false)
            abortRef.current = null
        }
    }, [messages, isStreaming])

    const submit = useCallback(
        (e?: React.FormEvent) => {
            e?.preventDefault()
            sendMessage(input)
        },
        [input, sendMessage]
    )

    const clear = useCallback(() => {
        setMessages([])
        setInput("")
    }, [])

    return { messages, input, setInput, isStreaming, submit, sendMessage, clear }
}