'use client'

import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import type { Lead, LeadStatus } from '@/types'
import PaymentLinkButton from '@/components/admin/PaymentLinkButton'

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
}

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted', 'lost']

function isOverdue(createdAt: string, status: string) {
  if (status !== 'new') return false
  const created = new Date(createdAt)
  const now = new Date()
  // Rough 2 business days ≈ 48 hours (good enough for a visual cue)
  const hours = (now.getTime() - created.getTime()) / (1000 * 60 * 60)
  return hours >= 48
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({})

  async function loadLeads() {
    setLoading(true)
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(Array.isArray(data) ? data : [])
      const drafts: Record<string, string> = {}
      ;(Array.isArray(data) ? data : []).forEach((l: Lead) => {
        drafts[l.id] = l.notes || ''
      })
      setNotesDraft(drafts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [])

  async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string }) {
    setSavingId(id)
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      })
      if (!res.ok) throw new Error('Update failed')
      const { lead } = await res.json()
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...lead } : l)))
    } catch (e) {
      console.error(e)
      alert('Could not update lead. Please try again.')
    } finally {
      setSavingId(null)
    }
  }

  const overdueCount = leads.filter((l) => isOverdue(l.created_at, l.status)).length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">
            {loading ? 'Loading…' : `${leads.length} total leads`}
            {overdueCount > 0 && (
              <span className="ml-2 text-amber-600 font-medium">
                · {overdueCount} need follow-up (48h+)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={loadLeads}
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Practice', 'Contact', 'Score / Concern', 'Source', 'Status', 'Notes', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  No leads yet.
                </td>
              </tr>
            )}
            {leads.map((lead) => {
              const overdue = isOverdue(lead.created_at, lead.status)
              return (
                <tr key={lead.id} className={`hover:bg-gray-50 ${overdue ? 'bg-amber-50/50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{lead.practice_name}</div>
                    {lead.dentist_name && (
                      <div className="text-xs text-gray-400">{lead.dentist_name}</div>
                    )}
                    {overdue && (
                      <div className="text-xs text-amber-600 font-medium mt-0.5">Needs follow-up</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div>{lead.phone || '—'}</div>
                    <div className="text-xs text-gray-400">{lead.email || '—'}</div>
                    {lead.manager_name && (
                      <div className="text-xs text-gray-500">{lead.manager_name}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    {(lead as any).score != null && (
                      <div className="font-semibold text-gray-800">{(lead as any).score}/100</div>
                    )}
                    <div className="text-gray-600 truncate">{lead.concern || '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{lead.source}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      disabled={savingId === lead.id}
                      onChange={(e) =>
                        updateLead(lead.id, { status: e.target.value as LeadStatus })
                      }
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 min-w-[160px]">
                    <textarea
                      rows={2}
                      value={notesDraft[lead.id] ?? ''}
                      onChange={(e) =>
                        setNotesDraft((prev) => ({ ...prev, [lead.id]: e.target.value }))
                      }
                      onBlur={() => {
                        const next = notesDraft[lead.id] ?? ''
                        if (next !== (lead.notes || '')) {
                          updateLead(lead.id, { notes: next })
                        }
                      }}
                      placeholder="Add notes…"
                      className="w-full text-xs border border-gray-200 rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <PaymentLinkButton
                      leadId={lead.id}
                      practiceName={lead.practice_name}
                      email={lead.email}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
