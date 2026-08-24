import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

type LeadPayload = {
  practice_name: string
  dentist_name?: string
  manager_name?: string
  phone?: string
  email?: string
  locations?: string
  software?: string
  concern?: string
  best_time?: string
  score?: number
  gaps?: string[]
  source?: string
}

function formatGaps(gaps?: string[]) {
  if (!gaps || gaps.length === 0) return 'None listed'
  return gaps.map((g) => `• ${g}`).join('\n')
}

/** Clean notification email sent to Dallas when a new lead arrives */
export async function sendLeadNotification(lead: LeadPayload) {
  const contactName = lead.manager_name || lead.dentist_name || 'Not provided'
  const scoreLine = typeof lead.score === 'number' ? `Score: ${lead.score}/100` : null
  const gapsBlock = lead.gaps && lead.gaps.length > 0
    ? `\nTop exposure points:\n${formatGaps(lead.gaps)}\n`
    : ''

  const text = [
    `New Pulse Check / lead received`,
    ``,
    `Practice: ${lead.practice_name}`,
    `Contact: ${contactName}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.software ? `Software: ${lead.software}` : null,
    lead.concern ? `Concern: ${lead.concern}` : null,
    lead.best_time ? `Best time: ${lead.best_time}` : null,
    scoreLine,
    gapsBlock.trim() || null,
    `Source: ${lead.source || 'website'}`,
    `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}`,
    ``,
    `Open admin leads: https://app.practiceguardcompliance.com/leads`,
  ]
    .filter(Boolean)
    .join('\n')

  return resend.emails.send({
    from: 'PracticeGuard <noreply@practiceguardcompliance.com>',
    to: 'dallas@practiceguardcompliance.com',
    subject: `New Lead: ${lead.practice_name}${typeof lead.score === 'number' ? ` (${lead.score}/100)` : ''}`,
    text,
  })
}

/** Confirmation email sent to the person who completed the Pulse Check */
export async function sendLeadConfirmation(lead: LeadPayload) {
  if (!lead.email) return null

  const firstName = (lead.manager_name || lead.dentist_name || 'there').split(' ')[0]
  const scoreLine =
    typeof lead.score === 'number'
      ? `Your PracticePulse score: ${lead.score}/100\n`
      : ''
  const gapsBlock =
    lead.gaps && lead.gaps.length > 0
      ? `\nTop areas to review:\n${formatGaps(lead.gaps)}\n`
      : ''

  const text = `Hi ${firstName},

Thanks for completing the PracticePulse Check for ${lead.practice_name}.

${scoreLine}${gapsBlock}
I've received your results and will review them shortly. You can expect a short follow-up from me within 2 business days with clarity on what stands out and where to focus first.

No sales pitch — just a clear next step.

Talk soon,
Dallas Mitchell
PracticeGuard Compliance Group
615-785-3493
dallas@practiceguardcompliance.com
https://www.practiceguardcompliance.com
`

  return resend.emails.send({
    from: 'Dallas Mitchell <dallas@practiceguardcompliance.com>',
    to: lead.email,
    replyTo: 'dallas@practiceguardcompliance.com',
    subject: `Your PracticePulse results — ${lead.practice_name}`,
    text,
  })
}

export async function sendOutreachEmail(to: string, subject: string, body: string) {
  return resend.emails.send({
    from: 'Dallas Mitchell <dallas@practiceguardcompliance.com>',
    to,
    replyTo: 'dallas@practiceguardcompliance.com',
    subject,
    text: body,
  })
}

export async function sendWelcomeEmail(to: string, practiceName: string) {
  return resend.emails.send({
    from: 'Dallas Mitchell <dallas@practiceguardcompliance.com>',
    to,
    subject: 'Welcome to PracticeGuard — Next Steps',
    text: `Hi ${practiceName},\n\nThank you for choosing PracticeGuard Compliance Group. I'll be in touch shortly to schedule your readiness assessment.\n\nBest,\nDallas Mitchell\nPracticeGuard Compliance Group\n615-785-3493`,
  })
}
