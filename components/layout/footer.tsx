'use client';

import { Monitor } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Monitor className="h-3 w-3" />
          <span>MonisRent — Premium Office Equipment Rental, Bali</span>
        </div>
        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Monis Rent. All rights reserved.
        </p>
      </div>
    </footer>
  );
}