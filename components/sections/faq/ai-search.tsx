"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@/lib/ai/use-chat"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Loader2, RotateCcw } from "lucide-react"
import ReactMarkdown from "react-markdown"

const SUGGESTED_QUESTIONS = [
    "How does pricing work?",
    "What data providers do you have?",
    "How do I get early access?",
    "Is ADXC right for agencies?",
]



export function AISearch() {
    const { messages, input, setInput, isStreaming, submit, sendMessage, clear } = useChat()
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const hasMessages = messages.length > 0

    // Scroll the message container — not the page
    useEffect(() => {
        const el = containerRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [messages])

    return (
        <div className="flex flex-col gap-4">

            {/* Suggested questions — only before first message */}
            {!hasMessages && (
                <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                            key={q}
                            onClick={() => {
                                sendMessage(q)
                                inputRef.current?.focus()
                            }}
                            className="text-xs text-muted-foreground border border-border/50 rounded-full px-3 py-1.5 hover:border-border hover:text-foreground hover:bg-muted/40 transition-all duration-150"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Conversation — messages top to bottom */}
            {hasMessages && (
                <div ref={containerRef} className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex",
                                message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                                    message.role === "user"
                                        ? "bg-foreground text-background"
                                        : "bg-muted/60 border border-border/40 text-foreground"
                                )}
                            >
                                {message.content ? (
                                    message.role === "assistant" ? (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                                li: ({ children }) => <li className="text-sm">{children}</li>,
                                                strong: ({ children }) => <strong className="font-medium">{children}</strong>,
                                                a: ({ href, children }) => <a href={href} className="underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">{children}</a>,
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <span>{message.content}</span>
                                    )
                                ) : (
                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Thinking...
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Clear conversation */}
            {hasMessages && !isStreaming && (
                <button
                    onClick={clear}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
                >
                    <RotateCcw className="w-3 h-3" />
                    Clear conversation
                </button>
            )}

            {/* Input — always at the bottom */}
            <form onSubmit={submit} className="flex gap-2">
                <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about ADXC..."
                    disabled={isStreaming}
                    className="flex-1 h-11"
                    autoComplete="off"
                />
                <Button
                    type="submit"
                    disabled={isStreaming || !input.trim()}
                    size="sm"
                    className="h-11 px-4 group"
                >
                    {isStreaming ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                </Button>
            </form>

        </div>
    )
}