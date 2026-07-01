import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Practice } from '@/types'

const tierPricing: Record<string, number> = {
  starter: 199700,
  professional: 67500,
  enterprise: 120000,
}

async function getClients(): Promise<Practice[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('practices')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">{clients.length} active clients</p>
        </div>
        <button className="bg-[#0b2340] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0b2340]/90">
          + Add Client
        </button>
      </div>

      <div className="grid gap-4">
        {clients.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
            No clients yet. Convert a lead to get started.
          </div>
        )}
        {clients.map(client => (
          <Link key={client.id} href={`/clients/${client.id}`} className="block bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-md hover:border-[#14b8a6]/40 transition-all">
            <div>
              <div className="font-semibold text-gray-900">{client.name}</div>
              <div className="text-sm text-gray-400 mt-0.5">{client.email} · {client.phone}</div>
            </div>
            <div className="flex items-center gap-6">
              {client.tier && (
                <div className="text-right">
                  <div className="text-xs text-gray-400 capitalize">{client.tier} plan</div>
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(tierPricing[client.tier] || 0)}/mo
                  </div>
                </div>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {client.status}
              </span>
              <span className="text-xs text-gray-400">{formatDate(client.created_at)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
