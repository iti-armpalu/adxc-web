"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

// showLabel: the visible "Copied!" text after the icon. Off where space is tight;
// screen readers still hear "Copied" either way.
export function CopyEmail({ email, showLabel = true }: { email: string; showLabel?: boolean }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${email}`}
            className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
        >
            <span>{email}</span>
            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {copied
                    ? <Check className="w-3.5 h-3.5 text-green-600" />
                    : <Copy className="w-3.5 h-3.5" />
                }
            </span>
            {copied && showLabel && (
                <span className="text-xs text-green-600" aria-hidden="true">Copied!</span>
            )}
            <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
        </button>
    )
}