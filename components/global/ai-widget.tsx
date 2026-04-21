"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@/lib/ai/use-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
    X,
    ArrowRight,
    Loader2,
    RotateCcw,
    MessageCircle,
} from "lucide-react"
import ReactMarkdown from "react-markdown"

const SUGGESTED_QUESTIONS = [
    "How does pricing work?",
    "Who is ADXC for?",
    "How do I get access?",
]

export function AIWidget() {
    const [open, setOpen] = useState(false)
    const { messages, input, setInput, isStreaming, submit, sendMessage, clear } = useChat("widget")
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const hasMessages = messages.length > 0

    // Scroll container on new messages
    useEffect(() => {
        const el = containerRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [messages])

    // Focus input when opened
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [open])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [])

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">

            {/* Chat panel */}
            <div
                className={cn(
                    "w-[360px] rounded-2xl border border-border/60 bg-background shadow-xl",
                    "flex flex-col overflow-hidden pointer-events-auto",
                    "transition-all duration-300 ease-out origin-bottom-right",
                    open
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                )}
                style={{ maxHeight: "520px" }}
            >

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                            <MessageCircle className="w-3 h-3 text-background" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground leading-none">
                                Ask ADXC
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Powered by AI
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {hasMessages && (
                            <button
                                onClick={clear}
                                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                                aria-label="Clear conversation"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        )}
                        <button
                            onClick={() => setOpen(false)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]"
                >
                    {!hasMessages && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Hi! Ask me anything about ADXC — pricing, how it works, or
                                whether it's right for you.
                            </p>
                            <div className="flex flex-col gap-2">
                                {SUGGESTED_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-left text-xs text-muted-foreground border border-border/50 rounded-lg px-3 py-2 hover:border-border hover:text-foreground hover:bg-muted/40 transition-all duration-150"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

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
                                    "max-w-[85%] rounded-xl px-3 py-2.5 text-sm leading-relaxed",
                                    message.role === "user"
                                        ? "bg-foreground text-background"
                                        : "bg-muted/60 border border-border/40 text-foreground"
                                )}
                            >
                                {message.content ? (
                                    message.role === "assistant" ? (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-1.5 space-y-0.5">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside mb-1.5 space-y-0.5">{children}</ol>,
                                                li: ({ children }) => <li className="text-sm">{children}</li>,
                                                strong: ({ children }) => <strong className="font-medium">{children}</strong>,
                                                a: ({ href, children }) => (
                                                    <a
                                                        href={href}
                                                        className="underline underline-offset-2 hover:opacity-80"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {children}
                                                    </a>
                                                ),
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

                {/* Input */}
                <div className="px-4 py-3 border-t border-border/50 shrink-0">
                    <form onSubmit={submit} className="flex gap-2">
                        <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            disabled={isStreaming}
                            className="flex-1 h-9 text-sm"
                            autoComplete="off"
                        />
                        <Button
                            type="submit"
                            disabled={isStreaming || !input.trim()}
                            size="sm"
                            className="h-9 w-9 p-0 shrink-0 group"
                            aria-label="Send message"
                        >
                            {isStreaming ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            )}
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground/60 mt-2 text-center">
                        AI responses may not always be accurate
                    </p>
                </div>
                            
            </div>

            {/* Toggle button */}
            <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "flex items-center gap-2.5 px-4 h-11 rounded-full shadow-lg pointer-events-auto",
                    "bg-foreground text-background",
                    "hover:opacity-90 transition-all duration-200",
                    "border border-foreground/10",
                    open && "opacity-0 pointer-events-none scale-90"
                )}
                aria-label="Ask ADXC"
            >
                <span className="text-sm font-medium">Ask ADXC</span>
            </button>

        </div>
    )
}