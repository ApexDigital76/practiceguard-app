// Daily outreach sender.
// - Sends the drafted email to every pending prospect that has an email
//   address, skipping any email address that has ever been sent to before
//   (across all time, not just today) so no recipient is ever emailed twice.
// - Prospects with no email are marked 'approved' (meaning: reported for a
//   manual call) so they are only ever reported once, then prints a report
//   of exactly those newly-reported prospects for Dallas to call.
//
// Run from the repo root: node scripts/daily-outreach-send.js

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
const { Resend } = require('resend')

const envPath = path.join(__dirname, '..', '.env.local')
const env = {}
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const match = line.match(/^([A-Z_]+)=(.*)$/)
  if (match) env[match[1]] = match[2].trim()
})

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const resend = new Resend(env.RESEND_API_KEY)

async function main() {
  const { data: all, error } = await supabase.from('prospects').select('*')
  if (error) {
    console.error('Failed to load prospects:', error.message)
    process.exit(1)
  }

  const alreadyEmailed = new Set(
    all.filter(p => p.status === 'sent' && p.email).map(p => p.email.toLowerCase())
  )

  const pending = all.filter(p => p.status === 'pending')
  const withEmail = []
  const seenThisRun = new Set()
  for (const p of pending) {
    if (!p.email) continue
    const key = p.email.toLowerCase()
    if (alreadyEmailed.has(key) || seenThisRun.has(key)) continue
    seenThisRun.add(key)
    withEmail.push(p)
  }
  const noEmail = pending.filter(p => !p.email)

  const sentResults = []
  for (const p of withEmail) {
    try {
      await resend.emails.send({
        from: 'Dallas Mitchell <dallas@practiceguardcompliance.com>',
        to: p.email,
        replyTo: 'dallas@practiceguardcompliance.com',
        subject: p.draft_subject,
        text: p.draft_body,
      })
      await supabase
        .from('prospects')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', p.id)
      sentResults.push({ name: p.practice_name, email: p.email, ok: true })
    } catch (e) {
      sentResults.push({ name: p.practice_name, email: p.email, ok: false, error: e.message })
    }
  }

  const reportedNoEmail = []
  for (const p of noEmail) {
    await supabase.from('prospects').update({ status: 'approved' }).eq('id', p.id)
    reportedNoEmail.push({
      name: p.practice_name,
      phone: p.phone || '(no phone on file)',
      website: p.website || '(no website on file)',
      city: p.city || '',
    })
  }

  console.log('=== DAILY OUTREACH SEND REPORT ===')
  console.log(`Date: ${new Date().toISOString().slice(0, 10)}`)
  console.log('')
  console.log(`Emails sent: ${sentResults.filter(r => r.ok).length}`)
  sentResults.filter(r => r.ok).forEach(r => console.log(`  - ${r.name} <${r.email}>`))
  const failed = sentResults.filter(r => !r.ok)
  if (failed.length) {
    console.log(`Failed to send: ${failed.length}`)
    failed.forEach(r => console.log(`  - ${r.name} <${r.email}>: ${r.error}`))
  }
  console.log('')
  console.log(`New no-email prospects to call: ${reportedNoEmail.length}`)
  reportedNoEmail.forEach(r => console.log(`  - ${r.name} | ${r.phone} | ${r.website} | ${r.city}`))
  if (sentResults.length === 0 && reportedNoEmail.length === 0) {
    console.log('Nothing pending today. Add more prospects via the Outreach page to keep this running.')
  }
}

main()
