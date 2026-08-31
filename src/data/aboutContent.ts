// Content for the About page, sourced verbatim from "about page flow.docx"
// (assets/about page/). This is real, approved copy -- not drafted here --
// ported into a typed data shape the same way programsContent.ts holds the
// Programs page's content. Icon assignments (in about.astro) are the only
// addition not literally specified by the doc, chosen from DESIGN.md's
// icon concept-category table.

export interface CoherenzShift {
  number: string;
  from: string;
  to: string;
  description: string;
}

export const coherenzShifts: CoherenzShift[] = [
  {
    number: '01',
    from: 'Activity',
    to: 'Outcomes',
    description:
      'Being busy is not the same as creating value. Coherenz helps leaders see whether that work is actually producing meaningful outcomes.',
  },
  {
    number: '02',
    from: 'Delivery Management',
    to: 'Delivery Economics',
    description:
      'Every delay, dependency, and coordination burden has an economic consequence—delivery should be managed with visibility into that cost.',
  },
  {
    number: '03',
    from: 'Fixing Symptoms',
    to: 'Redesigning Systems',
    description:
      'Adding people, processes, or meetings can relieve pressure temporarily. Lasting improvement means understanding the system itself.',
  },
];

export interface ExperienceArea {
  name: string;
  description: string;
}

export const experienceAreas: ExperienceArea[] = [
  {
    name: 'Product & Delivery Leadership',
    description: 'Leading and improving product and delivery systems as organizations scale.',
  },
  {
    name: 'Enterprise Platforms & Technology',
    description: 'Working within complex technology landscapes where dependencies and coordination matter.',
  },
  {
    name: 'Telecommunications & Energy',
    description: 'Operating in large, highly interconnected environments with significant business and operational complexity.',
  },
  {
    name: 'SaaS & Digital Products',
    description: 'Understanding the realities of balancing speed, product investment, quality, and sustainable growth.',
  },
  {
    name: 'Transformation & Operating Models',
    description: 'Helping organizations rethink how teams, decisions, and delivery systems are designed.',
  },
];

export interface WorkPrinciple {
  number: string;
  name: string;
  description: string;
}

export const howWeWork: WorkPrinciple[] = [
  {
    number: '01',
    name: 'Systems Thinking',
    description: 'Looking beyond isolated problems to understand the relationships between value, flow, capacity, quality, and coordination.',
  },
  {
    number: '02',
    name: 'Economic Rigor',
    description: 'Connecting delivery and organizational decisions to their real impact on investment, cost, speed, and outcomes.',
  },
  {
    number: '03',
    name: 'Practical Intervention',
    description: "Focusing on improvements that leaders and teams can actually implement—not theoretical transformation models disconnected from day-to-day reality.",
  },
  {
    number: '04',
    name: 'AI-Assisted Analysis',
    description:
      'Using AI-assisted tools and methods where appropriate to accelerate research, synthesis, analysis, pattern identification, and decision support—while keeping human judgment and leadership at the center.',
  },
];

export const promisePoints: string[] = [
  'Where value is being created—and where it is being lost.',
  'What is slowing the flow of meaningful work.',
  'How capacity is really being consumed.',
  'Which decisions will have the greatest impact.',
  'What needs to change to create a stronger, more sustainable system.',
];

export const beliefChain: string[] = [
  'Investment choices affect capacity.',
  'Capacity affects flow.',
  'Flow affects quality.',
  'Quality affects customer outcomes.',
  'Coordination affects the cost and speed of everything.',
];
