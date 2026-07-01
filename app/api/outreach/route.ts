import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'
import { draftFor } from '@/lib/outreach-templates'

const prospectSchema = z.object({
  practice_name: z.string().min(1, 'Practice name required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
  dentist_name: z.string().optional(),
  contact_name: z.string().optional(),
  template: z.enum(['lead', 'it_vendor', 'billing', 'cpa', 'insurance_broker', 'consultant']).default('lead'),
})

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('prospects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { template, ...data } = prospectSchema.parse(body)
    const { subject, body: draftBody } = draftFor(template, data.practice_name, data.city, {
      dentistName: data.dentist_name,
      contactName: data.contact_name,
    })

    const supabase = createAdminClient()
    const { data: inserted, error } = await supabase
      .from('prospects')
      .insert({
        ...data,
        status: 'pending',
        draft_subject: subject,
        draft_body: draftBody,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(inserted)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('outreach POST error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
