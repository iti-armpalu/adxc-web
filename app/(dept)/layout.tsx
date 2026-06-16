import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "@/app/globals.css"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
    title: "DEPT® Partnership Calculator — ADXC",
    description: "Calculate your DEPT® revenue share as an ADXC partner.",
    robots: { index: false, follow: false }, // keep off search engines
}

export default function DeptLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={manrope.variable}>
            <body className="bg-neutral-50 text-neutral-900 antialiased min-h-screen">
                {children}
            </body>
        </html>
    )
}