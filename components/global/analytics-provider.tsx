"use client"

import { useEffect } from "react"
import { inject } from "@vercel/analytics"
import { getStoredConsent, type ConsentState } from "@/lib/cookies/consent"

// TODO: re-add PostHog (removed Oct 2026 for mobile perf). If it comes back:
// events only, no session replay / dead clicks on mobile, init deferred to idle.
// Route-change pageviews will need usePathname/useSearchParams again — put that
// in its own small component inside a local <Suspense>, not around the whole app.

type Props = { children: React.ReactNode }

let analyticsInitialised = false

function initAnalytics(consent: ConsentState) {
  if (!consent.analytics || analyticsInitialised) return
  analyticsInitialised = true

  // Vercel Analytics — pageviews only, no PII
  inject()
}

export function AnalyticsProvider({ children }: Props) {
  // Initialise on mount if consent already given
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored?.state) initAnalytics(stored.state)
  }, [])

  // Initialise when user updates consent via banner
  useEffect(() => {
    const handler = () => {
      const stored = getStoredConsent()
      if (stored?.state) initAnalytics(stored.state)
    }
    window.addEventListener("consent-updated", handler)
    return () => window.removeEventListener("consent-updated", handler)
  }, [])

  return <>{children}</>
}