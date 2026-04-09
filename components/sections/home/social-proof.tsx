const partners = ["Miro", "DEPT"]

export function SocialProofSection() {
    return (
        <section className="border-y border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">

                {/* Launch partners */}
                <div className="space-y-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Launch partners
                    </p>
                    <div className="flex items-center justify-center gap-8">
                        {partners.map((partner) => (
                            <div
                                key={partner}
                                className="h-10 px-6 rounded-lg bg-muted/60 border border-border/50 flex items-center justify-center"
                            >
                                <span className="text-sm font-medium text-muted-foreground">
                                    {partner}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quote */}
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed">
                        "ADXC solves a real problem our SME clients face. How to get the
                        data they need to fuel their AI agents, and accelerate their growth"
                    </blockquote>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            Andrew Dimitriou
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Chief Growth Officer, DEPT
                        </p>
                    </div>
                </div>

                {/* Brand video placeholder */}
                <div className="aspect-video rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center max-w-4xl mx-auto">
                    <p className="text-sm text-muted-foreground">Brand video</p>
                </div>

            </div>
        </section>
    )
}