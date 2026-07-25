'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export function HeroSection() {
  function scrollToBuilder() {
    document.getElementById('workspace-builder')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-zinc-50/80 px-4 py-1.5 text-xs font-medium backdrop-blur-sm"
      >
        <Sparkles className="h-3 w-3 text-zinc-500" />
        <span className="text-zinc-700">Premium Office Equipment Rental in Bali</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
      >
        Design Your{' '}
        <span className="bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 bg-clip-text text-transparent">
          Dream Workspace
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 max-w-xl text-base text-zinc-500 sm:text-lg"
      >
        Build, customize, and rent a fully furnished workspace delivered and set up at your office in Bali.
        All handled by Monis Rent.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
      >
        <button
          onClick={scrollToBuilder}
          className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-500/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-500/30 active:scale-[0.98]"
        >
          Start Building
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400"
      >
        <div className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" />
          <span>Free delivery & setup</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Fully insured equipment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Premium brands only</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToBuilder}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 cursor-pointer"
        aria-label="Scroll to builder"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-zinc-300"
        >
          <motion.div className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
        </motion.div>
      </motion.button>
    </section>
  );
}