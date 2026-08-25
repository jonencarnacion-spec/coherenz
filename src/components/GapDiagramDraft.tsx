import { Fragment } from 'react';
import { gapStages, gapLeaks } from '../data/gapDiagram';
import { IconRadar, IconCoin, IconHammer, IconBolt, IconTrendingUp } from '@tabler/icons-react';

// DRAFT -- exploratory copy of GapDiagram's node row only (no headline, no
// navy promise band), placed above the real section for comparison. Not
// wired into the design system; delete once done experimenting.
const stageIcons = [IconRadar, IconCoin, IconHammer, IconBolt, IconTrendingUp];
// Nodes 1-3's original hues (navy/blue/teal) read fine on the light
// bg-wash-blue section but nearly disappear against this draft's bg-navy
// -- swapped for brighter, higher-contrast tints of the same family
// (still a cool blue->teal progression into nodes 4-5's gold/red) so
// text and borders stay legible here. Off the locked DESIGN.md palette on
// purpose, per explicit go-ahead to bypass it for this draft.
const stageFamilyColors = ['#38bdf8', '#22d3ee', '#2dd4bf', '#e8c04a', '#e0453a'];
const stageCircleColors = ['#38bdf8', '#22d3ee', '#2dd4bf', '#e8c04a', '#e0453a'];

// "Planet" glow, ported from the Hero orbital animation's glowSprite() --
// a bright white-hot core blending into the body's own hue, plus a soft
// wide halo behind it (same gradient-stop shape as glowSprite's radial
// gradient, translated from a canvas sprite into a CSS radial-gradient +
// box-shadow pair).
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
/** Blends a hue 78% toward white for a pastel fill. */
function pastel(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * 0.78);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}
function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function glowStyle(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return {
    background: `radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(${r},${g},${b},0.95) 15%, rgba(${r},${g},${b},0.9) 40%, ${hex} 100%)`,
    boxShadow: `0 0 9.49px 2.59px rgba(${r},${g},${b},0.75), 0 0 22.43px 7.76px rgba(${r},${g},${b},0.49), 0 0 43.99px 15.53px rgba(${r},${g},${b},0.26)`,
  };
}

export default function GapDiagramDraft() {
  return (
    <section className="relative bg-navy pt-10 sm:pt-14 pb-8 sm:pb-10">
      <div className="relative z-10 mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="mt-8 px-6 py-6 sm:mt-10 sm:px-10 sm:py-8">
        <div className="relative flex flex-col min-[960px]:flex-row min-[960px]:items-start">
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
                className="flex items-center gap-[18px] py-3.5 text-left min-[960px]:flex-[1.9_1_0] min-[960px]:min-w-0 min-[960px]:flex-col min-[960px]:items-center min-[960px]:gap-0 min-[960px]:px-2.5 min-[960px]:py-0 min-[960px]:text-center"
              >
                <p
                  className="hidden text-[36px] font-extrabold leading-none min-[960px]:mb-[45.5px] min-[960px]:block"
                  style={{ color: stageFamilyColors[i] }}
                >
                  {String(i + 1).padStart(2, '0')}
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
                      boxShadow: glowStyle(stageCircleColors[i]).boxShadow,
                    }}
                  >
                    <StageIcon className="h-[15px] w-[15px] min-[960px]:h-[22px] min-[960px]:w-[22px]" strokeWidth={1.6} />
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
      </div>
    </section>
  );
}
