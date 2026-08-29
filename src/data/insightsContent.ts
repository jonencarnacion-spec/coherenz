// Real copy + photos supplied by Jon (assets/image options/insights/).
// Extracted from InsightsTeaser.astro so the same real content can be
// shared between the homepage teaser and the full /insights listing page
// without duplicating it. The four Coherenz Thinking themes and their
// sub-topics are ported verbatim from "Site Context.docx" §6 (Insights) --
// these are the site's real planned content taxonomy, not invented labels.

export interface InsightSummary {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const topInsight = {
  tag: 'Coherenz Perspective',
  title: "Busy Doesn't Mean Valuable.",
  subhead:
    'The delivery capacity paradox: why maximizing utilization can actually reduce the value your organization creates.',
  body: "A team can be fully occupied and still be investing its most expensive resource—delivery capacity—in the wrong places.",
  image: 'insight-top.jpg',
  imageAlt: 'Motion-blurred figure moving quickly across a crosswalk, evoking constant busyness',
};

export const insights: InsightSummary[] = [
  {
    tag: 'Product Economics',
    title: 'More Delivery Doesn’t Mean More Value.',
    description: 'Why increasing output can make a product organization less effective—and what to optimize instead.',
    image: 'insight-2.jpg',
    imageAlt: 'Layered street posters and flyers papering a wall, evoking accumulated output',
  },
  {
    tag: 'Portfolio Strategy',
    title: 'The Cost of Doing Nothing Is Often Hidden.',
    description: 'Why prioritization should account for the economic cost of delay—not just the value of what gets built.',
    image: 'insight-3.jpg',
    imageAlt: 'Silhouetted figure on a wet beach at sunset with a crowd in the distance',
  },
  {
    tag: 'Delivery Stabilization',
    title: 'Your Delivery Problem May Not Be a Capacity Problem.',
    description: 'Why adding people rarely fixes the underlying economics of a constrained delivery system.',
    image: 'insight-4.jpg',
    imageAlt: 'A Rubik’s cube mid-toss above an open hand',
  },
];

export interface InsightTheme {
  name: string;
  topics: string[];
}

// Site Context.docx §6: "Organize it into four themes" -- topics listed are
// the doc's own sub-topic bullets under each theme, verbatim.
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
