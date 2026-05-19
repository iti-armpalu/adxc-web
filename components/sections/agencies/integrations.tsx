import Image from "next/image"

export function AgenciesIntegrations() {
    return (
        <section className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-8 max-w-3xl mx-auto">

                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            Integrations
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary leading-none">
                            Available inside the tools
                            <span className="block">your team already uses.</span>
                        </h2>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Image
                            src="/miro-logo.svg"
                            alt="Miro"
                            width={100}
                            height={36}
                            className="h-8 w-auto object-contain"
                        />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">ADXC is integrated with Miro Sidekick</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your strategists can pull consumer data directly into briefs, workshops,
                                and planning sessions. More platform integrations launching throughout 2026.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}