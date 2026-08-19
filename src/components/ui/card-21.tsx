import * as React from 'react';
import { cn } from '@/lib/utils';
import { IconArrowRight } from '@tabler/icons-react';

// Adapted from 21st.dev's "card-21" (destination-card) component.
// - "location"/"flag"/"stats" fields don't fit a B2B challenge card, so
//   renamed to headline/label with real Coherenz copy.
// - lucide-react swapped for @tabler/icons-react (DESIGN.md §4's locked
//   icon system).
// - Source had two `style` attributes on the same <a> element (invalid
//   JSX — the second silently wins, so the Tailwind hover glow class never
//   applied). Fixed by dropping the static inline boxShadow and letting the
//   Tailwind arbitrary-value class own the hover glow.
interface ChallengeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  headline: string;
  label: string;
  href: string;
  /** HSL triplet, e.g. "36 80% 55%" — matches DESIGN.md's brand hues. */
  themeColor: string;
  /**
   * Test variant, requested for a single card only: top half is the raw
   * photo (no gradient overlay), bottom half is a solid theme-color panel
   * holding the text — instead of the default full-bleed image with text
   * overlaid at the bottom.
   */
  splitLayout?: boolean;
}

const ChallengeCard = React.forwardRef<HTMLDivElement, ChallengeCardProps>(
  ({ className, imageUrl, headline, label, href, themeColor, splitLayout, ...props }, ref) => {
    if (splitLayout) {
      return (
        <div
          ref={ref}
          style={{ '--theme-color': themeColor } as React.CSSProperties}
          className={cn('group h-full w-full', className)}
          {...props}
        >
          <a
            href={href}
            className="relative flex h-full w-full flex-col overflow-hidden rounded-lg shadow-lg
                       transition-all duration-500 ease-in-out
                       group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
            aria-label={`Explore: ${headline}`}
          >
            <div
              className="h-1/2 w-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />

            <div className="flex h-1/2 w-full flex-col justify-between bg-white p-6 text-navy">
              <div>
                <h3 className="font-serif text-2xl font-normal leading-snug">{headline}</h3>
                <p className="mt-1 text-sm font-medium text-navy/70">{label}</p>
              </div>

              <div
                className="flex items-center justify-between rounded-lg border border-[hsl(var(--theme-color)/0.3)]
                           bg-[hsl(var(--theme-color)/0.1)] px-4 py-3
                           transition-all duration-300
                           group-hover:border-[hsl(var(--theme-color)/0.5)] group-hover:bg-[hsl(var(--theme-color)/0.2)]"
                style={{ color: 'hsl(var(--theme-color))' }}
              >
                <span className="text-sm font-semibold tracking-wide">Explore this challenge</span>
                <IconArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={{ '--theme-color': themeColor } as React.CSSProperties}
        className={cn('group h-full w-full', className)}
        {...props}
      >
        <a
          href={href}
          className="relative block h-full w-full overflow-hidden rounded-lg shadow-lg
                     transition-all duration-500 ease-in-out
                     group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          aria-label={`Explore: ${headline}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center
                       transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.9), hsl(var(--theme-color) / 0.6) 30%, transparent 60%)`,
            }}
          />

          <div className="relative flex h-full flex-col justify-end p-6 text-white">
            <h3 className="font-serif text-2xl font-normal leading-snug">{headline}</h3>
            <p className="mt-1 text-sm font-medium text-white/80">{label}</p>

            <div
              className="mt-8 flex items-center justify-between rounded-lg border border-[hsl(var(--theme-color)/0.3)]
                         bg-[hsl(var(--theme-color)/0.2)] px-4 py-3 backdrop-blur-md
                         transition-all duration-300
                         group-hover:border-[hsl(var(--theme-color)/0.5)] group-hover:bg-[hsl(var(--theme-color)/0.4)]"
            >
              <span className="text-sm font-semibold tracking-wide">Explore this challenge</span>
              <IconArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    );
  }
);
ChallengeCard.displayName = 'ChallengeCard';

export { ChallengeCard };
