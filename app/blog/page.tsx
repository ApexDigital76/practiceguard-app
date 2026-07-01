import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Mail, Phone } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { POSTS } from './posts'

export const metadata: Metadata = {
  title: 'HIPAA Compliance Blog',
  description: 'Practical HIPAA compliance, cyber insurance, and security guidance for dental and medical practices in Nashville and Middle Tennessee.',
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HIPAA &amp; Cyber Compliance Blog</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Practical guidance for dental and medical practices in Nashville and Middle Tennessee — written for office managers and practice owners, not IT departments.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#14b8a6]/40 transition-all"
            >
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-[#0b2340] mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
              <div className="text-xs text-[#14b8a6] font-medium flex items-center gap-1">
                Read more <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-white font-bold mb-2">PracticeGuard Compliance Group</div>
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
