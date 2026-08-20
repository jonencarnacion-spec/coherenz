import RadialOrbitalTimeline from './ui/radial-orbital-timeline';
import { pdeosStages } from '../data/pdeosWheel';
import { base } from '../lib/base';
import { IconSearch, IconCheck, IconClipboardList, IconRocket, IconFlag, IconChartBar, IconBulb } from '@tabler/icons-react';

// Comparison build only — same real 7-stage PDE-OS data as the wheel above,
// laid out with a different (21st.dev "radial orbital timeline") visual
// pattern, so the two can be judged side by side. Not wired to any real
// per-stage status/energy metric (none exists), so those fields are held
// uniform on purpose rather than invented.
const stageIcons = [IconSearch, IconCheck, IconClipboardList, IconRocket, IconFlag, IconChartBar, IconBulb];

// Longer, card-only restatement of each stage's short wheel tagline (sub) —
// the wheel's `sub` is a 2-4 word label, too terse for this card's body copy,
// so this expands it to a full sentence without changing its meaning.
const cardCopy: Record<string, string> = {
  Discover: 'Price the opportunity before committing delivery capacity.',
  Validate: 'Prove the idea is real before delivery work begins.',
  Plan: 'Design the blueprint before committing delivery capacity.',
  Deliver: 'Build it right, keeping investment and value connected.',
  Release: 'Ship it and confirm customers actually adopt it.',
  Measure: 'Check the return against the original investment case.',
  Learn: 'Feed what you learn into the next investment decision.',
};

const timelineData = pdeosStages.map((stage, i) => {
  const total = pdeosStages.length;
  return {
    id: i + 1,
    title: stage.name,
    date: `Stage ${i + 1} / ${total}`,
    content: cardCopy[stage.name] ?? stage.sub,
    category: stage.name,
    icon: stageIcons[i],
    relatedIds: [((i - 1 + total) % total) + 1, ((i + 1) % total) + 1].filter((id) => id !== i + 1),
    status: 'completed' as const,
    energy: 70,
    // Same per-stage color as the wheel above, so the two use one palette.
    color: stage.color,
  };
});

// Same center-circle branding as the wheel above, minus its subtitle
// line — the eye here is much smaller, so the description doesn't fit.
const centerContent = (
  <>
    <img src={`${base}img/logo-navy.svg`} alt="Coherenz" className="h-5" />
    <p className="mt-2 text-sm font-extrabold uppercase leading-tight text-navy">
      PDE-OS™
      <br />
      7-Stage Wheel
    </p>
  </>
);

export default function PdeosOrbitalComparison() {
  return <RadialOrbitalTimeline timelineData={timelineData} centerContent={centerContent} />;
}
