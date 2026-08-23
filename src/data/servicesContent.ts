// Content for the Services landing page, synthesized from three narrative
// drafts (services page narrative v1/v2/v3.docx). Structure follows v3's
// "diagnostic experience" interaction model -- each service is framed as
// the client's own question, with a set of specific lenses (pills) a
// visitor can expand in place before deciding to go deeper -- combined
// with v2's page-length discipline: no restating the same four questions
// a second time lower on the page, and no re-running the full seven-stage
// PDE-OS methodology here (that stays owned by the Approach page).
//
// The CTA on each service and program links out to a dedicated page
// (`/services/[slug]`, `/programs`) that doesn't exist yet -- same
// forward-linking pattern already used elsewhere in this rebuild
// (Nav's Insights/Contact links, FinalCta's Insights link).

export type PillIconName =
  | 'target'
  | 'list-numbers'
  | 'scale'
  | 'route'
  | 'coin'
  | 'hourglass'
  | 'gavel'
  | 'report-analytics'
  | 'adjustments-horizontal'
  | 'chart-line'
  | 'gauge'
  | 'stopwatch'
  | 'circle-check'
  | 'affiliate'
  | 'filter'
  | 'stethoscope'
  | 'trending-up'
  | 'link'
  | 'chart-bar'
  | 'shield-check'
  | 'refresh'
  | 'eye'
  | 'sitemap'
  | 'user-check'
  | 'users-group'
  | 'key'
  | 'briefcase'
  | 'user-star';

export interface ServicePill {
  title: string;
  description: string;
  icon: PillIconName;
}

export interface ServiceDefinition {
  slug: string;
  iconName: 'compass' | 'calculator' | 'shield-check' | 'hierarchy';
  name: string;
  question: string;
  description: string;
  pills: ServicePill[];
  closing: string;
  ctaText: string;
}

export const services: ServiceDefinition[] = [
  {
    slug: 'product-portfolio-strategy',
    iconName: 'compass',
    name: 'Product & Portfolio Strategy',
    question: 'Are you investing in the right things?',
    description:
      'Make better product investment decisions by connecting strategy, value, capacity and economic trade-offs.',
    pills: [
      {
        title: 'Product Strategy',
        description:
          'Define where the product should compete, what outcomes matter and which strategic choices should guide investment.',
        icon: 'target',
      },
      {
        title: 'Portfolio Prioritization',
        description: 'Determine which initiatives deserve scarce investment and delivery capacity.',
        icon: 'list-numbers',
      },
      {
        title: 'Value Assessment',
        description: 'Evaluate whether opportunities create sufficient customer, business or strategic value.',
        icon: 'scale',
      },
      {
        title: 'Roadmap & Sequencing',
        description: 'Sequence initiatives based on value, dependencies, urgency and realistic capacity.',
        icon: 'route',
      },
      {
        title: 'Investment Economics',
        description: 'Make the economic rationale behind product investment more visible.',
        icon: 'coin',
      },
      {
        title: 'Cost of Delay',
        description: "Understand what waiting really costs—and use urgency as an economic decision signal.",
        icon: 'hourglass',
      },
      {
        title: 'Product Governance',
        description: 'Create decision mechanisms that keep product investment aligned as priorities and conditions change.',
        icon: 'gavel',
      },
    ],
    closing: 'Better portfolios start with better decisions about where to invest.',
    ctaText: 'Explore the Strategy',
  },
  {
    slug: 'product-delivery-economics',
    iconName: 'calculator',
    name: 'Product Delivery Economics™',
    question: 'Are you getting enough value from your delivery capacity?',
    description:
      'Understand where delivery capacity is going, what is consuming it, and whether it is producing enough economic value.',
    pills: [
      {
        title: 'Delivery Economics Assessment',
        description: 'Understand the economic health of the delivery system across value, flow, capacity, quality and coordination.',
        icon: 'report-analytics',
      },
      {
        title: 'Prioritization Model',
        description: 'Create a practical way to compare competing work based on value, urgency, risk, effort and economic impact.',
        icon: 'adjustments-horizontal',
      },
      {
        title: 'Flow Analysis',
        description: 'Identify where work slows, waits or accumulates between commitment and outcome.',
        icon: 'chart-line',
      },
      {
        title: 'Capacity Analysis',
        description: 'Understand where delivery capacity is actually being consumed.',
        icon: 'gauge',
      },
      {
        title: 'Throughput & Cycle Time',
        description: 'Use delivery flow metrics to understand how quickly and consistently value moves through the system.',
        icon: 'stopwatch',
      },
      {
        title: 'Quality Economics',
        description: 'Make the capacity and economic impact of defects, remediation and rework visible.',
        icon: 'circle-check',
      },
      {
        title: 'Coordination Drag',
        description: 'Identify the delivery capacity lost through dependencies, handoffs and organizational friction.',
        icon: 'affiliate',
      },
      {
        title: 'WIP & Flow Control',
        description: 'Manage work-in-progress to reduce congestion and improve the movement of valuable work.',
        icon: 'filter',
      },
    ],
    closing: "The goal isn't to make teams busier. It's to make delivery capacity more valuable.",
    ctaText: 'Explore the Economics',
  },
  {
    slug: 'delivery-stabilization',
    iconName: 'shield-check',
    name: 'Delivery Stabilization',
    question: 'Is your delivery system struggling to keep up?',
    description:
      'Restore delivery predictability by identifying the constraints, bottlenecks and organizational friction slowing work down.',
    pills: [
      {
        title: 'Delivery Diagnostics',
        description: 'Establish a clear view of the health of the delivery system and identify the signals behind instability.',
        icon: 'stethoscope',
      },
      {
        title: 'Bottleneck Identification',
        description: 'Find the constraints that are limiting throughput and creating delivery delays.',
        icon: 'filter',
      },
      {
        title: 'Flow Improvement',
        description: 'Improve how work moves through the system by reducing waiting, congestion and unnecessary handoffs.',
        icon: 'trending-up',
      },
      {
        title: 'Dependency Management',
        description: 'Reduce delays caused by dependencies between teams, products and functions.',
        icon: 'link',
      },
      {
        title: 'Predictability',
        description: 'Improve confidence in delivery commitments by aligning demand, capacity and flow.',
        icon: 'chart-bar',
      },
      {
        title: 'Quality Guardrails',
        description: 'Reduce avoidable defects and rework that consume delivery capacity.',
        icon: 'shield-check',
      },
      {
        title: 'Operating Rhythm',
        description: 'Establish practical planning, review and decision rhythms that support consistent delivery.',
        icon: 'refresh',
      },
      {
        title: 'Leadership Visibility',
        description: 'Give leaders a clearer view of delivery health, constraints, risks and emerging issues.',
        icon: 'eye',
      },
    ],
    closing: "Predictability isn't created by adding pressure. It's created by improving the system.",
    ctaText: 'Explore Stabilization',
  },
  {
    slug: 'product-operating-model',
    iconName: 'hierarchy',
    name: 'Product Operating Model',
    question: 'Can your operating model support the scale ahead?',
    description:
      'Design the structures, decision rights and ways of working needed to scale product organizations without scaling unnecessary complexity.',
    pills: [
      {
        title: 'Operating Model Design',
        description: 'Define how product, technology, delivery and leadership should work together.',
        icon: 'sitemap',
      },
      {
        title: 'Roles & Accountability',
        description: 'Clarify ownership, responsibilities and decision boundaries.',
        icon: 'user-check',
      },
      {
        title: 'Team Topology',
        description: 'Design team structures and relationships around the way value actually needs to flow.',
        icon: 'users-group',
      },
      {
        title: 'Decision Rights',
        description: 'Make important product, investment and delivery decisions faster and clearer.',
        icon: 'key',
      },
      {
        title: 'Product Governance',
        description: 'Create governance that provides alignment and control without unnecessary bureaucracy.',
        icon: 'gavel',
      },
      {
        title: 'Portfolio Management',
        description: 'Connect strategic priorities, investment decisions and delivery capacity.',
        icon: 'briefcase',
      },
      {
        title: 'Product Metrics',
        description: 'Establish measures that connect activity and delivery performance to meaningful outcomes.',
        icon: 'report-analytics',
      },
      {
        title: 'Product Leadership',
        description: 'Strengthen the leadership mechanisms required to operate effectively at scale.',
        icon: 'user-star',
      },
    ],
    closing: "The goal isn't more structure. It's the right structure for the work.",
    ctaText: 'Explore the Operating Model',
  },
];

export interface SystemDimension {
  number: string;
  name: string;
  question: string;
}

export const systemDimensions: SystemDimension[] = [
  { number: '01', name: 'Value', question: 'Are we building the right things?' },
  { number: '02', name: 'Flow', question: 'How efficiently does work move?' },
  { number: '03', name: 'Capacity', question: 'Where is delivery capacity actually going?' },
  { number: '04', name: 'Quality', question: 'How much capacity is consumed by defects and rework?' },
  { number: '05', name: 'Coordination', question: 'How much effort is lost to dependencies and organizational friction?' },
];

export interface EngageStage {
  number: string;
  name: string;
  description: string;
}

// Compressed to three stages (per the v2 draft's explicit instruction not
// to run the full seven-stage PDE-OS methodology on this page -- that
// framework is already owned by the Approach page's Seven-Phase Wheel).
export const engageStages: EngageStage[] = [
  { number: '01', name: 'Understand', description: 'Establish what is happening, where constraints exist and what is driving them.' },
  { number: '02', name: 'Intervene', description: 'Focus effort on the few changes most likely to improve outcomes.' },
  { number: '03', name: 'Measure', description: 'Track whether the intervention is actually improving value, flow and delivery performance.' },
];

export interface ProgramCard {
  name: string;
  tagline: string;
  description: string;
  ctaText: string;
}

export const programs: ProgramCard[] = [
  {
    name: 'Product Delivery Economics Assessment',
    tagline: 'Understand where delivery capacity is being consumed and where economic value is being lost.',
    description:
      'A focused assessment across value, flow, capacity, quality and coordination to identify the highest-impact sources of economic leakage.',
    ctaText: 'Explore the Assessment',
  },
  {
    name: '6-Week Delivery Stabilization',
    tagline: 'Identify the constraints affecting delivery and implement focused changes to restore flow and predictability.',
    description:
      'A focused intervention to identify delivery constraints, improve flow, reduce coordination drag and establish stronger delivery practices.',
    ctaText: 'Explore the Program',
  },
  {
    name: 'Product Operating Model Design',
    tagline: 'Design an operating model that connects product, technology, delivery and leadership for the next stage of growth.',
    description:
      'Define how product, technology, delivery and leadership should work together as the organization scales.',
    ctaText: 'Explore the Program',
  },
  {
    name: 'Executive Product Economics Workshop',
    tagline: 'Create a shared leadership perspective on product investment, capacity and delivery economics.',
    description:
      'A leadership-focused working session designed to introduce economic thinking into prioritization, capacity and delivery decisions.',
    ctaText: 'Explore the Workshop',
  },
];
