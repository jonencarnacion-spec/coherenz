import * as React from 'react';
import { cn } from '@/lib/utils';
import { IconCoin, IconUsers, IconGauge, IconClock, IconFocus2 } from '@tabler/icons-react';

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

// Adapted from a pasted "FUIBentoGridDark" bento-grid component. Source was
// a dark glassmorphic card grid with hotlinked Framer placeholder images and
// a framer-motion hover variant that was actually a no-op ({idle: {}, active:
// {}} defines no animated properties) -- dropped framer-motion entirely
// (clsx/cn already covers the class-merging it was doing) and rebuilt each
// card's "graphic" as a solid accent panel + large Tabler icon instead of an
// external image, since this ships in a static site with no image to point
// at. Light theme instead of the source's dark one, to match this section's
// white background (DESIGN.md's card system: border-line, bg-white).
interface ResourceCard {
  label: string;
  Icon: IconComponent;
  accent: string;
  accentBg: string;
  description: string;
}

const resources: ResourceCard[] = [
  {
    label: 'Money',
    Icon: IconCoin,
    accent: 'text-orange',
    accentBg: 'bg-orange/10',
    description:
      'Capital allocated to product investment is finite. Every dollar spent on one initiative is a dollar not available for another.',
  },
  {
    label: 'People',
    Icon: IconUsers,
    accent: 'text-blue',
    accentBg: 'bg-blue/10',
    description:
      'Headcount and expertise are bounded. The people you have define the ceiling on what you can realistically deliver.',
  },
  {
    label: 'Capacity',
    Icon: IconGauge,
    accent: 'text-green',
    accentBg: 'bg-green/10',
    description:
      "Delivery capacity doesn't scale with ambition. It has to be protected and allocated deliberately, not assumed.",
  },
  {
    label: 'Time',
    Icon: IconClock,
    accent: 'text-[#B08900]',
    accentBg: 'bg-yellow/15',
    description:
      'Market windows close. Every cycle spent deciding is a cycle not spent delivering — and the cost of delay compounds.',
  },
  {
    label: 'Attention',
    Icon: IconFocus2,
    accent: 'text-navy',
    accentBg: 'bg-navy/10',
    description:
      'Leadership focus is scarce and easily fragmented. Where attention goes, priority follows — whether intended or not.',
  },
];

function BentoCard({ label, Icon, accent, accentBg, description, className }: ResourceCard & { className?: string }) {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg',
        className
      )}
    >
      <div className={cn('flex h-40 shrink-0 items-center justify-center', accentBg)}>
        <Icon size={56} strokeWidth={1.5} className={cn('transition-transform duration-500 group-hover:scale-110', accent)} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xl font-extrabold uppercase tracking-wide text-navy">{label}</p>
        <p className="mt-2 text-sm text-foreground/70">{description}</p>
      </div>
    </div>
  );
}

export default function ResourceBento() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
      <BentoCard {...resources[0]} className="lg:col-span-3" />
      <BentoCard {...resources[1]} className="lg:col-span-3" />
      <BentoCard {...resources[2]} className="lg:col-span-2" />
      <BentoCard {...resources[3]} className="lg:col-span-2" />
      <BentoCard {...resources[4]} className="lg:col-span-2" />
    </div>
  );
}
