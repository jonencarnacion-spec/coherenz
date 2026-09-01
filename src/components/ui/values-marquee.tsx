// Scrolling logo-cloud marquee, adapted from a pasted reference into this
// project's conventions rather than copied verbatim:
// - @remixicon/react's brand logos swapped for @tabler/icons-react
//   (DESIGN.md §4: "Don't mix Tabler with other icon libraries"), one icon
//   per value it represents rather than one per SaaS logo.
// - bg-background/text-muted-foreground (a light-theme logo strip) swapped
//   for bg-navy/50, sticky top-0 z-40 -- the exact treatment index.astro
//   uses for its "HOW WE OPERATE"/"WHAT WE PROMISE" sticky labels (see
//   index.astro:46, :62, :78). z-40 keeps it under Nav's z-50/fixed header
//   so the nav stays on top while this stays pinned underneath it as the
//   rest of the page scrolls past. Unlike index.astro's bands (each scoped
//   to a 2-section wrapper so they release at a specific point), this one
//   has no wrapping container -- its parent is <body> itself (Layout.astro
//   has no <main>), so it stays stuck for the rest of the page, matching
//   "remaining at the top when user scrolls down."
// - Dropped the "Trusted by fast-moving teams at Acme" caption -- the task
//   asked for a band containing just the values marquee, not a logo-cloud
//   caption pattern.
// - The inline <style>/@keyframes block moved to values-marquee.css,
//   matching this project's convention for one-off component animation
//   (elegant-carousel.css, galaxy.css, etc.) instead of embedding CSS in
//   the component itself.
import type * as React from 'react';
import './values-marquee.css';

export interface MarqueeValue {
  label: string;
  Icon: (props: { size?: number; stroke?: number; 'aria-hidden'?: string }) => React.ReactElement;
}

interface ValuesMarqueeProps {
  values: MarqueeValue[];
}

export default function ValuesMarquee({ values }: ValuesMarqueeProps) {
  return (
    <div className="sticky top-0 z-40 w-full bg-blue/75 py-[13.5px] sm:py-[18px]">
      <div className="values-marquee-mask relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="values-marquee-track flex w-max items-center gap-[125px]">
          {[...values, ...values].map(({ label, Icon }, index) => (
            <div
              key={`${label}-${index}`}
              className="flex shrink-0 items-center gap-2.5 text-white/70 transition-colors duration-200 hover:text-white"
              aria-hidden={index >= values.length ? 'true' : undefined}
            >
              <Icon size={22} stroke={1.75} aria-hidden="true" />
              <span className="text-sm font-bold tracking-wide whitespace-nowrap uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
