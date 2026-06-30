import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const supabase = createAdminClient()
  const practiceId = req.nextUrl.searchParams.get('practice_id')

  const { data: questions } = await supabase
    .from('compliance_questions')
    .select('*')
    .eq('active', true)
    .order('category')

  if (practiceId) {
    const { data: assessment } = await supabase
      .from('assessments')
      .select('*, assessment_responses(*)')
      .eq('practice_id', practiceId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    return NextResponse.json({ questions, assessment })
  }

  return NextResponse.json({ questions })
}

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const { practice_id, responses } = await req.json()

  // Create assessment
  const { data: assessment, error } = await supabase
    .from('assessments')
    .insert({ practice_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Insert responses
  const responseRows = responses.map((r: { question_id: string; answer: boolean; notes?: string }) => ({
    assessment_id: assessment.id,
    question_id: r.question_id,
    answer: r.answer,
    notes: r.notes,
  }))

  await supabase.from('assessment_responses').insert(responseRows)

  // Calculate score
  const { data: questions } = await supabase.from('compliance_questions').select('id, weight')
  const totalWeight = questions?.reduce((s, q) => s + q.weight, 0) || 1
  const earnedWeight = responses
    .filter((r: { answer: boolean }) => r.answer)
    .reduce((s: number, r: { question_id: string }) => {
      const q = questions?.find(q => q.id === r.question_id)
      return s + (q?.weight || 0)
    }, 0)

  const score = Math.round((earnedWeight / totalWeight) * 100)
  const gaps = responses
    .filter((r: { answer: boolean }) => !r.answer)
    .map((r: { question_id: string }) => r.question_id)

  await supabase
    .from('assessments')
    .update({ score, gaps, completed_at: new Date().toISOString() })
    .eq('id', assessment.id)

  return NextResponse.json({ assessment_id: assessment.id, score })
}
