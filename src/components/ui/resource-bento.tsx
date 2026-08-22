import * as React from 'react';
import { cn } from '@/lib/utils';
import { IconCoin, IconUsers, IconGauge, IconClock, IconFocus2 } from '@tabler/icons-react';
import { base } from '../../lib/base';

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

// Adapted from a pasted "FUIBentoGridDark" bento-grid component. Source was
// a dark glassmorphic card grid with hotlinked Framer placeholder images and
// a framer-motion hover variant that was actually a no-op ({idle: {}, active:
// {}} defines no animated properties) -- dropped framer-motion entirely
// (clsx/cn already covers the class-merging it was doing). Each card's photo
// (assets/image options/core idea/) replaced the earlier solid-accent-panel
// placeholder; the icon now sits as a small badge over the photo instead of
// filling the whole header.
interface ResourceCard {
  label: string;
  Icon: IconComponent;
  accent: string;
  image: string;
  imageAlt: string;
  description: string;
}

const resources: ResourceCard[] = [
  {
    label: 'Money',
    Icon: IconCoin,
    accent: 'text-orange',
    image: 'core-idea-money.jpg',
    imageAlt: 'Macro detail of an engraved portrait on a banknote',
    description:
      'Capital allocated to product investment is finite. Every dollar spent on one initiative is a dollar not available for another.',
  },
  {
    label: 'People',
    Icon: IconUsers,
    accent: 'text-blue',
    image: 'core-idea-people.jpg',
    imageAlt: 'Motion-blurred crowd moving through a busy street',
    description:
      'Headcount and expertise are bounded. The people you have define the ceiling on what you can realistically deliver.',
  },
  {
    label: 'Capacity',
    Icon: IconGauge,
    accent: 'text-green',
    image: 'core-idea-capacity.jpg',
    imageAlt: 'Abstract overlapping curved panels of color, evoking finite allocated space',
    description:
      "Delivery capacity doesn't scale with ambition. It has to be protected and allocated deliberately, not assumed.",
  },
  {
    label: 'Time',
    Icon: IconClock,
    accent: 'text-[#B08900]',
    image: 'core-idea-time.jpg',
    imageAlt: 'Vintage pocket watch amid dark still-life objects',
    description:
      'Market windows close. Every cycle spent deciding is a cycle not spent delivering — and the cost of delay compounds.',
  },
  {
    label: 'Attention',
    Icon: IconFocus2,
    accent: 'text-navy',
    image: 'core-idea-attention.jpg',
    imageAlt: 'Rain-streaked glass with blurred red light in the distance',
    description:
      'Leadership focus is scarce and easily fragmented. Where attention goes, priority follows — whether intended or not.',
  },
];

function BentoCard({ label, Icon, accent, image, imageAlt, description, className }: ResourceCard & { className?: string }) {
  return (
    <div
      className={cn(
        'group relative flex h-[320px] flex-col overflow-hidden border border-line shadow-sm transition-shadow duration-300 hover:shadow-lg',
        className
      )}
    >
      <img
        src={`${base}img/photography/${image}`}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="relative mt-auto border-t border-white/30 bg-white/50 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Icon size={22} strokeWidth={1.8} className={accent} />
          <p className="text-xl font-extrabold uppercase tracking-wide text-navy">{label}</p>
        </div>
        <p className="mt-2 text-sm text-navy/80">{description}</p>
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
