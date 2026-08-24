'use client'
import { useState } from 'react'
import { CheckCircle, Shield, Phone, Mail, Calendar, BarChart2, Lock, FileText, Users, Headphones } from 'lucide-react'
import Navbar from '@/components/Navbar'

const WHO_FOR = [
  "Don't have time to track every policy, BAA, and training record",
  'Need help before cyber insurance renewal',
  'Want ongoing monitoring instead of a one-time report that goes stale',
  'Prefer a known expert over a ticket queue',
]

const PROCESS = [
  {
    title: 'Onboarding (first 30–60 days)',
    items: [
      'Kickoff call — goals, systems, vendors, insurance timeline',
      'Full Compliance Audit included ($1,997 value)',
      'Deliver audit package and remediation priorities',
      'Establish policy, BAA, and training baseline',
      'Set monitoring schedule and quarterly review dates',
    ],
  },
  {
    title: 'Every month',
    items: [
      'Compliance status update / dashboard',
      'Patch and control posture review',
      'MFA and endpoint checks',
      'Direct support for questions and urgent issues',
    ],
  },
  {
    title: 'Every quarter',
    items: [
      'Vulnerability scan with remediation report',
      '1-hour review call with Dallas',
      'Scorecard and priority list for next quarter',
      'OCR / HIPAA update briefing as needed',
    ],
  },
  {
    title: 'Every year',
    items: [
      'Full compliance re-assessment',
      'Policy review and updates',
      'Staff HIPAA security training and records',
      'Incident response plan review and test',
      'Penetration test coordination',
      'Cyber insurance documentation package',
    ],
  },
]

const MONTHLY_SERVICES = [
  {
    icon: BarChart2,
    title: 'Ongoing Compliance Monitoring',
    items: [
      'Monthly compliance status dashboard — always know where you stand',
      'Automated alerts when new HIPAA requirements or OCR guidance is released',
      'Continuous monitoring of your risk posture as your practice changes',
      'Annual full compliance re-assessment at no additional cost',
      'Immediate notification if a vendor or Business Associate has a breach',
    ],
  },
  {
    icon: Lock,
    title: 'Technical Security Management',
    items: [
      'Quarterly network vulnerability scans with full remediation reports',
      'Monthly patch status review — are all systems current?',
      'MFA monitoring — alerts if authentication controls are disabled or bypassed',
      'Annual penetration test coordination (required under proposed Security Rule updates)',
      'Endpoint protection status monitoring across all practice workstations',
      'Dark web monitoring — alerts if your practice email or credentials appear for sale',
    ],
  },
  {
    icon: FileText,
    title: 'Policy & Documentation Management',
    items: [
      'HIPAA policy library — 20+ required policies maintained and updated for you',
      'Annual policy review and updates to reflect regulatory changes',
      'Business Associate Agreement (BAA) tracking — we manage your full vendor list',
      'Incident response plan — maintained, tested, and updated annually',
      'Employee security training records management',
      'Audit-ready documentation package always available on request',
    ],
  },
  {
    icon: Users,
    title: 'Staff Training & Awareness',
    items: [
      'Annual HIPAA security awareness training for all staff (required by law)',
      'Phishing simulation exercises — test your team without real risk',
      'New employee onboarding HIPAA training and documentation',
      'Training completion certificates maintained in your compliance file',
      'Breach response tabletop exercise — walkthrough of your incident response plan',
    ],
  },
  {
    icon: Calendar,
    title: 'Quarterly Review Meetings',
    items: [
      '1-hour quarterly check-in call with Dallas — review status, address questions',
      'Quarterly compliance scorecard showing progress since last review',
      'Priority list for the upcoming quarter based on current risk posture',
      'Update briefing on any new OCR enforcement actions or HIPAA changes',
      'Renewal guidance for cyber insurance — we prepare your documentation package',
    ],
  },
  {
    icon: Headphones,
    title: 'Priority Support & Incident Response',
    items: [
      'Direct phone and email access to Dallas — no ticket queues',
      'Same-business-day response for urgent compliance questions',
      'Breach response support — we guide you through OCR notification requirements',
      'OCR audit support — if you receive an audit notice, we handle the response',
      'Unlimited HIPAA compliance questions throughout the month',
    ],
  },
]

const INCLUDED = [
  'Everything in the Compliance Audit ($1,997 value) — included at no extra charge',
  'Monthly compliance monitoring and reporting',
  'Quarterly vulnerability scans',
  'Full HIPAA policy library (20+ policies)',
  'Annual staff security training',
  'BAA tracking and management',
  'Dark web monitoring',
  'Quarterly review calls with Dallas',
  'Priority support — direct access, no ticket queues',
  'Breach response guidance',
  'OCR audit support',
  'Cyber insurance documentation package',
  'Annual penetration test coordination',
  'Incident response plan — written, maintained, tested',
]

export default function ManagedCompliancePage() {
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
          concern: 'Managed Compliance (From $675/mo)',
          source: 'managed-compliance-page',
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
            <Shield size={14} /> Managed Compliance Program
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Managed HIPAA Compliance
                <br />
                <span className="text-[#14b8a6]">Done for you. Every month.</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                Ongoing monitoring, documentation, training, and a direct line to someone who knows healthcare IT. You
                run the practice — we keep you audit-ready and insurance-ready.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 border border-white/20 rounded-2xl px-8 py-6 text-center">
              <div className="text-sm text-white/50 mb-1">Starting at</div>
              <div className="text-4xl font-bold text-[#14b8a6]">
                $675<span className="text-2xl">/mo</span>
              </div>
              <div className="text-white/60 text-xs mt-1">+ setup · Audit included · No long-term contract required to start</div>
              <a
                href="#get-started"
                className="block mt-4 bg-[#14b8a6] text-[#0b2340] font-bold px-6 py-2.5 rounded-lg hover:bg-[#14b8a6]/90 transition-colors text-sm"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] text-center mb-3">Who this is for</h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Practices that want to stay compliant without building an internal compliance department.
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
          <p className="text-gray-500 text-center mb-12">Clear cadence from day one through year one and beyond.</p>
          <div className="grid md:grid-cols-2 gap-6">
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

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0b2340] text-center mb-10">Everything included</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {INCLUDED.map((item) => (
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
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">What we do in detail</h2>
          <p className="text-gray-500 text-center mb-12">A breakdown of every service area in your Managed Compliance program.</p>
          <div className="space-y-8">
            {MONTHLY_SERVICES.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#0b2340] rounded-lg flex items-center justify-center">
                    <Icon className="text-[#14b8a6]" size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b2340]">{title}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="text-[#14b8a6] flex-shrink-0 mt-0.5" size={15} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Get started with Managed Compliance</h2>
          <p className="text-gray-500 text-center mb-10">
            Fill out the form and Dallas will reach out to discuss your practice's needs and confirm pricing.
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
                {status === 'loading' ? 'Submitting...' : 'Request Managed Compliance Info'}
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
