'use client'
import { useState } from 'react'
import { Shield, CheckCircle, AlertTriangle, Phone, Mail, MapPin } from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import Navbar from '@/components/Navbar'
import { getAttribution } from '@/lib/attribution'

const DENTAL_SOFTWARE = [
  'Dentrix',
  'Eaglesoft',
  'Dolphin',
  'Open Dental',
  'Carestream Dental (CS Ortho)',
  'Curve Dental',
  'Dentimax',
  'Fuse (Carestream)',
  'Nextech',
  'Practiceworks',
  'SoftDent',
  'WinOMS',
  'Other',
]

const CONCERNS = [
  'Schedule a free 30-minute evaluation',
  'Not sure where to start',
  'Need to pass a cyber insurance audit',
  'Received an OCR audit notice',
  'Recent breach or incident',
  'Just want to be compliant',
]

const CHANGES = [
  { title: 'Multi-Factor Authentication', desc: 'Proposed for all systems accessing ePHI', slug: 'multi-factor-authentication' },
  { title: 'Data Encryption', desc: 'Proposed at rest and in transit for ePHI', slug: 'data-encryption' },
  { title: 'Vulnerability Scanning', desc: 'Proposed regular technical assessments', slug: 'vulnerability-scanning' },
  { title: 'Penetration Testing', desc: 'Proposed periodic testing of defenses', slug: 'penetration-testing' },
  { title: 'Incident Response Plan', desc: 'Documented and tested procedures', slug: 'incident-response-plan' },
  { title: 'Asset Inventory', desc: 'Catalog of systems that touch ePHI', slug: 'asset-inventory' },
]

const SERVICES = [
  { title: 'Free Readiness Check', desc: 'Know exactly where you stand in 30 minutes.', price: 'FREE', href: '/#contact', type: 'one-time' as const },
  { title: 'Compliance Audit', desc: 'Full gap analysis + remediation roadmap.', price: '$1,997', href: '/services/compliance-audit', type: 'one-time' as const },
  { title: 'Practice Pulse workspace', desc: 'Training, policies, BAAs & reports for your office manager.', price: 'From free', href: 'https://app.practiceguardcompliance.com', type: 'ongoing' as const },
  { title: 'Managed Compliance', desc: 'Ongoing monitoring + quarterly reviews.', price: 'From $675/mo', href: '/services/managed-compliance', type: 'ongoing' as const },
  { title: 'Enterprise Program', desc: 'Full compliance + cyber insurance certification.', price: 'From $1,200/mo', href: '/services/enterprise', type: 'ongoing' as const },
]

function ComplianceGauge() {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 130" className="w-full max-w-[220px]">
        <path d="M20,100 A80,80 0 0,1 180,100" pathLength="100" fill="none" stroke="#e5e7eb" strokeWidth="16" />
        <path d="M20,100 A80,80 0 0,1 180,100" pathLength="100" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="40 100" strokeLinecap="round" />
        <path d="M20,100 A80,80 0 0,1 180,100" pathLength="100" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="30 100" strokeDashoffset="-40" />
        <path d="M20,100 A80,80 0 0,1 180,100" pathLength="100" fill="none" stroke="#14b8a6" strokeWidth="16" strokeDasharray="30 100" strokeDashoffset="-70" strokeLinecap="round" />
        <line x1="100" y1="100" x2="89" y2="31" stroke="#0b2340" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="100" r="7" fill="#0b2340" />
        <text x="20" y="122" fontSize="10" fill="#9ca3af">High Risk</text>
        <text x="180" y="122" fontSize="10" fill="#9ca3af" textAnchor="end">Compliant</text>
      </svg>
      <div className="text-center -mt-2">
        <div className="text-3xl font-bold text-[#0b2340]">45<span className="text-lg text-gray-400">/100</span></div>
        <div className="text-xs text-gray-500 mt-1">Typical score on a first Practice Pulse Check</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [form, setForm] = useState({
    practice_name: '', dentist_name: '', manager_name: '', phone: '',
    email: '', locations: '', software: '', concern: '', best_time: '',
  })
  const [softwareOther, setSoftwareOther] = useState('')
  const [showSoftwareOther, setShowSoftwareOther] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...getAttribution() }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-10 lg:py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10">
          <aside className="hidden lg:block lg:w-60 flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
              <div className="text-[#14b8a6] font-bold text-xs uppercase tracking-wide mb-3">Real Attack Case Studies</div>
              <p className="text-white/60 text-xs mb-4">These incidents happened to real dental and medical practices.</p>
              <div className="space-y-3">
                {[
                  { tag: 'National', color: 'bg-red-500/20 text-red-300', title: 'Change Healthcare (2024)', desc: '190M records stolen. One missing MFA checkbox.' },
                  { tag: 'Dental', color: 'bg-amber-500/20 text-amber-300', title: '400+ Practices Hit at Once', desc: 'Ransomware spread through shared dental IT systems.' },
                  { tag: '2025', color: 'bg-orange-500/20 text-orange-300', title: 'Absolute Dental — 1.2M Patients', desc: '50+ locations, OCR investigation opened.' },
                  { tag: 'Small Practice', color: 'bg-blue-500/20 text-blue-300', title: '"Too Small to Target"', desc: '$180K loss. 3 weeks offline. Nearly closed.' },
                ].map(({ tag, color, title, desc }) => (
                  <a key={title} href="/resources" className="block bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-colors group">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${color}`}>{tag}</span>
                    <div className="text-sm font-semibold text-white group-hover:text-[#14b8a6] transition-colors mb-0.5">{title}</div>
                    <div className="text-xs text-white/50">{desc}</div>
                  </a>
                ))}
              </div>
              <a href="/resources" className="block mt-4 text-center text-xs text-[#14b8a6] hover:underline">View all case studies →</a>
            </div>
          </aside>

          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-[#14b8a6]/20 text-[#14b8a6] px-3 py-1 rounded-full text-sm font-medium mb-4 lg:mb-6">
              <AlertTriangle size={14} />
              Proposed HIPAA Security Rule updates — get ahead of expected changes
            </div>
            {/* One h1 for the whole headline. It used to be split across two
                h1 elements so the second line could be teal, which left the page
                with two competing top-level headings and an h1 that read as a
                sentence fragment. Same visual result, one heading. */}
            <div className="flex items-start justify-between gap-3 mb-1 lg:mb-0">
              <h1 className="flex-1 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6">
                Is Your Practice Ready for{' '}
                <span className="block text-[#14b8a6]">
                  HIPAA's Biggest Update Since 2003?
                </span>
              </h1>
              <div className="lg:hidden flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-[#14b8a6] mt-1">
                <img src="/dallas.jpg" alt="Dallas Mitchell" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="text-white/70 text-base lg:text-lg mb-8 lg:mb-10 max-w-xl">
              HHS has proposed major Security Rule updates (MFA, encryption, pen testing, and more). These are not yet final, but OCR already expects strong safeguards. Fines for small practices have ranged from $10K to $80K. We help practices get compliant — fast and affordably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-[#14b8a6] text-[#0b2340] font-bold px-8 py-4 rounded-lg hover:bg-[#14b8a6]/90 text-center">
                Get My Free Readiness Check
              </a>
              <a href="#services" className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/5 text-center">
                View Services
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-shrink-0 flex-col items-center gap-3">
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-[#14b8a6]">
              <img src="/dallas.jpg" alt="Dallas Mitchell" className="w-full h-full object-cover" />
            </div>
            <div className="text-center text-sm text-white/70">
              <div className="font-semibold text-white">Dallas Mitchell</div>
              <div>Founder · 25+ Years Healthcare IT</div>
              <div>Gallatin, TN</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <ComplianceGauge />
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0b2340] mb-3">Where Does Your Practice Stand?</h2>
            <p className="text-gray-600 mb-6">
              Most practices we talk to have never had a real HIPAA risk assessment. Take the free 2-minute{' '}
              <strong>Practice Pulse Check</strong> — our practice-manager workspace product — and see your exposure score instantly. No account needed.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: '$10K–$80K', label: 'Typical Small Practice OCR Fine' },
                { value: 'Proposed', label: 'Security Rule Updates Status' },
                { value: 'Now', label: 'Best Time to Prepare' },
              ].map(s => (
                <div key={s.label} className="min-w-0">
                  <div className="text-lg lg:text-2xl font-bold text-[#0b2340] break-words">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <a
              href="https://app.practiceguardcompliance.com/pulse-check"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#14b8a6] text-[#0b2340] font-bold px-6 py-3 rounded-lg hover:bg-[#14b8a6]/90 transition-colors"
            >
              Take the Practice Pulse Check →
            </a>
            <p className="text-xs text-gray-500 mt-2">Free 2-minute risk check — a PracticeGuard product for office managers.</p>
          </div>
        </div>
      </section>

      <section id="changes" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">What's Proposed to Change</h2>
          <p className="text-gray-500 text-center mb-12">Expected Security Rule updates — and controls practices should already prioritize</p>
          <div className="grid md:grid-cols-3 gap-6">
            {CHANGES.map(c => (
              <a key={c.title} href={`/changes/${c.slug}`} className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#14b8a6]/40 transition-all">
                <CheckCircle className="text-[#14b8a6] mb-3" size={20} />
                <div className="font-semibold text-gray-900 mb-1">{c.title}</div>
                <div className="text-sm text-gray-500 mb-2">{c.desc}</div>
                <div className="text-xs text-[#14b8a6] font-medium">Learn what this means →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-[#0b2340]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Our Services</h2>
          <p className="text-white/50 text-center mb-10">Consulting from PracticeGuard · workspace tools via Practice Pulse</p>
          <Tabs.Root defaultValue="one-time">
            <Tabs.List className="flex justify-center gap-2 mb-8">
              <Tabs.Trigger
                value="one-time"
                className="px-5 py-2 rounded-lg text-sm font-medium text-white/60 data-[state=active]:bg-[#14b8a6] data-[state=active]:text-[#0b2340] hover:text-white transition-colors"
              >
                One-Time
              </Tabs.Trigger>
              <Tabs.Trigger
                value="ongoing"
                className="px-5 py-2 rounded-lg text-sm font-medium text-white/60 data-[state=active]:bg-[#14b8a6] data-[state=active]:text-[#0b2340] hover:text-white transition-colors"
              >
                Ongoing Programs
              </Tabs.Trigger>
            </Tabs.List>
            {(['one-time', 'ongoing'] as const).map(type => (
              <Tabs.Content key={type} value={type}>
                <div className="grid md:grid-cols-2 gap-6">
                  {SERVICES.filter(s => s.type === type).map(s => (
                    <a key={s.title} href={s.href} {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#14b8a6]/50 transition-all group block">
                      <div className="flex items-start justify-between mb-3">
                        <div className="font-semibold text-white group-hover:text-[#14b8a6] transition-colors">{s.title}</div>
                        <div className="text-[#14b8a6] font-bold text-sm">{s.price}</div>
                      </div>
                      <div className="text-white/60 text-sm mb-3">{s.desc}</div>
                      <div className="text-[#14b8a6] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</div>
                    </a>
                  ))}
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#0b2340] rounded-2xl p-5 text-white">
              <div className="text-[#14b8a6] font-bold text-xs uppercase tracking-wide mb-3">Real Attack Case Studies</div>
              <p className="text-white/60 text-xs mb-4">These incidents happened to real dental and medical practices.</p>
              <div className="space-y-3">
                {[
                  { tag: 'National', color: 'bg-red-500/20 text-red-300', title: 'Change Healthcare (2024)', desc: '190M records stolen. One missing MFA checkbox.' },
                  { tag: 'Dental', color: 'bg-amber-500/20 text-amber-300', title: '400+ Practices Hit at Once', desc: 'Ransomware spread through shared dental IT systems.' },
                  { tag: '2025', color: 'bg-orange-500/20 text-orange-300', title: 'Absolute Dental — 1.2M Patients', desc: '50+ locations, OCR investigation opened.' },
                  { tag: 'Small Practice', color: 'bg-blue-500/20 text-blue-300', title: '"Too Small to Target"', desc: '$180K loss. 3 weeks offline. Nearly closed.' },
                ].map(({ tag, color, title, desc }) => (
                  <a key={title} href="/resources" className="block bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${color}`}>{tag}</span>
                    <div className="text-sm font-semibold text-white group-hover:text-[#14b8a6] transition-colors mb-1">{title}</div>
                    <div className="text-xs text-white/50">{desc}</div>
                  </a>
                ))}
              </div>
              <a href="/resources" className="block mt-4 text-center text-xs text-[#14b8a6] hover:underline">
                View all case studies →
              </a>
            </div>
          </aside>

          <div className="flex-1">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Shield size={14} />
                Cyber Attack Prevention
              </div>
              <h2 className="text-3xl font-bold text-[#0b2340] mb-4">
                Is Your Practice Ready for a Cyber Attack — or a Cyber Insurance Audit?
              </h2>
              <p className="text-gray-600 mb-4">
                Ransomware attacks on dental practices jumped 78% in 2024. Most cyber insurance carriers now require practices to meet strict security standards before they'll issue a policy — and many are being denied at renewal.
              </p>
              <p className="text-gray-600 mb-6">
                PracticeGuard helps you get audit-ready fast, so you can qualify for coverage and actually survive an attack if one happens.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  'Multi-Factor Authentication',
                  'Data Backup & Recovery',
                  'Staff Security Training',
                  'Incident Response Plan',
                  'Endpoint Protection',
                  'Vulnerability Scanning',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="text-[#14b8a6] flex-shrink-0" size={16} />
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="/cyber-insurance"
                className="inline-block bg-[#0b2340] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#0b2340]/90 transition-colors"
              >
                Learn About Cyber Protection →
              </a>
            </div>
            <div className="bg-[#0b2340] rounded-2xl p-8 text-white">
              <div className="text-[#14b8a6] font-bold text-sm mb-4 uppercase tracking-wide">The Reality</div>
              <div className="space-y-5">
                {[
                  { stat: '78%', label: 'increase in ransomware attacks on healthcare practices in 2024' },
                  { stat: '$1.27M', label: 'average cost of a healthcare ransomware attack including downtime' },
                  { stat: '60%', label: 'of small practices that suffer a major breach close within 6 months' },
                  { stat: '3 in 4', label: 'cyber insurers now require a formal security assessment before coverage' },
                ].map(({ stat, label }) => (
                  <div key={stat} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div className="text-3xl font-bold text-[#14b8a6]">{stat}</div>
                    <div className="text-white/70 text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 rounded-full flex-shrink-0 overflow-hidden border-4 border-[#14b8a6]">
            <img src="/dallas.jpg" alt="Dallas Mitchell" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0b2340] mb-4">Dallas Mitchell</h2>
            <p className="text-gray-600 mb-4">
              With 25+ years in healthcare IT, I've seen firsthand how devastating a HIPAA breach can be for a small practice.
              PracticeGuard exists to make enterprise-grade compliance accessible to every dental and medical practice — regardless of size.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Local Nashville Expert', 'No Long-Term Contracts', 'Free Initial Assessment', 'Healthcare IT Specialist'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="text-[#14b8a6] flex-shrink-0" size={16} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">Get Your Free Readiness Check</h2>
          <p className="text-gray-500 text-center mb-10">30-minute call. No obligation. Know exactly where you stand.</p>

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
                  { name: 'practice_name', label: 'Practice Name *', placeholder: 'Smile Dental' },
                  { name: 'dentist_name', label: 'Dentist Name', placeholder: 'Dr. Smith' },
                  { name: 'manager_name', label: 'Office Manager', placeholder: 'Jane Doe' },
                  { name: 'phone', label: 'Phone', placeholder: '(615) 555-0100' },
                  { name: 'email', label: 'Email', placeholder: 'office@practice.com' },
                  { name: 'locations', label: '# of Locations', placeholder: '1' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={(form as any)[f.name]}
                      onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Practice Software</label>
                <select
                  value={showSoftwareOther ? 'Other' : form.software}
                  onChange={e => {
                    if (e.target.value === 'Other') {
                      setShowSoftwareOther(true)
                      setForm(prev => ({ ...prev, software: '' }))
                    } else {
                      setShowSoftwareOther(false)
                      setSoftwareOther('')
                      setForm(prev => ({ ...prev, software: e.target.value }))
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                >
                  <option value="">Select software...</option>
                  {DENTAL_SOFTWARE.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {showSoftwareOther && (
                  <input
                    type="text"
                    placeholder="Please specify your software"
                    value={softwareOther}
                    onChange={e => {
                      setSoftwareOther(e.target.value)
                      setForm(prev => ({ ...prev, software: e.target.value }))
                    }}
                    className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Concern</label>
                <select
                  value={form.concern}
                  onChange={e => setForm(prev => ({ ...prev, concern: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                >
                  <option value="">Select a concern...</option>
                  {CONCERNS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Call</label>
                <select
                  value={form.best_time}
                  onChange={e => setForm(prev => ({ ...prev, best_time: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                >
                  <option value="">Select a time...</option>
                  <option>Morning (8am – 12pm)</option>
                  <option>Noon (12pm – 1pm)</option>
                  <option>Afternoon (1pm – 5pm)</option>
                  <option>Any time</option>
                </select>
              </div>
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  Something went wrong submitting the form. Please call or email us directly:<br />
                  <span className="font-semibold">Dallas Mitchell</span> — <a href="tel:6157853493" className="underline hover:text-red-900">(615) 785-3493</a> · <a href="mailto:dallas@practiceguardcompliance.com" className="underline hover:text-red-900">dallas@practiceguardcompliance.com</a>
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#0b2340] text-white font-bold py-3 rounded-lg hover:bg-[#0b2340]/90 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Submitting...' : 'Request My Free Readiness Check'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold mb-2">
              <Shield className="text-[#14b8a6]" size={18} />
              PracticeGuard Compliance Group
            </div>
            <p className="text-sm">HIPAA compliance consulting for dental & medical practices.</p>
            <p className="text-sm mt-1">
              Product:{' '}
              <a href="https://app.practiceguardcompliance.com" className="text-[#14b8a6] hover:underline" target="_blank" rel="noopener noreferrer">
                Practice Pulse
              </a>
              {' '}— training, policies, BAAs & reports for practice managers.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:dallas@practiceguardcompliance.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={14} /> dallas@practiceguardcompliance.com
            </a>
            <a href="tel:6157853493" className="flex items-center gap-2 hover:text-white">
              <Phone size={14} /> (615) 785-3493
            </a>
            <a href="/service-areas" className="flex items-center gap-2 hover:text-white">
              <MapPin size={14} /> Serving Nashville, Hendersonville, Gallatin, Lebanon & Mount Juliet, TN
            </a>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-center space-y-2">
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/#contact" className="hover:text-white">Contact</a>
            <a href="/service-areas" className="hover:text-white">Service Areas</a>
            <a href="https://app.practiceguardcompliance.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">Practice Pulse app</a>
          </div>
          <div>© {new Date().getFullYear()} PracticeGuard Compliance Group. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
