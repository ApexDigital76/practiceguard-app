import type { Metadata } from 'next'
import Link from 'next/link'
import { Handshake, CheckCircle, Mail, Phone } from 'lucide-react'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Referral Partner Program',
  description: 'Partner with PracticeGuard Compliance Group to refer dental and medical practices for HIPAA compliance and cyber insurance readiness services.',
}

const WHO_ITS_FOR = [
  'Dental & medical IT support companies',
  'Practice billing and RCM companies',
  'CPAs and accountants serving healthcare practices',
  'Dental supply and equipment reps',
  'Insurance brokers (malpractice, business, cyber)',
  'Practice management consultants',
]

const WHY_PARTNER = [
  {
    title: 'You already have the trust',
    desc: 'Your clients already trust you with their practice\'s systems, books, or supplies. A HIPAA compliance referral is a natural extension of that relationship, not a cold pitch.',
  },
  {
    title: 'Your clients are exposed right now',
    desc: 'The 2026 HIPAA Security Rule update means most practices are out of compliance without realizing it. That\'s a real risk sitting in your client base — and a reason to reach out that isn\'t just sales.',
  },
  {
    title: 'A referral fee for every closed client',
    desc: 'We pay a referral fee for every practice that becomes a paying client through your introduction. No cost to you, no obligation beyond the introduction itself.',
  },
  {
    title: 'We make you look good',
    desc: 'We handle the entire engagement — free readiness check, audit, remediation — professionally and promptly, so a referral reflects well on you.',
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#14b8a6]/20 text-[#14b8a6] px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Handshake size={14} /> Referral Partner Program
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Refer your clients. Get paid when they become ours.
          </h1>
          <p className="text-white/70 text-lg">
            If you work with dental or medical practices, you already know they&apos;re exposed to the 2026 HIPAA Security Rule update. Send them our way — we&apos;ll take it from there.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] mb-6">Who this is for</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {WHO_ITS_FOR.map(item => (
              <div key={item} className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={15} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] mb-6 text-center">Why partner with PracticeGuard</h2>
          <div className="space-y-6">
            {WHY_PARTNER.map(({ title, desc }) => (
              <div key={title}>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#0b2340] mb-3">Let&apos;s talk</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Reach out and we&apos;ll walk through the referral fee structure and how to make the introduction — most partners just send a quick email or intro call.
        </p>
        <Link href="mailto:dallas@practiceguardcompliance.com?subject=Referral%20Partner%20Program" className="inline-block bg-[#14b8a6] text-[#0b2340] font-bold px-8 py-4 rounded-lg hover:bg-[#14b8a6]/90 transition-colors">
          Become a Referral Partner
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
