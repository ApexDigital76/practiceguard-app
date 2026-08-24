import type { Metadata } from 'next'

// This route's page is a client component, and client components can't export
// `metadata` -- which is why pages like it were all inheriting the site-wide
// default title. A route-level layout is a server component, so the metadata
// lives here and the page itself stays exactly as it is.
// `absolute` skips the root title template; the brand suffix would push the
// local keywords past where search results get truncated.
export const metadata: Metadata = {
  title: { absolute: 'Cyber Insurance Readiness for Dental Practices | TN' },
  description:
    'What cyber insurers require from dental and medical practices, and how to get audit-ready. Free cyber risk assessment across Nashville, Hendersonville, Gallatin, Lebanon, and Mount Juliet, TN.',
  alternates: { canonical: '/cyber-insurance' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
