import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "@/components/ui/fade-in"

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}

const team = [
    {
        name: "Roy",
        title: "Co-founder",
        photo: "/roy.jpeg",
        linkedin: "https://linkedin.com/in/roy",
    },
    {
        name: "Josh",
        title: "Co-founder",
        photo: "/josh.jpeg",
        linkedin: "https://linkedin.com/in/josh",
    },
    {
        name: "George",
        title: "Co-founder",
        photo: "/george.jpeg",
        linkedin: "https://linkedin.com/in/george",
    },
]

export function AboutTeam() {
    return (
        <FadeIn>
            <section className="bg-brand-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">The team</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        {team.map((person) => (
                            <div key={person.name} className="flex flex-col items-center text-center gap-4">
                                <div className="relative w-48 h-48 shrink-0 group">
                                    <Image
                                        src={person.photo}
                                        alt={person.name}
                                        fill
                                        className="object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 rounded-lg bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold text-foreground">{person.name}</p>
                                    <p className="text-sm text-muted-foreground">{person.title}</p>
                                </div>
                                <Link
                                    href={person.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    aria-label={`${person.name} on LinkedIn`}
                                >
                                    <LinkedInIcon />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}