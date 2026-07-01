'use client'
import { useEffect, useState } from 'react'
import type { Prospect } from '@/types'
import { TEMPLATE_LABELS, type OutreachTemplate } from '@/lib/outreach-templates'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  sent: 'bg-green-100 text-green-700',
  skipped: 'bg-gray-100 text-gray-500',
}

const TABS = ['all', 'pending', 'approved', 'sent', 'skipped'] as const

export default function OutreachPage() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<typeof TABS[number]>('all')
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)
  const [editing, setEditing] = useState<Record<string, { subject: string; body: string }>>({})
  const [form, setForm] = useState({ practice_name: '', email: '', phone: '', website: '', city: '', template: 'lead' as OutreachTemplate })

  async function load() {
    setLoading(true)
    const res = await fetch('/api/outreach')
    const data = await res.json()
    setProspects(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function addProspect(e: React.FormEvent) {
    e.preventDefault()
    setSaving('new')
    try {
      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setForm({ practice_name: '', email: '', phone: '', website: '', city: '', template: 'lead' })
      setShowAdd(false)
      await load()
    } catch {
      alert('Could not add prospect. Check the practice name and try again.')
    } finally {
      setSaving(null)
    }
  }

  async function updateStatus(id: string, status: string) {
    setSaving(id)
    try {
      const draft = editing[id]
      const res = await fetch(`/api/outreach/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          ...(draft ? { draft_subject: draft.subject, draft_body: draft.body } : {}),
        }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        alert(error || 'Something went wrong')
        return
      }
      await load()
    } finally {
      setSaving(null)
    }
  }

  async function saveDraft(id: string) {
    const draft = editing[id]
    if (!draft) return
    setSaving(id)
    try {
      await fetch(`/api/outreach/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft_subject: draft.subject, draft_body: draft.body }),
      })
      await load()
    } finally {
      setSaving(null)
    }
  }

  const filtered = tab === 'all' ? prospects : prospects.filter(p => p.status === tab)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outreach</h1>
          <p className="text-gray-500 mt-1">{prospects.length} prospects · {prospects.filter(p => p.status === 'pending').length} awaiting review</p>
        </div>
        <button
          onClick={() => setShowAdd(s => !s)}
          className="bg-[#0b2340] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0b2340]/90"
        >
          + Add Prospect
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addProspect} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 space-y-3">
          <div className="grid md:grid-cols-5 gap-3">
            {[
              { key: 'practice_name', label: 'Name *', required: true },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
              { key: 'website', label: 'Website' },
              { key: 'city', label: 'City' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                <input
                  type="text"
                  required={f.required}
                  value={(form as any)[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                />
              </div>
            ))}
          </div>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Email template</label>
              <select
                value={form.template}
                onChange={e => setForm(p => ({ ...p, template: e.target.value as OutreachTemplate }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
              >
                {Object.entries(TEMPLATE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={saving === 'new'} className="bg-[#14b8a6] text-[#0b2340] font-semibold px-4 py-2 rounded-lg text-sm disabled:opacity-50">
              {saving === 'new' ? 'Adding…' : 'Add & Draft Email'}
            </button>
          </div>
        </form>
      )}

      <div className="flex gap-1 mb-5 border-b border-gray-200">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm font-medium capitalize border-b-2 -mb-px ${
              tab === t ? 'border-[#0b2340] text-[#0b2340]' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm py-8 text-center">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
          No prospects here yet.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(p => {
            const draft = editing[p.id] ?? { subject: p.draft_subject || '', body: p.draft_body || '' }
            return (
              <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{p.practice_name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {[p.email, p.phone, p.city].filter(Boolean).join(' · ') || 'No contact info'}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </div>

                {p.status !== 'sent' && p.status !== 'skipped' ? (
                  <div className="space-y-2 mb-3">
                    <input
                      value={draft.subject}
                      onChange={e => setEditing(prev => ({ ...prev, [p.id]: { ...draft, subject: e.target.value } }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                    />
                    <textarea
                      value={draft.body}
                      onChange={e => setEditing(prev => ({ ...prev, [p.id]: { ...draft, body: e.target.value } }))}
                      rows={6}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0b2340]"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-500">
                    <div className="font-medium text-gray-700 mb-1">{p.draft_subject}</div>
                    <div className="whitespace-pre-line text-xs">{p.draft_body}</div>
                  </div>
                )}

                {p.status !== 'sent' && p.status !== 'skipped' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => saveDraft(p.id)}
                      disabled={saving === p.id}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => updateStatus(p.id, 'sent')}
                      disabled={saving === p.id || !p.email}
                      title={!p.email ? 'Add an email address to send' : undefined}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#14b8a6] text-[#0b2340] font-semibold hover:bg-[#14b8a6]/90 disabled:opacity-50"
                    >
                      {saving === p.id ? 'Sending…' : 'Approve & Send'}
                    </button>
                    <button
                      onClick={() => updateStatus(p.id, 'skipped')}
                      disabled={saving === p.id}
                      className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
