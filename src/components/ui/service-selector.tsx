import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { base } from '../../lib/base';
import { IconCompass, IconCalculator, IconShieldCheck, IconHierarchy3, IconChevronDown, IconArrowRight } from '@tabler/icons-react';
import { services, type ServiceDefinition } from '../../data/servicesContent';

// The primary interaction mechanic for the Services page (per the
// "diagnostic experience, not a services catalogue" narrative brief):
// two levels of self-diagnosis rather than one. A visitor opens the
// question that sounds like their problem, then expands whichever
// specific lens (pill) is closest to what they're experiencing, reading
// a one-line explanation in place -- before ever committing to leave the
// page via the "Explore" CTA. Both levels default closed and are
// independent per-service (opening a new service doesn't affect another
// service's own open pill), matching the toggle-collapsed-by-default
// convention already used elsewhere on the site (e.g. PdeosFlow).
const icons = {
  compass: IconCompass,
  calculator: IconCalculator,
  'shield-check': IconShieldCheck,
  hierarchy: IconHierarchy3,
} as const;

// One accent per service so the four strips read as distinct at a glance,
// rather than all four sharing the single "Service = green" card-type
// color -- a deliberate, scoped exception to that convention just for this
// differentiator badge (the rest of each expanded panel -- pills, CTA --
// stays green).
const stripAccents = ['blue', 'orange', 'green', 'navy'] as const;
type StripAccent = (typeof stripAccents)[number];

const accentClasses: Record<StripAccent, { border: string; bg: string; text: string; solidBg: string }> = {
  blue: { border: 'border-blue/30', bg: 'bg-blue/10', text: 'text-blue', solidBg: 'bg-blue' },
  orange: { border: 'border-orange/30', bg: 'bg-orange/10', text: 'text-orange', solidBg: 'bg-orange' },
  green: { border: 'border-green/30', bg: 'bg-green/10', text: 'text-green', solidBg: 'bg-green' },
  navy: { border: 'border-navy/30', bg: 'bg-navy/10', text: 'text-navy', solidBg: 'bg-navy' },
};


// Float-in-from-bottom, same character used across the site: 28px travel,
// 1500ms, strong ease-out. Sequential — one shared trigger on the list,
// each block staggered by index * duration.
const REVEAL_DURATION = 1500;

function ServiceBlock({
  service,
  accent,
  isOpen,
  onToggle,
  revealed,
  index,
  reducedMotion,
}: {
  service: ServiceDefinition;
  accent: StripAccent;
  isOpen: boolean;
  onToggle: () => void;
  revealed: boolean;
  index: number;
  reducedMotion: boolean;
}) {
  const [openPill, setOpenPill] = useState<number | null>(null);
  const Icon = icons[service.iconName];
  const a = accentClasses[accent];
  const activePill = openPill !== null ? service.pills[openPill] : null;
  const blockRef = useRef<HTMLDivElement>(null);

  // Same photography as the homepage's FourProblems section, per request.
  const imageSrc = `${base}img/problems/${service.slug}.jpg`;

  // Centers the expanded panel in the viewport so the whole open card --
  // description, pills and image -- is visible without the visitor having
  // to scroll down after clicking, rather than just revealing its top edge.
  useEffect(() => {
    if (isOpen) blockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isOpen]);

  return (
    <div
      ref={blockRef}
      className="border border-line"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(28px)',
        transition: reducedMotion
          ? 'none'
          : `opacity ${REVEAL_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1) ${index * REVEAL_DURATION}ms, transform ${REVEAL_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1) ${index * REVEAL_DURATION}ms`,
      }}
    >
      {/* The image always lives in the right half of the same grid row, in
          both states -- collapsed shows just its top edge at strip height,
          open grows that same column to full height. Same column position
          in both states is what makes opening read as the image completing
          itself, rather than a new image appearing. */}
      {!isOpen ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={false}
          className="group flex w-full cursor-pointer items-stretch text-left lg:grid lg:grid-cols-2"
        >
          <span className="flex items-center gap-4 bg-white p-5 transition-colors group-hover:bg-wash-green/40 sm:p-6">
            <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full border', a.border, a.bg, a.text)}>
              <Icon size={22} stroke={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wide text-green">{service.name}</span>
              <span className="mt-1 block text-lg font-semibold text-navy sm:text-xl">{service.question}</span>
            </span>
            <IconChevronDown size={20} stroke={2} className="shrink-0 text-navy/40" />
          </span>
          <span className="relative hidden overflow-hidden border border-line lg:block">
            <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
          </span>
        </button>
      ) : (
        <div className="lg:grid lg:grid-cols-2">
          <div className="flex min-w-0 flex-col">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={true}
              className="flex w-full cursor-pointer items-center gap-4 bg-wash-green p-5 text-left sm:p-6"
            >
              <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full border', a.border, a.solidBg, 'text-white')}>
                <Icon size={22} stroke={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-wide text-green">{service.name}</span>
                <span className="mt-1 block text-lg font-semibold text-navy sm:text-xl">{service.question}</span>
              </span>
              <IconChevronDown size={20} stroke={2} className="rotate-180 shrink-0 text-green" />
            </button>

            <div className="flex flex-1 flex-col border-t border-line bg-wash-blue/40 p-5 sm:p-8">
              <div className="flex flex-1 flex-col justify-start">
                <p className="text-navy">{service.description}</p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {service.pills.map((pill, i) => (
                    <button
                      key={pill.title}
                      type="button"
                      onClick={() => setOpenPill(openPill === i ? null : i)}
                      aria-expanded={openPill === i}
                      className={cn(
                        'cursor-pointer border px-4 py-2 text-sm font-bold transition-colors',
                        openPill === i ? 'border-navy bg-navy text-orange' : 'border-line bg-white text-navy hover:border-green hover:text-green'
                      )}
                    >
                      {pill.title}
                    </button>
                  ))}
                </div>

                {/* Below lg:, the glass card further down that normally
                    surfaces a selected pill's explanation is hidden along
                    with the whole image column it lives in -- so without
                    this, tapping a pill highlighted it but the explanation
                    itself had nowhere to render at all. Same content,
                    shown inline right under the pills instead. */}
                {activePill && (
                  <div className="mt-4 border-t-2 border-orange bg-cream p-5 lg:hidden">
                    <p className="text-[13px] font-bold uppercase tracking-wide text-orange">{activePill.title}</p>
                    <p className="mt-2 text-sm text-navy/80">{activePill.description}</p>
                  </div>
                )}
              </div>

              {/* Stays pinned to the bottom of the column so it lines up
                  with the foot of the (taller) image column. */}
              <div className="pt-6">
                <p className="font-serif text-xl text-navy">{service.closing}</p>
                <a
                  href={`${base}services/${service.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange"
                >
                  {service.ctaText}
                  <IconArrowRight size={16} stroke={2} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[492px] overflow-hidden border border-line lg:block">
            {/* object-top here has to match the collapsed strip's crop
                (also object-top, same column width) -- same anchor means
                growing this container's height doesn't re-crop the image,
                it just reveals more of the same image below what was
                already showing, like the two strip states are the top and
                bottom half of one puzzle piece. */}
            <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
            {/* Corner-bracket frame lifted from ElegantCarousel (homepage
                Perspectives section) -- same size/position/opacity, tinted
                with this strip's own accent instead of a per-slide color. */}
            <div className={`pointer-events-none absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 opacity-80 ${a.text.replace('text-', 'border-')}`} />
            <div className={`pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 opacity-80 ${a.text.replace('text-', 'border-')}`} />
            {/* Selecting a pill surfaces its explanation here instead of
                inline in the text column -- the image area is otherwise
                just ambient art with nothing to say. A floating glass card
                rather than a full wash, so the image stays the focus and is
                still visible both around the card and through it. */}
            <div
              className={cn(
                'absolute inset-x-6 top-1/2 -translate-y-1/2 border border-white/20 bg-navy/25 p-6 text-white backdrop-blur-md transition-opacity duration-300 sm:inset-x-8 sm:p-8',
                activePill ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
            >
              {activePill && (
                <>
                  <p className="text-[14px] font-bold uppercase tracking-wide text-orange">{activePill.title}</p>
                  <p className="mt-2 text-[16px] text-white/85">{activePill.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ServiceSelector() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const reducedMotionRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotionRef.current) {
      setRevealed(true);
      return;
    }
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={listRef} className="mt-[50px] flex flex-col gap-4">
      {services.map((service, i) => (
        <ServiceBlock
          key={service.slug}
          service={service}
          accent={stripAccents[i % stripAccents.length]}
          isOpen={openService === i}
          onToggle={() => setOpenService(openService === i ? null : i)}
          revealed={revealed}
          index={i}
          reducedMotion={reducedMotionRef.current}
        />
      ))}
    </div>
  );
}
