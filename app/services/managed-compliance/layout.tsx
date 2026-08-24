import type { Metadata } from 'next'

// This route's page is a client component, and client components can't export
// `metadata` -- which is why pages like it were all inheriting the site-wide
// default title. A route-level layout is a server component, so the metadata
// lives here and the page itself stays exactly as it is.
// `absolute` skips the root title template; the brand suffix would push the
// local keywords past where search results get truncated.
export const metadata: Metadata = {
  title: { absolute: 'Managed HIPAA Compliance for Dental Practices | TN' },
  description:
    'Ongoing HIPAA compliance handled for your practice every month - risk assessments, staff training, policy upkeep, and audit-ready documentation across Middle Tennessee.',
  alternates: { canonical: '/services/managed-compliance' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
