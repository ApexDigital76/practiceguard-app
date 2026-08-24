'use client'
import { useState } from 'react'
import { CheckCircle, Shield, Phone, Mail, Star, Lock, FileText, Users, Headphones, Globe, Award, BarChart2 } from 'lucide-react'
import Navbar from '@/components/Navbar'

const WHO_FOR = [
  'Multiple locations',
  'Stricter cyber insurance or lender requirements',
  'AI patient-intake or advanced tech stack',
  'Board, ownership, or executive reporting needs',
  'A single partner for OCR, breach, and renewal pressure',
]

const PROCESS = [
  {
    title: 'Onboarding',
    items: [
      'Kickoff with leadership — locations, systems, insurance, priorities',
      'Full compliance baseline assessment',
      'Multi-location mapping and per-site visibility',
      'Insurance evidence plan and broker coordination path',
      'Monthly and quarterly cadence locked in',
    ],
  },
  {
    title: 'Monthly',
    items: [
      'Elevated monitoring (monthly vulnerability scans)',
      'Executive-style compliance reporting',
      'Strategy call with Dallas',
      'Priority / emergency support with same-day response for critical issues',
    ],
  },
  {
    title: 'Quarterly & annually',
    items: [
      'Deeper multi-location review cycles',
      'Scorecards and prioritized action lists',
      'Re-assessment, certification letter support',
      'Pen test coordination, policy/training/IR refresh',
      'Pre-renewal insurance package and optional on-site visit',
    ],
  },
]

const ENTERPRISE_SERVICES = [
  {
    icon: BarChart2,
    title: 'Everything in Managed Compliance — plus:',
    highlight: true,
    items: [
      'All monthly monitoring, scanning, and reporting from Managed Compliance',
      'Full HIPAA policy library — maintained and updated',
      'Staff training, BAA tracking, and dark web monitoring',
      'Quarterly review calls and priority support',
    ],
  },
  {
    icon: Award,
    title: 'Cyber Insurance Certification',
    items: [
      'Full cyber insurance audit preparation — every document carriers require',
      'Security controls attestation letter signed by PracticeGuard',
      'Evidence package: scan reports, training records, policy logs, MFA screenshots',
      'Direct coordination with your insurance broker',
      'Pre-renewal check every year — no surprises at renewal',
      'Claim support guidance — incident documentation preparation',
    ],
  },
  {
    icon: Globe,
    title: 'AI Patient Intake Compliance',
    items: [
      'HIPAA review of AI-powered patient intake tools',
      'BAA review for AI vendors',
      'Data flow mapping for AI-collected PHI',
      'Consent form and authorization language review',
      'Staff training on HIPAA-compliant AI use',
      'Ongoing monitoring as AI tools change',
    ],
  },
  {
    icon: Lock,
    title: 'Advanced Technical Security',
    items: [
      'Monthly vulnerability scans (vs. quarterly on Managed)',
      'Annual third-party penetration test — full report',
      'Zero Trust network architecture guidance',
      'EDR deployment oversight',
      'SIEM log review',
      'Multi-location network segmentation support',
    ],
  },
  {
    icon: Users,
    title: 'Multi-Location & Staff Management',
    items: [
      'Unlimited locations under one Enterprise plan',
      'Per-location compliance dashboards',
      'Role-based access control review across locations',
      'Location-specific risk assessments where needed',
      'Staff training tracked per location',
      'Office manager compliance POC training',
    ],
  },
  {
    icon: FileText,
    title: 'Executive & Board Reporting',
    items: [
      'Monthly executive compliance report — board-ready',
      'Annual compliance certification letter',
      'OCR audit response — full management',
      'Breach response management and OCR notification support',
      'HIPAA attestation for contracts',
      'Litigation support documentation if needed',
    ],
  },
  {
    icon: Headphones,
    title: 'White-Glove Support',
    items: [
      'Direct cell phone access to Dallas',
      'Same-day response for compliance emergencies',
      'Monthly 30-minute strategy call (plus quarterly reviews)',
      'Annual on-site visit available',
      'Unlimited staff compliance questions',
      'New location onboarding support',
    ],
  },
]

const COMPARE = [
  { feature: 'Compliance Audit & Risk Analysis', audit: true, managed: true, enterprise: true },
  { feature: 'Monthly Compliance Monitoring', audit: false, managed: true, enterprise: true },
  { feature: 'Quarterly Vulnerability Scans', audit: false, managed: true, enterprise: true },
  { feature: 'Monthly Vulnerability Scans', audit: false, managed: false, enterprise: true },
  { feature: 'HIPAA Policy Library (20+ policies)', audit: false, managed: true, enterprise: true },
  { feature: 'Staff Security Training', audit: false, managed: true, enterprise: true },
  { feature: 'Dark Web Monitoring', audit: false, managed: true, enterprise: true },
  { feature: 'Quarterly Review Calls', audit: false, managed: true, enterprise: true },
  { feature: 'Monthly Strategy Calls', audit: false, managed: false, enterprise: true },
  { feature: 'Annual Penetration Test', audit: false, managed: true, enterprise: true },
  { feature: 'Cyber Insurance Certification Package', audit: false, managed: false, enterprise: true },
  { feature: 'AI Patient Intake Compliance Review', audit: false, managed: false, enterprise: true },
  { feature: 'Multi-Location Coverage (Unlimited)', audit: false, managed: false, enterprise: true },
  { feature: 'Executive / Board Reporting', audit: false, managed: false, enterprise: true },
  { feature: 'OCR Audit Response Management', audit: false, managed: false, enterprise: true },
  { feature: 'On-Site Annual Visit', audit: false, managed: false, enterprise: true },
  { feature: 'Direct Cell Phone Access to Dallas', audit: false, managed: false, enterprise: true },
]

export default function EnterprisePage() {
  const [form, setForm] = useState({ practice_name: '', name: '', phone: '', email: '', locations: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practice_name: form.practice_name,
          dentist_name: form.name,
          phone: form.phone,
          email: form.email,
          locations: form.locations,
          concern: 'Enterprise Program (From $1,200/mo)',
          source: 'enterprise-page',
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#14b8a6]/20 text-[#14b8a6] px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Star size={14} className="fill-[#14b8a6]" /> Enterprise Program
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Enterprise Compliance Program
                <br />
                <span className="text-[#14b8a6]">White-glove. Multi-location. Insurance-ready.</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                Everything in Managed Compliance, plus cyber insurance certification support, advanced technical
                oversight, multi-location visibility, AI intake compliance, and direct access to Dallas.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 border border-white/20 rounded-2xl px-8 py-6 text-center">
              <div className="text-sm text-white/50 mb-1">Starting at</div>
              <div className="text-4xl font-bold text-[#14b8a6]">
                $1,200<span className="text-2xl">/mo</span>
              </div>
              <div className="text-white/60 text-xs mt-1">+ setup · Custom proposal after discovery</div>
              <a
                href="#get-started"
                className="block mt-4 bg-[#14b8a6] text-[#0b2340] font-bold px-6 py-2.5 rounded-lg hover:bg-[#14b8a6]/90 transition-colors text-sm"
              >
                Talk to Us →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] text-center mb-3">Who this is for</h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Practices that need organization-level compliance — not a single-office checklist.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {WHO_FOR.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 px-5 py-3">
                <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={16} />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">How the service works</h2>
          <p className="text-gray-500 text-center mb-12">Onboarding through ongoing executive cadence.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PROCESS.map(({ title, items }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#0b2340] mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Everything included</h2>
          <p className="text-gray-500 text-center mb-12">A complete breakdown of every service area in Enterprise.</p>
          <div className="space-y-8">
            {ENTERPRISE_SERVICES.map(({ icon: Icon, title, items, highlight }) => (
              <div
                key={title}
                className={`rounded-2xl p-8 border ${highlight ? 'bg-[#0b2340] border-[#14b8a6]/30' : 'bg-white border-gray-100'}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? 'bg-[#14b8a6]' : 'bg-[#0b2340]'}`}
                  >
                    <Icon className={highlight ? 'text-[#0b2340]' : 'text-[#14b8a6]'} size={18} />
                  </div>
                  <h3 className={`text-xl font-bold ${highlight ? 'text-white' : 'text-[#0b2340]'}`}>{title}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={15} />
                      <span className={highlight ? 'text-white/80' : 'text-gray-600'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0b2340]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">How Enterprise compares</h2>
          <p className="text-white/50 text-center mb-12">See exactly what each plan includes.</p>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-4 bg-white/10 px-6 py-4 text-sm font-bold text-white">
              <div className="col-span-1">Feature</div>
              <div className="text-center">Audit</div>
              <div className="text-center">Managed</div>
              <div className="text-center text-[#14b8a6]">Enterprise</div>
            </div>
            {COMPARE.map(({ feature, audit, managed, enterprise }, i) => (
              <div
                key={feature}
                className={`grid grid-cols-4 px-6 py-3 text-sm border-t border-white/5 ${i % 2 === 0 ? '' : 'bg-white/5'}`}
              >
                <div className="col-span-1 text-white/70">{feature}</div>
                <div className="text-center">
                  {audit ? <CheckCircle className="text-green-400 mx-auto" size={16} /> : <span className="text-white/20">—</span>}
                </div>
                <div className="text-center">
                  {managed ? (
                    <CheckCircle className="text-green-400 mx-auto" size={16} />
                  ) : (
                    <span className="text-white/20">—</span>
                  )}
                </div>
                <div className="text-center">
                  {enterprise ? (
                    <CheckCircle className="text-[#14b8a6] mx-auto" size={16} />
                  ) : (
                    <span className="text-white/20">—</span>
                  )}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-4 px-6 py-4 border-t border-white/10 bg-white/5">
              <div className="text-white/50 text-xs">Pricing</div>
              <div className="text-center text-white font-bold text-sm">$1,997</div>
              <div className="text-center text-white font-bold text-sm">$675/mo</div>
              <div className="text-center text-[#14b8a6] font-bold text-sm">$1,200/mo</div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-started" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Talk about Enterprise</h2>
          <p className="text-gray-500 text-center mb-10">
            Fill out the form and Dallas will schedule a discovery call and build a custom proposal for your practice.
          </p>
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
              <div className="font-semibold text-green-800 text-lg">Request received!</div>
              <p className="text-green-700 mt-1">Dallas will be in touch within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'practice_name', label: 'Practice Name *', placeholder: 'Smile Dental', required: true },
                  { key: 'name', label: 'Your Name', placeholder: 'Dr. Smith', required: false },
                  { key: 'phone', label: 'Phone', placeholder: '(615) 555-0100', required: false },
                  { key: 'email', label: 'Email', placeholder: 'office@practice.com', required: false },
                  { key: 'locations', label: '# of Locations', placeholder: '1', required: false },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type="text"
                      required={f.required}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                    />
                  </div>
                ))}
              </div>
              {status === 'error' && (
                <p className="text-red-600 text-sm">
                  Something went wrong. Call{' '}
                  <a href="tel:6157853493" className="underline">
                    (615) 785-3493
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:dallas@practiceguardcompliance.com" className="underline">
                    dallas@practiceguardcompliance.com
                  </a>
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#0b2340] text-white font-bold py-3 rounded-lg hover:bg-[#0b2340]/90 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Submitting...' : 'Request Enterprise Program Info'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold mb-2">
              <Shield className="text-[#14b8a6]" size={18} /> PracticeGuard Compliance Group
            </div>
            <p className="text-sm">HIPAA compliance for dental & medical practices.</p>
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
