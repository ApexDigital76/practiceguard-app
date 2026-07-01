import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://practiceguardcompliance.com'),
  title: {
    default: 'PracticeGuard Compliance Group | HIPAA Compliance for Nashville & Middle TN Practices',
    template: '%s | PracticeGuard Compliance Group',
  },
  description: 'HIPAA compliance and cyber insurance readiness for dental and medical practices in Nashville, Hendersonville, Gallatin, Lebanon, and Mount Juliet, TN — 2026 Security Rule ready.',
  keywords: ['HIPAA compliance Nashville', 'HIPAA compliance Hendersonville TN', 'HIPAA compliance Gallatin TN', 'dental HIPAA compliance Lebanon TN', 'cyber insurance Mount Juliet TN', 'HIPAA risk assessment Middle Tennessee'],
  openGraph: {
    title: 'PracticeGuard Compliance Group',
    description: 'HIPAA compliance and cyber insurance readiness for dental and medical practices across Middle Tennessee.',
    url: 'https://practiceguardcompliance.com',
    siteName: 'PracticeGuard Compliance Group',
    locale: 'en_US',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'PracticeGuard Compliance Group',
  description: 'HIPAA compliance, risk assessments, and cyber insurance readiness for dental and medical practices in Middle Tennessee.',
  url: 'https://practiceguardcompliance.com',
  telephone: '+16157853493',
  email: 'dallas@practiceguardcompliance.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gallatin',
    addressRegion: 'TN',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Nashville, TN' },
    { '@type': 'City', name: 'Hendersonville, TN' },
    { '@type': 'City', name: 'Gallatin, TN' },
    { '@type': 'City', name: 'Lebanon, TN' },
    { '@type': 'City', name: 'Mount Juliet, TN' },
  ],
  priceRange: '$$',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.className} min-h-full`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
