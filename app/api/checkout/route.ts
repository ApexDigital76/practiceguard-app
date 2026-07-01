import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase'
import { createCheckoutSession, type PricingTier } from '@/lib/stripe'

const checkoutSchema = z.object({
  lead_id: z.string().uuid().optional(),
  practice_name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  tier: z.enum(['starter', 'professional', 'enterprise']),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = checkoutSchema.parse(body)
    const supabase = createAdminClient()

    // Find or create a practice record to attach this checkout to
    let practiceId: string
    const { data: existing } = await supabase
      .from('practices')
      .select('id')
      .eq('name', data.practice_name)
      .maybeSingle()

    if (existing) {
      practiceId = existing.id
    } else {
      const { data: created, error } = await supabase
        .from('practices')
        .insert({
          name: data.practice_name,
          email: data.email || null,
          status: 'lead',
          lead_id: data.lead_id || null,
        })
        .select('id')
        .single()
      if (error) throw error
      practiceId = created.id
    }

    const origin = req.nextUrl.origin
    const session = await createCheckoutSession({
      tier: data.tier as PricingTier,
      practiceId,
      practiceName: data.practice_name,
      email: data.email || undefined,
      successUrl: `${origin}/clients?checkout=success`,
      cancelUrl: `${origin}/leads?checkout=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 })
    }
    console.error('checkout POST error', e)
    return NextResponse.json({ error: 'Server error creating checkout session' }, { status: 500 })
  }
}
