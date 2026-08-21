'use client'
import { useEffect } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function BookADemoPage() {
  useEffect(() => {
    if (document.getElementById('calendly-widget-script')) return
    const script = document.createElement('script')
    script.id = 'calendly-widget-script'
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-[#14b8a6] font-bold text-xs uppercase tracking-wide mb-3">Book a Demo</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b2340] mb-3">
            See PracticeGuard in Action
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Pick a time below for a 30-minute walkthrough. No pressure, no obligation —
            just a straight look at where your practice stands and how we can help.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Calendly scheduler */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/dallasmitchell-rqe6/30min?hide_gdpr_banner=1"
              style={{ minWidth: '320px', height: '700px' }}
            />
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
