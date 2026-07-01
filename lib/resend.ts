import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: {
  practice_name: string
  dentist_name?: string
  manager_name?: string
  phone?: string
  email?: string
  locations?: string
  software?: string
  concern?: string
  best_time?: string
}) {
  const lines = Object.entries(lead)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
    .join('\n')

  return resend.emails.send({
    from: 'PracticeGuard <noreply@practiceguardcompliance.com>',
    to: 'dallas@practiceguardcompliance.com',
    subject: `New Lead: ${lead.practice_name}`,
    text: `New readiness check request:\n\n${lines}\n\nSubmitted: ${new Date().toISOString()}`,
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
    text: `Hi ${practiceName},\n\nThank you for choosing PracticeGuard Compliance Group. I'll be in touch shortly to schedule your readiness assessment.\n\nBest,\nDallas Mitchell\nPracticeGuard Compliance Group\n(615) 555-0100`,
  })
}
