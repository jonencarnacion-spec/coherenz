import * as React from 'react';
import { cn } from '@/lib/utils';

// Adapted from a 21st.dev "elastic-gallery" snippet, requested to replace
// the diagnostic-teaser's plain icon cards.
// - Source assumed Next.js (`next/image` with `fill`) — swapped for a plain
//   `<img>` with `absolute inset-0 object-cover`, since this is Astro.
// - Source's Pexels stock photos replaced with Coherenz's own curated
//   services/programs photography (nothing in the library maps literally
//   to abstract dimension names like "Flow"/"Coordination" — pairing is
//   approximate, flagged for Jon to swap if he wants a tighter match).
// - Cards don't link anywhere yet (no /diagnostic page built), so the
//   source's link-out CTA and <a> wrapper were dropped — hover/click just
//   expands the panel, no navigation.
interface ElasticItemProps {
  id: string;
  title: string;
  q: string;
  /** Optional short blurb rendered under the question. */
  subtitle?: string;
  src: string;
  alt: string;
}

interface ElasticGalleryProps {
  items: ElasticItemProps[];
}

function ElasticGallery({ items }: ElasticGalleryProps) {
  const [activeId, setActiveId] = React.useState<string | null>(items[2]?.id ?? items[0]?.id ?? null);

  return (
    <div className="flex h-[500px] w-full flex-col gap-2 md:h-[520px] md:flex-row md:gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setActiveId(item.id)}
          onClick={() => setActiveId(item.id)}
          className={cn(
            'relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-white',
            'transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
            activeId === item.id ? 'flex-[4]' : 'flex-[1]',
            activeId === item.id ? 'brightness-100' : 'brightness-50 hover:brightness-75'
          )}
        >
          <div className="absolute inset-0 h-full w-full">
            <img
              src={item.src}
              alt={item.alt}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-transform duration-1000',
                activeId === item.id ? 'scale-100' : 'scale-110'
              )}
            />
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent transition-opacity duration-500',
                activeId === item.id ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
            <div
              className={cn(
                'flex flex-col gap-2 transition-all duration-500',
                activeId === item.id ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-12 opacity-0'
              )}
            >
              <span className="w-fit rounded-full border border-white/30 bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md md:px-3 md:text-xs">
                {item.id}
              </span>
              <h3 className="text-2xl font-bold uppercase leading-none text-white md:text-4xl">{item.title}</h3>
              <p className="max-w-xs text-sm text-white/80">{item.q}</p>
              {item.subtitle && <p className="max-w-xs text-xs text-white/60">{item.subtitle}</p>}
            </div>

            <div
              className={cn(
                'absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 md:bottom-8',
                activeId === item.id ? 'scale-50 opacity-0' : 'opacity-100 delay-500'
              )}
            >
              <span className="hidden whitespace-nowrap text-xl font-bold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:block">
                {item.title}
              </span>
              <span className="block text-xs font-bold text-white md:hidden">{item.id}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ElasticGallery };
