// Real copy + photos supplied by Jon (assets/image options/insights/).
// `topInsight` and `insights` (the original 3) power the homepage teaser
// (InsightsTeaser.astro) -- unchanged, out of scope for the page-flow
// rework below. Everything else here follows "insights page flow.docx"
// (assets/insights page/), a developer-handoff spec for the dedicated
// /insights page: hero copy, the "editorial sections" grouping (Value &
// Investment / Capacity & Flow / System Design) instead of a flat grid or
// category-tag filters, the Coherenz Perspective statement break, and the
// "From Insight to Action" program CTAs. Section/card copy is the doc's
// own wording, not invented.

export interface InsightSummary {
  tag: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
}

export const topInsight = {
  tag: 'Coherenz Perspective',
  title: "Busy Doesn't Mean Valuable.",
  subhead:
    'The delivery capacity paradox: why maximizing utilization can actually reduce the value your organization creates.',
  body: "A team can be fully occupied and still be investing its most expensive resource—delivery capacity—in the wrong places.",
  image: 'insight-top.jpg',
  imageAlt: 'Motion-blurred figure moving quickly across a crosswalk, evoking constant busyness',
  slug: 'busy-doesnt-mean-valuable',
};

export const insights: InsightSummary[] = [
  {
    tag: 'Product Economics',
    title: 'More Delivery Doesn’t Mean More Value.',
    description: 'Why increasing output can make a product organization less effective—and what to optimize instead.',
    image: 'insight-2.jpg',
    imageAlt: 'Layered street posters and flyers papering a wall, evoking accumulated output',
    slug: 'more-delivery-doesnt-mean-more-value',
  },
  {
    tag: 'Portfolio Strategy',
    title: 'The Cost of Doing Nothing Is Often Hidden.',
    description: 'Why prioritization should account for the economic cost of delay—not just the value of what gets built.',
    image: 'insight-3.jpg',
    imageAlt: 'Silhouetted figure on a wet beach at sunset with a crowd in the distance',
    slug: 'the-cost-of-doing-nothing-is-often-hidden',
  },
  {
    tag: 'Delivery Stabilization',
    title: 'Your Delivery Problem May Not Be a Capacity Problem.',
    description: 'Why adding people rarely fixes the underlying economics of a constrained delivery system.',
    image: 'insight-4.jpg',
    imageAlt: 'A Rubik’s cube mid-toss above an open hand',
  },
];

// Site Context.docx §6's four themes, still used for the homepage teaser's
// context and available if a future page needs them.
export interface InsightTheme {
  name: string;
  topics: string[];
}

export const insightThemes: InsightTheme[] = [
  {
    name: 'Product Economics',
    topics: ['Cost of Delay', 'CD3', 'Prioritization', 'Portfolio economics', 'Technical debt economics'],
  },
  {
    name: 'Delivery Economics',
    topics: ['Throughput', 'Cycle Time', 'WIP', 'Flow efficiency', 'Coordination drag', 'Capacity'],
  },
  {
    name: 'Product Leadership',
    topics: ['Product strategy', 'Roadmaps', 'Product operating models', 'Outcomes'],
  },
  {
    name: 'Transformation',
    topics: ['Agile transformation', 'Scaling', 'Organizational design', 'Delivery transformation'],
  },
];

// --- /insights page flow (insights page flow.docx) -------------------------

export const insightsHero = {
  eyebrow: 'Insights',
  headline: 'Better questions about how product organizations create value.',
  supporting:
    'Perspectives on product strategy, delivery economics, capacity, flow, and the decisions that shape business outcomes.',
};

export const insightCollectionIntro = {
  headline: 'The questions behind better product decisions.',
  // Doc's original sentence, with an explicit tie back to the site's named
  // framework appended per Jon's call -- keeps the economics lens visible
  // without reverting the section groupings below to category-style names.
  supporting:
    'Explore the assumptions, trade-offs, and system dynamics that shape how product organizations invest, prioritize, and deliver—the questions at the center of Product Delivery Economics.',
};

export interface InsightGridItem {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
}

export interface InsightEditorialSection {
  name: string;
  items: InsightGridItem[];
}

// §6-7, §9: three editorial groupings, not filter categories. Cards keep
// real photography where it already exists (the same three images used by
// the homepage teaser); the rest render a themed placeholder panel (see
// insights.astro) since no photography exists yet for these six topics.
export const insightSections: InsightEditorialSection[] = [
  {
    name: 'Value & Investment',
    items: [
      {
        title: 'More Delivery Doesn’t Mean More Value.',
        description: 'Why increasing output can make a product organization less effective—and what to optimize instead.',
        image: 'insight-2.jpg',
        imageAlt: 'Layered street posters and flyers papering a wall, evoking accumulated output',
        slug: 'more-delivery-doesnt-mean-more-value',
      },
      {
        title: 'The Cost of Doing Nothing Is Often Hidden.',
        description: 'Why prioritization should account for the economic cost of delay—not just the value of what gets built.',
        image: 'insight-3.jpg',
        imageAlt: 'Silhouetted figure on a wet beach at sunset with a crowd in the distance',
        slug: 'the-cost-of-doing-nothing-is-often-hidden',
      },
      {
        title: 'Not Every Feature Deserves to Be Built.',
        description: 'Why product investment decisions need more economic rigor before delivery capacity is committed.',
        slug: 'not-every-feature-deserves-to-be-built',
      },
    ],
  },
  {
    name: 'Capacity & Flow',
    items: [
      {
        title: 'Your Delivery Problem May Not Be a Capacity Problem.',
        description: 'Why adding people rarely fixes the underlying economics of a constrained delivery system.',
        image: 'insight-4.jpg',
        imageAlt: 'A Rubik’s cube mid-toss above an open hand',
      },
      {
        title: "Everything Can't Be a Priority.",
        description:
          'Why too many priorities create the illusion of progress while slowing down everything that matters.',
      },
      {
        title: "The Most Expensive Work Is Work You Don't Finish.",
        description: "Why work in progress is quietly consuming your organization's capacity, attention, and economic value.",
      },
    ],
  },
  {
    name: 'System Design',
    items: [
      {
        title: 'Speed Is a System Property.',
        description: 'Why asking teams to work faster rarely fixes slow delivery.',
      },
      {
        title: 'Efficiency Can Make You Less Effective.',
        description: 'Why optimizing individual teams can damage the performance of the product system as a whole.',
      },
      {
        title: 'Complexity Has an Operating Cost.',
        description:
          'Why scaling a product organization without redesigning how decisions and work flow eventually makes delivery slower and more expensive.',
      },
    ],
  },
];

// §8: full-width editorial statement break between Capacity & Flow and
// System Design.
export const perspectiveBreak = {
  statement: "Most delivery problems aren't caused by teams failing to work hard enough.",
  body: 'They emerge when valuable capacity is committed to the wrong work, priorities compete for the same resources, and the system makes it difficult for decisions to flow into outcomes.',
};

// §10: the page's primary conversion point -- three real Coherenz Programs
// (slugs match src/data/programsContent.ts / the live /programs/[slug]
// routes), with the doc's own short-form framing copy for this placement.
export const fromInsightToAction = {
  eyebrow: 'From Insight to Action',
  headline: 'When these questions become operational problems.',
  supporting:
    'Insights can help you understand the problem. Coherenz works with product and technology leaders to diagnose what is happening in their organization and design practical ways forward.',
  programs: [
    {
      slug: 'product-delivery-economics-assessment',
      name: 'Product Delivery Economics Assessment',
      description: 'Identify where value, capacity, and flow are being lost across your product delivery system.',
      ctaLabel: 'Explore the Assessment',
    },
    {
      slug: '6-week-delivery-stabilization',
      name: '6-Week Delivery Stabilization Program',
      description: 'Restore clarity, focus, and flow when delivery complexity is slowing the organization down.',
      ctaLabel: 'Explore the Program',
    },
    {
      slug: 'product-operating-model-design',
      name: 'Product Operating Model Design',
      description: 'Design clearer decision rights, structures, and ways of working as the organization scales.',
      ctaLabel: 'Explore Operating Model Design',
    },
  ],
};
