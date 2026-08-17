export interface GapStage {
  name: string;
  desc: string;
  bg: string;
  iconColor: string;
}

export interface GapLeak {
  desc: string;
}

// Colors ported from css/style.css .gap-icon-circle.{blue,tint-a,tint-b,tint-c,tint-d}.
// Icon choice lives in GapDiagram.tsx (stageIcons) — Tabler icons per DESIGN.md §4.
export const gapStages: GapStage[] = [
  {
    name: 'Opportunity',
    desc: 'Define direction, goals and value intent.',
    bg: 'var(--color-blue)',
    iconColor: 'var(--color-yellow)',
  },
  {
    name: 'Investment',
    desc: 'Allocate resources to the right opportunities.',
    bg: '#FBEFE3',
    iconColor: '#C9761A',
  },
  {
    name: 'Product',
    desc: 'Build the right thing for the right people.',
    bg: '#FDF6E0',
    iconColor: '#B08900',
  },
  {
    name: 'Delivery',
    desc: 'Execute efficiently with quality and flow.',
    bg: '#FCEEE0',
    iconColor: '#C9761A',
  },
  {
    name: 'Outcome',
    desc: 'Realize value and measurable impact.',
    bg: '#FBEAE7',
    iconColor: '#D14A3E',
  },
];

// One less than gapStages.length — one leak connector between each pair of stages.
export const gapLeaks: GapLeak[] = [
  { desc: "Opportunity isn't translated into clear investment choices." },
  { desc: "Investment isn't aligned to customer value and outcomes." },
  { desc: "Work isn't prioritized by value and impact." },
  { desc: 'Execution friction reduces flow and slows outcomes.' },
];
