"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trackHeroCtaClicked, trackHeroEmailStarted } from "@/lib/analytics/events"
import { cn } from "@/lib/utils"

// The only interactive part of the hero — kept as a small client island so the
// rest of the hero renders as server HTML with no JavaScript.
interface HeroEmailCaptureProps {
    buttonLabel?: string
    buttonClassName?: string
    // Home hero: fire hero analytics events, and only navigate when an email was entered.
    homeHero?: boolean
    // Hand the email to the page's own form and scroll to it, instead of /early-access.
    // Function prop: only usable when the parent is a client component.
    handoff?: {
        scrollToId: string
        onSubmit: (email: string) => void
    }
}

export function HeroEmailCapture({
    buttonLabel = "Get early access",
    buttonClassName,
    homeHero = false,
    handoff,
}: HeroEmailCaptureProps) {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        if (handoff) {
            handoff.onSubmit(email)
            setEmail("")
            document.getElementById(handoff.scrollToId)?.scrollIntoView({ behavior: "smooth" })
            return
        }
        if (homeHero) {
            trackHeroCtaClicked(email)
            if (!email) return
        }
        router.push(email ? `/early-access?email=${encodeURIComponent(email)}` : "/early-access")
    }

    return (
        <div className="flex flex-col gap-3 max-w-xs">
            <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={homeHero ? trackHeroEmailStarted : undefined}
            />
            <Button size="xl" onClick={handleSubmit} className={cn(buttonClassName)}>
                {buttonLabel}
            </Button>
        </div>
    )
}
