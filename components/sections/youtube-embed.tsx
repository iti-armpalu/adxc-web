"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
    videoId: string
    title: string
    thumbnail?: string // local 16:9 image in /public; falls back to YouTube's (low-res) thumbnail
}

// Lite YouTube embed: shows the thumbnail and only loads YouTube's player (~1MB of JS,
// plus cookies) when the visitor clicks play. Uses youtube-nocookie.com.
export function YouTubeEmbed({ videoId, title, thumbnail }: YouTubeEmbedProps) {
    const [playing, setPlaying] = useState(false)

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-brand-900 shadow-lg">
            {playing ? (
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play video: ${title}`}
                    className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt=""
                            fill
                            sizes="(min-width: 56rem) 848px, 100vw"
                            className="object-cover"
                        />
                    ) : (
                        <img
                            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                            alt=""
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = "none" }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}
                    <span className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105 motion-reduce:transition-none">
                        <Play className="size-7 translate-x-0.5" fill="currentColor" aria-hidden="true" />
                    </span>
                </button>
            )}
        </div>
    )
}
