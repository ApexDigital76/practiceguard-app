'use client'
import { useState } from 'react'
import { Shield, CheckCircle, AlertTriangle, Phone, Mail, MapPin } from 'lucide-react'

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
  { title: 'Multi-Factor Authentication', desc: 'Required for all systems accessing PHI' },
  { title: 'Data Encryption', desc: 'At rest and in transit for all PHI' },
  { title: 'Vulnerability Scanning', desc: 'Quarterly scans now mandatory' },
  { title: 'Penetration Testing', desc: 'Annual pen tests required' },
  { title: 'Incident Response Plan', desc: 'Documented and tested procedures' },
  { title: 'Asset Inventory', desc: 'All PHI-touching devices catalogued' },
]

const SERVICES = [
  { title: 'Free Readiness Check', desc: 'Know exactly where you stand in 30 minutes.', price: 'FREE' },
  { title: 'Compliance Audit', desc: 'Full gap analysis + remediation roadmap.', price: '$1,997' },
  { title: 'Managed Compliance', desc: 'Ongoing monitoring + quarterly reviews.', price: 'From $675/mo' },
  { title: 'Enterprise Program', desc: 'Full compliance + cyber insurance certification.', price: 'From $1,200/mo' },
]

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
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0b2340] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-[#c9a84c]" size={22} />
          <span className="font-bold text-lg">PracticeGuard</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#changes" className="hover:text-white">What&apos;s Changing</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#about" className="hover:text-white">About</a>
        </div>
        <a href="#contact" className="bg-[#c9a84c] text-[#0b2340] font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#c9a84c]/90">
          Free Assessment
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-[#0b2340] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 text-[#c9a84c] px-3 py-1 rounded-full text-sm font-medium mb-6">
            <AlertTriangle size={14} />
            2026 HIPAA Security Rule Update — 240 Days to Comply
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Is Your Practice Ready for<br />
            <span className="text-[#c9a84c]">HIPAA&apos;s Biggest Update Since 2003?</span>
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            The 2026 HIPAA Security Rule brings mandatory MFA, encryption, pen testing, and more.
            OCR fines average $6.6M. We help small practices get compliant — fast and affordably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-[#c9a84c] text-[#0b2340] font-bold px-8 py-4 rounded-lg hover:bg-[#c9a84c]/90">
              Get My Free Readiness Check
            </a>
            <a href="#services" className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/5">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: '$6.6M', label: 'Average OCR Fine' },
            { value: '2026', label: 'Compliance Deadline' },
            { value: '240', label: 'Days to Comply' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-[#0b2340]">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What's Changing */}
      <section id="changes" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2340] text-center mb-3">What&apos;s Changing in 2026</h2>
          <p className="text-gray-500 text-center mb-12">New mandatory requirements your practice must meet</p>
          <div className="grid md:grid-cols-3 gap-6">
            {CHANGES.map(c => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <CheckCircle className="text-[#c9a84c] mb-3" size={20} />
                <div className="font-semibold text-gray-900 mb-1">{c.title}</div>
                <div className="text-sm text-gray-500">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-[#0b2340]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Our Services</h2>
          <p className="text-white/50 text-center mb-12">Built for small practices — no enterprise complexity</p>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-semibold text-white">{s.title}</div>
                  <div className="text-[#c9a84c] font-bold text-sm">{s.price}</div>
                </div>
                <div className="text-white/60 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 rounded-full bg-[#0b2340] flex-shrink-0 overflow-hidden border-4 border-[#c9a84c]" />
          <div>
            <h2 className="text-3xl font-bold text-[#0b2340] mb-4">Dallas Mitchell</h2>
            <p className="text-gray-600 mb-4">
              With 25+ years in healthcare IT, I&apos;ve seen firsthand how devastating a HIPAA breach can be for a small practice.
              PracticeGuard exists to make enterprise-grade compliance accessible to every dental and medical practice — regardless of size.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Local Nashville Expert', 'No Long-Term Contracts', 'Free Initial Assessment', 'Healthcare IT Specialist'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="text-[#c9a84c] flex-shrink-0" size={16} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
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

      {/* Footer */}
      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold mb-2">
              <Shield className="text-[#c9a84c]" size={18} />
              PracticeGuard Compliance Group
            </div>
            <p className="text-sm">HIPAA compliance for dental &amp; medical practices.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:dallas@practiceguardcompliance.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={14} /> dallas@practiceguardcompliance.com
            </a>
            <a href="tel:6155550100" className="flex items-center gap-2 hover:text-white">
              <Phone size={14} /> (615) 555-0100
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Nashville, TN
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-center">
          © {new Date().getFullYear()} PracticeGuard Compliance Group. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
