import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { AnalyticsProvider } from "@/components/global/analytics-provider"
import { CookieBanner } from "@/components/global/cookie-banner"
import { siteConfig } from "@/config/site"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: { template: `%s | ${siteConfig.name}`, default: siteConfig.name },
  description: siteConfig.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
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