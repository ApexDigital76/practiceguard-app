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
