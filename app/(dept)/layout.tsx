import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "DEPT® Partnership Calculator — ADXC",
    description: "Calculate your DEPT® revenue share as an ADXC partner.",
    robots: { index: false, follow: false },
}

export default function DeptLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}