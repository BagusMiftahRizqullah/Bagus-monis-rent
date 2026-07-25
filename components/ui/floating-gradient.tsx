'use client';

import { motion } from 'framer-motion';

export function FloatingGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top-left gradient */}
      <motion.div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-zinc-500/15 via-zinc-500/8 to-transparent blur-3xl"
        animate={{
          x: [0, 30, 0, -20, 0],
          y: [0, -20, 10, -10, 0],
          scale: [1, 1.05, 0.98, 1.02, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom-right gradient */}
      <motion.div
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl"
        animate={{
          x: [0, -30, 0, 20, 0],
          y: [0, 20, -10, 10, 0],
          scale: [1, 0.98, 1.03, 0.99, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1, 0.95, 1],
          opacity: [0.5, 0.7, 0.5, 0.6, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}