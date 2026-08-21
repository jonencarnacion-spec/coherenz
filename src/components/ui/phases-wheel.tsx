import { useState } from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { pdeosStages, ellipsePoint } from '../../data/pdeosWheel';
import { pdeosPhaseDetails, economicSpine } from '../../data/pdeosPhaseDetails';
import PdeosFlow from './pdeos-flow';
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

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
      <div className="relative aspect-square w-full max-w-[420px] shrink-0 lg:sticky lg:top-28">
        <div className="absolute inset-[8%] rounded-full border-2 border-dotted border-navy/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-extrabold uppercase leading-tight text-navy">
            Product
            <br />
            Delivery Economics
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-navy/40">One continuous loop</p>
        </div>
        {pdeosStages.map((s, i) => {
          const pos = ellipsePoint(50, 50, 41, i * (360 / N));
          const isActive = i === active;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(i)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute flex w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              aria-pressed={isActive}
            >
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold text-white shadow-sm transition-transform duration-200',
                  isActive && 'scale-110 ring-4 ring-orange/30'
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

      <div className="w-full min-w-0 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <div className="text-center">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white"
            style={{ backgroundColor: stage.color }}
          >
            {active + 1}
          </span>
          <h3 className="mt-3 font-serif text-2xl text-navy">{stage.name}</h3>
          <p className="mt-1 text-sm italic text-foreground/60">&ldquo;{detail.exq}&rdquo;</p>
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

        <p className="mt-6 text-center text-xs font-bold uppercase tracking-wide text-blue">Economic spine emphasis</p>
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

        <p className="mt-8 text-center text-xs font-bold uppercase tracking-wide text-blue">What happens inside this phase</p>
        <div className="mt-4">
          <PdeosFlow flow={detail.flow} phaseKey={active} />
        </div>

        <p className="mt-6 text-center text-sm text-foreground/70">
          <span className="font-bold text-navy">Practices used here: </span>
          {detail.practices}
        </p>

        {detail.whyMatters && (
          <>
            <p className="mt-8 text-center text-xs font-bold uppercase tracking-wide text-blue">Why this matters</p>
            <div className="pdeos-detail mt-4" dangerouslySetInnerHTML={{ __html: detail.whyMatters }} />
          </>
        )}

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setActive(prevIndex)}
            className="flex items-center gap-2 text-sm font-bold text-navy hover:text-orange"
          >
            <IconArrowLeft size={18} />
            {pdeosStages[prevIndex].name}
          </button>
          <button
            type="button"
            onClick={() => setActive(nextIndex)}
            className="flex items-center gap-2 text-sm font-bold text-navy hover:text-orange"
          >
            {pdeosStages[nextIndex].name}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
