import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

const TOPICS: Record<string, {
  title: string
  tagline: string
  whatItIs: string
  whyItMatters: string
  whatItLooksLike: string[]
}> = {
  'multi-factor-authentication': {
    title: 'Multi-Factor Authentication',
    tagline: 'A second login step that stops stolen passwords from being enough.',
    whatItIs: 'Multi-Factor Authentication (MFA) means that logging in takes more than just a password — you also need a second piece of proof, like a code sent to your phone or an authenticator app. If someone steals or guesses a password, they still can\'t get in without that second step.',
    whyItMatters: 'Most healthcare breaches start with a stolen or weak password. MFA is one of the single most effective things a practice can do to stop unauthorized access, and it\'s a baseline expectation for strong HIPAA security programs and cyber insurance.',
    whatItLooksLike: [
      'Turned on for email accounts (Office 365, Gmail, etc.)',
      'Turned on for your practice management software',
      'Required for any remote access or VPN connections',
      'Required for cloud storage and any system that touches patient data',
    ],
  },
  'data-encryption': {
    title: 'Data Encryption',
    tagline: 'Scrambling patient data so it\'s unreadable if it\'s ever stolen.',
    whatItIs: 'Encryption scrambles patient data into unreadable code that can only be unlocked with the correct key. "At rest" encryption protects data sitting on a server, hard drive, or backup. "In transit" encryption protects data while it\'s moving — like when a record is emailed or synced to the cloud.',
    whyItMatters: 'If an encrypted laptop is lost or stolen, it generally does not count as a reportable HIPAA breach, because the data is unreadable without the key. Unencrypted data that\'s lost almost always does — meaning mandatory patient notifications, potential fines, and reputational damage.',
    whatItLooksLike: [
      'Full-disk encryption on all computers and laptops',
      'Encrypted backups, including offsite and cloud backups',
      'Encrypted email for anything containing patient information',
      'Encrypted connections (HTTPS/VPN) for remote access to systems',
    ],
  },
  'vulnerability-scanning': {
    title: 'Vulnerability Scanning',
    tagline: 'An automated check for weak spots in your network before hackers find them.',
    whatItIs: 'A vulnerability scan is an automated tool that checks your network, computers, and connected devices for known security weaknesses — like outdated software, missing patches, or misconfigured settings — and produces a report of what needs fixing.',
    whyItMatters: 'New security weaknesses are discovered constantly. A network that was clean six months ago can have new exploitable gaps today. Regular scanning catches these before an attacker does, and regular scanning is a proposed requirement under the HIPAA Security Rule updates — and already expected by many insurers and auditors.',
    whatItLooksLike: [
      'Scans run quarterly across your entire network',
      'A report ranking issues by severity (critical, high, medium, low)',
      'A plan to patch or fix what\'s found',
      'Documentation kept on file for audits and insurance',
    ],
  },
  'penetration-testing': {
    title: 'Penetration Testing',
    tagline: 'A simulated, hands-on hack to find what an automated scan would miss.',
    whatItIs: 'A penetration test (or "pen test") is a controlled, ethical hacking exercise where a security professional actively tries to break into your systems the way a real attacker would. Unlike an automated vulnerability scan, a pen test is hands-on and digs deeper to confirm whether a weakness can actually be exploited.',
    whyItMatters: 'Insurance carriers and OCR auditors increasingly want proof that your defenses have been tested under real attack conditions, not just scanned. An annual pen test is increasingly expected for practices seeking cyber insurance or demonstrating a mature security program.',
    whatItLooksLike: [
      'Performed once a year by a qualified third party',
      'A written report of what was tested and what was found',
      'Remediation of any confirmed weaknesses',
      'Documentation you can show an insurance carrier or auditor',
    ],
  },
  'incident-response-plan': {
    title: 'Incident Response Plan',
    tagline: 'A written game plan for the moment something goes wrong.',
    whatItIs: 'An Incident Response Plan is a written, step-by-step document describing exactly what your practice will do if you discover a breach, ransomware attack, or other security incident — who to call first, how to contain the damage, and how to notify patients and regulators.',
    whyItMatters: 'HIPAA requires practices to notify affected patients within 60 days of discovering a breach. Without a plan in place ahead of time, that response happens under pressure and mistakes get made — missed deadlines, mishandled evidence, or poor communication that makes a bad situation worse.',
    whatItLooksLike: [
      'A written plan naming who is responsible for what',
      'Clear steps for containing and investigating an incident',
      'A notification process for patients, HHS, and media if required',
      'The plan tested periodically, not just written and filed away',
    ],
  },
  'asset-inventory': {
    title: 'Asset Inventory',
    tagline: 'A complete list of every device and system that touches patient data.',
    whatItIs: 'An asset inventory is a full, up-to-date list of every computer, tablet, scanner, server, and cloud application that stores or accesses patient information — including staff phones if they check practice email.',
    whyItMatters: 'You can\'t protect what you don\'t know you have. A forgotten laptop, an old tablet at a front desk, or a personal phone with email access can all become the weak point a hacker uses to get in — and if it\'s not on your inventory, it\'s not being patched, encrypted, or monitored.',
    whatItLooksLike: [
      'Every device that touches PHI logged in one place',
      'The inventory updated whenever a device is added or retired',
      'Each device matched to its encryption and patch status',
      'Reviewed as part of your annual risk analysis',
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(TOPICS).map(slug => ({ slug }))
}

// All six of these pages were inheriting the site-wide default title, so search
// engines saw six identical entries. Each one now describes its own topic.
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const topic = TOPICS[slug]
  if (!topic) return {}

  return {
    title: { absolute: `${topic.title} for Dental & Medical Practices | HIPAA` },
    description: `${topic.tagline} What ${topic.title.toLowerCase()} means under the HIPAA Security Rule, why it matters for your practice, and what it looks like in place.`,
    alternates: { canonical: `/changes/${slug}` },
  }
}

export default async function ChangeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = TOPICS[slug]
  if (!topic) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/#changes" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6">
            <ArrowLeft size={14} /> Back to What&apos;s Proposed to Change
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{topic.title}</h1>
          <p className="text-white/70 text-lg">{topic.tagline}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-xl font-bold text-[#0b2340] mb-3">What it means</h2>
            <p className="text-gray-600 leading-relaxed">{topic.whatItIs}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0b2340] mb-3">Why it matters</h2>
            <p className="text-gray-600 leading-relaxed">{topic.whyItMatters}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0b2340] mb-3">What this looks like in practice</h2>
            <div className="space-y-2">
              {topic.whatItLooksLike.map(item => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                  <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={15} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b2340] rounded-2xl p-8 text-center">
            <div className="text-white font-bold text-lg mb-2">Not sure where your practice stands on this?</div>
            <p className="text-white/60 text-sm mb-5">Get a free 30-minute readiness check — no pressure, just clarity on what you need.</p>
            <Link href="/#contact" className="inline-block bg-[#14b8a6] text-[#0b2340] font-bold px-8 py-3 rounded-lg hover:bg-[#14b8a6]/90 transition-colors">
              Get My Free Readiness Check
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto text-xs text-center space-y-2">
          <div className="flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/#contact" className="hover:text-white">Contact</Link>
          </div>
          <div>© {new Date().getFullYear()} PracticeGuard Compliance Group. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
