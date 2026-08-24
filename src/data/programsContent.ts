// Content for the Programs page, sourced verbatim from
// "Coherenz Programs Page - Content Flow.docx" (assets/programs page/).
// This is real, approved copy -- not drafted here -- ported into a typed
// data shape the same way servicesContent.ts holds the Services page's
// content. Deliberately a separate file/export from servicesContent.ts's
// lighter-weight `programs` array (used by the Services page's teaser
// section, a different shape for a different card design) rather than
// extending that one, so neither page's data model has to compromise for
// the other's needs.
//
// Each program's CTA links to a dedicated detail page
// (`/programs/[slug]`) that doesn't exist yet -- same forward-linking
// pattern already used for `/services/[slug]` elsewhere in this rebuild.
// Building those detail pages is separate follow-up work.

export interface ProgramDefinition {
  slug: string;
  number: string;
  category: string;
  name: string;
  promise: string;
  description: string;
  bestForQuestion: string;
  gains: string[];
  ctaText: string;
}

export const programs: ProgramDefinition[] = [
  {
    slug: 'product-delivery-economics-assessment',
    number: '01',
    category: 'Diagnostic',
    name: 'Product Delivery Economics Assessment',
    promise: 'Find where value and capacity are leaking.',
    description:
      'A focused assessment of how work moves through your product delivery system—and where time, capacity, quality, and coordination are consuming more investment than they should.',
    bestForQuestion: "We're busy, but are we getting enough value from the capacity we have?",
    gains: [
      'A clearer view of value and capacity leakage',
      'Visibility into the constraints affecting delivery',
      'Prioritized opportunities for improvement',
      'An evidence-based starting point for action',
    ],
    ctaText: 'Explore the Assessment',
  },
  {
    slug: '6-week-delivery-stabilization',
    number: '02',
    category: 'Stabilization',
    name: '6-Week Delivery Stabilization Program',
    promise: 'Restore control. Create focus. Build momentum.',
    description:
      'A focused intervention for product organizations whose delivery system is struggling under the pressure of too much work, unclear priorities, dependencies, and growing operational friction.',
    bestForQuestion: 'Our teams are working hard. Why does delivery still feel out of control?',
    gains: [
      'Greater visibility into what is slowing delivery',
      'Clearer priorities and delivery focus',
      'Practical interventions to stabilize the system',
      'A stronger foundation for sustainable improvement',
    ],
    ctaText: 'Explore the 6-Week Program',
  },
  {
    slug: 'product-operating-model-design',
    number: '03',
    category: 'Operating Model',
    name: 'Product Operating Model Design',
    promise: 'Design the system your organization has grown into.',
    description:
      'As organizations scale, informal ways of working eventually stop providing the clarity and coordination the business needs. This engagement helps define how product decisions, teams, responsibilities, and governance should work together.',
    bestForQuestion: 'Have we outgrown the way we currently work?',
    gains: [
      'Greater clarity around product and delivery responsibilities',
      'Defined decision rights and governance',
      'A more intentional operating rhythm',
      'A practical model aligned with organizational context',
    ],
    ctaText: 'Explore Operating Model Design',
  },
  {
    slug: 'executive-product-economics-workshop',
    number: '04',
    category: 'Executive Workshop',
    name: 'Executive Product Economics Workshop',
    promise: 'Align leadership around the economics of product decisions.',
    description:
      'A focused workshop for leaders who need a common language for discussing product investment, prioritization, capacity, and the economic consequences of delay and trade-offs.',
    bestForQuestion: 'Are we making product investment decisions with enough economic clarity?',
    gains: [
      'A shared understanding of Product Delivery Economics™',
      'Greater visibility into product and delivery trade-offs',
      'Practical approaches to prioritization and investment decisions',
      'Alignment around opportunities for improvement',
    ],
    ctaText: 'Explore the Workshop',
  },
];

export interface ProgramMatch {
  need: string;
  programSlug: string;
}

export const programMatches: ProgramMatch[] = [
  { need: "We need to understand what's really happening.", programSlug: 'product-delivery-economics-assessment' },
  { need: 'We need to stabilize a struggling delivery environment.', programSlug: '6-week-delivery-stabilization' },
  { need: 'We need to redesign how our product organization operates.', programSlug: 'product-operating-model-design' },
  {
    need: 'We need leadership alignment around better investment decisions.',
    programSlug: 'executive-product-economics-workshop',
  },
];

export interface ProgramWorksStep {
  number: string;
  name: string;
  description: string;
}

export const programWorksSteps: ProgramWorksStep[] = [
  { number: '01', name: 'Understand the Context', description: 'We begin with the specific challenge your organization is facing.' },
  { number: '02', name: 'Focus the Intervention', description: 'We concentrate effort on the decisions and constraints that matter most.' },
  {
    number: '03',
    name: 'Create Practical Momentum',
    description: 'The engagement produces clear insight, decisions, and actions—not just a report.',
  },
  {
    number: '04',
    name: 'Define What Happens Next',
    description: 'We leave you with a clearer path for sustaining or extending the improvement.',
  },
];
