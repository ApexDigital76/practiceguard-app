export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  date: string
  readTime: string
  excerpt: string
  body: { heading: string; paragraphs: string[] }[]
}

export const POSTS: BlogPost[] = [
  {
    slug: 'lost-stolen-laptop-phone-patient-data-hipaa-breach',
    title: 'An Employee Lost a Laptop or Phone With Patient Data on It. Now What?',
    metaDescription: 'What actually happens after a lost or stolen device with patient data — and why encryption is the difference between a non-event and a reportable HIPAA breach.',
    date: '2026-07-13',
    readTime: '5 min read',
    excerpt: 'A laptop left in a car, a phone that never made it home from lunch — lost devices are one of the most common ways practices end up reporting a breach. Here\'s what determines whether it\'s a paperwork headache or a six-figure problem.',
    body: [
      {
        heading: 'Why this happens so often',
        paragraphs: [
          'Ransomware gets the headlines, but lost and stolen devices are one of the most common breach triggers HHS actually sees. A front-desk tablet left in a car overnight, a practice manager\'s laptop taken from an unlocked office, a phone with an email app that never got wiped before being traded in — none of it requires a hacker. It just requires a device with patient data on it leaving the building in someone\'s pocket or bag.',
          'What makes this category different from an attack is that the outcome is almost entirely decided before the device ever goes missing — by whether it was encrypted and password-protected in the first place.',
        ],
      },
      {
        heading: 'The question that decides everything: was it encrypted?',
        paragraphs: [
          'Under HIPAA, a lost or stolen device that was properly encrypted is treated as a "safe harbor" — the data on it is considered unreadable to whoever finds it, so it typically doesn\'t count as a reportable breach at all. You still document the incident internally, but you\'re not sending notification letters or reporting to HHS.',
          'A device that wasn\'t encrypted is a completely different situation. Once patient data may have been accessible to an unauthorized person, the practice generally has to assume a breach occurred and follow the full notification process — which starts a clock, not a guess.',
        ],
      },
      {
        heading: 'What the notification process actually involves',
        paragraphs: [
          'If the device wasn\'t encrypted, the practice has to determine what data was on it, notify every affected patient in writing (typically within 60 days), and — if more than 500 people are affected — notify HHS and local media outlets as well. Smaller breaches still get reported to HHS annually. Each of those steps takes staff time, and each notification letter is a moment where a patient learns their information wasn\'t protected the way they assumed it was.',
          'None of this requires malice or a sophisticated attacker. It requires one unencrypted device and one moment of bad luck — a stolen car, a bag left on a train, a phone that slips out of a pocket.',
        ],
      },
      {
        heading: 'How to make this a non-event before it happens',
        paragraphs: [
          'Full-disk encryption on every laptop and desktop, encryption enabled on every mobile device that can access patient data, and a remote-wipe capability for phones and tablets turn a lost device from a breach into a lost-asset report. Add a password manager and screen-lock policy so a device is never sitting open and unattended, and the risk drops even further.',
          'These are exactly the kind of controls we verify and document as part of a compliance audit, and keep current on an ongoing basis through Managed Compliance — so if a device does go missing for a practice in Nashville, Hendersonville, Gallatin, Lebanon, or Mount Juliet, the answer to "was it encrypted?" is already on file instead of being guessed at under deadline.',
        ],
      },
    ],
  },
  {
    slug: 'what-happens-if-your-dental-practice-gets-hit-by-ransomware',
    title: 'What Happens If Your Dental Practice Gets Hit by Ransomware?',
    metaDescription: 'A realistic breakdown of what a ransomware attack looks like for a dental or medical practice, hour by hour, and the costs most owners never see coming.',
    date: '2026-07-06',
    readTime: '6 min read',
    excerpt: 'Ransomware doesn\'t start with a ransom note — it starts with a normal Tuesday. Here\'s what actually happens to a dental or medical practice from the first sign of trouble to the final bill.',
    body: [
      {
        heading: 'How it actually starts',
        paragraphs: [
          'Almost none of these attacks begin with a dramatic hack. They start with a front-desk employee clicking a link in an email that looks like a shipping notice, or an old remote-access tool left open on a server no one thinks about anymore. From that single foothold, attackers often sit quietly inside the network for days or weeks, mapping out where the patient records and backups live before they ever lock a single file.',
          'Dental and medical practices are attractive targets precisely because they\'re smaller and less defended than hospital systems, while still holding the same valuable patient data — insurance details, medical histories, Social Security numbers — that carries a high resale value.',
        ],
      },
      {
        heading: 'The first 24 hours',
        paragraphs: [
          'The moment ransomware detonates, every workstation that touches the practice management system typically goes dark at once — no charting, no scheduling, no billing, no imaging. Staff usually notice within minutes because patients are sitting in the waiting room and nothing will load.',
          'Without a written incident response plan already in place, the first day is usually spent scrambling: figuring out who to call, whether the backups are actually intact (attackers frequently target backups first), and whether the practice is legally required to notify patients — all while trying to keep the office running on paper.',
        ],
      },
      {
        heading: 'The costs nobody budgets for',
        paragraphs: [
          'The ransom demand itself, even if it\'s paid, is often the smallest line item. The real costs stack up around it: forensic investigators to determine what was actually accessed, weeks of lost production while systems are rebuilt, mandatory breach notification letters to every affected patient, credit monitoring offers, and in many cases an OCR investigation that follows the breach report. Practices without cyber insurance or a documented security program in place before the attack absorb all of this out of pocket — and a policy applied for after the fact won\'t cover an incident that already happened.',
          'For a single-location practice, total costs from a mid-sized ransomware incident commonly run into six figures once lost production, recovery, and notification are added up — before accounting for the patients who don\'t come back.',
        ],
      },
      {
        heading: 'What actually prevents this',
        paragraphs: [
          'The controls that stop most of these attacks aren\'t exotic: multi-factor authentication on every system, backups that are tested for recovery (not just scheduled), regular vulnerability scanning to catch the exact kind of exposed remote-access tool attackers look for, and a written incident response plan so day one is a checklist instead of a scramble.',
          'This is exactly what our Managed Compliance program maintains on an ongoing basis for practices across Nashville, Hendersonville, Gallatin, Lebanon, and Mount Juliet — so the plan, the backups, and the documentation are already in place long before an attacker ever gets a foothold.',
        ],
      },
    ],
  },
  {
    slug: 'what-happens-if-your-dental-practice-gets-an-ocr-audit-notice',
    title: 'What Happens If Your Dental Practice Gets an OCR Audit Notice?',
    metaDescription: 'A step-by-step guide to what happens after your practice receives an HHS Office for Civil Rights audit notice, and how to respond correctly.',
    date: '2026-06-28',
    readTime: '5 min read',
    excerpt: 'An OCR audit notice can arrive with little warning. Here\'s exactly what happens next, what OCR will ask for, and how to respond without making things worse.',
    body: [
      {
        heading: 'How practices usually find out',
        paragraphs: [
          'Most OCR investigations start one of two ways: a patient complaint, or a breach report your practice filed yourself after a security incident. Either way, the first sign is typically a letter or email from HHS requesting documentation — and the response window is often just 30 days.',
        ],
      },
      {
        heading: 'What OCR typically asks for',
        paragraphs: [
          'The standard request list includes your written HIPAA risk analysis, your security policies and procedures, staff training records, your list of Business Associate Agreements, and documentation of any security incidents in recent years. If you\'ve never had a formal risk analysis done, this is where practices get into serious trouble — it\'s one of the most commonly cited gaps in OCR enforcement actions.',
        ],
      },
      {
        heading: 'The biggest mistake practices make',
        paragraphs: [
          'Scrambling to create documentation after the audit notice arrives. OCR can tell the difference between a risk analysis that was genuinely conducted months or years ago and one thrown together the week before a response is due — and "willful neglect" penalties are significantly higher than penalties for practices that made a good-faith effort but had gaps.',
        ],
      },
      {
        heading: 'How to actually be ready',
        paragraphs: [
          'The practices that come through an OCR audit with the smallest penalties (or none at all) are the ones who already had a current, documented risk analysis, a written incident response plan, and training records on file before anything happened. That documentation is exactly what a compliance audit produces — and it\'s far cheaper to have it ready than to build it under a 30-day deadline with regulators watching.',
        ],
      },
    ],
  },
  {
    slug: 'hipaa-compliance-nashville-middle-tennessee-dental-practices',
    title: 'HIPAA Compliance for Dental Practices in Nashville & Middle Tennessee: A 2026 Guide',
    metaDescription: 'A practical guide to HIPAA compliance for dental and medical practices in Nashville, Gallatin, Murfreesboro, and Middle Tennessee — what changed in 2026 and what to do about it.',
    date: '2026-06-15',
    readTime: '6 min read',
    excerpt: 'What dental and medical practices across Middle Tennessee need to know about the 2026 HIPAA Security Rule update — and how to get ready without hiring a full IT department.',
    body: [
      {
        heading: 'Why this matters right now for Middle Tennessee practices',
        paragraphs: [
          'Dental and medical practices across Nashville, Gallatin, Murfreesboro, Hendersonville, and the surrounding Middle Tennessee area are facing the biggest update to HIPAA\'s Security Rule since 2003. The new rule removes the old "addressable" loophole that let practices skip certain controls if they documented a reason — most safeguards are now flatly required.',
          'Local practices are a particularly attractive target for attackers because they typically have smaller IT budgets and fewer dedicated security staff than hospital systems, while still holding the same valuable patient data.',
        ],
      },
      {
        heading: 'What\'s actually required',
        paragraphs: [
          'The short list: multi-factor authentication on every system touching patient data, encryption at rest and in transit, quarterly vulnerability scans, annual penetration testing, a written and tested incident response plan, and a full inventory of every device and system that touches PHI.',
          'None of these require an enterprise IT department. They require a clear plan, the right vendor relationships, and someone keeping it documented and current — which is exactly the gap most single-location and small multi-location practices have.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'The first step for most practices is a gap analysis — a structured review of where you stand today against the new requirements, with a written report you can act on. That\'s the foundation everything else builds on, whether you handle remediation in-house or bring in outside help.',
          'If you\'re a dental or medical practice in the Nashville area and want a clear picture of where you stand, a free 30-minute readiness check is the fastest way to find out.',
        ],
      },
    ],
  },
  {
    slug: 'hipaa-risk-assessment-cost-small-dental-practice',
    title: 'How Much Does a HIPAA Risk Assessment Cost for a Small Dental Practice?',
    metaDescription: 'A breakdown of what a HIPAA risk assessment actually costs for a small dental or medical practice, what drives the price, and how to avoid overpaying.',
    date: '2026-05-28',
    readTime: '5 min read',
    excerpt: 'Pricing for HIPAA risk assessments varies widely. Here\'s what actually drives the cost and what a fair price looks like for a single-location practice.',
    body: [
      {
        heading: 'What a risk assessment actually includes',
        paragraphs: [
          'A proper HIPAA risk analysis isn\'t a checklist you fill out yourself — it\'s a formal review covering your technical safeguards (network, devices, software), administrative safeguards (policies, training, vendor agreements), and physical safeguards (who can access what, and where). It ends in a written, dated document, because that document is what HIPAA actually requires you to have.',
        ],
      },
      {
        heading: 'What drives the price',
        paragraphs: [
          'For a single-location dental or medical practice, a full risk analysis and compliance audit typically runs in the $1,500–$3,000 range as a one-time cost — more for multi-location groups, less for very simple setups. The biggest cost drivers are the number of locations, the number of systems and vendors involved, and whether remediation (fixing what\'s found) is bundled in or quoted separately.',
          'Be cautious of two extremes: rock-bottom "compliance kit" templates that don\'t involve an actual technical review, and large consulting firms pricing for hospital-scale engagements you don\'t need.',
        ],
      },
      {
        heading: 'What a fair deal looks like',
        paragraphs: [
          'A fair-priced audit for a small practice should include a technical security assessment, a HIPAA administrative review, a formal written risk analysis document, and a prioritized remediation roadmap — delivered in writing, not just a verbal debrief.',
          'PracticeGuard\'s Compliance Audit is a flat $1,997 one-time fee for exactly this — no recurring charges, no surprise add-ons.',
        ],
      },
    ],
  },
  {
    slug: 'cyber-insurance-requirements-dental-practices-tennessee',
    title: 'Cyber Insurance for Dental Practices: What Tennessee Insurers Now Require',
    metaDescription: 'Cyber insurance carriers are tightening requirements for dental and medical practices in Tennessee. Here\'s what they now ask for before issuing or renewing a policy.',
    date: '2026-05-10',
    readTime: '5 min read',
    excerpt: 'Getting — or keeping — a cyber insurance policy now requires proof of specific security controls. Here\'s what carriers are checking for before they\'ll cover a dental or medical practice.',
    body: [
      {
        heading: 'Why carriers tightened the rules',
        paragraphs: [
          'After a wave of ransomware payouts tied to healthcare practices — including incidents that hit hundreds of dental offices at once through shared software vendors — cyber insurance carriers stopped taking practices\' word for it. Most now require documented proof of specific controls before issuing or renewing a policy, and they\'ll deny a claim if those controls weren\'t actually in place at the time of the breach.',
        ],
      },
      {
        heading: 'What carriers are asking for',
        paragraphs: [
          'Common requirements include MFA on all systems accessing patient data, encrypted backups tested for recovery, a written and tested incident response plan, documented staff security training, and evidence of regular vulnerability scanning. Some carriers now require an annual penetration test as well.',
          'If you can\'t produce documentation for these items during the application or renewal process, expect a higher premium, a denied application, or a policy with exclusions that make it far less useful when you actually need it.',
        ],
      },
      {
        heading: 'How to get ready',
        paragraphs: [
          'The practices that get approved fastest and at the best rates are the ones who walk into the application with their evidence package already assembled — scan reports, training records, the incident response plan, MFA proof — rather than scrambling to produce it under deadline.',
          'This is exactly what our cyber insurance readiness service is built for: getting your documentation and controls in order before you apply or renew, so the process is fast and the coverage actually holds up if you ever need to file a claim.',
        ],
      },
    ],
  },
  {
    slug: '2026-hipaa-security-rule-what-changed',
    title: 'The 2026 HIPAA Security Rule: What Changed and What Your Practice Must Do',
    metaDescription: 'A plain-language breakdown of what changed in the 2026 HIPAA Security Rule update and the specific actions dental and medical practices need to take.',
    date: '2026-04-22',
    readTime: '7 min read',
    excerpt: 'The biggest HIPAA Security Rule update since 2003 is here. Here\'s what actually changed and the concrete steps practices need to take to stay compliant.',
    body: [
      {
        heading: 'The headline change: "addressable" is gone',
        paragraphs: [
          'Under the old rule, many security controls were labeled "addressable," meaning a practice could choose not to implement them as long as it documented a reasonable alternative or justification. The 2026 update removes that flexibility for most core controls — they\'re now required, full stop, with very narrow exceptions.',
        ],
      },
      {
        heading: 'The six requirements practices are asking about most',
        paragraphs: [
          'Multi-factor authentication is now required on every system that touches patient data, not just recommended. Encryption is required both for stored data and data in transit, with very limited exceptions. Vulnerability scanning must happen quarterly, and penetration testing annually. A written, tested incident response plan is mandatory, not optional documentation. And every practice needs a current inventory of every device and system that touches PHI.',
        ],
      },
      {
        heading: 'What happens if you don\'t comply',
        paragraphs: [
          'Non-compliance exposure comes from two directions: OCR enforcement (fines that, for small practices, have historically ranged from roughly $10,000 to $80,000 depending on severity and circumstances) and the much higher cost of an actual breach — incident response, patient notification, potential lawsuits, and reputational damage that can be fatal to a small practice.',
        ],
      },
      {
        heading: 'A realistic path to compliance',
        paragraphs: [
          'Most practices don\'t need to build an internal security team. They need a clear-eyed assessment of where they stand today, a prioritized plan for closing the gaps, and either the in-house discipline or an outside partner to keep it maintained as requirements keep evolving.',
          'If you haven\'t had a formal assessment against the 2026 rule yet, that\'s the place to start — and it\'s free to find out where you stand.',
        ],
      },
    ],
  },
]

export function getPostBySlug(slug: string) {
  return POSTS.find(p => p.slug === slug)
}
