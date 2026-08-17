import { base } from '../lib/base';
import { gapStages, gapLeaks } from '../data/gapDiagram';
import { IconTarget, IconAlignBoxLeftMiddle, IconArrowsSplit, IconTargetArrow } from '@tabler/icons-react';

const promises = [
  { icon: IconTarget, title: 'See the Gaps', desc: 'Make hidden friction visible.' },
  { icon: IconAlignBoxLeftMiddle, title: 'Focus Where It Matters', desc: 'Prioritize the highest value leaks.' },
  { icon: IconArrowsSplit, title: 'Improve Flow', desc: 'Remove friction. Increase throughput.' },
  { icon: IconTargetArrow, title: 'Drive Outcomes', desc: 'Turn delivery into measurable value.' },
];

export default function GapDiagram() {
  return (
    <section id="problem" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-1 w-12 rounded-full bg-orange" />
          <h2 className="mt-4 font-serif text-4xl text-navy sm:text-5xl">The Delivery Gap Diagram</h2>
          <p className="mt-3 text-foreground/70">
            Value leaks between strategy and outcomes.
            <br />
            We help you close the gaps that matter.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-2 gap-y-10">
          {gapStages.map((stage, i) => (
            <div key={stage.name} className="flex items-start">
              <div className="flex w-[140px] flex-col items-center text-center">
                <div className="relative h-[130px] w-[130px]">
                  <div className="absolute inset-0 rounded-full border border-line" />
                  <div
                    className="absolute inset-[14px] flex items-center justify-center rounded-full"
                    style={{ background: stage.bg, color: stage.iconColor }}
                  >
                    <svg viewBox={stage.viewBox} fill="currentColor" className="h-[52px] w-[52px]">
                      <g transform={stage.iconTransform}>
                        <path d={stage.iconPath} />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="mt-3 font-bold text-navy">{stage.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stage.desc}</p>
              </div>

              {i < gapLeaks.length && (
                <div className="mt-12 flex w-[90px] flex-col items-center px-1 text-center">
                  <div className="flex items-center gap-1 text-line">
                    <span className="h-1 w-1 rounded-full bg-current" />
                    <span className="h-1 w-1 rounded-full bg-current" />
                    <svg viewBox="0 0 24 10" className="w-5 text-line">
                      <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M16 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-destructive">Gap</p>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{gapLeaks[i].desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 rounded-2xl bg-navy px-8 py-10 text-white sm:flex-row sm:justify-between">
          <img src={`${base}img/logo-white.svg`} alt="Coherenz" className="h-7" />
          <p className="text-center text-sm sm:text-left">
            We identify the leaks.
            <br />
            <strong>We close the gaps.</strong>
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {promises.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <div className="flex items-center gap-2">
                  <Icon size={20} strokeWidth={1.8} />
                  <strong className="text-sm">{title}</strong>
                </div>
                <span className="text-xs text-white/70">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl bg-cream px-6 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
            <IconTarget size={20} />
          </div>
          <p className="text-sm text-navy">
            <strong>The Bottom Line:</strong> When the gaps close, <span className="font-bold text-orange">value flows</span> — and outcomes
            follow.
          </p>
        </div>
      </div>
    </section>
  );
}
