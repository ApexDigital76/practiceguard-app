import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'

const prospectSchema = z.object({
  practice_name: z.string().min(1, 'Practice name required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
})

function draftFor(practiceName: string, city?: string) {
  const subject = `Quick question about ${practiceName}'s HIPAA compliance`
  const body = `Hi,\n\nI work with dental and medical practices${city ? ` in ${city}` : ' across Middle Tennessee'} to help them get ready for the 2026 HIPAA Security Rule update — the biggest change to HIPAA since 2003.\n\nMost practices we talk to aren't aware how far they are from the new requirements (multi-factor authentication, encryption, quarterly vulnerability scans, and more) until it's too late.\n\nWould you be open to a free 30-minute readiness check? No pressure — just a clear picture of where ${practiceName} stands.\n\nBest,\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\npracticeguardcompliance.com`
  return { subject, body }
}

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
    const data = prospectSchema.parse(body)
    const { subject, body: draftBody } = draftFor(data.practice_name, data.city)

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
