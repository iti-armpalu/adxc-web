import { FadeIn } from "@/components/ui/fade-in"

export function PlatformPatent() {
    return (
        <section className="bg-brand-50 relative overflow-hiddden">
            {/* Diagonal grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: "linear-gradient(135deg, transparent 20%, black 50%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 20%, black 50%)",
                }}
            >
                <div
                    className="absolute inset-0 bg-grid opacity-20"
                    style={{ "--grid-color": "var(--color-brand-400)" } as React.CSSProperties}
                />
            </div>
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-6">

                        <h2 className="text-primary">
                            Patent-pending technology
                        </h2>

                        <p className="text-base text-muted-foreground leading-relaxed">
                            ADXC's data orchestration platform is the subject of a US provisional patent
                            application. The technology covers contextual task understanding, federated query
                            execution across heterogeneous data sources, iterative completeness evaluation,
                            and controlled output transformation.
                        </p>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}