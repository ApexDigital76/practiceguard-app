export type UserRole = 'admin' | 'client'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type LeadSource = 'website' | 'outreach' | 'referral' | 'manual'

export type PracticeTier = 'starter' | 'professional' | 'enterprise'
export type PracticeStatus = 'lead' | 'active' | 'inactive'

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing'

export type ComplianceCategory =
  | 'mfa'
  | 'encryption'
  | 'vulnerability_scanning'
  | 'penetration_testing'
  | 'incident_response'
  | 'asset_inventory'
  | 'access_controls'
  | 'training'
  | 'business_associates'
  | 'documentation'

export interface Lead {
  id: string
  practice_name: string
  dentist_name?: string
  manager_name?: string
  phone?: string
  email?: string
  locations?: string
  software?: string
  concern?: string
  best_time?: string
  source: LeadSource
  status: LeadStatus
  notes?: string
  score?: number
  gaps?: string[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
  landing_page?: string
  created_at: string
}

export interface Practice {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  software?: string
  locations_count?: number
  tier?: PracticeTier
  status: PracticeStatus
  stripe_customer_id?: string
  created_at: string
}

export interface Assessment {
  id: string
  practice_id: string
  created_at: string
  completed_at?: string
  score?: number
  gaps: string[]
}

export interface Question {
  id: string
  category: ComplianceCategory
  text: string
  hipaa_reference?: string
  weight: number
}

export interface Document {
  id: string
  practice_id: string
  type: string
  name: string
  url: string
  uploaded_at: string
  expires_at?: string
}

export interface Subscription {
  id: string
  practice_id: string
  tier: PracticeTier
  stripe_customer_id?: string
  stripe_subscription_id?: string
  status: SubscriptionStatus
  current_period_end?: string
}

export interface Prospect {
  id: string
  practice_name: string
  email?: string
  phone?: string
  website?: string
  city?: string
  dentist_name?: string
  contact_name?: string
  status: 'pending' | 'approved' | 'sent' | 'skipped'
  draft_subject?: string
  draft_body?: string
  sent_at?: string
  created_at: string
}
