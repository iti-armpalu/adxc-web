// Controls how search engine crawlers access adxc.ai and points them
// to the sitemap. app.adxc.ai and api.adxc.ai are separate deployments
// with their own robots.ts blocking all crawling.
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://adxc.ai/sitemap.xml',
    }
}