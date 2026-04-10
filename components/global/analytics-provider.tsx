"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { inject } from "@vercel/analytics"
import posthog from "posthog-js"
import { getStoredConsent, type ConsentState } from "@/lib/cookies/consent"

type Props = { children: React.ReactNode }

let analyticsInitialised = false

function initAnalytics(consent: ConsentState) {
  if (!consent.analytics || analyticsInitialised) return
  analyticsInitialised = true

  // Vercel Analytics — pageviews only, no PII
  inject()

  // PostHog — events, session replay, funnels
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      capture_pageview: false, // we handle pageviews manually below
      capture_pageleave: true,
      persistence: "localStorage",
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug()
      },
    })
  }
}

export function AnalyticsProvider({ children }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialised = useRef(false)

  // Initialise on mount if consent already given
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored?.state) initAnalytics(stored.state)
  }, [])

  // Re-check when user updates consent via banner
  useEffect(() => {
    const handler = () => {
      const stored = getStoredConsent()
      if (stored?.state) initAnalytics(stored.state)
    }
    window.addEventListener("consent-updated", handler)
    return () => window.removeEventListener("consent-updated", handler)
  }, [])

  // Track pageviews manually on route change
  useEffect(() => {
    if (!posthog.__loaded) return
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    posthog.capture("$pageview", { $current_url: url })
  }, [pathname, searchParams])

  return <>{children}</>
}