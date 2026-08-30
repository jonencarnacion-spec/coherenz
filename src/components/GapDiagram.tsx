import { Fragment, useEffect, useRef, useState } from 'react';
import { base } from '../lib/base';
import { cn } from '../lib/utils';
import { pastel, rgba, glowStyle } from '../lib/glow';
import { gapStages, gapLeaks } from '../data/gapDiagram';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import {
  IconTarget,
  IconAlignBoxLeftMiddle,
  IconArrowsSplit,
  IconTargetArrow,
  IconRadar,
  IconCoin,
  IconHammer,
  IconBolt,
  IconTrendingUp,
} from '@tabler/icons-react';

const promises = [
  { icon: IconTarget, title: 'See the Gaps', desc: 'Make hidden friction visible.' },
  { icon: IconAlignBoxLeftMiddle, title: 'Focus Where It Matters', desc: 'Prioritize the highest value leaks.' },
  { icon: IconArrowsSplit, title: 'Improve Flow', desc: 'Remove friction. Increase throughput.' },
  { icon: IconTargetArrow, title: 'Drive Outcomes', desc: 'Turn delivery into measurable value.' },
];

// Same Tabler set used before the "Theory of Constraints 7 Nodes" design
// import (radar/coin/hammer/bolt/trending-up) -- swapped back in over the
// design's own bespoke node SVGs per explicit request, matching the trial
// section (TrialTocNodes.astro) this was ported from.
const stageIcons = [IconRadar, IconCoin, IconHammer, IconBolt, IconTrendingUp];

// Node treatment (small glowing "planet" circles + gradient connector line)
// was prototyped in a standalone draft (GapDiagramDraft.tsx, ported from the
// Hero's orbital canvas glow) and, once approved, merged here to replace
// this component's original flat-fill-circle treatment -- the draft has
// been deleted since its result now lives in this file directly.
// Off the locked DESIGN.md palette on purpose (same go-ahead that covered
// the draft): the original dark navy/blue/green tones nearly disappeared
// once this section's background moved from bg-wash-blue to bg-navy.
const stageFamilyColors = ['#38bdf8', '#22d3ee', '#2dd4bf', '#e8c04a', '#e0453a'];
const stageCircleColors = ['#38bdf8', '#22d3ee', '#2dd4bf', '#e8c04a', '#e0453a'];

// Click-to-reveal detail card for a gap node, same interaction pattern AND
// same card color treatment as the PDE-OS wheel's node cards
// (RadialOrbitalTimeline: border-navy/10 bg-white/50 shadow-navy/20) --
// deliberately matching even though this section sits on bg-navy rather
// than the wheel's wash-green, per explicit request for consistency
// between the two diagrams. Text flipped to navy to stay legible against
// the now-light card; the red "Gap" badge is unchanged (same alert red
// used elsewhere for gap markers, not part of this ask).
function GapDetailCard({ i, className }: { i: number; className: string }) {
  return (
    <Card
      className={cn(
        'z-30 overflow-visible border-navy/10 bg-gradient-to-r from-white/75 to-white/25 text-left shadow-xl shadow-navy/20 backdrop-blur-lg',
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className="border-transparent bg-[#E8433D] px-2 text-xs text-white">Gap</Badge>
          <span className="font-mono text-[11px] text-navy/50">
            {gapStages[i].name} → {gapStages[i + 1].name}
          </span>
        </div>
      </CardHeader>
      <CardContent className="text-xs text-navy/80">
        <p className="font-medium leading-relaxed">{gapLeaks[i].desc}</p>
      </CardContent>
    </Card>
  );
}

export default function GapDiagram() {
  const [activeGap, setActiveGap] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Float-in from the bottom, same character used across the site
  // (CoherenzPerspective.astro, ActionAndClosing.astro, insights.astro,
  // HeroDuplicate.astro): 28px travel, 1500ms, strong ease-out,
  // IntersectionObserver-triggered since this section is below the fold.
  // Implemented via React state + inline style rather than a `.float-up`
  // CSS class, since this is a React island -- Astro's scoped <style>
  // blocks used for that class elsewhere don't reach into .tsx files.
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

  // The 5 stage nodes (OPPORTUNITY -> OUTCOME) pop in one at a time --
  // grow past full size then settle, like the stat-callout emphasis
  // elsewhere on the site (ArticleBody.astro's .stat-value): scale(0.6) ->
  // overshoot -> scale(1) via the ease-out-back curve. All five flip
  // "visible" together on one IntersectionObserver hit; each node's own
  // transitionDelay (i * NODE_POP_DURATION) is what makes them appear to
  // go one at a time rather than simultaneously.
  const NODE_POP_DURATION = 700;
  const [nodesVisible, setNodesVisible] = useState(false);

  useEffect(() => {
    if (reducedMotionRef.current) {
      setNodesVisible(true);
      return;
    }
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNodesVisible(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Container-background click-to-close (the PDE-OS wheel's approach)
  // doesn't work here -- the wheel has a sparse canvas with lots of exposed
  // background; this row is fully tiled edge-to-edge by stage/gap columns,
  // so there's barely any of the row's own background exposed to click on.
  // A document-level listener closes on any click outside the row instead.
  useEffect(() => {
    if (activeGap === null) return;
    function handleOutsideClick(e: MouseEvent) {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setActiveGap(null);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [activeGap]);

  return (
    <section id="problem" className="relative flex flex-col bg-navy pt-10 sm:pt-14 pb-8 sm:pb-10 lg:min-h-[88vh]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1536px] flex-1 flex-col px-6 sm:px-8 lg:px-10 xl:px-14">
        <div
          ref={headingRef}
          className="mx-auto max-w-2xl text-center"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: reducedMotionRef.current
              ? 'none'
              : 'opacity 1500ms cubic-bezier(0.23, 1, 0.32, 1), transform 1500ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.375em] text-orange">The Master Value Flow</p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Where does value go?</h2>
          <p className="mt-2 text-white/70">
            Value can leak at every handoff between opportunity and outcome. The problem isn't simply slow
            delivery — it's value lost along the way. Coherenz helps identify where the leakage occurs and
            focus intervention where it matters most.
          </p>
          <p className="mt-3 text-xs uppercase tracking-wide text-white/40">Click on a gap to see details</p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-6 sm:px-10 sm:py-8">
        <div ref={rowRef} className="relative flex w-full flex-col min-[960px]:flex-row min-[960px]:items-start">
          <div
            className="pointer-events-none absolute hidden min-[960px]:block"
            style={{
              top: '104.5px',
              left: '-40px',
              right: '-30px',
              height: '2px',
              background: 'linear-gradient(to right, rgba(185,194,200,0.12), rgba(185,194,200,1))',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute hidden h-[10px] w-[10px] rounded-full border-2 border-white bg-white min-[960px]:block"
            style={{ top: '100.5px', right: '-40px', boxShadow: glowStyle('#b9c2c8').boxShadow }}
            aria-hidden="true"
          />
          {gapStages.map((stage, i) => {
            const StageIcon = stageIcons[i];
            return (
            <Fragment key={stage.name}>
              <div
                className="flex items-center gap-[18px] py-3.5 text-left min-[960px]:flex-[1.9_1_0] min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-2.5 min-[960px]:py-0 min-[960px]:pt-10 min-[960px]:text-center"
              >
                {/* Desktop-only: title moved above the circle. Mobile keeps
                    the title grouped with the subtitle beside the circle
                    (a second, mobile-only copy further down) since there's
                    no "above/below the node" row to place it in there. */}
                <p
                  className="hidden text-base font-extrabold uppercase tracking-wide min-[960px]:mb-[17.5px] min-[960px]:block"
                  style={{ color: stageFamilyColors[i] }}
                >
                  {stage.name}
                </p>
                <div className="relative h-[38px] w-[38px] shrink-0 min-[960px]:mx-auto min-[960px]:mb-3 min-[960px]:h-[48px] min-[960px]:w-[48px]">
                  <div
                    className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-[6px] min-[960px]:h-[48px] min-[960px]:w-[48px]"
                    style={{
                      color: stageCircleColors[i],
                      borderColor: rgba(stageCircleColors[i], 0.5),
                      // White-hot core (same off-centre hotspot position as
                      // the Hero's glowSprite) blending into the pastel fill,
                      // instead of a flat single tone.
                      background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${pastel(stageCircleColors[i])} 65%, ${pastel(stageCircleColors[i])} 100%)`,
                      // Extra tight, high-opacity layer hugging the border
                      // ring itself (on top of glowStyle's wider ambient
                      // halo below) -- a crisp rim-glow right at the edge,
                      // distinct from the soft glow around the whole shape.
                      boxShadow: `0 0 6px 2px ${rgba(stageCircleColors[i], 0.9)}, ${glowStyle(stageCircleColors[i]).boxShadow}`,
                      opacity: nodesVisible ? 1 : 0,
                      transform: nodesVisible ? 'scale(1)' : 'scale(0.6)',
                      transitionProperty: 'opacity, transform',
                      transitionDuration: `${NODE_POP_DURATION}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: reducedMotionRef.current ? '0ms' : `${i * NODE_POP_DURATION}ms`,
                    }}
                  >
                    <StageIcon className="h-[15px] w-[15px] min-[960px]:h-[22px] min-[960px]:w-[22px]" strokeWidth={1.6} />
                  </div>
                </div>
                <div>
                  <p
                    className="text-base font-extrabold uppercase tracking-wide min-[960px]:hidden"
                    style={{ color: stageFamilyColors[i] }}
                  >
                    {stage.name}
                  </p>
                  <p className="mt-2.5 text-[13px] leading-[1.55] text-white/60 min-[960px]:mt-0">{stage.desc}</p>
                </div>
              </div>

              {i < gapLeaks.length && (
                <div
                  key={`leak-${stage.name}`}
                  className="relative flex items-start gap-[18px] py-3.5 pl-[37px] text-left min-[960px]:flex-1 min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-1.5 min-[960px]:py-0 min-[960px]:pl-1.5 min-[960px]:pt-[134px] min-[960px]:text-center"
                >
                  {/* Desktop-only: the "!" badge moves onto the connector
                      line, centered between this gap's two flanking nodes
                      (mobile keeps it inline in the dots row below, where
                      there's no line to sit on). Clickable -- opens a detail
                      card, same interaction as the PDE-OS wheel's nodes. */}
                  <button
                    type="button"
                    onClick={() => setActiveGap(activeGap === i ? null : i)}
                    aria-expanded={activeGap === i}
                    aria-label={`Gap between ${gapStages[i].name} and ${gapStages[i + 1].name}`}
                    className={cn(
                      'absolute left-1/2 top-[105.5px] hidden h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#E8433D] text-[13px] font-extrabold text-white ring-4 ring-[#E8433D]/20 transition-transform min-[960px]:flex',
                      activeGap === i && 'scale-125 ring-white'
                    )}
                  >
                    !
                  </button>
                  {activeGap === i && (
                    <GapDetailCard
                      i={i}
                      className="absolute left-1/2 top-[132px] hidden w-64 -translate-x-1/2 min-[960px]:block"
                    />
                  )}
                  {/* Mobile-only: the dot-trail + arrow used to lead the
                      eye down to the "!" badge, but that badge now lives
                      on the connector line at desktop (above), so this
                      whole connector is dropped there -- kept here only
                      for mobile's plain top-to-bottom list layout, where
                      there's no line for a badge to ride. */}
                  <div className="flex items-center gap-[7px] min-[960px]:hidden">
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange/90" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange/90" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange/90" />
                    <button
                      type="button"
                      onClick={() => setActiveGap(activeGap === i ? null : i)}
                      aria-expanded={activeGap === i}
                      aria-label={`Gap between ${gapStages[i].name} and ${gapStages[i + 1].name}`}
                      className={cn(
                        'flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#E8433D] text-[13px] font-extrabold text-white ring-4 ring-[#E8433D]/20 transition-transform',
                        activeGap === i && 'scale-125 ring-white'
                      )}
                    >
                      !
                    </button>
                    <div className="flex h-[24px] w-[10px] shrink-0 items-center justify-center">
                      <svg viewBox="0 0 24 10" className="h-[10px] w-[24px] text-orange">
                        <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M16 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14.5px] font-extrabold uppercase tracking-wider text-orange">Gap</p>
                  </div>
                  {/* Positioned against the outer (relative) leak-column,
                      not the narrow flex-item above -- that item only gets
                      as wide as "Gap" itself, nowhere near enough room for
                      the card, and w-full there would just match that. */}
                  {activeGap === i && (
                    <GapDetailCard i={i} className="absolute left-0 right-0 top-full mt-2 block min-[960px]:hidden" />
                  )}
                </div>
              )}
            </Fragment>
            );
          })}
        </div>
        </div>

        <div className="relative mt-8 flex flex-col gap-8 overflow-hidden bg-blue px-8 py-5 text-white sm:flex-row sm:items-start">
          <img
            src={`${base}img/monogram.svg`}
            alt=""
            className="pointer-events-none absolute -right-10 -top-10 w-64 opacity-20"
          />
          {promises.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="relative sm:flex-[0.99]">
              <Icon size={30} strokeWidth={1.8} className="text-orange" />
              <strong className="mt-2 block text-sm uppercase tracking-wide">{title}</strong>
              <span className="mt-1 block text-xs text-white/70">{desc}</span>
            </div>
          ))}
          <p className="relative text-left text-lg sm:flex-[1.6] sm:self-center">
            We identify the leaks.
            <br />
            <strong className="text-orange">We close the gaps.</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
