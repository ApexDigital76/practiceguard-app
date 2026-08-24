import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'
import { sendLeadNotification, sendLeadConfirmation } from '@/lib/resend'

const leadSchema = z.object({
  practice_name: z.string().min(1, 'Practice name required'),
  dentist_name: z.string().optional(),
  manager_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  locations: z.string().optional(),
  software: z.string().optional(),
  concern: z.string().optional(),
  best_time: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
  gaps: z.array(z.string()).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  referrer: z.string().optional(),
  landing_page: z.string().optional(),
  source: z.string().optional(),
}).refine(d => d.email || d.phone, { message: 'Provide email or phone' })

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
  notes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = leadSchema.parse(body)

    const supabase = createAdminClient()

    const insertPayload: Record<string, unknown> = {
      practice_name: data.practice_name,
      dentist_name: data.dentist_name || null,
      manager_name: data.manager_name || null,
      phone: data.phone || null,
      email: data.email || null,
      locations: data.locations || null,
      software: data.software || null,
      concern: data.concern || null,
      best_time: data.best_time || null,
      source: data.source || 'website',
      status: 'new',
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      referrer: data.referrer || null,
      landing_page: data.landing_page || null,
    }

    // Optional Pulse Check fields (columns may not exist yet — safe to omit if migration pending)
    if (typeof data.score === 'number') insertPayload.score = data.score
    if (data.gaps) insertPayload.gaps = data.gaps

    const { data: inserted, error } = await supabase
      .from('leads')
      .insert(insertPayload)
      .select()
      .single()

    if (error) throw error

    // Notify Dallas + send confirmation to the lead (non-blocking)
    const emailPayload = {
      ...data,
      source: data.source || 'website',
    }
    await Promise.allSettled([
      sendLeadNotification(emailPayload),
      sendLeadConfirmation(emailPayload),
    ])

    return NextResponse.json({ ok: true, lead: inserted })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('leads POST error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const data = updateSchema.parse(body)

    const supabase = createAdminClient()
    const updates: Record<string, unknown> = {}
    if (data.status) updates.status = data.status
    if (data.notes !== undefined) updates.notes = data.notes

    const { data: updated, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', data.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ ok: true, lead: updated })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('leads PATCH error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
