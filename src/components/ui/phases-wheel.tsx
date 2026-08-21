import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { pdeosStages, ellipsePoint } from '../../data/pdeosWheel';
import { pdeosPhaseDetails, economicSpine } from '../../data/pdeosPhaseDetails';
import PdeosFlow from './pdeos-flow';
import { base } from '../../lib/base';
import './pdeos-flow.css';

// Ported from assets/html references/PDE-OS_Part1_Foundation.html's
// "Operating Model" section: a static wheel of 7 nodes (Option A layout in
// that file) where clicking a node updates a detail panel below it, instead
// of the homepage's animated orbital wheel (PdeosWheel.tsx, shown directly
// above this section on the page). Node color/order reuses ../../data/pdeosWheel
// so both wheels agree. Detail-panel copy (purpose/outcome/goal/roles/spine
// tags/flow) comes from ../../data/pdeosPhaseDetails, ported programmatically
// from the same reference file -- see that data file's header comment for
// what was intentionally left out (whyMatters research asides).
const spineOrder = economicSpine.map((s) => s.name);
const N = pdeosStages.length;

export default function PhasesWheel() {
  const [active, setActive] = useState(0);
  const stage = pdeosStages[active];
  const detail = pdeosPhaseDetails[active];
  const prevIndex = (active - 1 + N) % N;
  const nextIndex = (active + 1) % N;

  // Whichever control changes the phase -- a wheel node, or Previous/Next --
  // the view should jump back to the top of the section instead of leaving
  // the user scrolled deep into the previous phase's (much longer) content.
  // Scrolling this component's own root (the wheel/card row) flush to the
  // viewport top put the phase title right under the fixed nav bar, which
  // then overlapped it -- scrolling the outer "Operating Model" section
  // (with its own heading above this row) leaves enough clearance instead.
  const rootRef = useRef<HTMLDivElement>(null);
  function goToPhase(i: number) {
    setActive(i);
    const section = rootRef.current?.closest('section');
    (section ?? rootRef.current)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Sticky-centers the wheel while scrolling through the (much taller) detail
  // panel. A transform-based `top-1/2 -translate-y-1/2` looks equivalent but
  // isn't: the translate happens after sticky's own containing-block clamping,
  // so it can push the element above its parent's top edge and overlap the
  // "Seven Phases" heading above this row. Baking the offset directly into
  // `top` (measured from the wheel's own rendered height) keeps it inside
  // the browser's native sticky clamping, so it can never escape upward.
  const wheelRef = useRef<HTMLDivElement>(null);
  const [wheelHeight, setWheelHeight] = useState(0);
  const [isLgUp, setIsLgUp] = useState(false);
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWheelHeight(entry.contentRect.height));
    observer.observe(el);
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsLgUp(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsLgUp(e.matches);
    mq.addEventListener('change', onChange);
    return () => {
      observer.disconnect();
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
      <div
        ref={wheelRef}
        className="relative aspect-square w-full max-w-[420px] shrink-0 lg:sticky"
        style={isLgUp && wheelHeight ? { top: `calc(50% - ${wheelHeight / 2}px)` } : undefined}
      >
        <div className="absolute inset-[8%] rounded-full border-2 border-dotted border-navy/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Same center-bubble branding as the homepage's PdeosWheel above,
              minus its animate-pulse/animate-ping -- this wheel is static, so
              the ongoing animation would be motion with no purpose here. */}
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full bg-gradient-to-br from-orange via-yellow to-green">
            <div className="flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full bg-white px-3 text-center">
              <img src={`${base}img/logo-navy.svg`} alt="Coherenz" className="h-4" />
              <p className="mt-1.5 text-[11px] font-extrabold uppercase leading-tight text-navy">
                PDE-OS™
                <br />
                7-Stage Wheel
              </p>
            </div>
          </div>
        </div>
        {pdeosStages.map((s, i) => {
          const pos = ellipsePoint(50, 50, 41, i * (360 / N));
          const isActive = i === active;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => goToPhase(i)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute flex w-[92px] cursor-pointer -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              aria-pressed={isActive}
            >
              <span
                className={cn(
                  'flex items-center justify-center rounded-full font-extrabold text-white shadow-sm transition-all duration-200',
                  isActive ? 'h-[60px] w-[60px] text-lg ring-4 ring-orange/30' : 'h-11 w-11 text-base'
                )}
                style={{ backgroundColor: s.color }}
              >
                {i + 1}
              </span>
              <span className={cn('text-xs font-bold uppercase leading-tight', isActive ? 'text-orange' : 'text-navy')}>
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex w-full min-w-0 flex-col gap-6">
        <div className="border border-line bg-white p-6 sm:p-8">
        <div className="relative -mx-6 -mt-6 overflow-hidden border-b border-line bg-cream px-6 pt-6 pb-4 text-center sm:-mx-8 sm:-mt-8 sm:px-8 sm:pt-8">
          <img
            src={`${base}img/monogram.svg`}
            alt=""
            className="pointer-events-none absolute -right-10 -top-10 w-48 opacity-20"
          />
          <span
            className="relative inline-flex h-[60px] w-[60px] items-center justify-center rounded-full text-lg font-extrabold text-white ring-4 ring-orange/30"
            style={{ backgroundColor: stage.color }}
          >
            {active + 1}
          </span>
          <h3 className="relative mt-3 font-serif text-2xl text-navy">{stage.name}</h3>
          <p className="relative mt-1 text-sm italic text-foreground/60">&ldquo;{detail.exq}&rdquo;</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-wash-blue p-4 text-center sm:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange">Purpose</p>
            <p className="mt-1 text-sm text-navy">{detail.purpose}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange">Primary Outcome</p>
            <p className="mt-1 text-sm text-navy">{detail.outcome}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange">Economic Goal</p>
            <p className="mt-1 text-sm text-navy">{detail.goal}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs font-bold uppercase tracking-wide text-blue">Primary roles in this phase</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {detail.roles.map((role) => (
            <span key={role} className="rounded-full border border-line bg-wash-blue px-3 py-1 text-xs font-bold text-blue">
              {role}
            </span>
          ))}
        </div>
        {detail.roleNote && <p className="mt-3 text-center text-xs italic text-foreground/50">{detail.roleNote}</p>}

        <p className="mt-8 text-center text-xs font-bold uppercase tracking-wide text-blue">What happens inside this phase</p>
        <div className="mt-4">
          <PdeosFlow flow={detail.flow} phaseKey={active} />
        </div>

        <p className="mt-8 text-center text-xs font-bold uppercase tracking-wide text-blue">Economic spine emphasis</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {spineOrder.map((s) => (
            <span
              key={s}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-bold',
                detail.spineTags.includes(s) ? 'border-navy bg-navy text-white' : 'border-line bg-wash-blue text-blue'
              )}
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-foreground/70">
          <span className="font-bold text-navy">Practices used here: </span>
          {detail.practices}
        </p>

        {detail.whyMatters && (
          <>
            <p className="mt-8 text-center text-sm font-extrabold uppercase tracking-wide text-orange">Why this matters</p>
            <div className="pdeos-detail mt-4" dangerouslySetInnerHTML={{ __html: detail.whyMatters }} />
          </>
        )}

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
          <button type="button" onClick={() => goToPhase(prevIndex)} className="flex cursor-pointer flex-col items-start gap-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wide text-foreground/40">Previous Phase</span>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold text-white shadow-sm"
              style={{ backgroundColor: pdeosStages[prevIndex].color }}
            >
              {prevIndex + 1}
            </span>
            <span className="text-sm font-bold text-navy">{pdeosStages[prevIndex].name}</span>
          </button>
          <button type="button" onClick={() => goToPhase(nextIndex)} className="flex cursor-pointer flex-col items-end gap-2 text-right">
            <span className="text-xs font-bold uppercase tracking-wide text-foreground/40">Next Phase</span>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold text-white shadow-sm"
              style={{ backgroundColor: pdeosStages[nextIndex].color }}
            >
              {nextIndex + 1}
            </span>
            <span className="text-sm font-bold text-navy">{pdeosStages[nextIndex].name}</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
