import type { MetadataRoute } from 'next'
import { POSTS } from './blog/posts'

const BASE_URL = 'https://www.practiceguardcompliance.com'

const CHANGE_SLUGS = [
  'multi-factor-authentication',
  'data-encryption',
  'vulnerability-scanning',
  'penetration-testing',
  'incident-response-plan',
  'asset-inventory',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/cyber-insurance',
    '/resources',
    '/service-areas',
    '/partners',
    '/blog',
    '/privacy',
    '/book-a-demo',
    '/services/compliance-audit',
    '/services/managed-compliance',
    '/services/enterprise',
  ].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }))

  const changePages = CHANGE_SLUGS.map(slug => ({
    url: `${BASE_URL}/changes/${slug}`,
    lastModified: new Date(),
  }))

  const blogPages = POSTS.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
  }))

  return [...staticPages, ...changePages, ...blogPages]
}
