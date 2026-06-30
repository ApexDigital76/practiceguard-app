import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/leads', '/clients', '/login'],
    },
    sitemap: 'https://practiceguardcompliance.com/sitemap.xml',
  }
}
