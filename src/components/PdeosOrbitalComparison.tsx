import RadialOrbitalTimeline from './ui/radial-orbital-timeline';
import { pdeosStages } from '../data/pdeosWheel';
import { IconSearch, IconCheck, IconClipboardList, IconRocket, IconFlag, IconChartBar, IconBulb } from '@tabler/icons-react';

// Comparison build only — same real 7-stage PDE-OS data as the wheel above,
// laid out with a different (21st.dev "radial orbital timeline") visual
// pattern, so the two can be judged side by side. Not wired to any real
// per-stage status/energy metric (none exists), so those fields are held
// uniform on purpose rather than invented.
const stageIcons = [IconSearch, IconCheck, IconClipboardList, IconRocket, IconFlag, IconChartBar, IconBulb];

const timelineData = pdeosStages.map((stage, i) => {
  const total = pdeosStages.length;
  return {
    id: i + 1,
    title: stage.name,
    date: `Stage ${i + 1} / ${total}`,
    content: stage.sub,
    category: stage.name,
    icon: stageIcons[i],
    relatedIds: [((i - 1 + total) % total) + 1, ((i + 1) % total) + 1].filter((id) => id !== i + 1),
    status: 'completed' as const,
    energy: 70,
    // Same per-stage color as the wheel above, so the two use one palette.
    color: stage.color,
  };
});

export default function PdeosOrbitalComparison() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
