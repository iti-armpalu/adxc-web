import Image from "next/image"

interface ProviderLogoProps {
    src: string
    alt: string
    size: number
}

// SVGs use a plain <img> (no optimisation benefit for vectors); raster logos go through next/image.
export function ProviderLogo({ src, alt, size }: ProviderLogoProps) {
    const className = "rounded-full object-cover w-full h-full"

    if (src.endsWith(".svg")) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} width={size} height={size} className={className} />
    }

    return <Image src={src} alt={alt} width={size} height={size} className={className} />
}
