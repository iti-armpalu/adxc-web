"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  getStoredConsent,
  setStoredConsent,
  defaultConsent,
  fullConsent,
  type ConsentState,
} from "@/lib/cookies/consent"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [custom, setCustom] = useState<ConsentState>(defaultConsent)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) setVisible(true)
  }, [])

  if (!visible) return null

  const handleAcceptAll = () => {
    setStoredConsent("accepted", fullConsent)
    setVisible(false)
    window.dispatchEvent(new Event("consent-updated"))
  }

  const handleDeclineAll = () => {
    setStoredConsent("declined", defaultConsent)
    setVisible(false)
    window.dispatchEvent(new Event("consent-updated"))
  }

  const handleSaveCustom = () => {
    setStoredConsent("custom", custom)
    setVisible(false)
    window.dispatchEvent(new Event("consent-updated"))
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className={cn(
        "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6",
        "sm:max-w-sm z-50",
        "bg-background border border-border rounded-xl p-5 shadow-lg",
      )}
    >
      {!showManage ? (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground">We use cookies</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use essential cookies to run the site, and optional analytics
              cookies to understand how it's used. See our{" "}
              <Link
                href="/legal/cookies"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                cookie policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="sm" onClick={handleAcceptAll} className="w-full">
              Accept all
            </Button>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDeclineAll} className="flex-1">
                Decline
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowManage(true)} className="flex-1">
                Manage
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Manage cookies</p>
            <button
              onClick={() => setShowManage(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <ConsentRow
              label="Essential"
              description="Required for the site to function. Cannot be disabled."
              checked={true}
              disabled={true}
              onChange={() => {}}
            />
            <ConsentRow
              label="Analytics"
              description="Helps us understand how visitors use the site."
              checked={custom.analytics}
              onChange={(v) => setCustom((c) => ({ ...c, analytics: v }))}
            />
            <ConsentRow
              label="Marketing"
              description="Used to show relevant content and measure campaign performance."
              checked={custom.marketing}
              onChange={(v) => setCustom((c) => ({ ...c, marketing: v }))}
            />
          </div>

          <Button size="sm" onClick={handleSaveCustom} className="w-full">
            Save preferences
          </Button>
        </div>
      )}
    </div>
  )
}

type ConsentRowProps = {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}

function ConsentRow({ label, description, checked, disabled, onChange }: ConsentRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-0.5 flex-1">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative shrink-0 mt-0.5 w-8 rounded-full transition-colors",
          "h-[18px]",
          checked ? "bg-foreground" : "bg-muted-foreground/30",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-background transition-transform",
            checked && "translate-x-[14px]"
          )}
        />
      </button>
    </div>
  )
}