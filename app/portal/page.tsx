import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { FileText, Shield, AlertTriangle, LogOut } from 'lucide-react'

const TIER_LABELS: Record<string, string> = {
  starter: 'Compliance Audit',
  professional: 'Managed Compliance',
  enterprise: 'Enterprise Program',
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  lead: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-500',
}

async function getPortalData() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() { /* no-op in a server component */ },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const admin = createAdminClient()

  const { data: link } = await admin
    .from('practice_users')
    .select('practice_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!link) return { user, practice: null, assessments: [], documents: [], subscription: null }

  const [{ data: practice }, { data: assessments }, { data: documents }, { data: subscription }] = await Promise.all([
    admin.from('practices').select('*').eq('id', link.practice_id).single(),
    admin.from('assessments').select('*').eq('practice_id', link.practice_id).order('created_at', { ascending: false }),
    admin.from('documents').select('*').eq('practice_id', link.practice_id).order('uploaded_at', { ascending: false }),
    admin.from('subscriptions').select('*').eq('practice_id', link.practice_id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
  ])

  return { user, practice, assessments: assessments || [], documents: documents || [], subscription }
}

export default async function ClientPortalPage() {
  const data = await getPortalData()

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-500">Please log in to view your portal.</p>
      </div>
    )
  }

  const { practice, assessments, documents, subscription } = data

  if (!practice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="text-2xl font-bold text-[#0b2340] mb-2">PracticeGuard</div>
          <div className="text-sm text-gray-500 mb-6">Client Portal</div>
          <p className="text-gray-600 text-sm">
            Your account isn&apos;t linked to a practice yet. If you believe this is an error, reach out and we&apos;ll get it sorted.
          </p>
          <div className="mt-6 text-sm">
            <a href="mailto:dallas@practiceguardcompliance.com" className="text-[#14b8a6] hover:underline">
              dallas@practiceguardcompliance.com
            </a>
          </div>
        </div>
      </div>
    )
  }

  const latestAssessment = assessments[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0b2340] text-white px-6 py-5 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg flex items-center gap-2">
            <Shield className="text-[#14b8a6]" size={20} />
            PracticeGuard
          </div>
          <div className="text-white/50 text-xs">Client Portal</div>
        </div>
        <form action="/api/portal/signout" method="POST">
          <button type="submit" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <LogOut size={14} /> Sign out
          </button>
        </form>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{practice.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {practice.tier ? TIER_LABELS[practice.tier] || practice.tier : 'No plan selected'}
            </p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[practice.status] || 'bg-gray-100 text-gray-500'}`}>
            {practice.status}
          </span>
        </div>

        {subscription && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Subscription</h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="font-medium text-gray-900 capitalize">{subscription.status}</span>
            </div>
            {subscription.current_period_end && (
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-500">Renews</span>
                <span className="font-medium text-gray-900">{formatDate(subscription.current_period_end)}</span>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Compliance Status</h2>
          {latestAssessment ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl font-bold text-[#0b2340]">{latestAssessment.score ?? '—'}</div>
                <div className="text-sm text-gray-500">Readiness score</div>
              </div>
              {latestAssessment.gaps?.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Outstanding gaps</div>
                  {latestAssessment.gaps.map((gap: string) => (
                    <div key={gap} className="flex items-start gap-2 text-sm text-gray-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                      <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={14} />
                      {gap}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">No assessment on file yet. Your compliance audit results will appear here once completed.</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Documents</h2>
          {documents.length > 0 ? (
            <div className="space-y-2">
              {documents.map(doc => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg px-4 py-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#14b8a6]" size={16} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      <div className="text-xs text-gray-400 capitalize">{doc.type}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(doc.uploaded_at)}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No documents uploaded yet. Reports and policy documents will appear here as they&apos;re delivered.</p>
          )}
        </div>

        <div className="bg-[#0b2340] rounded-xl p-6 text-center">
          <p className="text-white/70 text-sm mb-3">Questions about your account or compliance status?</p>
          <a href="mailto:dallas@practiceguardcompliance.com" className="text-[#14b8a6] font-medium hover:underline">
            dallas@practiceguardcompliance.com
          </a>
          <span className="text-white/30 mx-2">·</span>
          <a href="tel:6157853493" className="text-[#14b8a6] font-medium hover:underline">
            (615) 785-3493
          </a>
        </div>
      </main>
    </div>
  )
}
