import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { AnalyticsProvider } from "@/components/global/analytics-provider"
import { CookieBanner } from "@/components/global/cookie-banner"
import { siteConfig } from "@/config/site"
import { Suspense } from "react"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: { template: `%s | ${siteConfig.name}`, default: siteConfig.name },
  description: siteConfig.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Suspense>
          <AnalyticsProvider>
            {children}
            <CookieBanner />
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}