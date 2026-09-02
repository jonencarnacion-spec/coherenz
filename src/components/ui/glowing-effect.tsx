// Mouse-tracking glowing border effect, adapted from a pasted Aceternity-UI
// component into this project's conventions rather than copied verbatim:
// - The default variant's rainbow gradient (pink #dd7bbb, gold #d79f1e,
//   green #5a922c, blue #4c7894) is off-brand -- DESIGN.md §1 locks the
//   site to a specific 6-color palette with no pink, and "gold" isn't one
//   of the named hues either. Recolored to Coherenz's own orange/yellow/
//   green/blue tokens (green and blue already happened to be close to
//   on-brand in the source; pink and gold are the two that actually
//   needed replacing).
// - Dropped every rounded-* class (rounded-2xl/3xl/xl, rounded-[inherit]
//   still resolves fine at 0px) -- this site's cards are sharp-cornered
//   throughout (DESIGN.md's restraint principle), never rounded except
//   pills/circular badges.
// - The source's `border-0.75` isn't a real Tailwind utility (relies on a
//   custom borderWidth scale this project doesn't define) -- this
//   component doesn't render its own visible static border at all
//   (dropped entirely); it's applied inside cards that already have their
//   own `border border-line` from the page markup.
"use client";

import { memo, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { animate } from 'motion/react';

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty('--active', '0');
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty('--active', isActive ? '1' : '0');

          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
          const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty('--start', String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener('scroll', handleScroll, { passive: true });
      document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('scroll', handleScroll);
        document.body.removeEventListener('pointermove', handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            '--blur': `${blur}px`,
            '--spread': spread,
            '--start': '0',
            '--active': '0',
            '--glowingeffect-border-width': `${borderWidth}px`,
            '--repeating-conic-gradient-times': '5',
            // Coherenz orange/yellow/green/blue, matching this component's
            // own DESIGN.md-locked palette instead of the source's pink/gold.
            '--gradient': `radial-gradient(circle, #E8A030 10%, #E8A03000 20%),
              radial-gradient(circle at 40% 40%, #F0C040 5%, #F0C04000 15%),
              radial-gradient(circle at 60% 60%, #174E40 10%, #174E4000 20%),
              radial-gradient(circle at 40% 60%, #2E5077 10%, #2E507700 20%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                #E8A030 0%,
                #F0C040 calc(25% / var(--repeating-conic-gradient-times)),
                #174E40 calc(50% / var(--repeating-conic-gradient-times)),
                #2E5077 calc(75% / var(--repeating-conic-gradient-times)),
                #E8A030 calc(100% / var(--repeating-conic-gradient-times))
              )`,
          } as React.CSSProperties
        }
        className={cn(
          'pointer-events-none absolute inset-0 opacity-100 transition-opacity',
          glow && 'opacity-100',
          blur > 0 && 'blur-[var(--blur)]',
          className,
          disabled && '!hidden'
        )}
      >
        <div
          className={cn(
            'glow',
            'after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:content-[""]',
            'after:[border:var(--glowingeffect-border-width)_solid_transparent]',
            'after:[background:var(--gradient)] after:[background-attachment:fixed]',
            'after:opacity-[var(--active)] after:transition-opacity after:duration-300',
            'after:[mask-clip:padding-box,border-box]',
            'after:[mask-composite:intersect]',
            'after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]'
          )}
        />
      </div>
    );
  }
);

GlowingEffect.displayName = 'GlowingEffect';

export { GlowingEffect };
export default GlowingEffect;
