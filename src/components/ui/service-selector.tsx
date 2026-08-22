import { useState } from 'react';
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

function ServiceBlock({ service, isOpen, onToggle }: { service: ServiceDefinition; isOpen: boolean; onToggle: () => void }) {
  const [openPill, setOpenPill] = useState<number | null>(null);
  const Icon = icons[service.iconName];

  return (
    <div className="border border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full cursor-pointer items-center gap-4 p-5 text-left transition-colors sm:p-6',
          isOpen ? 'bg-wash-green' : 'bg-white hover:bg-wash-green/40'
        )}
      >
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center border',
            isOpen ? 'border-green bg-green text-white' : 'border-line bg-wash-green text-green'
          )}
        >
          <Icon size={22} stroke={1.8} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold uppercase tracking-wide text-green">{service.name}</span>
          <span className="mt-1 block text-lg font-semibold text-navy sm:text-xl">{service.question}</span>
        </span>
        <IconChevronDown
          size={20}
          stroke={2}
          className={cn('shrink-0 text-navy/40 transition-transform', isOpen && 'rotate-180 text-green')}
        />
      </button>

      {isOpen && (
        <div className="border-t border-line bg-wash-green/40 p-5 sm:p-8">
          <p className="max-w-2xl text-navy">{service.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {service.pills.map((pill, i) => (
              <button
                key={pill.title}
                type="button"
                onClick={() => setOpenPill(openPill === i ? null : i)}
                aria-expanded={openPill === i}
                className={cn(
                  'cursor-pointer border px-4 py-2 text-sm font-bold transition-colors',
                  openPill === i ? 'border-green bg-green text-white' : 'border-line bg-white text-navy hover:border-green hover:text-green'
                )}
              >
                {pill.title}
              </button>
            ))}
          </div>

          {openPill !== null && (
            <div className="mt-4 border border-line bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-green">{service.pills[openPill].title}</p>
              <p className="mt-2 text-sm text-foreground/70">{service.pills[openPill].description}</p>
            </div>
          )}

          <p className="mt-6 font-serif text-xl text-navy">{service.closing}</p>
          <a
            href={`${base}services/${service.slug}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green"
          >
            {service.ctaText}
            <IconArrowRight size={16} stroke={2} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function ServiceSelector() {
  const [openService, setOpenService] = useState<number | null>(null);

  return (
    <div className="mt-[50px] flex flex-col gap-4">
      {services.map((service, i) => (
        <ServiceBlock
          key={service.slug}
          service={service}
          isOpen={openService === i}
          onToggle={() => setOpenService(openService === i ? null : i)}
        />
      ))}
    </div>
  );
}
