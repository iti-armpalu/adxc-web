"use client";

// Stub — wire up your analytics provider here (e.g. Vercel Analytics, PostHog, GA4)
// Only initialise tracking after cookie consent is granted.

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}