'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import PracticeGuardLogo from './PracticeGuardLogo'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#changes', label: "What's Changing" },
  { href: '/cyber-insurance', label: 'Cyber Protection' },
  { href: '/resources', label: 'Threat Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
  { href: 'https://app.practiceguardcompliance.com/pulse-check', label: 'Practice Pulse Check' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href.split('#')[0]) && href.split('#')[0] !== '/'
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0b2340] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
          <PracticeGuardLogo size={26} className="text-[#14b8a6]" />
          <span className="font-bold text-lg">PracticeGuard</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(href)
                  ? 'text-[#14b8a6] font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="bg-[#14b8a6] text-[#0b2340] font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#14b8a6]/90 transition-colors hidden sm:block"
          >
            Free Assessment
          </Link>
          <Link
            href="https://app.practiceguardcompliance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#14b8a6] text-[#14b8a6] font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#14b8a6]/10 transition-colors hidden sm:block"
          >
            Open Practice Pulse
          </Link>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 px-6 py-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(href)
                  ? 'text-[#14b8a6] font-semibold bg-white/5'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#14b8a6] text-[#0b2340] font-bold px-5 py-3 rounded-lg text-sm hover:bg-[#14b8a6]/90 transition-colors"
            >
              Free Assessment
            </Link>
            <Link
              href="https://app.practiceguardcompliance.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block text-center border border-[#14b8a6] text-[#14b8a6] font-bold px-5 py-3 rounded-lg text-sm hover:bg-[#14b8a6]/10 transition-colors mt-2"
            >
              Open Practice Pulse
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
