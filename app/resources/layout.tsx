import type { Metadata } from 'next'

// This route's page is a client component, and client components can't export
// `metadata` -- which is why pages like it were all inheriting the site-wide
// default title. A route-level layout is a server component, so the metadata
// lives here and the page itself stays exactly as it is.
// `absolute` skips the root title template; the brand suffix would push the
// local keywords past where search results get truncated.
export const metadata: Metadata = {
  title: { absolute: 'Dental Practice Cyber Threat & Breach Case Studies' },
  description:
    'Real ransomware and breach cases affecting dental and medical practices, what they cost, and what cyber insurers now require. Free resources from PracticeGuard Compliance Group.',
  alternates: { canonical: '/resources' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
