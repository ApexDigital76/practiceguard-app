import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for PracticeGuard Compliance Group — how we collect, use, and protect information from dental and medical practices.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/70 text-sm">Last updated: August 23, 2026</p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-8 text-gray-700 text-sm leading-relaxed">
          <p>
            PracticeGuard Compliance Group (&quot;PracticeGuard,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides HIPAA
            compliance consulting and related services to dental and medical practices, primarily in Middle Tennessee.
            This Privacy Policy explains how we collect, use, and protect information when you visit
            practiceguardcompliance.com, contact us, or use our free readiness tools.
          </p>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Information we collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact and practice details you submit (name, practice name, email, phone, software, location count, concerns).</li>
              <li>Technical data such as browser type, device, IP address, and pages visited (including via analytics).</li>
              <li>Attribution data (e.g. referral source or campaign parameters) when you arrive from a link or ad.</li>
              <li>Communications you send us by email, phone, or form.</li>
            </ul>
            <p className="mt-3">
              We do not intentionally collect patient protected health information (PHI) through our public website forms.
              Please do not submit patient names, medical details, or other PHI in contact or assessment forms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">How we use information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to inquiries and schedule readiness checks or demos.</li>
              <li>To provide consulting, audits, and related services you request.</li>
              <li>To improve our website and understand how visitors use it.</li>
              <li>To send follow-up communications related to your request (you can opt out of marketing emails).</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with service providers who help us operate
              our business (for example, email delivery, hosting, analytics, or payment processing), under agreements that
              limit their use of the data. We may also disclose information if required by law or to protect safety and rights.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Pulse Check and related tools</h2>
            <p>
              Our free PracticeGuard Pulse Check may be hosted on a related application domain (app.practice-guard.com).
              Information you enter there is used to generate a risk-oriented score and may be used to follow up if you
              request contact. That tool is part of the PracticeGuard offering for dental and medical practices.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Cookies and analytics</h2>
            <p>
              We may use cookies and similar technologies, including analytics (such as Vercel Analytics), to understand
              site usage. You can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Data retention and security</h2>
            <p>
              We retain inquiry and client-related information as needed to provide services and meet legal or business
              requirements. We use reasonable administrative and technical safeguards appropriate to the nature of the data.
              No method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Your choices</h2>
            <p>
              You may request access to or correction of the contact information we hold about you, or ask us to delete
              inquiry records where we are not required to keep them, by emailing{' '}
              <a href="mailto:dallas@practiceguardcompliance.com" className="text-[#14b8a6] hover:underline">
                dallas@practiceguardcompliance.com
              </a>
              . If you are a California resident, additional rights may apply under state privacy law; contact us to exercise them.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Children</h2>
            <p>Our services are directed to businesses and professionals, not to children under 13.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Changes</h2>
            <p>We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will change when we do.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0b2340] mb-2">Contact</h2>
            <p>
              PracticeGuard Compliance Group<br />
              Gallatin, TN<br />
              <a href="mailto:dallas@practiceguardcompliance.com" className="text-[#14b8a6] hover:underline">
                dallas@practiceguardcompliance.com
              </a>
              <br />
              <a href="tel:6157853493" className="text-[#14b8a6] hover:underline">(615) 785-3493</a>
            </p>
          </div>

          <p>
            <Link href="/" className="text-[#14b8a6] hover:underline">← Back to home</Link>
          </p>
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
