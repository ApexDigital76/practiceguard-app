'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, FileText, AlertTriangle, Plus, X } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

const TIER_LABELS: Record<string, string> = {
  starter: 'Compliance Audit',
  professional: 'Managed Compliance',
  enterprise: 'Enterprise Program',
}

const DOC_TYPES = ['policy', 'certificate', 'report', 'evidence']

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [showAssessment, setShowAssessment] = useState(false)
  const [score, setScore] = useState('')
  const [gaps, setGaps] = useState('')
  const [savingAssessment, setSavingAssessment] = useState(false)

  const [showDoc, setShowDoc] = useState(false)
  const [docForm, setDocForm] = useState({ name: '', type: 'report', url: '' })
  const [savingDoc, setSavingDoc] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/clients/${id}`)
    if (res.ok) setData(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [id])

  async function addAssessment(e: React.FormEvent) {
    e.preventDefault()
    setSavingAssessment(true)
    try {
      await fetch(`/api/clients/${id}/assessments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: score ? Number(score) : undefined,
          gaps: gaps.split('\n').map(g => g.trim()).filter(Boolean),
          completed_at: new Date().toISOString(),
        }),
      })
      setScore(''); setGaps(''); setShowAssessment(false)
      await load()
    } finally {
      setSavingAssessment(false)
    }
  }

  async function addDocument(e: React.FormEvent) {
    e.preventDefault()
    setSavingDoc(true)
    try {
      const res = await fetch(`/api/clients/${id}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docForm),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Could not add document')
        return
      }
      setDocForm({ name: '', type: 'report', url: '' }); setShowDoc(false)
      await load()
    } finally {
      setSavingDoc(false)
    }
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Loading…</div>
  if (!data) return <div className="p-8 text-gray-400 text-sm">Client not found.</div>

  const { practice, assessments, documents, subscription } = data
  const latest = assessments[0]

  return (
    <div className="p-8 max-w-3xl">
      <button onClick={() => router.push('/clients')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-6">
        <ArrowLeft size={14} /> Back to Clients
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{practice.name}</h1>
          <p className="text-gray-500 mt-1">
            {practice.tier ? TIER_LABELS[practice.tier] || practice.tier : 'No plan'} · {practice.email || 'no email on file'}
          </p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${practice.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {practice.status}
        </span>
      </div>

      {subscription && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex justify-between text-sm">
          <span className="text-gray-500">Subscription status</span>
          <span className="font-medium text-gray-900 capitalize">{subscription.status}</span>
        </div>
      )}

      {/* Assessment */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Compliance Assessment</h2>
          <button onClick={() => setShowAssessment(s => !s)} className="text-xs flex items-center gap-1 text-[#0b2340] font-medium">
            <Plus size={14} /> Add
          </button>
        </div>

        {showAssessment && (
          <form onSubmit={addAssessment} className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Score (0-100)</label>
              <input
                type="number" min={0} max={100} value={score}
                onChange={e => setScore(e.target.value)}
                className="w-32 border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Gaps (one per line)</label>
              <textarea
                value={gaps} onChange={e => setGaps(e.target.value)} rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                placeholder={'Missing MFA on remote access\nNo written incident response plan'}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={savingAssessment} className="text-xs px-3 py-1.5 rounded-lg bg-[#14b8a6] text-[#0b2340] font-semibold disabled:opacity-50">
                {savingAssessment ? 'Saving…' : 'Save Assessment'}
              </button>
              <button type="button" onClick={() => setShowAssessment(false)} className="text-xs px-3 py-1.5 text-gray-400">Cancel</button>
            </div>
          </form>
        )}

        {latest ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl font-bold text-[#0b2340]">{latest.score ?? '—'}</div>
              <div className="text-xs text-gray-400">Latest score · {formatDate(latest.created_at)}</div>
            </div>
            {latest.gaps?.length > 0 && (
              <div className="space-y-1.5">
                {latest.gaps.map((g: string) => (
                  <div key={g} className="flex items-start gap-2 text-xs text-gray-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={12} /> {g}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-400">No assessment on file.</p>
        )}
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Documents</h2>
          <button onClick={() => setShowDoc(s => !s)} className="text-xs flex items-center gap-1 text-[#0b2340] font-medium">
            <Plus size={14} /> Add
          </button>
        </div>

        {showDoc && (
          <form onSubmit={addDocument} className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                <input
                  required value={docForm.name}
                  onChange={e => setDocForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="2026 Risk Analysis Report"
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select
                  value={docForm.type}
                  onChange={e => setDocForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                >
                  {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Link to file (e.g. Google Drive, Dropbox share link)</label>
              <input
                required type="url" value={docForm.url}
                onChange={e => setDocForm(p => ({ ...p, url: e.target.value }))}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={savingDoc} className="text-xs px-3 py-1.5 rounded-lg bg-[#14b8a6] text-[#0b2340] font-semibold disabled:opacity-50">
                {savingDoc ? 'Saving…' : 'Save Document'}
              </button>
              <button type="button" onClick={() => setShowDoc(false)} className="text-xs px-3 py-1.5 text-gray-400">Cancel</button>
            </div>
          </form>
        )}

        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map((doc: any) => (
              <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg px-4 py-3 transition-colors">
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
          <p className="text-sm text-gray-400">No documents uploaded yet.</p>
        )}
      </div>
    </div>
  )
}
