import type { Metadata } from 'next'

// This route's page is a client component, and client components can't export
// `metadata` -- which is why pages like it were all inheriting the site-wide
// default title. A route-level layout is a server component, so the metadata
// lives here and the page itself stays exactly as it is.
// `absolute` skips the root title template; the brand suffix would push the
// local keywords past where search results get truncated.
export const metadata: Metadata = {
  title: { absolute: 'HIPAA Compliance Audit for Dental Practices | Nashville' },
  description:
    'A full HIPAA Security Rule audit and risk analysis for dental and medical practices - what we audit, how it works, and the documentation you receive for OCR and cyber insurance.',
  alternates: { canonical: '/services/compliance-audit' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
