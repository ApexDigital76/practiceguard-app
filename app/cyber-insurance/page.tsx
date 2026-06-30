'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Phone, Mail, Lock, Server, Users, FileText, Wifi, Eye } from 'lucide-react'
import Navbar from '@/components/Navbar'

const AUDIT_REQUIREMENTS = [
  {
    icon: Lock,
    title: 'Multi-Factor Authentication (MFA)',
    desc: 'Required on all systems that access patient data — email, practice management software, remote access, and cloud tools.',
  },
  {
    icon: Server,
    title: 'Data Backup & Disaster Recovery',
    desc: 'Encrypted offsite backups tested regularly. Insurers want proof you can restore operations within 48–72 hours of an attack.',
  },
  {
    icon: Eye,
    title: 'Vulnerability Scanning & Patch Management',
    desc: 'Quarterly scans of your network and all connected devices. Unpatched systems are the #1 entry point for ransomware.',
  },
  {
    icon: Users,
    title: 'Staff Security Awareness Training',
    desc: 'Documented annual phishing training for all employees. 91% of successful attacks start with a phishing email.',
  },
  {
    icon: FileText,
    title: 'Incident Response Plan',
    desc: 'A written, tested plan for what to do when — not if — an attack happens. Insurers require this before they pay a claim.',
  },
  {
    icon: Wifi,
    title: 'Network Segmentation & Endpoint Protection',
    desc: 'Patient data systems isolated from guest Wi-Fi and front-desk networks. EDR (endpoint detection & response) on all workstations.',
  },
]

const PROCESS = [
  { step: '01', title: 'Free Cyber Risk Assessment', desc: 'We audit your current security posture against insurance carrier requirements — takes 30 minutes.' },
  { step: '02', title: 'Gap Report & Roadmap', desc: 'You get a clear report showing exactly what\'s missing and what it will take to close the gaps.' },
  { step: '03', title: 'Remediation & Implementation', desc: 'We handle the technical fixes or work alongside your IT team to get everything in place.' },
  { step: '04', title: 'Audit-Ready Documentation', desc: 'We produce the policies, logs, and attestations your insurance carrier needs to see.' },
  { step: '05', title: 'Ongoing Monitoring', desc: 'Monthly check-ins, quarterly scans, and annual re-assessments to keep your coverage intact at renewal.' },
]

export default function CyberInsurancePage() {
  const [form, setForm] = useState({ practice_name: '', name: '', phone: '', email: '', concern: '' })
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
          concern: form.concern || 'Cyber insurance audit prep',
          source: 'cyber-insurance-page',
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

      {/* Hero */}
      <section className="bg-[#0b2340] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <AlertTriangle size={14} />
            Cyber Attack Prevention & Insurance Readiness
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Protect Your Practice.<br />
            <span className="text-[#c9a84c]">Qualify for Cyber Insurance.</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl">
            Ransomware doesn&apos;t discriminate by practice size. We help dental and medical practices implement the exact security controls that prevent attacks — and satisfy insurance auditors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a
              href="#assessment"
              className="bg-[#c9a84c] text-[#0b2340] font-bold px-8 py-4 rounded-lg hover:bg-[#c9a84c]/90 transition-colors text-center"
            >
              Get My Free Cyber Risk Assessment
            </a>
            <a
              href="tel:6157853493"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/5 transition-colors text-center"
            >
              Call (615) 785-3493
            </a>
          </div>
          <div className="mb-10">
            <Link href="/resources" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors">
              Read real attack case studies from dental practices like yours →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '78%', label: 'Rise in healthcare ransomware (2024)' },
              { value: '$1.27M', label: 'Avg. attack cost with downtime' },
              { value: '3 in 4', label: 'Insurers require security audit' },
              { value: '60%', label: 'Breached practices close in 6 months' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#c9a84c]">{s.value}</div>
                <div className="text-white/60 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What insurers require + Sidebar */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-[#0b2340] rounded-2xl p-5 text-white mb-4">
                <div className="text-[#c9a84c] font-bold text-xs uppercase tracking-wide mb-3">Real Attack Case Studies</div>
                <p className="text-white/60 text-xs mb-4">These incidents happened to real dental and medical practices. Read what went wrong.</p>
                <div className="space-y-3">
                  {[
                    { tag: 'National', color: 'bg-red-500/20 text-red-300', title: 'Change Healthcare (2024)', desc: '190M patient records stolen. All from one missing MFA checkbox.', href: '/resources#change-healthcare' },
                    { tag: 'Dental', color: 'bg-amber-500/20 text-amber-300', title: '400+ Dental Practices Hit at Once', desc: 'One ransomware strain propagated through shared dental IT systems nationwide.', href: '/resources#dental-400' },
                    { tag: '2025', color: 'bg-orange-500/20 text-orange-300', title: 'Absolute Dental — 1.2M Patients', desc: '50+ locations, 1.2 million patient records exposed. OCR investigation opened.', href: '/resources#absolute-dental' },
                    { tag: 'Small Practice', color: 'bg-blue-500/20 text-blue-300', title: '"We Were Too Small to Target"', desc: '$180K loss. 3 weeks offline. Nearly closed for good.', href: '/resources#small-practice' },
                  ].map(({ tag, color, title, desc, href }) => (
                    <Link key={title} href={href} className="block bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${color}`}>{tag}</span>
                      <div className="text-sm font-semibold text-white group-hover:text-[#c9a84c] transition-colors mb-1">{title}</div>
                      <div className="text-xs text-white/50">{desc}</div>
                    </Link>
                  ))}
                </div>
                <Link href="/resources" className="block mt-4 text-center text-xs text-[#c9a84c] hover:underline">
                  View all case studies →
                </Link>
              </div>

              {/* Quick CTA */}
              <div className="bg-[#c9a84c] rounded-2xl p-5 text-[#0b2340]">
                <div className="font-bold text-sm mb-2">Don&apos;t be the next case study.</div>
                <p className="text-xs text-[#0b2340]/70 mb-3">Get a free 30-minute cyber risk assessment and know exactly where your practice stands.</p>
                <a href="#assessment" className="block text-center bg-[#0b2340] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-[#0b2340]/90 transition-colors">
                  Get Free Assessment
                </a>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#0b2340] mb-3">What Cyber Insurers Require</h2>
            <p className="text-gray-500 mb-8">Most practices fail 3–4 of these. We fix all of them.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {AUDIT_REQUIREMENTS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#0b2340] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#c9a84c]" size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{title}</div>
                    <div className="text-sm text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 bg-[#0b2340]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">How We Get You Audit-Ready</h2>
          <p className="text-white/50 text-center mb-12">From assessment to insurance-ready documentation — we handle it.</p>
          <div className="space-y-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6 items-start">
                <div className="text-3xl font-bold text-[#c9a84c] w-12 flex-shrink-0">{step}</div>
                <div className="border-l border-white/10 pl-6 pb-6">
                  <div className="font-semibold text-white mb-1">{title}</div>
                  <div className="text-white/60 text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="assessment" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Get Your Free Cyber Risk Assessment</h2>
          <p className="text-gray-500 text-center mb-10">30 minutes. No obligation. Know exactly where your practice stands.</p>

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
              <div className="font-semibold text-green-800 text-lg">Request received!</div>
              <p className="text-green-700 mt-1">Dallas will be in touch within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Practice Name *</label>
                  <input
                    type="text" required
                    placeholder="Smile Dental"
                    value={form.practice_name}
                    onChange={e => setForm(p => ({ ...p, practice_name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Dr. Smith"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="(615) 555-0100"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="office@practice.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Concern</label>
                <select
                  value={form.concern}
                  onChange={e => setForm(p => ({ ...p, concern: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                >
                  <option value="">Select one...</option>
                  <option>Preparing for a cyber insurance audit</option>
                  <option>We were denied cyber insurance coverage</option>
                  <option>Concerned about ransomware / attack risk</option>
                  <option>Renewal coming up — need to meet requirements</option>
                  <option>We had an incident and need help</option>
                  <option>Just want to understand our risk level</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  Something went wrong. Please call or email directly:<br />
                  <span className="font-semibold">Dallas Mitchell</span> — <a href="tel:6157853493" className="underline">(615) 785-3493</a> · <a href="mailto:dallas@practiceguardcompliance.com" className="underline">dallas@practiceguardcompliance.com</a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#0b2340] text-white font-bold py-3 rounded-lg hover:bg-[#0b2340]/90 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Submitting...' : 'Request My Free Cyber Risk Assessment'}
              </button>
            </form>
          )}
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
