'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, Mail, FileText, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/clients', label: 'Clients', icon: FileText },
  { href: '/outreach', label: 'Outreach', icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b2340] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-lg font-bold text-[#c9a84c]">PracticeGuard</div>
          <div className="text-xs text-white/50 mt-1">Admin Portal</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === href
                  ? 'bg-[#c9a84c] text-[#0b2340] font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={signOut} className="flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white w-full">
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
