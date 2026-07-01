import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { POSTS, getPostBySlug } from '../posts'

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#0b2340] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {post.body.map(section => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-[#0b2340] mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          ))}

          <div className="bg-[#0b2340] rounded-2xl p-8 text-center">
            <div className="text-white font-bold text-lg mb-2">Not sure where your practice stands?</div>
            <p className="text-white/60 text-sm mb-5">Get a free 30-minute readiness check — no pressure, just clarity on what you need.</p>
            <Link href="/#contact" className="inline-block bg-[#14b8a6] text-[#0b2340] font-bold px-8 py-3 rounded-lg hover:bg-[#14b8a6]/90 transition-colors">
              Get My Free Readiness Check
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#0b2340] text-white/60 py-10 px-6">
        <div className="max-w-4xl mx-auto text-xs text-center">© {new Date().getFullYear()} PracticeGuard Compliance Group. All rights reserved.</div>
      </footer>
    </div>
  )
}
