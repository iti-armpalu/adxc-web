import Image from "next/image"

export function BrandsIntegrations() {
    return (
        <section className="bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="space-y-8 max-w-3xl mx-auto">

                    <div className="space-y-3 text-center">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary leading-none">
                            Available inside the tools
                            <span className="block">you already use</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Use ADXC through the tools you already know.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center gap-6">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-primary">Access via Miro</p>
                        </div>
                        <Image
                            src="/miro-logo.svg"
                            alt="Miro"
                            width={100}
                            height={36}
                            className="h-10 w-auto object-contain"
                        />

                    </div>

                </div>
            </div>
        </section>
    )
}