import { Fragment } from 'react';
import { base } from '../lib/base';
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

// Same Tabler set used before the "Theory of Constraints 7 Nodes" design
// import (radar/coin/hammer/bolt/trending-up) -- swapped back in over the
// design's own bespoke node SVGs per explicit request, matching the trial
// section (TrialTocNodes.astro) this was ported from. The design's flat
// solid-color circle + halo + number/title/dot-connector treatment stays.
const stageIcons = [IconRadar, IconCoin, IconHammer, IconBolt, IconTrendingUp];

// Per-stage hue, also ported from the imported design -- flat solid fill
// instead of the previous gradient/glossy sphere. Drives the icon circle,
// the "01"-"05" number, the stage title, and the small dot-line-dot cap
// below each node's description. Product is the one stage where the
// source design itself uses two different hues for the same node (a teal
// `#1a8fa0` circle fill against a green `#2aa87f` everywhere else for that
// stage) -- kept exactly as given rather than "corrected" to one color.
const stageFamilyColors = ['#12405f', '#1c6390', '#2aa87f', '#e8c04a', '#e0453a'];
const stageCircleColors = ['#12405f', '#1c6390', '#1a8fa0', '#e8c04a', '#e0453a'];
const sphereShadow = '0 6px 16px rgba(15,32,48,0.16)';

export default function GapDiagram() {
  return (
    <section id="problem" className="relative bg-wash-blue pt-10 sm:pt-14 pb-8 sm:pb-10">
      <div className="relative z-10 mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.375em] text-orange">The Master Value Flow</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">Where does value go?</h2>
          <p className="mt-2 text-foreground/70">
            Value can leak at every handoff between opportunity and outcome. The problem isn't simply slow
            delivery — it's value lost along the way. Coherenz helps identify where the leakage occurs and
            focus intervention where it matters most.
          </p>
        </div>

        <div className="mt-8 px-6 py-6 sm:mt-10 sm:px-10 sm:py-8">
        <div className="relative flex flex-col min-[960px]:flex-row min-[960px]:items-start">
          {/* Dashed connector line, ported from the imported design's trial
              copy (TrialTocNodes.astro) -- there it ran above the nodes;
              here it's repositioned to cross through the exact vertical
              center of the node circles instead. */}
          <div
            className="pointer-events-none absolute hidden border-t-[3px] border-dashed border-[#b9c2c8] min-[960px]:block"
            style={{ top: '104px', left: '-40px', right: '-26px' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute hidden min-[960px]:block"
            style={{
              top: '98.5px',
              right: '-40px',
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderLeft: '14px solid #b9c2c8',
            }}
            aria-hidden="true"
          />
          {gapStages.map((stage, i) => {
            const StageIcon = stageIcons[i];
            return (
            <Fragment key={stage.name}>
              <div
                className="flex items-center gap-[18px] py-3.5 text-left min-[960px]:flex-[1.9_1_0] min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-2.5 min-[960px]:py-0 min-[960px]:text-center"
              >
                <p
                  className="hidden text-[36px] font-extrabold leading-none min-[960px]:mb-[20px] min-[960px]:block"
                  style={{ color: stageFamilyColors[i] }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="relative h-[76px] w-[76px] shrink-0 min-[960px]:mx-auto min-[960px]:mb-3 min-[960px]:h-[96px] min-[960px]:w-[96px]">
                  <div className="absolute left-1/2 top-1/2 h-[91px] w-[91px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6f7f7] min-[960px]:h-[114px] min-[960px]:w-[114px]" />
                  <div
                    className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full min-[960px]:h-[96px] min-[960px]:w-[96px]"
                    style={{
                      color: '#ffffff',
                      background: stageCircleColors[i],
                      boxShadow: sphereShadow,
                    }}
                  >
                    <StageIcon className="h-[30px] w-[30px] min-[960px]:h-[44px] min-[960px]:w-[44px]" strokeWidth={1.6} />
                  </div>
                </div>
                <div>
                  <p className="text-base font-extrabold uppercase tracking-wide" style={{ color: stageFamilyColors[i] }}>
                    {stage.name}
                  </p>
                  <p className="mt-2.5 text-[13px] leading-[1.55] text-[#5A6478]">{stage.desc}</p>
                </div>
              </div>

              {i < gapLeaks.length && (
                <div
                  key={`leak-${stage.name}`}
                  className="relative flex items-start gap-[18px] py-3.5 pl-[37px] text-left min-[960px]:flex-1 min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-1.5 min-[960px]:py-0 min-[960px]:pl-1.5 min-[960px]:pt-[128px] min-[960px]:text-center"
                >
                  {/* Small node, ported from the imported design's trial
                      copy (TrialTocNodes.astro) -- rides the dashed line
                      at this stage's own color, alongside (not replacing)
                      the existing red gap badge below. */}
                  <div
                    className="pointer-events-none absolute left-1/2 hidden h-[26px] w-[26px] -translate-x-1/2 items-center justify-center rounded-full bg-[#f6f7f7] min-[960px]:flex"
                    style={{ top: '91px', border: `3px solid ${stageFamilyColors[i]}` }}
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-[7px] min-[960px]:mx-auto min-[960px]:mt-[64px] min-[960px]:flex-col">
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange/90" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange/90" />
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-orange/90" />
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
                    <p className="text-[14.5px] font-extrabold uppercase tracking-wider text-orange min-[960px]:mt-2">Gap</p>
                    <p className="mt-1.5 flex h-[86px] items-center justify-center border border-white/60 bg-white/25 px-3 py-2 text-[14.5px] font-medium leading-[1.55] text-[#5A6478] shadow-lg backdrop-blur-md min-[960px]:relative min-[960px]:left-1/2 min-[960px]:mt-1.5 min-[960px]:w-[190%] min-[960px]:-translate-x-1/2">
                      {gapLeaks[i].desc}
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
            );
          })}
        </div>
        </div>

        <div className="relative mt-8 flex flex-col gap-8 overflow-hidden bg-navy px-8 py-5 text-white sm:flex-row sm:items-start">
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
