import { useState, useEffect, useRef } from 'react';

/**
 * Two fixes from the pasted source, needed to scope this to one section
 * partway down the page rather than the whole viewport from (0,0):
 * - Positioned relative to this component's own host element (via
 *   getBoundingClientRect), not raw viewport clientX/Y. The source assumed
 *   the component fills the full page from the top-left corner.
 * - NodeJS.Timeout -> ReturnType<typeof setTimeout>, the correct
 *   environment-agnostic type (this runs in the browser, not Node).
 * Colors recolored from the source's single sky-blue to Coherenz's own
 * --blue/--green tokens (DESIGN.md §1), with a blur added to read as a
 * soft mesh-gradient blob rather than a hard-edged circle.
 */
export default function SpotlightBackground() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full overflow-hidden">
      <div
        className="pointer-events-none absolute rounded-full blur-3xl transition-all duration-300 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: isMoving ? '260px' : '340px',
          height: isMoving ? '260px' : '340px',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, var(--color-blue) 0%, var(--color-green) 55%, transparent 75%)',
          opacity: 0.35,
        }}
      />
    </div>
  );
}
