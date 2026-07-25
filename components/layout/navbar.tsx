'use client';

import { motion } from 'framer-motion';
import { Monitor, Moon, Sun, Undo2, Redo2, RotateCcw, ShoppingCart } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace';
import { cn } from '@/lib/utils';

export function Navbar() {
  const theme = useWorkspaceStore((s) => s.theme);
  const toggleTheme = useWorkspaceStore((s) => s.toggleTheme);
  const undo = useWorkspaceStore((s) => s.undo);
  const redo = useWorkspaceStore((s) => s.redo);
  const resetWorkspace = useWorkspaceStore((s) => s.resetWorkspace);
  const toggleCheckout = useWorkspaceStore((s) => s.toggleCheckout);
  const historyIndex = useWorkspaceStore((s) => s.historyIndex);
  const history = useWorkspaceStore((s) => s.history);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 shadow-lg shadow-zinc-500/25 dark:bg-white dark:shadow-zinc-300/25">
            <Monitor className="h-4 w-4 text-white dark:text-zinc-900" />
          </div>
          <span className="text-base font-semibold tracking-tight text-zinc-900">
            Monis<span className="text-zinc-600 dark:text-zinc-400">Rent</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
              canUndo
                ? 'text-zinc-600 hover:bg-zinc-100'
                : 'cursor-not-allowed text-zinc-300',
            )}
            aria-label="Undo"
            title="Undo (⌘Z)"
          >
            <Undo2 className="h-4 w-4" />
          </button>

          <button
            onClick={redo}
            disabled={!canRedo}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
              canRedo
                ? 'text-zinc-600 hover:bg-zinc-100'
                : 'cursor-not-allowed text-zinc-300',
            )}
            aria-label="Redo"
            title="Redo (⌘⇧Z)"
          >
            <Redo2 className="h-4 w-4" />
          </button>

          <div className="mx-2 h-5 w-px bg-zinc-200" />

          <button
            onClick={resetWorkspace}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100"
            aria-label="Reset workspace"
            title="Reset (⌘⇧R)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            onClick={toggleCheckout}
            className="ml-1 flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
            aria-label="Open checkout"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Checkout</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}