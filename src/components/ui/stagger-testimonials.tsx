// Staggered-deck testimonial carousel, adapted from a pasted reference into
// this project's conventions rather than copied verbatim:
// - lucide-react's ChevronLeft/ChevronRight swapped for the already-used
//   @tabler/icons-react equivalents (DESIGN.md §4: "Don't mix Tabler with
//   other icon libraries").
// - Dropped the Next.js "use client" directive (meaningless in this
//   Astro/Vite project, not used by any other component here).
// - The demo data (fake COMPANY quotes + pravatar.cc headshots) is gone.
//   `testimonials` is now a required prop -- see jonProfileContent.ts's
//   `leadershipTestimonials` for the real data this renders on /about/jon.
// - No avatar photos (real, private teammates -- not stock headshots).
//   The circular image slot is replaced with the value each quote is
//   tagged to (Integrity, Trust, Excellence, ...), styled as a small
//   uppercase badge, per the task's own instruction to swap the image
//   placeholder for the value.
// - bg-primary/text-primary-foreground/bg-card/border-border etc. already
//   resolve to Coherenz's palette via the --color-primary/--color-card/...
//   mappings in global.css, so the shadcn-style classes below render on
//   brand without further edits.
// - The one raw CSS var the original used, `hsl(var(--border))` for the
//   center card's box-shadow, assumed a shadcn HSL-triplet variable this
//   project doesn't define (--color-line here is a plain hex) -- swapped
//   for a direct var() reference instead of wrapping it in hsl().
// - Quote + attribution moved from absolutely-positioned bottom text to a
//   flex column that grows with content, since real testimonials vary in
//   length far more than the original's punchy one-liners and would have
//   collided with the fixed bottom-8 position.

import React, { useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerTestimonial {
  tempId: number;
  quote: string;
  by: string;
  value: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 flex cursor-pointer flex-col border-2 p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 border-primary bg-primary text-primary-foreground'
          : 'z-0 border-border bg-card text-card-foreground hover:border-primary/50',
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? '0px 8px 0px 4px var(--color-line)' : '0px 0px 0px 0px transparent',
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <span
        className={cn(
          'mb-4 inline-block w-fit rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
          isCenter ? 'border-primary-foreground/40 text-primary-foreground' : 'border-orange/40 text-orange',
        )}
      >
        {testimonial.value}
      </span>
      <h3
        className={cn(
          'flex-1 font-serif text-base sm:text-lg',
          isCenter ? 'text-primary-foreground' : 'text-foreground',
        )}
      >
        "{testimonial.quote}"
      </h3>
      <p
        className={cn(
          'mt-4 text-sm italic',
          isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground',
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

// Shifts `list` left (steps > 0) or right (steps < 0) by `steps`, wrapping
// around -- the deck's underlying rotation, shared by the initial-centering
// logic below and handleMove's click/arrow navigation.
function rotate<T>(list: T[], steps: number): T[] {
  const next = [...list];
  if (steps > 0) {
    for (let i = steps; i > 0; i--) {
      const item = next.shift();
      if (!item) break;
      next.push(item);
    }
  } else {
    for (let i = steps; i < 0; i++) {
      const item = next.pop();
      if (!item) break;
      next.unshift(item);
    }
  }
  return next;
}

interface StaggerTestimonialsProps {
  testimonials: StaggerTestimonial[];
  /** Index into `testimonials` (source order, not deck position) to center by default. Defaults to 0 -- the first item. */
  defaultIndex?: number;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ testimonials, defaultIndex = 0 }) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(() => {
    const withIds = testimonials.map((t, i) => ({ ...t, tempId: i }));
    const centerIndex = withIds.length % 2 ? (withIds.length + 1) / 2 : withIds.length / 2;
    return rotate(withIds, defaultIndex - centerIndex);
  });

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            'flex h-14 w-14 items-center justify-center border-2 text-2xl transition-colors',
            'border-border bg-background hover:bg-primary hover:text-primary-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )}
          aria-label="Previous testimonial"
        >
          <IconChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            'flex h-14 w-14 items-center justify-center border-2 text-2xl transition-colors',
            'border-border bg-background hover:bg-primary hover:text-primary-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )}
          aria-label="Next testimonial"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
};
