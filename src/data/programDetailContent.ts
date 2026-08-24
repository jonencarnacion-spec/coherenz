// Content for the per-program detail pages (`/programs/[slug]`), sourced
// from "Program Detail Pages.docx" (assets/programs page/) -- the
// developer handover spec for these pages, including the AI-Assisted
// positioning. Section headings, hero copy, AI section copy, "what we
// focus on" dimensions, and per-program "how it works" steps below are
// ported verbatim from that doc's PROGRAM 01-04 sections.
//
// A few things the doc explicitly leaves per-program-shared rather than
// bespoke (see its "3. Shared Page Structure" -- Does This Sound
// Familiar?, What You Leave With, Is This the Right Starting Point?,
// Final CTA) are NOT duplicated here: they're built on the detail page
// itself from the existing `programs` array in programsContent.ts
// (bestForQuestion, gains) plus new page-chrome copy, the same way
// services/[slug].astro already draws its own back-link/cross-sell
// framing rather than expecting bespoke content for every service.
//
// Primary CTA button labels for programs 2-4, and the Final CTA
// eyebrow/headline pairs for all four programs, are not given verbatim in
// the doc (only program 1's hero CTA -- "Talk About an Assessment" -- is
// spelled out as an example). These are drafted here following that
// doc's own naming pattern, and the Final CTA copy follows the same
// per-page-distinct-headline precedent already set by services/[slug].astro.
// Treat both as first-pass draft text pending Jon's review, not final.

// Same four brand hues already assigned to these exact four programs, in
// this exact order, by the /programs overview page (programAccents in
// programs.astro) -- exported here so the detail-page template can keep
// each program's accent color consistent between the two pages without
// duplicating the ordering.
export const programAccentKeys = ['orange', 'blue', 'green', 'navy'] as const;
export type ProgramAccentKey = (typeof programAccentKeys)[number];

export type AIVisibility = 'high' | 'selective' | 'medium';

export interface AICapability {
  title: string;
  description: string;
  icon:
    | 'topology'
    | 'stack'
    | 'affiliate'
    | 'bulb'
    | 'chart-dots'
    | 'messages'
    | 'refresh'
    | 'git-compare'
    | 'search'
    | 'sitemap'
    | 'scale';
}

export interface AISection {
  // 'full' = standalone section (Assessment, Stabilization, Workshop).
  // 'callout' = smaller highlighted block inside "How the Engagement
  // Works" rather than its own section (Operating Model Design only,
  // per the doc's explicit instruction not to make AI a major selling
  // point on that page).
  variant: 'full' | 'callout';
  visibility: AIVisibility;
  eyebrow: string;
  headline?: string;
  description: string;
  capabilities: AICapability[];
  closingStatement: string;
}

export interface ProgramDimension {
  label: string;
  description: string;
}

export interface ProgramFocus {
  eyebrow: string;
  headline: string;
  intro?: string;
  dimensions: ProgramDimension[];
}

export interface ProgramStep {
  number: string;
  name: string;
  description?: string;
}

export interface ProgramHowItWorks {
  heading: string;
  subheadline: string;
  steps: ProgramStep[];
}

export interface ProgramDetailContent {
  slug: string;
  heroEyebrow: string;
  heroH1: string;
  heroSupporting: string[];
  aiSupportingLine?: string;
  primaryCtaText: string;
  aiSection?: AISection;
  focus: ProgramFocus;
  howItWorks?: ProgramHowItWorks;
  finalCta: {
    eyebrow: string;
    headline: string;
  };
}

export const programDetails: ProgramDetailContent[] = [
  {
    slug: 'product-delivery-economics-assessment',
    heroEyebrow: 'Assessment',
    heroH1: 'Find where value and capacity are leaking.',
    heroSupporting: [
      "When delivery is busy but the results don't seem to match the effort, the problem isn't always obvious.",
      'The Product Delivery Economics Assessment helps reveal where investment, capacity, flow, quality, and coordination are disconnecting—and where improvement could create the greatest impact.',
    ],
    aiSupportingLine: 'AI-assisted analysis can help accelerate the journey from fragmented information to clearer insight.',
    primaryCtaText: 'Talk About an Assessment',
    aiSection: {
      variant: 'full',
      visibility: 'high',
      eyebrow: 'AI-Assisted Acceleration',
      headline: 'See patterns faster. Focus human expertise where it matters most.',
      description:
        'Product delivery environments can generate large amounts of information—from delivery metrics and work data to stakeholder perspectives and operational observations. Where appropriate, Coherenz can use AI-assisted analysis to help accelerate:',
      capabilities: [
        {
          title: 'Pattern Identification',
          description: 'Identify recurring themes, constraints, and potential sources of friction across available information.',
          icon: 'topology',
        },
        {
          title: 'Information Synthesis',
          description: 'Accelerate the synthesis of complex delivery data, observations, and stakeholder input.',
          icon: 'stack',
        },
        {
          title: 'Connection Mapping',
          description: 'Help reveal relationships between priorities, capacity, dependencies, quality, and delivery outcomes.',
          icon: 'affiliate',
        },
        {
          title: 'Hypothesis Exploration',
          description: 'Support faster exploration of potential causes and areas for deeper investigation.',
          icon: 'bulb',
        },
      ],
      closingStatement: 'AI can accelerate insight. Human judgment determines what the evidence means and what should happen next.',
    },
    focus: {
      eyebrow: 'What We Look At',
      headline: 'We look beneath the visible symptoms.',
      intro: 'The assessment examines the system across five connected dimensions:',
      dimensions: [
        { label: 'Value', description: 'Are we building the right things?' },
        { label: 'Flow', description: 'How efficiently does work move?' },
        { label: 'Capacity', description: 'Where is delivery capacity actually going?' },
        { label: 'Quality', description: 'How much effort is consumed by defects and rework?' },
        { label: 'Coordination', description: 'How much capacity is lost to dependencies and friction?' },
      ],
    },
    howItWorks: {
      heading: 'How It Works',
      subheadline: 'Understand → Quantify → Focus',
      steps: [
        { number: '01', name: 'Understand the System', description: 'Build a picture of the current delivery environment and its challenges.' },
        { number: '02', name: 'Identify the Constraints', description: 'Find where capacity, flow, quality, or coordination is affecting performance.' },
        { number: '03', name: 'Quantify the Impact', description: 'Make key trade-offs and sources of economic leakage more visible.' },
        { number: '04', name: 'Focus the Next Move', description: 'Identify and prioritize the opportunities with the greatest potential impact.' },
      ],
    },
    finalCta: {
      eyebrow: 'Find the Leakage',
      headline: 'See Where Your Delivery Economics Are Breaking Down.',
    },
  },
  {
    slug: '6-week-delivery-stabilization',
    heroEyebrow: 'Stabilization Program',
    heroH1: 'Restore control. Create focus. Build momentum.',
    heroSupporting: [
      "When delivery becomes overloaded and unpredictable, the first priority isn't optimization.",
      "It's stabilization.",
      'This six-week program helps product organizations regain visibility, reduce unnecessary friction, and establish the conditions for more deliberate and predictable delivery.',
    ],
    aiSupportingLine:
      'AI-assisted analysis can help accelerate the identification of patterns and constraints—creating more time for focused intervention.',
    primaryCtaText: 'Talk About Stabilization',
    aiSection: {
      variant: 'full',
      visibility: 'high',
      eyebrow: 'AI-Assisted Acceleration',
      headline: 'Move from operational noise to clearer patterns faster.',
      description:
        'During a stabilization effort, organizations often have more information than they can effectively process—and less time than they need. Where appropriate, Coherenz can use AI-assisted methods to accelerate:',
      capabilities: [
        {
          title: 'Work and Flow Analysis',
          description: 'Support analysis of available work and delivery information to identify potential congestion and patterns.',
          icon: 'chart-dots',
        },
        {
          title: 'Theme and Friction Synthesis',
          description: 'Accelerate the synthesis of recurring issues from team feedback, observations, and working sessions.',
          icon: 'messages',
        },
        {
          title: 'Dependency Visibility',
          description: 'Help surface recurring coordination patterns and potential dependency risks.',
          icon: 'affiliate',
        },
        {
          title: 'Intervention Learning',
          description: 'Support faster capture and synthesis of what is changing, what is improving, and what requires further attention.',
          icon: 'refresh',
        },
      ],
      closingStatement:
        'The purpose is not to automate stabilization. It is to shorten the distance between what is happening and what the organization needs to understand.',
    },
    focus: {
      eyebrow: 'What We Focus On',
      headline: 'Stabilize the environment before trying to optimize it.',
      dimensions: [
        { label: 'Focus', description: 'Reduce competing priorities and unnecessary work.' },
        { label: 'Flow', description: 'Identify where work is getting stuck.' },
        { label: 'Capacity', description: 'Understand where effort is actually being consumed.' },
        { label: 'Coordination', description: 'Reduce avoidable dependency and communication friction.' },
        { label: 'Quality', description: 'Address the sources of disruption and rework.' },
      ],
    },
    howItWorks: {
      heading: 'The 6-Week Journey',
      subheadline: 'From chaos to greater control.',
      steps: [
        { number: 'Weeks 1–2', name: 'Understand & Stabilize', description: 'Create visibility into priorities, pressures, work, and constraints.' },
        { number: 'Weeks 3–4', name: 'Focus & Intervene', description: 'Address the highest-impact sources of friction and disruption.' },
        { number: 'Weeks 5–6', name: 'Embed & Move Forward', description: 'Strengthen the new working discipline and establish the next priorities.' },
      ],
    },
    finalCta: {
      eyebrow: 'Restore Control',
      headline: 'Stabilize Delivery Before It Costs You More.',
    },
  },
  {
    slug: 'product-operating-model-design',
    heroEyebrow: 'Operating Model Design',
    heroH1: 'Design the system your organization has grown into.',
    heroSupporting: [
      'What worked when the organization was smaller may no longer provide the clarity and coordination needed today.',
      'This engagement helps define how product and delivery decisions, responsibilities, teams, and governance should work together as the organization grows.',
    ],
    primaryCtaText: 'Talk About Operating Model Design',
    aiSection: {
      variant: 'callout',
      visibility: 'selective',
      eyebrow: 'AI-Assisted Analysis',
      description:
        'Where useful, AI-assisted synthesis can help identify recurring themes across stakeholder input, working sessions, existing documentation, and operating practices. This can help accelerate the understanding of the current state—but the future operating model is designed through context, collaboration, and leadership alignment.',
      capabilities: [],
      closingStatement: 'AI can accelerate understanding. Organizations still need to make the decisions.',
    },
    focus: {
      eyebrow: 'What We Help Design',
      headline: 'An operating model is more than an org chart.',
      dimensions: [
        { label: 'Decisions', description: 'Who decides what?' },
        { label: 'Accountability', description: 'Who owns what?' },
        { label: 'Teams', description: 'How do teams and capabilities work together?' },
        { label: 'Governance', description: 'What mechanisms support better decisions?' },
        { label: 'Rhythms', description: 'How does the organization plan, review, and adapt?' },
      ],
    },
    howItWorks: {
      heading: 'How the Engagement Works',
      subheadline: 'Understand → Design → Align → Transition',
      steps: [
        { number: '01', name: 'Understand the current reality' },
        { number: '02', name: 'Design the future model' },
        { number: '03', name: 'Create alignment' },
        { number: '04', name: 'Plan the transition' },
      ],
    },
    finalCta: {
      eyebrow: 'Design With Intention',
      headline: 'Build the Operating Model Your Organization Needs Next.',
    },
  },
  {
    slug: 'executive-product-economics-workshop',
    heroEyebrow: 'Executive Workshop',
    heroH1: 'Make the economics behind product decisions visible.',
    heroSupporting: [
      "Every product organization makes investment decisions. But leadership teams don't always have a shared way of evaluating the value, capacity, and trade-offs behind those decisions.",
      'This workshop introduces a practical Product Delivery Economics™ lens for making those conversations more rigorous.',
    ],
    aiSupportingLine: 'Where appropriate, AI-assisted scenario exploration can help make complex trade-offs easier to examine together.',
    primaryCtaText: 'Talk About the Workshop',
    aiSection: {
      variant: 'full',
      visibility: 'medium',
      eyebrow: 'AI-Assisted Exploration',
      headline: 'Explore the trade-offs behind the decision.',
      description:
        'Complex product decisions often involve multiple variables, competing priorities, and incomplete information. Where appropriate, AI-assisted methods can support workshop discussions by helping teams:',
      capabilities: [
        { title: 'Compare Scenarios', description: 'Explore different prioritization or investment options.', icon: 'git-compare' },
        { title: 'Surface Assumptions', description: 'Identify assumptions that may be influencing decisions.', icon: 'search' },
        { title: 'Structure Complex Discussions', description: 'Synthesize multiple perspectives and competing viewpoints.', icon: 'sitemap' },
        { title: 'Explore Trade-offs', description: 'Make the implications of different choices easier to discuss.', icon: 'scale' },
      ],
      closingStatement: 'AI can expand the conversation. Leadership remains responsible for the decision.',
    },
    focus: {
      eyebrow: 'What We Explore',
      headline: 'A shared lens for product investment decisions.',
      dimensions: [
        { label: 'Value', description: 'What could this investment create?' },
        { label: 'Capacity', description: 'What are we committing to make it happen?' },
        { label: 'Flow', description: 'How efficiently does investment become delivery?' },
        { label: 'Trade-offs', description: 'What are we giving up when we choose one option over another?' },
        { label: 'Outcomes', description: 'Did the investment create the value we expected?' },
      ],
    },
    finalCta: {
      eyebrow: 'Align Leadership',
      headline: 'Give Your Leadership Team a Shared Economic Lens.',
    },
  },
];
