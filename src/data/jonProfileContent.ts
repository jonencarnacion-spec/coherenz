// Content for Jon's Profile page (/about/jon), sourced from "jon's profile
// page flow.docx" (assets/jon's profile page/) for structure/section copy,
// and Jon's own resume ("Jon Encarnacion - Head of Delivery - Resume
// 2026.pdf", same folder) for every factual career detail below -- company
// names, dates, titles, and figures are all pulled directly from that
// resume, not invented.
//
// The "What They Say About Jon's Leadership" section (7-value framework,
// per the flow doc) is intentionally NOT populated with real testimonial
// text here. The doc's source material is a farewell card from Jon's former
// Energin team -- personal, spontaneous messages written for him privately,
// not testimonials solicited for public marketing use, several including
// casual/vulnerable personal content. Publishing real (nick)names and quotes
// from that material on a commercial site is a consent question, not a
// content-drafting one -- see jon.astro's section comment for the flagged
// placeholder and what's needed before real quotes go in.

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
// instruction -- five roles chosen to cover its four suggested categories
// (Product & Delivery Leadership, Enterprise Technology, Telecommunications,
// Consulting) plus Coherenz itself. Every figure and fact below is from the
// resume verbatim or a close paraphrase of it.
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
    category: 'Enterprise Technology',
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
    category: 'Consulting',
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

// Leadership-values framework from the flow doc, structure only -- see the
// file header and jon.astro's section comment for why real testimonial
// quotes/names aren't populated here yet.
export interface LeadershipValue {
  number: string;
  name: string;
  characteristic: string;
}

export const leadershipValues: LeadershipValue[] = [
  { number: '01', name: 'Integrity', characteristic: "Does the right thing, even when it's difficult." },
  { number: '02', name: 'Trust', characteristic: 'Believes in people before they believe in themselves.' },
  { number: '03', name: 'Excellence', characteristic: 'Sets a high standard and leads by example.' },
  { number: '04', name: 'Empathy', characteristic: 'Leads with both strength and humanity.' },
  { number: '05', name: 'Clarity', characteristic: 'Brings direction when things become complicated.' },
  { number: '06', name: 'Growth', characteristic: 'Helps people discover what they are capable of.' },
  { number: '07', name: 'Commitment', characteristic: 'Stays with the team when things get difficult.' },
];
