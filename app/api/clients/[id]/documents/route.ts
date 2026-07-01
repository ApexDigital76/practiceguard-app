import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'

const documentSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  url: z.string().url(),
  expires_at: z.string().optional(),
})

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const data = documentSchema.parse(body)
    const supabase = createAdminClient()

    const { data: inserted, error } = await supabase
      .from('documents')
      .insert({ practice_id: id, ...data })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(inserted)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('document POST error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
