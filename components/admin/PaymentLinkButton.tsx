'use client'
import { useState } from 'react'

const TIERS = [
  { value: 'starter', label: 'Compliance Audit — $1,997' },
  { value: 'professional', label: 'Managed Compliance — $3,750 + $675/mo' },
  { value: 'enterprise', label: 'Enterprise — $7,500 + $1,200/mo' },
]

export default function PaymentLinkButton({
  leadId,
  practiceName,
  email,
}: {
  leadId: string
  practiceName: string
  email?: string
}) {
  const [open, setOpen] = useState(false)
  const [tier, setTier] = useState('starter')
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function createLink() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId, practice_name: practiceName, email, tier }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create payment link')
      setUrl(data.url)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function copy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs px-2 py-1 rounded-lg bg-[#0b2340] text-white hover:bg-[#0b2340]/90"
      >
        Payment Link
      </button>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2 w-72">
      {!url ? (
        <>
          <select
            value={tier}
            onChange={e => setTier(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900"
          >
            {TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={createLink}
              disabled={loading}
              className="text-xs px-2 py-1 rounded-lg bg-[#14b8a6] text-[#0b2340] font-semibold disabled:opacity-50"
            >
              {loading ? 'Creating…' : 'Create Link'}
            </button>
            <button onClick={() => setOpen(false)} className="text-xs px-2 py-1 text-gray-400">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-xs text-gray-600 break-all bg-gray-50 rounded-lg p-2">{url}</div>
          <div className="flex gap-2">
            <button onClick={copy} className="text-xs px-2 py-1 rounded-lg bg-[#0b2340] text-white">
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button onClick={() => { setOpen(false); setUrl('') }} className="text-xs px-2 py-1 text-gray-400">
              Done
            </button>
          </div>
        </>
      )}
    </div>
  )
}
