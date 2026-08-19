import { Fragment } from 'react';
import { gapStages, gapLeaks } from '../data/gapDiagram';
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

// DESIGN.md §4 concept-category picks. Opportunity/Delivery reuse the exact
// mappings DESIGN.md's own PDE-OS table gives Discover/Deliver, since those
// stages are conceptually the same idea (finding opportunity, executing).
const stageIcons = [IconRadar, IconCoin, IconHammer, IconBolt, IconTrendingUp];

// Glossy 3D-sphere recipes, one per stage, each built from a DESIGN.md
// palette hue (blue/orange/yellow/green) plus the red already used for this
// diagram's own gap indicators (§ the "!" badges below) as the 5th hue —
// light highlight tint -> brand mid tone -> deep shaded edge, matching the
// photographed glossy orb in the "What We Help Solve" card art.
const sphereGradients = [
  'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 14%), radial-gradient(circle at 32% 30%, #bfe6ff 0%, #4fa6e8 42%, #1b5fa6 76%, #0b2e52 100%)',
  'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 14%), radial-gradient(circle at 32% 30%, #ffe2b0 0%, #f0a83a 42%, #b06a12 76%, #5c3405 100%)',
  'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 14%), radial-gradient(circle at 32% 30%, #fff2c2 0%, #f0c040 42%, #b8860f 76%, #4a3505 100%)',
  'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 14%), radial-gradient(circle at 32% 30%, #a8e6cf 0%, #1f9370 42%, #174e40 76%, #062017 100%)',
  'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 14%), radial-gradient(circle at 32% 30%, #ffcdc4 0%, #e2574a 42%, #a3352a 76%, #4a120c 100%)',
];
const sphereShadow =
  'inset -14px -14px 26px rgba(0,10,30,0.45), inset 8px 8px 16px rgba(255,255,255,0.5), 0 14px 28px rgba(10,30,55,0.35)';

export default function GapDiagram() {
  return (
    <section id="problem" className="relative overflow-hidden bg-wash-blue py-16 sm:py-24">
      <div className="-mt-16 mb-10 flex h-12 items-center bg-blue sm:-mt-24 sm:mb-14">
        <div className="mx-auto w-full max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
          <p className="text-base font-bold text-white">Our Diagnosis</p>
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.375em] text-orange">The Master Value Flow</p>
          <h2 className="mt-4 font-serif text-4xl text-navy sm:text-5xl">Where does value go?</h2>
          <p className="mt-3 text-foreground/70">
            Value can leak at every handoff between opportunity and outcome. The problem isn't simply slow
            delivery — it's value lost along the way. Coherenz helps identify where the leakage occurs and
            focus intervention where it matters most.
          </p>
        </div>

        <div className="mt-[76px] flex flex-col min-[960px]:flex-row min-[960px]:items-start">
          {gapStages.map((stage, i) => {
            const StageIcon = stageIcons[i];
            return (
            <Fragment key={stage.name}>
              <div
                className="flex items-center gap-[18px] py-3.5 text-left min-[960px]:flex-[1.9_1_0] min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-2.5 min-[960px]:py-0 min-[960px]:text-center"
              >
                <div className="relative h-[76px] w-[76px] shrink-0 min-[960px]:mx-auto min-[960px]:mb-[22px] min-[960px]:h-[130px] min-[960px]:w-[130px]">
                  <div className="absolute left-1/2 top-1/2 h-[91px] w-[91px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#BFC7D1] min-[960px]:h-[156px] min-[960px]:w-[156px]" />
                  <div
                    className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full min-[960px]:h-[130px] min-[960px]:w-[130px]"
                    style={{
                      color: '#ffffff',
                      background: sphereGradients[i],
                      boxShadow: sphereShadow,
                    }}
                  >
                    <StageIcon className="h-[30px] w-[30px] min-[960px]:h-[52px] min-[960px]:w-[52px]" strokeWidth={1.6} />
                  </div>
                </div>
                <div>
                  <p className="text-base font-extrabold uppercase tracking-wide text-navy">{stage.name}</p>
                  <p className="mt-2.5 text-[13px] leading-[1.55] text-[#5A6478]">{stage.desc}</p>
                </div>
              </div>

              {i < gapLeaks.length && (
                <div
                  key={`leak-${stage.name}`}
                  className="flex items-start gap-[18px] py-3.5 pl-[37px] text-left min-[960px]:flex-1 min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-1.5 min-[960px]:py-0 min-[960px]:pl-1.5 min-[960px]:text-center"
                >
                  <div className="hidden h-[130px] items-center justify-center gap-1 text-navy min-[960px]:flex">
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#C7CCD8]" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#C7CCD8]" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#C7CCD8]" />
                    <svg viewBox="0 0 24 10" className="h-[14px] w-[34px] shrink-0">
                      <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M16 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-[7px] min-[960px]:mx-auto min-[960px]:mt-11 min-[960px]:flex-col">
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange" />
                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#E8433D] text-[13px] font-extrabold text-white ring-4 ring-[#E8433D]/20">
                      !
                    </span>
                    <div className="flex h-[24px] w-[10px] shrink-0 items-center justify-center min-[960px]:mt-[7px] min-[960px]:h-[10px] min-[960px]:w-[24px]">
                      <svg viewBox="0 0 24 10" className="h-[10px] w-[24px] text-orange min-[960px]:rotate-90">
                        <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M16 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14.5px] font-extrabold uppercase tracking-wider text-orange min-[960px]:mt-3.5">Gap</p>
                    <p className="mt-1.5 flex min-h-[84px] items-center justify-center rounded-[6px] border border-white/60 bg-white/25 px-3 py-2 text-[14.5px] font-medium leading-[1.55] text-[#5A6478] shadow-lg backdrop-blur-md min-[960px]:relative min-[960px]:left-1/2 min-[960px]:mt-1.5 min-[960px]:w-[190%] min-[960px]:-translate-x-1/2">
                      {gapLeaks[i].desc}
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col gap-8 rounded-2xl bg-navy px-8 py-7 text-white sm:flex-row sm:items-start">
          {promises.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="sm:flex-[0.99]">
              <Icon size={30} strokeWidth={1.8} className="text-orange" />
              <strong className="mt-2 block text-sm">{title}</strong>
              <span className="mt-1 block text-xs text-white/70">{desc}</span>
            </div>
          ))}
          <p className="text-left text-lg sm:flex-[1.6] sm:self-center">
            We identify the leaks.
            <br />
            <strong className="text-orange">We close the gaps.</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
