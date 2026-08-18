import { base } from '../lib/base';
import { pdeosStages, ellipsePoint } from '../data/pdeosWheel';

const CX = 50;
const CY = 50;
const R = 34;
const PAD_DEG = 17.5;
const N = pdeosStages.length;
const STEP = 360 / N;

export default function PdeosWheel() {
  

  const arcs = Array.from({ length: N }, (_, i) => {
    const p1 = ellipsePoint(CX, CY, R, i * STEP + PAD_DEG);
    const p2 = ellipsePoint(CX, CY, R, (i + 1) * STEP - PAD_DEG);
    return `M${p1.x},${p1.y} A${R},${R} 0 0 1 ${p2.x},${p2.y}`;
  });

  return (
    <section id="pdeos-wheel-section" className="bg-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="h-1 w-12 rounded-full bg-orange" />
            <h2 className="mt-4 font-serif text-4xl text-navy sm:text-5xl">The Product Delivery Economics Framework</h2>
            <p className="mt-3 text-foreground/70">
              One continuous cycle for turning delivery into measurable value.
              <br />
              Seven stages, one economic thread — from first idea to the lesson that sharpens the next bet.
            </p>
            <a href={`${base}approach`} className="mt-7 inline-block rounded-full border-2 border-orange px-6 py-3 text-sm font-bold text-orange">
              See the full framework →
            </a>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <marker id="pdeosArrow" markerUnits="userSpaceOnUse" markerWidth="1.8" markerHeight="1.8" refX="0.9" refY="0.9" orient="auto">
                  <path d="M0.2,0.2 L1.4,0.9 L0.2,1.6" fill="none" stroke="#C7CCD8" strokeWidth="0.35" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              {arcs.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#C7CCD8"
                  strokeWidth="0.3"
                  strokeDasharray="0.15 1"
                  strokeLinecap="round"
                  markerEnd="url(#pdeosArrow)"
                />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 h-[32.75%] w-[32.75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/10" />
            <div className="absolute left-1/2 top-1/2 flex h-[32.75%] w-[32.75%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy px-4 text-center text-white shadow-lg">
              <img src={`${base}img/logo-white.svg`} alt="Coherenz" className="h-4" />
              <p className="mt-2 text-sm font-extrabold uppercase leading-tight">
                PDE-OS™
                <br />
                7-Stage Wheel
              </p>
              <p className="mt-1 text-[10px] text-white/70">A continuous cycle for turning product delivery into measurable value.</p>
            </div>

            {pdeosStages.map((stage, i) => {
              const pos = ellipsePoint(CX, CY, R, i * STEP);
              return (
                <div
                  key={stage.name}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white shadow-md ring-4 ring-white"
                    style={{ background: stage.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="mt-1 text-[11px] font-bold text-navy">{stage.name}</p>
                  <p className="w-20 text-[9.5px] leading-tight text-muted-foreground">{stage.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
