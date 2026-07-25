'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function GlassPanel({ children, className, animate = true, delay = 0 }: GlassPanelProps) {
  const Comp = animate ? motion.div : 'div';
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
      }
    : {};

  return (
    <Comp
      {...motionProps}
      className={cn(
        'rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-lg shadow-black/5',
        className,
      )}
    >
      {children}
    </Comp>
  );
}