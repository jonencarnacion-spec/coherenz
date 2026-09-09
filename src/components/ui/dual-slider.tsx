import * as React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// Ported from deloitte.com/southeast-asia's "Our work" dual-animation-slider
// (a two-panel layout: text crossfades on the left, a horizontal image
// carousel with the next slide "peeking" in on the right, plus a linear
// progress bar and prev/next controls). Same item shape as the
// elastic-gallery component it replaces here, so the swap didn't need any
// data changes in DiagnosticTeaser.astro.
interface DualSliderItem {
  id: string;
  title: string;
  q: string;
  /** Optional short blurb rendered under the question. */
  subtitle?: string;
  /** Optional longer paragraph rendered below the subtitle, expanding on the topic. */
  detail?: string;
  src: string;
  alt: string;
}

interface DualSliderProps {
  items: DualSliderItem[];
}

const GAP_PX = 24;
// Width of the next slide's visible sliver at the right edge, matching the
// reference's peek effect -- large enough to read as "there's more here",
// small enough that the active slide still reads as the focus.
const PEEK_PX = 64;

function DualSlider({ items }: DualSliderProps) {
  const [active, setActive] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const total = items.length;
  const item = items[active];

  // Swipe/drag to advance, mirroring the reference's touch behavior --
  // pointer events cover touch, mouse-drag, and pen in one handler rather
  // than separate touch/mouse listeners. Only horizontal drags past a
  // small threshold count, so this doesn't fight vertical page scroll or
  // register accidental taps as swipes.
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const SWIPE_THRESHOLD_PX = 40;

  function handlePointerDown(e: React.PointerEvent) {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  }
  function handlePointerUp(e: React.PointerEvent) {
    const start = dragStartRef.current;
    dragStartRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  }

  React.useEffect(() => {
    function measure() {
      const parent = trackRef.current?.parentElement;
      if (parent) setSlideWidth(parent.clientWidth - PEEK_PX);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = (dir: 1 | -1) => setActive((prev) => Math.min(total - 1, Math.max(0, prev + dir)));

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-center">
      <div className="md:w-[36%] md:shrink-0">
        {/* key forces a remount on slide change, same as the reference's
            left-panel content swap. */}
        <div key={item.id}>
          <span className="inline-block rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy/60">
            {item.id}
          </span>
          <h3 className="mt-4 font-serif text-[34px] text-navy">{item.title}</h3>
          <p className="mt-3 text-lg font-semibold text-navy">{item.q}</p>
          {item.subtitle && <p className="mt-3 text-sm text-foreground/70">{item.subtitle}</p>}
          {item.detail && <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.detail}</p>}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-0.5 flex-1 bg-line">
            <div
              className="h-full bg-orange transition-all duration-500"
              style={{ width: `${((active + 1) / total) * 100}%` }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-3 text-navy/60">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={active === 0}
              aria-label="Previous"
              className="transition-opacity disabled:opacity-30"
            >
              <IconChevronLeft size={18} />
            </button>
            <span className="font-mono text-sm">
              {active + 1}/{total}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={active === total - 1}
              aria-label="Next"
              className="transition-opacity disabled:opacity-30"
            >
              <IconChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative w-full touch-pan-y overflow-hidden md:flex-1"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ gap: `${GAP_PX}px`, transform: `translateX(-${active * (slideWidth + GAP_PX)}px)` }}
        >
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              // The active slide has no "elsewhere" to jump to, so clicking
              // it advances instead of re-selecting itself (a no-op); every
              // other slide (the next one peeking at the right edge) still
              // jumps straight to that slide, same as before.
              onClick={() => (i === active ? go(1) : setActive(i))}
              className="h-[260px] shrink-0 cursor-pointer overflow-hidden border border-line text-left md:h-[529px]"
              style={{ width: slideWidth || '100%' }}
              aria-label={i === active ? 'Show next' : `Show ${it.title}`}
            >
              <img src={it.src} alt={it.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { DualSlider };
