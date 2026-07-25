'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/store/workspace';
import { desks, chairs, monitors, accessories } from '@/data/products';
import { FurnitureCard } from './furniture-card';
import { CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';
import { PanelLeftOpen, PanelLeftClose, X, Menu } from 'lucide-react';

type CategoryTab = 'desk' | 'chair' | 'monitor' | 'accessory';

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('desk');
  const isExpanded = useWorkspaceStore((s) => s.isSidebarOpen);
  const isCheckoutOpen = useWorkspaceStore((s) => s.isCheckoutOpen);
  const toggleSidebar = useWorkspaceStore((s) => s.toggleSidebar);
  const selectedDesk = useWorkspaceStore((s) => s.selectedDesk);
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const selectDesk = useWorkspaceStore((s) => s.selectDesk);
  const selectChair = useWorkspaceStore((s) => s.selectChair);
  const addAccessory = useWorkspaceStore((s) => s.addAccessory);
  const removeAccessory = useWorkspaceStore((s) => s.removeAccessory);
  const workspaceAccessories = useWorkspaceStore((s) => s.accessories);

  const products = activeTab === 'desk' ? desks : activeTab === 'chair' ? chairs : activeTab === 'monitor' ? monitors : accessories;

  function isSelected(productId: string): boolean {
    if (activeTab === 'desk') return selectedDesk === productId;
    if (activeTab === 'chair') return selectedChair === productId;
    return workspaceAccessories.some((a) => a.productId === productId);
  }

  function handleSelect(productId: string) {
    if (activeTab === 'desk') {
      selectDesk(selectedDesk === productId ? '' : productId);
    } else if (activeTab === 'chair') {
      selectChair(selectedChair === productId ? '' : productId);
    } else {
      if (isSelected(productId)) {
        removeAccessory(productId);
      } else {
        addAccessory(productId);
      }
    }
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Tabs */}
      <div className="flex shrink-0 gap-1 border-b border-zinc-200/50 p-3 dark:border-white/10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id as CategoryTab)}
            className={cn(
              'relative flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
              activeTab === cat.id
                ? 'text-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300',
            )}
          >
            {activeTab === cat.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-white/10"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Product list — vertical scroll */}
      <div className="flex-1 overflow-y-auto p-3 pb-20 md:pb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-2 gap-2"
          >
            {products.map((product) => (
              <FurnitureCard
                key={product.id}
                product={product}
                isSelected={isSelected(product.id)}
                onSelect={handleSelect}
                draggable={activeTab === 'accessory' || activeTab === 'monitor'}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="flex items-start gap-0">
      {/* Toggle button - Visible on Desktop */}
      <button
        onClick={() => toggleSidebar()}
        className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200/60 bg-white/70 text-zinc-500 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 hover:text-zinc-700 dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-400 dark:hover:bg-zinc-800/90 dark:hover:text-zinc-200"
      >
        {isExpanded ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeftOpen className="h-4 w-4" />
        )}
      </button>

      {/* Toggle button - Visible on Mobile (Floating FAB) */}
      <AnimatePresence>
        {!isExpanded && !isCheckoutOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => toggleSidebar()}
            className="md:hidden fixed top-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200/60 bg-[#f7f5f0]/90 text-zinc-700 shadow-lg backdrop-blur-xl transition-all hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Desktop Sidebar Panel */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 320 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="ml-2 overflow-hidden hidden md:block"
            >
              <div className="h-[70vh] w-[320px] rounded-2xl border border-zinc-200/60 bg-white/70 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-800/80">
                {sidebarContent}
              </div>
            </motion.div>

            {/* Mobile Bottom Sheet Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Bottom Sheet Panel */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 md:hidden h-[75vh] rounded-t-3xl border-t border-zinc-200/60 bg-[#f7f5f0]/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/95 overflow-hidden flex flex-col"
            >
              {/* Drag Handle & Header */}
              <div className="flex flex-col items-center pt-3 pb-2 border-b border-zinc-200/50 dark:border-white/10 shrink-0">
                <div className="h-1.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-3" />
                <div className="flex w-full justify-between items-center px-5">
                  <h2 className="font-bold text-lg text-zinc-800 dark:text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Products
                  </h2>
                  <button 
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}