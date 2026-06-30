import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'
import { sendLeadNotification } from '@/lib/resend'

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
}).refine(d => d.email || d.phone, { message: 'Provide email or phone' })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = leadSchema.parse(body)

    const supabase = createAdminClient()
    const { error } = await supabase.from('leads').insert({
      ...data,
      source: 'website',
      status: 'new',
    })

    if (error) throw error

    await sendLeadNotification(data)

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('leads POST error', e)
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
