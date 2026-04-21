export function ProblemSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left — stat */}
                <div className="space-y-6 text-center md:text-left">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        The problem
                    </p>
                    <div className="space-y-2">
                        <p className="text-7xl sm:text-8xl font-semibold tracking-tight text-foreground">
                            $200k+
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                            Price for enterprise subscriptions to premium marketing data providers
                        </p>
                    </div>
                </div>

                {/* Right — copy */}
                <div className="space-y-6">
                    <p className="text-2xl sm:text-3xl font-medium text-muted-foreground leading-snug">
                        99% of businesses can't afford the data they need to make better
                        marketing decisions. This limits your growth.
                    </p>
                    <p className="text-xl sm:text-2xl font-semibold text-foreground">
                        ADXC was built for the{" "}
                        <span style={{ color: "#C46184" }}>99%.</span>
                    </p>
                </div>

            </div>
        </section>
    )
}