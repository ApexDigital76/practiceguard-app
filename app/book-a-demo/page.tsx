'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
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

const SERVICE_OPTIONS = [
  'Free Readiness Check',
  'Compliance Audit',
  'Managed Compliance',
  'Enterprise Program',
  'Not sure yet',
]

export default function BookADemoPage() {
  const [form, setForm] = useState({
    practice_name: '', dentist_name: '', phone: '',
    email: '', locations: '', software: '', best_time: '',
  })
  const [softwareOther, setSoftwareOther] = useState('')
  const [showSoftwareOther, setShowSoftwareOther] = useState(false)
  const [services, setServices] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function toggleService(s: string) {
    setServices(prev => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const concern = [
      services.length ? `Interested in: ${services.join(', ')}` : '',
      notes ? `Notes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join(' — ')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, concern, ...getAttribution() }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-[#14b8a6] font-bold text-xs uppercase tracking-wide mb-3">Contact Us</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b2340] mb-3">
            Get in touch and let us know how we can help
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Tell us a bit about your practice and Dallas will follow up personally within 1
            business day to schedule your walkthrough.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Sales rep form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#0b2340] mb-1">
              Speak with a Sales Representative
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              This form is for new practice inquiries only. Current clients should reach out to
              Dallas directly for support.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="tel:6157853493"
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-sm text-[#0b2340] font-medium hover:bg-gray-200 transition-colors"
              >
                <Phone size={15} className="text-[#14b8a6]" /> Sales: (615) 785-3493
              </a>
              <a
                href="mailto:dallas@practiceguardcompliance.com"
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-sm text-[#0b2340] font-medium hover:bg-gray-200 transition-colors"
              >
                <Mail size={15} className="text-[#14b8a6]" /> Email: dallas@practiceguardcompliance.com
              </a>
            </div>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
                <div className="font-semibold text-green-800 text-lg">Request received!</div>
                <p className="text-green-700 mt-1">
                  Dallas will be in touch within 1 business day to schedule your demo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'practice_name', label: 'Practice Name *', placeholder: 'Smile Dental' },
                    { name: 'dentist_name', label: 'Your Name', placeholder: 'Dr. Smith' },
                    { name: 'email', label: 'Email *', placeholder: 'office@practice.com' },
                    { name: 'phone', label: 'Phone *', placeholder: '(615) 555-0100' },
                    { name: 'locations', label: 'How Many Locations?', placeholder: '1' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={(form as any)[f.name]}
                        onChange={e =>
                          setForm(prev => ({ ...prev, [f.name]: e.target.value }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What software do you currently use?
                    </label>
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
                      {DENTAL_SOFTWARE.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which services can we help you with?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {SERVICE_OPTIONS.map(s => (
                      <label key={s} className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={services.includes(s)}
                          onChange={() => toggleService(s)}
                          className="rounded border-gray-300 text-[#0b2340] focus:ring-[#0b2340]"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Best Time to Call
                  </label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details or Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Anything else we should know before we call?"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                    Something went wrong submitting the form. Please call or email us directly:
                    <br />
                    <span className="font-semibold">Dallas Mitchell</span> —{' '}
                    <a href="tel:6157853493" className="underline hover:text-red-900">
                      (615) 785-3493
                    </a>{' '}
                    ·{' '}
                    <a
                      href="mailto:dallas@practiceguardcompliance.com"
                      className="underline hover:text-red-900"
                    >
                      dallas@practiceguardcompliance.com
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#14b8a6] text-white font-bold py-3 rounded-lg hover:bg-[#14b8a6]/90 transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>

          {/* Contact sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0b2340] rounded-2xl p-6 text-white">
              <div className="text-[#14b8a6] font-bold text-xs uppercase tracking-wide mb-3">
                Prefer to talk first?
              </div>
              <p className="text-white/70 text-sm mb-4">
                Reach out directly and Dallas will get back to you within 1 business day.
              </p>
              <div className="space-y-3 text-sm">
                <a href="tel:6157853493" className="flex items-center gap-2 hover:text-[#14b8a6] transition-colors">
                  <Phone size={16} className="text-[#14b8a6]" /> (615) 785-3493
                </a>
                <a href="mailto:dallas@practiceguardcompliance.com" className="flex items-center gap-2 hover:text-[#14b8a6] transition-colors">
                  <Mail size={16} className="text-[#14b8a6]" /> dallas@practiceguardcompliance.com
                </a>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin size={16} className="text-[#14b8a6] flex-shrink-0" />
                  Serving Nashville, Hendersonville, Gallatin, Lebanon &amp; Mount Juliet, TN
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="font-semibold text-[#0b2340] mb-2">What to expect</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• A quick walkthrough of your current exposure</li>
                <li>• How the 2026 HIPAA Security Rule affects your practice</li>
                <li>• A straight answer on what it would take to get compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
