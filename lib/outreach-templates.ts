export type OutreachTemplate = 'lead' | 'it_vendor' | 'billing' | 'cpa' | 'insurance_broker' | 'consultant'

export const TEMPLATE_LABELS: Record<OutreachTemplate, string> = {
  lead: 'Practice lead (free readiness check)',
  it_vendor: 'Referral: IT support company',
  billing: 'Referral: Billing / RCM company',
  cpa: 'Referral: CPA / Accountant',
  insurance_broker: 'Referral: Insurance broker',
  consultant: 'Referral: Supply rep / practice consultant',
}

export interface DraftOptions {
  dentistName?: string
  contactName?: string
}

function greeting(businessName: string, opts?: DraftOptions): string {
  const dentist = opts?.dentistName?.trim()
  const contact = opts?.contactName?.trim()

  if (dentist) {
    const withTitle = /^dr\.?\s/i.test(dentist) ? dentist : `Dr. ${dentist}`
    return `Hello ${withTitle},`
  }
  if (contact) {
    return `Hi ${contact},`
  }
  // No known contact — address the business by name rather than a bare
  // "Hi," which reads as low-effort mass email.
  return `Hi ${businessName} team,`
}

// Tags every outreach link with UTM params so a lead that eventually comes
// through the site can be traced back to this exact email/template.
function link(path: string, template: OutreachTemplate): string {
  return `practiceguardcompliance.com${path}?utm_source=outreach&utm_medium=email&utm_campaign=${template}`
}

export function draftFor(template: OutreachTemplate, name: string, city?: string, opts?: DraftOptions) {
  const greet = greeting(name, opts)
  const partnersLink = link('/partners', template)
  const homeLink = link('/', template)

  switch (template) {
    case 'it_vendor':
      return {
        subject: 'Referral partnership — HIPAA compliance for your clients',
        body: `${greet}\n\nI run PracticeGuard Compliance Group — we help dental and medical practices get ready for the 2026 HIPAA Security Rule update (MFA, encryption, risk assessments, the works).\n\nSince ${name} is already managing the technical side for your clients, you're probably seeing firsthand how far most of them are from these new requirements. I'd like to offer a referral arrangement: you send a practice our way, we pay you a referral fee for every one that becomes a paying client. No cost or obligation on your end beyond the introduction.\n\nWorth a quick call this week?\n\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\n${partnersLink}`,
      }
    case 'billing':
      return {
        subject: 'Partnership idea — your clients & HIPAA compliance',
        body: `${greet}\n\n${name}'s clients trust you with their revenue cycle — which means you're often the first to hear when something's wrong on the compliance side too (a breach, an audit notice, an insurance renewal issue).\n\nI run PracticeGuard Compliance Group, helping dental and medical practices meet the new 2026 HIPAA Security Rule requirements. I'd like to set up a referral partnership — a fee for every practice you send our way that becomes a client.\n\nHappy to send more details or hop on a quick call.\n\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\n${partnersLink}`,
      }
    case 'cpa':
      return {
        subject: 'A referral opportunity for your healthcare clients',
        body: `${greet}\n\nIf ${name} works with dental or medical practices, you've probably heard clients mention HIPAA compliance or cyber insurance renewals coming up — usually as a headache, not something they've fully handled.\n\nI run PracticeGuard Compliance Group and help practices in Middle Tennessee get compliant with the new 2026 HIPAA Security Rule. I'd like to offer a simple referral arrangement — a fee for every practice you introduce that becomes a client, no work required on your end beyond the intro.\n\nWould you be open to a short call?\n\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\n${partnersLink}`,
      }
    case 'insurance_broker':
      return {
        subject: 'Referral partnership — cyber insurance readiness',
        body: `${greet}\n\nCyber insurance carriers are tightening requirements for dental and medical practices — MFA, encrypted backups, incident response plans, documented vulnerability scans. A lot of ${name}'s clients probably aren't ready, which means denied applications or bad rates at renewal.\n\nI run PracticeGuard Compliance Group and help practices get that documentation in order before they apply or renew. I'd like to set up a referral partnership so we can help each other's clients get approved faster and stay protected.\n\nWorth a quick call?\n\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\n${partnersLink}`,
      }
    case 'consultant':
      return {
        subject: 'Referral partnership — HIPAA compliance for the practices you work with',
        body: `${greet}\n\nThe dental and medical practices ${name} works with are facing the 2026 HIPAA Security Rule update — the biggest change to HIPAA since 2003. Most aren't aware how exposed they are until an audit notice or insurance renewal forces the issue.\n\nI run PracticeGuard Compliance Group and help practices get compliant — audits, ongoing monitoring, and cyber insurance readiness. I'd like to set up a referral partnership: a fee for every practice you introduce that becomes a client, no work required on your end beyond the intro.\n\nWorth a quick call?\n\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\n${partnersLink}`,
      }
    case 'lead':
    default:
      return {
        subject: `Quick question about ${name}'s HIPAA compliance`,
        body: `${greet}\n\nI work with dental and medical practices${city ? ` in ${city}` : ' across Middle Tennessee'} to help them get ready for the 2026 HIPAA Security Rule update — the biggest change to HIPAA since 2003.\n\nMost practices we talk to aren't aware how far they are from the new requirements (multi-factor authentication, encryption, quarterly vulnerability scans, and more) until it's too late.\n\nWould you be open to a free 30-minute readiness check? No pressure — just a clear picture of where ${name} stands.\n\nBest,\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 785-3493\n${homeLink}`,
      }
  }
}
