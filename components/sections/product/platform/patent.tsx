import { FadeIn } from "@/components/ui/fade-in";

export function PlatformPatent() {
    return (
        <FadeIn>
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-6">

                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Intellectual property
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
                                Patent-pending technology
                            </h2>
                        </div>

                        <p className="text-base text-neutral-600 leading-relaxed">
                            ADXC's data orchestration platform is the subject of a US provisional patent
                            application. The technology covers contextual task understanding, federated query
                            execution across heterogeneous data sources, iterative completeness evaluation,
                            and controlled output transformation.
                        </p>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}