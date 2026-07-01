import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'

const assessmentSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  gaps: z.array(z.string()).default([]),
  completed_at: z.string().optional(),
})

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const data = assessmentSchema.parse(body)
    const supabase = createAdminClient()

    const { data: inserted, error } = await supabase
      .from('assessments')
      .insert({ practice_id: id, ...data })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(inserted)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('assessment POST error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
