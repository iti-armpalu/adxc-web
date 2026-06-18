import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DeptGateForm } from "./gate-form"

export default function DeptGatePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">

            {/* Header */}
            <header className="px-6 py-4 border-b border-border bg-card">
                <div className="max-w-7xl mx-auto">
                    <Image
                        src="/adxc-logo-primary-horizontal.svg"
                        alt="ADXC"
                        width={60}
                        height={22}
                    />
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm space-y-6">

                    {/* Logos */}
                    <div className="flex items-center justify-center gap-4">
                        <Image
                            src="/adxc-logo-primary-horizontal.svg"
                            alt="ADXC"
                            width={120}
                            height={28}
                        />
                        <span className="text-neutral-300 select-none">×</span>
                        <Image
                            src="/dept-logo.svg"
                            alt="DEPT®"
                            width={120}
                            height={28}
                        />
                    </div>

                    {/* Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Calculator</CardTitle>
                            <CardDescription>
                                Enter your access password to continue.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DeptGateForm />
                        </CardContent>
                    </Card>

                    <p className="text-center text-xs text-muted-foreground">
                        Confidential. DEPT® internal use only
                    </p>

                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-4 border-t border-border">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                        © {new Date().getFullYear()} ADXC
                    </span>
                    <a
                        href="https://adxc.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        adxc.ai
                    </a>
                </div>
            </footer>

        </div>
    )
}