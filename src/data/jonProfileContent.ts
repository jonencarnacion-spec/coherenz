// Content for Jon's Profile page (/about/jon), sourced from "jon's profile
// page flow.docx" (assets/jon's profile page/) for structure/section copy,
// and Jon's own resume ("Jon Encarnacion - Head of Delivery - Resume
// 2026.pdf", same folder) for every factual career detail below -- company
// names, dates, titles, and figures are all pulled directly from that
// resume, not invented.
//
// The "What They Say About Jon's Leadership" section (7-value framework,
// per the flow doc) is populated with real testimonial excerpts below,
// pulled from a farewell letter written by Jon's former team
// (Farewell_Letter_Jon_Complete.docx, assets/jon's profile page/) with
// Jon's confirmation that consent was given to use them publicly. Each
// quote is trimmed to its most impactful sentence(s) (~20-30 words) and
// tagged to whichever of the 7 values it best fits -- former company name
// and internal project/place names have been removed or generalized
// throughout, per Jon's instruction to keep this about his leadership
// impact rather than any one employer.

// Four practitioner lenses, shown as a compact expertise-tag row in the
// hero (BCG-style) rather than the flow doc's original 4-card "What Jon
// Brings" section -- name is the only field the page still renders;
// promise/description kept here as the source reasoning for each tag in
// case the fuller card treatment comes back later.
export interface CapabilityLens {
  number: string;
  name: string;
  promise: string;
  description: string;
}

export const capabilityLenses: CapabilityLens[] = [
  {
    number: '01',
    name: 'Product Strategy',
    promise: 'Connect investment to outcomes.',
    description:
      'Helps leaders understand what deserves investment, how priorities should be shaped, and how product decisions connect to business outcomes.',
  },
  {
    number: '02',
    name: 'Delivery Economics',
    promise: 'Make the economics of delivery visible.',
    description:
      'Looks at capacity, flow, delay, quality, coordination, and opportunity cost to understand where delivery effort creates—or loses—economic value.',
  },
  {
    number: '03',
    name: 'Operating Models',
    promise: 'Design organizations for better decisions and flow.',
    description:
      'Examines structures, roles, accountability, decision-making, and ways of working to create a stronger product operating system.',
  },
  {
    number: '04',
    name: 'Delivery Stabilization',
    promise: 'Restore clarity, focus, and momentum.',
    description:
      'Helps organizations identify the sources of delivery instability and establish the conditions required for more predictable and sustainable execution.',
  },
];

export interface ExperienceEntry {
  category: string;
  role: string;
  org: string;
  dates: string;
  description: string;
}

// Selected career experience, not the full résumé, per the flow doc's own
// instruction -- five roles spanning Product & Delivery Leadership,
// Telecommunications, and Enterprise Technology. Every figure and fact
// below is from the resume verbatim or a close paraphrase of it.
export const experienceEntries: ExperienceEntry[] = [
  {
    category: 'Product & Delivery Leadership',
    role: 'Founding Principal',
    org: 'Coherenz Consulting',
    dates: '2024 — Present',
    description:
      'Founded an independent delivery and transformation practice, partnering with technology and business leaders to redesign operating models and delivery systems, and embedding AI-assisted workflows into delivery and operations.',
  },
  {
    category: 'Product & Delivery Leadership',
    role: 'Head of Product Delivery',
    org: 'Energin IT Labs',
    dates: '2022 — 2025',
    description:
      'Directed end-to-end product delivery across BA, Scrum, QA, UX/UI, and Engineering. Boosted release predictability to 90–100% and cut operational overhead by 75% through process automation and AI integration.',
  },
  {
    category: 'Telecommunications',
    role: 'Program Manager / Delivery Lead',
    org: 'Amdocs Philippines',
    dates: '2019 — 2021',
    description:
      'Directed the migration of 1,500+ service assets from legacy Nokia platforms to Huawei in a Tier-1 telecom environment, ensuring zero interruption to live subscriber services.',
  },
  {
    category: 'Telecommunications',
    role: 'Business Project Manager / Product & Delivery Lead',
    org: 'Globe Telecom',
    dates: '2015 — 2017',
    description:
      'Directed multi-million dollar technology programs ($120K–$2.2M+) and spearheaded the end-to-end delivery of an enterprise omni-channel ecosystem connecting retail, web, mobile, and telesales.',
  },
  {
    category: 'Enterprise Technology',
    role: 'Sr. Project Manager / Agile Delivery Lead',
    org: 'Incuventure',
    dates: '2013 — 2015',
    description:
      'Directed the end-to-end Agile delivery of critical web-based platforms for major government agencies, including HDMF, GSIS, BIR, and CHED. Honored as Best Project Manager (2014).',
  },
];

export const questionsBehindTheWork: string[] = [
  'Are we investing in the right things?',
  'Why does delivery feel harder than it should?',
  'Where is capacity actually going?',
  'How much does coordination really cost us?',
  'Why are teams busy but outcomes still slow?',
  'What needs to change before adding more people or process?',
];

// Selected Thinking -- real, already-published Insight articles chosen to
// match the flow doc's four suggested topics as closely as the actual
// catalog allows (no fabricated article titles or slugs).
export const selectedThinkingSlugs: string[] = [
  'busy-doesnt-mean-valuable',
  'the-cost-of-doing-nothing-is-often-hidden',
  'speed-is-a-system-property',
  'your-delivery-problem-may-not-be-a-capacity-problem',
];

// Leadership-values framework from the flow doc, now populated with real
// excerpts from the farewell letter (see file header). Growth carries five
// quotes instead of two at Jon's request, weighted toward senior voices
// (Solution Architect, Development Team Lead, Sr. Full Stack Engineer).
export interface LeadershipTestimonial {
  value: string;
  quote: string;
  by: string;
}

export const leadershipTestimonials: LeadershipTestimonial[] = [
  {
    value: 'Integrity',
    quote:
      "You've always been honest and transparent with us, even in the hardest situations. You made decisions not just to finish the job, but to do what's right.",
    by: 'Joh, Sr. Business Analyst',
  },
  {
    value: 'Integrity',
    quote:
      "You showed us it's important to do the right thing even when no one is watching, even when it's hard, even when cutting corners would have been easy.",
    by: 'Reina, Scrum Master',
  },
  {
    value: 'Trust',
    quote:
      'I know you were the first person who believed in me. During our interview, I had so many lapses and flaws, but you still believed in me.',
    by: 'JV, Sr. Full Stack Engineer',
  },
  {
    value: 'Trust',
    quote:
      "You didn't just manage us — you believed in us, pushed us, and made us feel seen and valued. You always brought out the best in each of us.",
    by: 'Louisse, QA Lead',
  },
  {
    value: 'Excellence',
    quote:
      'Your leadership showed me that managing people effectively requires more than authority — self-discipline, drive, being strategic, and focusing on solutions rather than obstacles.',
    by: 'Cza, Sr. UX/UI Designer',
  },
  {
    value: 'Excellence',
    quote:
      'Among all the values, you personified excellent service. In the onslaught of change, you were there to lead and keep our spirits up.',
    by: 'Ethan, Full Stack Engineer',
  },
  {
    value: 'Empathy',
    quote:
      'You showed strong work ethic and strictness, but at the same time, empathy. I witnessed how deeply you cared for our team — how you constantly fought for us.',
    by: 'Reina, Scrum Master',
  },
  {
    value: 'Empathy',
    quote:
      'You always go the extra mile to ensure our team runs smoothly. You know when to be firm and when to show empathy — which inspires people to do their best.',
    by: 'Abby, Jr. QA Engineer',
  },
  {
    value: 'Clarity',
    quote:
      'He communicates with clarity, makes wise decisions, and takes responsibility for his actions. He is our rock and source of truth — the steady presence we turn to.',
    by: 'Archie, Mid Full Stack Engineer',
  },
  {
    value: 'Clarity',
    quote:
      "You were the guiding voice through the ups and downs of our process. It's clear how much you care and look out for everyone.",
    by: 'Zen, Jr. RPA Engineer',
  },
  {
    value: 'Growth',
    quote:
      'You always tell me na kaya ko, na marami akong kayang gawin. Thank you for the push, trust, at inspiration — you are a true mentor who pushed me to grow.',
    by: 'Mich, Business Analyst',
  },
  {
    value: 'Growth',
    quote:
      "You've made a big impact not only on my career, but also on how I see my own worth and growth in this industry.",
    by: 'Angel, QA Engineer',
  },
  {
    value: 'Growth',
    quote:
      "I know I've come far because of your guidance, and I will forever treasure it. You taught me a lot for my personal and career development.",
    by: 'Mirho, Solution Architect',
  },
  {
    value: 'Growth',
    quote:
      'Thank you so much for your guidance and wisdom. I have learned so much in such a short time — I just wish it had lasted longer.',
    by: 'Junix, Development Team Lead',
  },
  {
    value: 'Growth',
    quote: 'Thank you for showing great leadership and reminding me na may potential pa akong ma-unlock.',
    by: 'Irven, Sr. Full Stack Engineer',
  },
  {
    value: 'Commitment',
    quote:
      "You've stuck with us through every challenge, even on the hardest days. It's admirable, and I'm truly grateful. Hard core committed till the end — it's inspiring.",
    by: 'Vince, Sr. Full Stack & Automation Engineer',
  },
  {
    value: 'Commitment',
    quote:
      "You've always stood up for the team, and your unwavering effort kept our spirits high, even during the most challenging times.",
    by: 'Jessy, Jr. QA Engineer',
  },
];
