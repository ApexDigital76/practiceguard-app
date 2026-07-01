import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'
import { sendOutreachEmail } from '@/lib/resend'

const updateSchema = z.object({
  draft_subject: z.string().optional(),
  draft_body: z.string().optional(),
  status: z.enum(['pending', 'approved', 'sent', 'skipped']).optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const data = updateSchema.parse(body)
    const supabase = createAdminClient()

    if (data.status === 'sent') {
      const { data: prospect, error: fetchError } = await supabase
        .from('prospects')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError || !prospect) {
        return NextResponse.json({ error: 'Prospect not found' }, { status: 404 })
      }
      if (!prospect.email) {
        return NextResponse.json({ error: 'This prospect has no email on file — add one before sending' }, { status: 400 })
      }

      const subject = data.draft_subject ?? prospect.draft_subject
      const draftBody = data.draft_body ?? prospect.draft_body
      await sendOutreachEmail(prospect.email, subject, draftBody)

      const { data: updated, error } = await supabase
        .from('prospects')
        .update({ ...data, draft_subject: subject, draft_body: draftBody, sent_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(updated)
    }

    const { data: updated, error } = await supabase
      .from('prospects')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(updated)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('outreach PATCH error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
