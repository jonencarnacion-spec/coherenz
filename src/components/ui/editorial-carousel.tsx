// Editorial index-number carousel, adapted from a pasted "testimonials"
// reference into this project's conventions rather than copied verbatim:
// - Repurposed for a list of { text, category } questions instead of
//   testimonial objects -- the whole author/role/company/avatar block
//   (next/image, hover-reveal, grayscale-to-color) is dropped entirely,
//   since there's no person/photo to attribute a question to. `category`
//   renders as a pill below the question (same style as the hero's
//   capability-lens tags) instead of the author's role/company line.
// - next/image swapped for nothing (no image left to render); this isn't
//   a Next.js project.
// - lucide-react's ChevronLeft/ChevronRight swapped for the already-used
//   @tabler/icons-react equivalents (DESIGN.md §4: "Don't mix Tabler with
//   other icon libraries").
// - text-foreground/text-muted-foreground (designed for a light card)
//   swapped for text-white/text-white/60/text-white/10, since this renders
//   on jon.astro's dark bg-navy "Questions Behind the Work" section.
// - The quote's `font-light` swapped for `font-serif` to match this
//   project's headline face (DESIGN.md §2 -- DM Serif Display, weight 400
//   only) instead of a light-weight sans cut.
import { useRef, useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export interface EditorialCarouselItem {
  text: string;
  category: string;
}

interface EditorialCarouselProps {
  items: EditorialCarouselItem[];
}

export default function EditorialCarousel({ items }: EditorialCarouselProps) {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = active === 0 ? items.length - 1 : active - 1;
    handleChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = active === items.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
  };

  const current = items[active];

  // Swipe/drag to move between questions -- pointer events cover touch,
  // mouse-drag, and pen in one handler. Swiping left goes to the next
  // question (same direction the arrow button already moves), right goes
  // back. Only counts past a threshold and only when more horizontal than
  // vertical, so this doesn't fight page scroll or register a plain tap
  // as a swipe. A swipe that clears the threshold also suppresses the
  // click event pointerup triggers next on whatever's underneath (a dot,
  // an arrow) -- without that, a swipe landing on one of those would
  // immediately navigate again from its own onClick.
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const SWIPE_THRESHOLD_PX = 40;

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    const start = dragStartRef.current;
    dragStartRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    suppressClickRef.current = true;
    if (dx < 0) handleNext();
    else handlePrev();
  };
  const handleClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      e.stopPropagation();
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-3xl touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClickCapture={handleClickCapture}
    >
      <div className="flex items-start gap-8">
        <span
          className="select-none text-[100px] font-light leading-none text-white/10 transition-all duration-500 sm:text-[120px]"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, '0')}
        </span>

        {/* min-h reserves room for the tallest (2-line) question + pill --
            without it, 1-line questions render a shorter block than
            2-line ones, so the dot-nav/counter/arrows row below shifts up
            and down as the active question changes. */}
        <div className="min-h-[180px] flex-1 pt-4 sm:pt-6">
          <blockquote
            className={`font-serif text-2xl leading-relaxed text-white transition-all duration-300 sm:text-3xl ${
              isTransitioning ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'
            }`}
          >
            {current.text}
          </blockquote>
          <span
            className={`mt-5 inline-block rounded-full border border-orange/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-orange transition-all duration-300 delay-100 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {current.category}
          </span>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between sm:mt-16">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {items.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4" aria-label={`Go to question ${index + 1}`}>
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? 'w-12 bg-white'
                      : 'w-6 bg-white/20 group-hover:w-8 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs tracking-widest text-white/60 uppercase">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="rounded-full p-2 text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white"
            aria-label="Previous question"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-full p-2 text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white"
            aria-label="Next question"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
