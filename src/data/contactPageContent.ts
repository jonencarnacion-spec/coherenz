// Content for the "Talk to Coherenz" page (/contact), built from "talk to
// coherenz page flow.docx" (assets/talk to coherenz page/) -- section
// order, copy, and form fields below follow that doc directly. Two
// deliberate deviations from the doc:
// - The doc suggests URL /talk-to-coherenz. Every "Start a conversation"
//   CTA already live on the site (FinalCta.astro's default ctaHref, and
//   every page that calls it) already points at /contact, so this page is
//   built at that existing route instead of introducing a second one.
// - The doc's Section 06 ("You'll be talking directly with Jon") replaces
//   this page's closing CTA rather than sitting above the usual sitewide
//   FinalCta band -- a "start a conversation" CTA linking to /contact from
//   the /contact page itself would be circular.

export interface ProblemCard {
  id: string;
  headline: string;
  description: string;
}

// Section 02 -- "You might be here because...". Multi-select, not required
// to proceed (per the doc's own "Important" note).
export const problemCards: ProblemCard[] = [
  {
    id: 'value-gap',
    headline: "We're delivering a lot, but not seeing enough value.",
    description:
      'Teams are busy and work is being completed, but it is increasingly difficult to connect delivery activity with meaningful business outcomes.',
  },
  {
    id: 'growing-complexity',
    headline: 'Our teams are growing, but delivery is becoming slower and more complex.',
    description: "Adding people, teams, or processes hasn't necessarily made the organization more effective.",
  },
  {
    id: 'investment-priorities',
    headline: "We're struggling to decide what deserves investment.",
    description: 'Priorities compete for attention, and it is becoming harder to make clear product and investment decisions.',
  },
  {
    id: 'coordination-overhead',
    headline: 'Too much coordination is getting in the way of delivery.',
    description: 'Dependencies, handoffs, meetings, and alignment efforts are consuming increasing amounts of team capacity.',
  },
  {
    id: 'operating-model-fit',
    headline: "Our operating model no longer fits the organization we've become.",
    description: 'The structures and ways of working that once worked are beginning to create friction as the organization evolves.',
  },
  {
    id: 'unclear-starting-point',
    headline: "We know something isn't working, but we're not sure where to start.",
    description: "The symptoms are visible, but the underlying problem isn't yet clear.",
  },
];

export interface ProcessStep {
  number: string;
  name: string;
  headline: string;
  description: string;
}

// Section 03 -- "What happens when we talk?"
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    name: 'Understand',
    headline: 'Understand the Situation',
    description:
      "We'll start with the context. What is happening in the organization? What has changed? Where are teams and leaders experiencing friction?",
  },
  {
    number: '02',
    name: 'Explore',
    headline: 'Explore the Underlying Problem',
    description:
      "We'll look beyond the visible symptoms. The goal is not to immediately prescribe a solution, but to begin understanding where complexity, waste, misalignment, or economic leakage may be occurring.",
  },
  {
    number: '03',
    name: 'Determine',
    headline: 'Determine the Right Next Step',
    description:
      "If there is a meaningful fit, we'll identify the most appropriate way forward. This could involve an assessment, a focused stabilization program, operating model work, a leadership workshop, or another approach appropriate to the situation.",
  },
];

// Section 04 -- form field options.
export const topicOptions: string[] = [
  'Product delivery challenges',
  'Scaling teams or operations',
  'Product prioritization and investment',
  'Delivery stabilization',
  'Product operating model design',
  'Leadership or executive workshop',
  'AI-assisted product and delivery practices',
  'Something else',
];

export const roleSuggestions: string[] = [
  'Founder / CEO',
  'Product Leader',
  'Technology Leader',
  'Delivery Leader',
  'Operations Leader',
  'Other',
];

export const MESSAGE_MAX_LENGTH = 2000;
