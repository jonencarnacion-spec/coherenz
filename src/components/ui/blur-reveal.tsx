// Blur+fade+slide-up-on-scroll reveal, adapted from a pasted reference.
// Functionally unchanged (the component is style-agnostic -- no colors,
// no icons, nothing to bring on-brand) except dropping the Next.js
// "use client" directive, which is meaningless in this Astro/Vite project
// and isn't used by any other component here (see floating-dock.tsx,
// service-selector.tsx for the same omission). `motion` and `cn` are
// already project dependencies.
import * as React from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

interface BlurRevealProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function BlurReveal({ className, children, delay = 0, duration = 1 }: BlurRevealProps) {
  const spanRef = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(spanRef, { once: true });

  return (
    <motion.span
      ref={spanRef}
      initial={{ opacity: 0, filter: 'blur(10px)', y: '20%' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: '0%' } : {}}
      transition={{ duration, delay }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  );
}
