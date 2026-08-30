import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { base } from '../lib/base';
import PdeosOrbitalComparison from './PdeosOrbitalComparison';
import { IconTargetArrow, IconAdjustmentsHorizontal, IconChartBar, IconRefresh } from '@tabler/icons-react';

// Closing banner below the wheel, following the same navy icon-row pattern
// as GapDiagram's own banner (plain Tabler icon, bold title, short caption).
const promises = [
  { icon: IconTargetArrow, title: 'Better decisions', desc: 'Economic clarity at every step.' },
  { icon: IconAdjustmentsHorizontal, title: 'More flow', desc: 'Less friction. Higher throughput.' },
  { icon: IconChartBar, title: 'Measurable outcomes', desc: 'Link delivery to business impact.' },
  { icon: IconRefresh, title: 'Continuous learning', desc: 'Feed insights back into the next cycle.' },
];

const DEFAULT_HEADLINE = 'The Product Delivery Economics Framework';

export default function PdeosWheel({
  ctaHref = `${base}approach`,
  ctaLabel = 'See the full framework →',
  showCta = true,
  eyebrow = 'Coherenz PDE-OS™',
  headline = DEFAULT_HEADLINE,
  body,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
  eyebrow?: string;
  headline?: string;
  body?: React.ReactNode;
}) {
  // Float-in from the bottom, same character used across the site
  // (CoherenzPerspective.astro, ActionAndClosing.astro, insights.astro,
  // HeroDuplicate.astro, GapDiagram.tsx's own heading): 28px travel,
  // 1500ms, strong ease-out, IntersectionObserver-triggered since this
  // section sits below the fold. React state + inline style rather than
  // the `.float-up` CSS class, since this is a React island.
  const [headingVisible, setHeadingVisible] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotionRef.current) {
      setHeadingVisible(true);
      return;
    }
    const el = headingRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHeadingVisible(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="pdeos-wheel-section" className="relative flex flex-col bg-navy py-8 sm:py-10 lg:min-h-[88vh]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1536px] flex-1 flex-col px-6 sm:px-8 lg:px-10 xl:px-14">
        <div
          ref={headingRef}
          className="mx-auto max-w-4xl text-center"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: reducedMotionRef.current
              ? 'none'
              : 'opacity 1500ms cubic-bezier(0.23, 1, 0.32, 1), transform 1500ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.375em] text-orange">{eyebrow}</p>
          {/* whitespace-nowrap only fits the original, shorter default headline
              -- an overridden headline (e.g. the longer Approach-page copy)
              needs to wrap normally on narrower screens instead of overflowing. */}
          <h2 className={cn('mt-3 font-serif text-4xl text-white sm:text-5xl', headline === DEFAULT_HEADLINE && 'whitespace-nowrap')}>
            {headline}
          </h2>
          <p className="mt-3 text-white/70">
            {body ?? (
              <>
                One continuous cycle for turning delivery into measurable value.
                <br />
                Seven phases, one economic thread — from first idea to the lesson that sharpens the next bet.
              </>
            )}
          </p>
          {showCta && (
            <p className="mt-3">
              <a href={ctaHref} className="font-bold text-orange">
                {ctaLabel}
              </a>
            </p>
          )}
        </div>

        {/* Same top/center/bottom distribution as GapDiagram: headline
            block sits at its natural top position, this wrapper grows to
            absorb all leftover vertical space and centers the (fixed-height)
            wheel within it, and the banner below sits flush at the bottom. */}
        <div className="flex flex-1 items-center justify-center">
          <PdeosOrbitalComparison />
        </div>

        <div className="relative mt-[100px] flex flex-col gap-8 overflow-hidden bg-blue px-8 py-5 text-white sm:flex-row sm:items-center">
          <img
            src={`${base}img/monogram.svg`}
            alt=""
            className="pointer-events-none absolute -right-10 -top-10 w-64 opacity-20"
          />
          <div className="relative flex items-start gap-4 sm:flex-1">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-orange/40">
              <IconRefresh className="h-6 w-6 text-orange" />
            </div>
            <div>
              <h3 className="whitespace-nowrap text-lg leading-tight text-white">
                <strong className="font-extrabold text-orange">A system,</strong>{' '}
                <span className="font-medium">not a project.</span>
              </h3>
              <p className="mt-3 text-sm text-white/70">
                Every decision, handoff, and learning cycle compounds — more value from the same capacity.
              </p>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-6 sm:flex sm:flex-[2] sm:items-start">
            {promises.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="sm:flex-1">
                <Icon size={30} strokeWidth={1.8} className="text-orange" />
                <strong className="mt-2 block text-sm uppercase tracking-wide">{title}</strong>
                <span className="mt-1 block text-xs text-white/70">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
