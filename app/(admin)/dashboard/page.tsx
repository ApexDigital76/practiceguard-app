import { createAdminClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { Users, FileText, TrendingUp, AlertCircle, BarChart2 } from 'lucide-react'

async function getStats() {
  const supabase = createAdminClient()
  const [leads, practices, prospects] = await Promise.all([
    supabase.from('leads').select('id, status, created_at, utm_source, utm_medium, utm_campaign, referrer, landing_page').order('created_at', { ascending: false }),
    supabase.from('practices').select('id, tier, status'),
    supabase.from('prospects').select('id, status'),
  ])
  return {
    leads: leads.data || [],
    practices: practices.data || [],
    prospects: prospects.data || [],
  }
}

function classifyChannel(lead: any): string {
  if (lead.utm_source && lead.utm_medium) return `${lead.utm_source} / ${lead.utm_medium}`
  if (lead.utm_source) return lead.utm_source
  if (lead.referrer) {
    try {
      const host = new URL(lead.referrer).hostname.replace(/^www\./, '')
      return host
    } catch {
      return 'referral (unknown)'
    }
  }
  return 'Direct / no referrer'
}

export default async function DashboardPage() {
  const { leads, practices, prospects } = await getStats()

  const newLeads = leads.filter(l => l.status === 'new').length
  const activeClients = practices.filter(p => p.status === 'active').length
  const pendingOutreach = prospects.filter(p => p.status === 'pending').length
  const recentLeads = leads.slice(0, 5)

  const channelCounts = new Map<string, number>()
  for (const lead of leads) {
    const channel = classifyChannel(lead)
    channelCounts.set(channel, (channelCounts.get(channel) || 0) + 1)
  }
  const channelBreakdown = Array.from(channelCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const stats = [
    { label: 'New Leads', value: newLeads, icon: AlertCircle, color: 'text-yellow-600' },
    { label: 'Active Clients', value: activeClients, icon: Users, color: 'text-green-600' },
    { label: 'Total Leads', value: leads.length, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Outreach Pending', value: pendingOutreach, icon: FileText, color: 'text-purple-600' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, Dallas.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Leads</h2>
            <a href="/leads" className="text-sm text-[#0b2340] hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.length === 0 && (
              <p className="px-6 py-8 text-center text-gray-400">No leads yet.</p>
            )}
            {recentLeads.map(lead => (
              <div key={lead.id} className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium text-gray-800 text-sm">{(lead as any).practice_name}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    lead.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                    lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(lead.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <BarChart2 size={16} className="text-[#0b2340]" />
            <h2 className="font-semibold text-gray-900">Lead Sources</h2>
          </div>
          <div className="p-6">
            {channelBreakdown.length === 0 ? (
              <p className="text-center text-gray-400">No leads yet.</p>
            ) : (
              <div className="space-y-3">
                {channelBreakdown.map(([channel, count]) => {
                  const max = channelBreakdown[0][1]
                  const pct = Math.round((count / max) * 100)
                  return (
                    <div key={channel}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 capitalize">{channel}</span>
                        <span className="font-semibold text-gray-900">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#14b8a6] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
