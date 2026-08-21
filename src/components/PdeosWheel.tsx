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

export default function PdeosWheel() {
  return (
    <section id="pdeos-wheel-section" className="flex flex-col justify-center bg-wash-green py-8 sm:py-10 lg:min-h-screen">
      <div className="mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.375em] text-orange">Coherenz PDE-OS™</p>
          <h2 className="mt-3 whitespace-nowrap font-serif text-4xl text-navy sm:text-5xl">The Product Delivery Economics Framework</h2>
          <p className="mt-3 text-foreground/70">
            One continuous cycle for turning delivery into measurable value.
            <br />
            Seven stages, one economic thread — from first idea to the lesson that sharpens the next bet.
          </p>
          <p className="mt-3">
            <a href={`${base}approach`} className="font-bold text-orange">
              See the full framework →
            </a>
          </p>
        </div>
      </div>

      <PdeosOrbitalComparison />

      <div className="mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="relative mt-4 flex flex-col gap-8 overflow-hidden rounded-2xl bg-navy px-8 py-5 text-white sm:flex-row sm:items-center">
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
