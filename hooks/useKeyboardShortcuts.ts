'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '@/store/workspace';

export function useKeyboardShortcuts() {
  const undo = useWorkspaceStore((s) => s.undo);
  const redo = useWorkspaceStore((s) => s.redo);
  const resetWorkspace = useWorkspaceStore((s) => s.resetWorkspace);
  const toggleCheckout = useWorkspaceStore((s) => s.toggleCheckout);
  const toggleTheme = useWorkspaceStore((s) => s.toggleTheme);

  useEffect(() => {
    const isMac = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac');

    function handleKeyDown(e: KeyboardEvent) {
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        redo();
        return;
      }

      if (mod && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }

      if (mod && e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        resetWorkspace();
        return;
      }

      if (mod && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCheckout();
        return;
      }

      if (mod && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleTheme();
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, resetWorkspace, toggleCheckout, toggleTheme]);
}