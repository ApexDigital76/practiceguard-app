'use client'

// Captures UTM params and referrer on first landing, persists them in
// sessionStorage so they survive navigation within the site, and returns
// them for inclusion in any lead-form submission.
export function getAttribution() {
  if (typeof window === 'undefined') return {}

  const STORAGE_KEY = 'pg_attribution'
  const params = new URLSearchParams(window.location.search)
  const hasUtm = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign')

  if (hasUtm) {
    const attribution = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      referrer: document.referrer || '',
      landing_page: window.location.pathname,
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
    return attribution
  }

  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // fall through
    }
  }

  // No UTM params ever seen this session — still capture referrer/landing
  // page so direct/organic traffic is distinguishable from paid/social.
  return {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    referrer: document.referrer || '',
    landing_page: window.location.pathname,
  }
}
