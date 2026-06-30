'use client'
import Link from 'next/link'
import { Shield, AlertTriangle, CheckCircle, Phone, Mail, ExternalLink, TrendingUp, DollarSign, Clock, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'

const STATS = [
  { value: '58%', label: 'Surge in healthcare ransomware attacks in 2025', icon: TrendingUp },
  { value: '$7.42M', label: 'Average cost of a healthcare data breach in 2025 — highest of any industry for 14 consecutive years', icon: DollarSign },
  { value: '$1.02M', label: 'Average recovery cost excluding ransom payment', icon: DollarSign },
  { value: '190M', label: 'Patient records stolen in the 2024 Change Healthcare attack alone', icon: Users },
  { value: '60%', label: 'Of small businesses that suffer a major breach close within 6 months', icon: Clock },
  { value: '$1,000', label: 'What a single stolen medical record sells for on the dark web — vs. a few dollars for a credit card', icon: AlertTriangle },
]

const CASE_STUDIES = [
  {
    title: 'Change Healthcare — February 2024',
    tag: 'National Impact',
    tagColor: 'bg-red-100 text-red-700',
    summary: 'The largest healthcare cyberattack in U.S. history. BlackCat ransomware group exploited a single missing control — no multi-factor authentication on a remote access portal.',
    impact: [
      'Protected health information of 190 million Americans stolen',
      'Claims systems offline for weeks — providers couldn\'t bill insurance',
      'Thousands of small practices pushed to the brink of closure',
      'UnitedHealth Group paid $3.09 billion in direct response costs in 9 months',
      'More than $9 billion in emergency loans issued to keep providers solvent',
    ],
    lesson: 'The entire attack hinged on one missing control: MFA. One checkbox would have prevented the largest healthcare breach in history.',
    source: 'https://www.hipaajournal.com/change-healthcare-responding-to-cyberattack/',
  },
  {
    title: '400+ Dental Practices — Ransomware Outbreak',
    tag: 'Dental Industry',
    tagColor: 'bg-amber-100 text-amber-700',
    summary: 'A single ransomware attack propagated through shared dental IT infrastructure, simultaneously locking down over 400 dental offices across the country.',
    impact: [
      'Practices unable to access patient records, X-rays, or scheduling systems',
      'Appointments cancelled for days to weeks across hundreds of locations',
      'Patient care disrupted — some procedures delayed or rescheduled indefinitely',
      'Ransom demands issued to each practice individually',
      'Many practices had no backup systems — data was unrecoverable',
    ],
    lesson: 'Dental practices share software and IT vendors. One breach in the supply chain can hit hundreds of offices simultaneously — even if your own security is decent.',
    source: 'https://www.dentists-advantage.com/Prevention-Education/Risk-Alerts/Risk-Alerts-Index/Content/Ransomware-attack-hits-over-400-dental-practices',
  },
  {
    title: 'Absolute Dental — February 2025',
    tag: 'Recent Breach',
    tagColor: 'bg-orange-100 text-orange-700',
    summary: 'A Nevada-based dental group with 50+ locations discovered a breach that exposed data on over 1.2 million patients.',
    impact: [
      '1.2 million patient records compromised across 50+ locations',
      'Names, Social Security numbers, dates of birth, and treatment data exposed',
      'HIPAA breach notification required for all affected patients',
      'OCR investigation initiated — potential fines pending',
      'Ongoing legal liability from affected patients',
    ],
    lesson: 'Size doesn\'t protect you. Multi-location dental groups are high-value targets precisely because of the volume of patient data they hold.',
    source: 'https://www.paubox.com/blog/real-world-dental-breaches-that-prove-no-practice-is-too-small',
  },
  {
    title: 'Small Practice — "We Thought We Were Too Small to Target"',
    tag: 'Small Practice',
    tagColor: 'bg-blue-100 text-blue-700',
    summary: 'A single-dentist practice in the Midwest was hit with ransomware on a Tuesday morning. By Thursday, they were considering closing permanently.',
    impact: [
      'All patient records, X-rays, and treatment histories encrypted and inaccessible',
      'No working backup — the last backup was 8 months old',
      'Ransom demand: $45,000 in Bitcoin',
      '$180,000 total recovery cost including IT forensics, new hardware, and lost revenue',
      'Practice was offline for 3 weeks — patients transferred to competitors',
    ],
    lesson: 'Attackers don\'t care how many chairs you have. Automated ransomware scans the internet for vulnerable systems — your ZIP code and revenue don\'t factor in.',
    source: 'https://www.docseducation.com/blog/dentistry-faces-rising-wave-cyberattacks',
  },
]

const INSURANCE_FACTS = [
  'Multi-factor authentication (MFA) on ALL systems — not just email',
  'Encrypted, tested, offsite data backups',
  'Documented incident response plan',
  'Annual staff security awareness training with records',
  'Endpoint detection & response (EDR) software on all workstations',
  'Quarterly vulnerability scans with remediation logs',
  'Third-party vendor risk assessments',
  'Network segmentation separating PHI systems from general use',
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0b2340] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <AlertTriangle size={14} />
            Real Attacks. Real Consequences.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Cyber Threat to<br />
            <span className="text-[#c9a84c]">Dental & Medical Practices</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            These aren&apos;t hypotheticals. Real practices — many just like yours — have been shut down, fined, and forced to close because of ransomware and data breaches. Here&apos;s what you need to know.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] text-center mb-10">The Numbers Are Staggering</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={value} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#0b2340] rounded-lg flex items-center justify-center">
                    <Icon className="text-[#c9a84c]" size={16} />
                  </div>
                  <div className="text-3xl font-bold text-[#0b2340]">{value}</div>
                </div>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            Sources: Sophos State of Ransomware in Healthcare 2025 · IBM Cost of a Data Breach Report 2025 · DialogHealth · HIPAA Journal · HFMA
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Real Attacks. Real Damage.</h2>
          <p className="text-gray-500 text-center mb-12">These incidents happened to real practices. Read what went wrong — and what it cost.</p>
          <div className="space-y-8">
            {CASE_STUDIES.map(({ title, tag, tagColor, summary, impact, lesson, source }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gray-50 border-b border-gray-200 px-8 py-5 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 ${tagColor}`}>{tag}</span>
                    <h3 className="text-xl font-bold text-[#0b2340]">{title}</h3>
                  </div>
                  <a href={source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                    Source <ExternalLink size={12} />
                  </a>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{summary}</p>
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-3">What Happened:</div>
                    <ul className="space-y-2">
                      {impact.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#0b2340]/5 border-l-4 border-[#c9a84c] rounded-r-lg px-5 py-4">
                    <div className="text-xs font-bold text-[#c9a84c] uppercase tracking-wide mb-1">The Lesson</div>
                    <p className="text-sm text-gray-700">{lesson}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Insurance Requirements */}
      <section className="py-20 px-6 bg-[#0b2340]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">What Cyber Insurers Now Require</h2>
          <p className="text-white/50 text-center mb-4">
            Cyber insurance has fundamentally changed. Carriers no longer accept checkbox applications — they want documented proof of every control.
          </p>
          <p className="text-white/50 text-center mb-12 text-sm">
            Missing even one of these can result in a denied application, a denied claim after an attack, or dramatically higher premiums.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {INSURANCE_FACTS.map(fact => (
              <div key={fact} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle className="text-[#c9a84c] flex-shrink-0 mt-0.5" size={16} />
                <span className="text-white/80 text-sm">{fact}</span>
              </div>
            ))}
          </div>
          <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6 text-center">
            <div className="text-red-300 font-semibold mb-2">Real-World Warning</div>
            <p className="text-white/70 text-sm max-w-2xl mx-auto">
              The City of Hamilton, Ontario had cyber insurance — but their claim was denied after a major ransomware attack because MFA had not been fully implemented across their environment. Having a policy is not the same as having coverage that will actually pay.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0b2340] mb-4">Don&apos;t Wait Until It Happens to You</h2>
          <p className="text-gray-600 mb-8 text-lg">
            PracticeGuard helps dental and medical practices implement every control on the list above — so you can prevent an attack, qualify for coverage, and sleep at night knowing your patients&apos; data is protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/#contact"
              className="bg-[#0b2340] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#0b2340]/90 transition-colors"
            >
              Get My Free Readiness Check
            </Link>
            <Link
              href="/cyber-insurance"
              className="border-2 border-[#0b2340] text-[#0b2340] font-bold px-8 py-4 rounded-lg hover:bg-[#0b2340]/5 transition-colors"
            >
              Cyber Insurance Prep →
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-500">
            <a href="tel:6157853493" className="flex items-center justify-center gap-2 hover:text-[#0b2340]">
              <Phone size={14} /> (615) 785-3493
            </a>
            <a href="mailto:dallas@practiceguardcompliance.com" className="flex items-center justify-center gap-2 hover:text-[#0b2340]">
              <Mail size={14} /> dallas@practiceguardcompliance.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold mb-2">
              <Shield className="text-[#c9a84c]" size={18} />
              PracticeGuard Compliance Group
            </div>
            <p className="text-sm">HIPAA compliance &amp; cyber protection for dental &amp; medical practices.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:dallas@practiceguardcompliance.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={14} /> dallas@practiceguardcompliance.com
            </a>
            <a href="tel:6157853493" className="flex items-center gap-2 hover:text-white">
              <Phone size={14} /> (615) 785-3493
            </a>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-center">
          © {new Date().getFullYear()} PracticeGuard Compliance Group. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
