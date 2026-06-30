import { createAdminClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import type { Lead } from '@/types'

async function getLeads(): Promise<Lead[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
}

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">{leads.length} total leads</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Practice', 'Contact', 'Concern', 'Source', 'Status', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No leads yet.</td></tr>
            )}
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{lead.practice_name}</div>
                  {lead.dentist_name && <div className="text-xs text-gray-400">{lead.dentist_name}</div>}
                </td>
                <td className="px-4 py-3">
                  <div>{lead.phone}</div>
                  <div className="text-xs text-gray-400">{lead.email}</div>
                </td>
                <td className="px-4 py-3 max-w-[200px] truncate text-gray-600">{lead.concern || '—'}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{lead.source}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{formatDate(lead.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
