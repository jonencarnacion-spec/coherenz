export interface GapStage {
  name: string;
  desc: string;
  bg: string;
  iconColor: string;
}

export interface GapLeak {
  desc: string;
}

// Deeper tonal fills per stage — richer than a near-white wash so the row
// reads as deliberate color-coded chips rather than a pale tint. Icon color
// is the same deep hue used for the fill's "full strength" version.
// Icon choice lives in GapDiagram.tsx (stageIcons) — Tabler icons per DESIGN.md §4.
export const gapStages: GapStage[] = [
  {
    name: 'Opportunity',
    desc: 'Define direction, goals and value intent.',
    bg: '#D6EBE1',
    iconColor: '#2F8F5B',
  },
  {
    name: 'Investment',
    desc: 'Allocate resources to the right opportunities.',
    bg: '#F5DFC0',
    iconColor: '#C9761A',
  },
  {
    name: 'Product',
    desc: 'Build the right thing for the right people.',
    bg: '#F7EBBF',
    iconColor: '#B08900',
  },
  {
    name: 'Delivery',
    desc: 'Execute efficiently with quality and flow.',
    bg: '#F5DFC0',
    iconColor: '#C9761A',
  },
  {
    name: 'Outcome',
    desc: 'Realize value and measurable impact.',
    bg: '#F5D6D0',
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
