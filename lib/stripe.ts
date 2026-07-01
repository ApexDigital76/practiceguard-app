import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia' as any,
})

export const PRICING = {
  starter: {
    name: 'Compliance Audit',
    price: 199700, // $1,997 one-time
    description: 'Risk assessment + gap report',
    mode: 'payment' as const,
  },
  professional: {
    name: 'Managed Compliance',
    setup: 375000, // $3,750 one-time
    monthly: 67500, // $675/mo
    description: 'Full compliance program + ongoing monitoring',
    mode: 'subscription' as const,
  },
  enterprise: {
    name: 'Enterprise Program',
    setup: 750000, // $7,500 one-time
    monthly: 120000, // $1,200/mo
    description: 'Full program + cyber insurance cert + AI patient intake',
    mode: 'subscription' as const,
  },
}

export type PricingTier = keyof typeof PRICING

export async function createCheckoutSession(opts: {
  tier: PricingTier
  practiceId: string
  practiceName: string
  email?: string
  successUrl: string
  cancelUrl: string
}) {
  const plan = PRICING[opts.tier]
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  if (plan.mode === 'payment') {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: plan.name, description: plan.description },
        unit_amount: plan.price,
      },
      quantity: 1,
    })
  } else {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: `${plan.name} — Setup`, description: 'One-time onboarding & setup fee' },
        unit_amount: plan.setup,
      },
      quantity: 1,
    })
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: `${plan.name} — Monthly`, description: plan.description },
        unit_amount: plan.monthly,
        recurring: { interval: 'month' },
      },
      quantity: 1,
    })
  }

  return stripe.checkout.sessions.create({
    mode: plan.mode,
    line_items,
    customer_email: opts.email,
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: {
      practice_id: opts.practiceId,
      practice_name: opts.practiceName,
      tier: opts.tier,
    },
    subscription_data: plan.mode === 'subscription' ? {
      metadata: { practice_id: opts.practiceId, tier: opts.tier },
    } : undefined,
  })
}
