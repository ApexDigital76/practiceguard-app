import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()

  const [{ data: practice, error }, { data: assessments }, { data: documents }, { data: subscription }] = await Promise.all([
    supabase.from('practices').select('*').eq('id', id).single(),
    supabase.from('assessments').select('*').eq('practice_id', id).order('created_at', { ascending: false }),
    supabase.from('documents').select('*').eq('practice_id', id).order('uploaded_at', { ascending: false }),
    supabase.from('subscriptions').select('*').eq('practice_id', id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
  ])

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  return NextResponse.json({ practice, assessments: assessments || [], documents: documents || [], subscription })
}
