import { FadeIn } from "@/components/ui/fade-in"

interface MoreProvidersProps {
    text: string
}

export function MoreProviders({ text }: MoreProvidersProps) {
    return (
        <FadeIn>
            <section className="bg-brand-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex justify-center">
                    <p className="text-base text-center text-primary">
                        {text}
                    </p>
                </div>
            </section>
        </FadeIn>
    )
}
