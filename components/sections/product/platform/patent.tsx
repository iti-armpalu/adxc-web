import { FadeIn } from "@/components/ui/fade-in";

export function PlatformPatent() {
    return (
        <section
            style={{
                background: "linear-gradient(200deg, var(--brand-dark) 0%, var(--brand) 70%, var(--color-tyrian-600) 100%)",
            }}
        >
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-6">

                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-foreground">
                                Patent-pending technology
                            </h2>
                        </div>

                        <p className="text-base text-primary-foreground/70 leading-relaxed">
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