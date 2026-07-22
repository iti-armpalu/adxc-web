import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://adxc.ai'

    return [
        { url: `${base}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${base}/brands`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/agencies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/data-providers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/ai-platforms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/product/platform`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/product/data-sources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ]
}