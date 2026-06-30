import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Mail, Phone, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'HIPAA Compliance Services in Nashville, Hendersonville, Gallatin, Lebanon & Mount Juliet, TN',
  description: 'PracticeGuard Compliance Group provides HIPAA compliance audits, managed compliance, and cyber insurance readiness for dental and medical practices throughout Middle Tennessee.',
}

const AREAS = [
  {
    city: 'Nashville',
    blurb: 'From single-location practices in the urban core to multi-location dental and medical groups across Davidson County, we help Nashville practices meet the 2026 HIPAA Security Rule without slowing down patient care.',
  },
  {
    city: 'Hendersonville',
    blurb: 'Hendersonville\'s growing dental and medical community faces the same insurance and compliance pressure as larger Nashville-area practices — we bring the same audit and remediation process at a price built for independent and small-group practices.',
  },
  {
    city: 'Gallatin',
    blurb: 'Based right here in Gallatin, PracticeGuard works closely with local practice owners who want a compliance partner they can actually meet face to face, not a call center.',
  },
  {
    city: 'Lebanon',
    blurb: 'Lebanon-area practices are increasingly targeted by the same ransomware groups hitting larger Nashville-area healthcare systems — we help close the technical and administrative gaps before they become a problem.',
  },
  {
    city: 'Mount Juliet',
    blurb: 'As Mount Juliet\'s healthcare community grows, so does the scrutiny from cyber insurance carriers and OCR auditors — we help practices stay ahead of both with documented, audit-ready compliance.',
  },
]

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HIPAA Compliance Across Middle Tennessee</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            PracticeGuard Compliance Group serves dental and medical practices throughout Nashville, Hendersonville, Gallatin, Lebanon, and Mount Juliet, Tennessee.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {AREAS.map(area => (
            <div key={area.city} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-[#14b8a6]" size={18} />
                <h2 className="text-xl font-bold text-[#0b2340]">{area.city}, TN</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{area.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] text-center mb-8">What Every Practice Gets, Wherever You're Located</h2>
          <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {[
              'A full HIPAA risk analysis and gap report',
              'A written, prioritized remediation roadmap',
              'Cyber insurance readiness documentation',
              'Direct access to Dallas — no ticket queue',
              'Ongoing monitoring options for multi-location groups',
              'Flat, transparent pricing — no surprise add-ons',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={15} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#0b2340] mb-3">Ready to find out where your practice stands?</h2>
        <p className="text-gray-500 mb-6">Free 30-minute readiness check — no pressure, just clarity.</p>
        <Link href="/#contact" className="inline-block bg-[#14b8a6] text-[#0b2340] font-bold px-8 py-4 rounded-lg hover:bg-[#14b8a6]/90 transition-colors">
          Get My Free Readiness Check
        </Link>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-white font-bold mb-2">PracticeGuard Compliance Group</div>
            <p className="text-sm">HIPAA compliance for dental &amp; medical practices.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:dallas@practiceguardcompliance.com" className="flex items-center gap-2 hover:text-white"><Mail size={14} /> dallas@practiceguardcompliance.com</a>
            <a href="tel:6157853493" className="flex items-center gap-2 hover:text-white"><Phone size={14} /> (615) 785-3493</a>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-center">© {new Date().getFullYear()} PracticeGuard Compliance Group. All rights reserved.</div>
      </footer>
    </div>
  )
}
