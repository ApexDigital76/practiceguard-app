import type { Metadata } from 'next'

// This route's page is a client component, and client components can't export
// `metadata` -- which is why pages like it were all inheriting the site-wide
// default title. A route-level layout is a server component, so the metadata
// lives here and the page itself stays exactly as it is.
// `absolute` skips the root title template; the brand suffix would push the
// local keywords past where search results get truncated.
export const metadata: Metadata = {
  title: { absolute: 'Multi-Location HIPAA Compliance for Practice Groups' },
  description:
    'White-glove HIPAA compliance and cyber insurance readiness for multi-location dental and medical groups, built for practices with several sites and shared systems.',
  alternates: { canonical: '/services/enterprise' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
