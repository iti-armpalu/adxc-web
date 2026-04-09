import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Login",
    description: `Sign in to ${siteConfig.name}`,
}

export default function LoginPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-8 text-center">

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Sign in
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Login coming soon.
                    </p>
                </div>

                {/* Auth form will go here */}
                {/* Options: Auth.js, Clerk, Auth0, Supabase Auth */}

            </div>
        </main>
    )
}