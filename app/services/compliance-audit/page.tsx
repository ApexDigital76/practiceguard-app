'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Shield, Phone, Mail, FileText, Search, ClipboardList, AlertTriangle, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

const WHAT_WE_DO = [
  {
    icon: Search,
    title: 'Technical Security Assessment',
    items: [
      'Full network vulnerability scan across all devices and systems',
      'Review of firewall rules, remote access configurations, and VPN settings',
      'Evaluation of multi-factor authentication (MFA) implementation',
      'Endpoint protection and antivirus coverage review',
      'Wi-Fi segmentation audit — patient data vs. guest vs. staff networks',
      'Cloud storage and email security configuration review',
    ],
  },
  {
    icon: ClipboardList,
    title: 'HIPAA Administrative Review',
    items: [
      'Review of all existing HIPAA policies and procedures',
      'Business Associate Agreement (BAA) inventory — are all vendors covered?',
      'Staff training records and security awareness documentation',
      'Access control review — who has access to what PHI and why',
      'Audit log review — are you tracking who accesses patient data?',
      'Workforce sanction policy and termination procedure review',
    ],
  },
  {
    icon: FileText,
    title: 'Physical Safeguards Audit',
    items: [
      'Workstation placement and screen privacy assessment',
      'Physical access controls to areas containing PHI',
      'Device disposal and media destruction procedures',
      'Mobile device policy and remote wipe capability review',
      'Visitor access and badge/sign-in procedures',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Risk Analysis (Required by HIPAA)',
    items: [
      'Formal risk analysis document — required by the HIPAA Security Rule',
      'Identification of all systems, devices, and locations that touch PHI',
      'Threat and vulnerability assessment for each identified risk',
      'Likelihood and impact scoring for every identified risk',
      'Risk prioritization matrix for remediation planning',
    ],
  },
]

const DELIVERABLES = [
  { title: 'Executive Summary Report', desc: 'A plain-English overview of your current compliance posture — written for practice owners, not IT teams.' },
  { title: 'Technical Gap Report', desc: 'Every identified vulnerability and missing control, categorized by severity: Critical, High, Medium, Low.' },
  { title: 'Formal HIPAA Risk Analysis', desc: 'The documented risk analysis required by the HIPAA Security Rule — signed and dated for your records.' },
  { title: 'Remediation Roadmap', desc: 'A prioritized action plan showing exactly what to fix, in what order, and what it will cost to close each gap.' },
  { title: 'Policy Gap List', desc: 'A complete inventory of missing or outdated HIPAA policies with recommended templates.' },
  { title: 'BAA Inventory', desc: 'A full list of your Business Associates and which ones are missing signed agreements.' },
  { title: 'Cyber Insurance Readiness Score', desc: 'A score showing where you stand against common cyber insurance carrier requirements.' },
  { title: '60-Minute Debrief Call', desc: 'Dallas walks you through every finding personally, answers your questions, and explains what comes next.' },
]

const FAQS = [
  { q: 'How long does the audit take?', a: 'The initial assessment call is 2–3 hours. We then spend 1–2 business days compiling the full report. Most practices receive their complete report within 3–5 business days of the initial call.' },
  { q: 'Do I need to have my IT person on the call?', a: 'It helps, but it\'s not required. If you have an IT vendor or managed service provider, we can coordinate directly with them to gather the technical information we need.' },
  { q: 'What if I\'m already working with a HIPAA compliance company?', a: 'A second opinion is always valuable. Many practices come to us after receiving a compliance kit or checklist from another vendor and realizing they still don\'t know if they\'re actually protected.' },
  { q: 'Is this audit the same as a HIPAA Security Risk Analysis?', a: 'Our audit includes the formal HIPAA Security Risk Analysis as a deliverable. The SRA is a required document under the HIPAA Security Rule — without it, you are out of compliance regardless of what else you have in place.' },
  { q: 'Does the $1,997 include fixing the problems found?', a: 'The audit identifies and documents all gaps. Remediation (fixing the problems) is quoted separately based on what we find. Many clients move directly into our Managed Compliance program after receiving their audit results.' },
]

export default function ComplianceAuditPage() {
  const [form, setForm] = useState({ practice_name: '', name: '', phone: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, concern: 'Compliance Audit ($1,997)', source: 'compliance-audit-page' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch { setStatus('error') }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0b2340] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 text-[#c9a84c] px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Shield size={14} /> Compliance Audit
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                HIPAA Compliance Audit<br />
                <span className="text-[#c9a84c]">& Risk Analysis</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                A complete top-to-bottom review of your practice's HIPAA compliance posture — technical, administrative, and physical — with a full written report and remediation roadmap.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 border border-white/20 rounded-2xl px-8 py-6 text-center">
              <div className="text-4xl font-bold text-[#c9a84c]">$1,997</div>
              <div className="text-white/60 text-sm mt-1">One-time · No recurring fees</div>
              <a href="#get-started" className="block mt-4 bg-[#c9a84c] text-[#0b2340] font-bold px-6 py-2.5 rounded-lg hover:bg-[#c9a84c]/90 transition-colors text-sm">
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Audit */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">What We Audit</h2>
          <p className="text-gray-500 text-center mb-12">We cover every area of the HIPAA Security Rule — nothing is skipped.</p>
          <div className="space-y-10">
            {WHAT_WE_DO.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#0b2340] rounded-lg flex items-center justify-center">
                    <Icon className="text-[#c9a84c]" size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b2340]">{title}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {items.map(item => (
                    <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="text-[#c9a84c] flex-shrink-0 mt-0.5" size={15} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 px-6 bg-[#0b2340]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">What You Receive</h2>
          <p className="text-white/50 text-center mb-12">Every audit includes these 8 deliverables — in writing.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {DELIVERABLES.map(({ title, desc }, i) => (
              <div key={title} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="w-8 h-8 bg-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0 text-[#0b2340] font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{title}</div>
                  <div className="text-white/60 text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={q} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {q}
                  <ArrowRight size={16} className={`flex-shrink-0 transition-transform text-[#c9a84c] ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section id="get-started" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Schedule Your Compliance Audit</h2>
          <p className="text-gray-500 text-center mb-10">Fill out the form below and Dallas will reach out within 1 business day to schedule your audit.</p>
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
              <div className="font-semibold text-green-800 text-lg">Request received!</div>
              <p className="text-green-700 mt-1">Dallas will be in touch within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl border border-gray-200 p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'practice_name', label: 'Practice Name *', placeholder: 'Smile Dental', required: true },
                  { key: 'name', label: 'Your Name', placeholder: 'Dr. Smith', required: false },
                  { key: 'phone', label: 'Phone', placeholder: '(615) 555-0100', required: false },
                  { key: 'email', label: 'Email', placeholder: 'office@practice.com', required: false },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type="text" required={f.required} placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                    />
                  </div>
                ))}
              </div>
              {status === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong. Call <a href="tel:6157853493" className="underline">(615) 785-3493</a> or email <a href="mailto:dallas@practiceguardcompliance.com" className="underline">dallas@practiceguardcompliance.com</a></p>
              )}
              <button type="submit" disabled={status === 'loading'} className="w-full bg-[#0b2340] text-white font-bold py-3 rounded-lg hover:bg-[#0b2340]/90 disabled:opacity-50 transition-colors">
                {status === 'loading' ? 'Submitting...' : 'Request My Compliance Audit — $1,997'}
              </button>
              <p className="text-xs text-gray-400 text-center">No payment collected here. Dallas will contact you to confirm details before any charges.</p>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold mb-2"><Shield className="text-[#c9a84c]" size={18} /> PracticeGuard Compliance Group</div>
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
