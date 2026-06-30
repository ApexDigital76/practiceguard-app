import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia' as any,
})

export const PRICING = {
  starter: {
    name: 'Starter',
    price: 199700, // $1,997 one-time
    description: 'Risk assessment + gap report',
    mode: 'payment' as const,
  },
  professional: {
    name: 'Professional',
    setup: 375000, // $3,750 one-time
    monthly: 67500, // $675/mo
    description: 'Full compliance program + ongoing monitoring',
    mode: 'subscription' as const,
  },
  enterprise: {
    name: 'Enterprise',
    setup: 750000, // $7,500 one-time
    monthly: 120000, // $1,200/mo
    description: 'Full program + cyber insurance cert + AI patient intake',
    mode: 'subscription' as const,
  },
}
