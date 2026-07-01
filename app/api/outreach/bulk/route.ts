import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'
import { draftFor, type OutreachTemplate } from '@/lib/outreach-templates'

const rowSchema = z.object({
  practice_name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
  template: z.enum(['lead', 'it_vendor', 'billing', 'cpa', 'insurance_broker', 'consultant']).default('lead'),
})

const bulkSchema = z.array(rowSchema).min(1).max(200)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rows = bulkSchema.parse(body)

    const inserts = rows.map(({ template, ...data }) => {
      const { subject, body: draftBody } = draftFor(template as OutreachTemplate, data.practice_name, data.city)
      return {
        ...data,
        status: 'pending' as const,
        draft_subject: subject,
        draft_body: draftBody,
      }
    })

    const supabase = createAdminClient()
    const { data: inserted, error } = await supabase
      .from('prospects')
      .insert(inserts)
      .select()

    if (error) throw error
    return NextResponse.json({ inserted: inserted.length })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('outreach bulk POST error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
