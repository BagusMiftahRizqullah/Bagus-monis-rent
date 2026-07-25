'use client';

import { useWorkspaceStore } from '@/store/workspace';
import { coffeeProducts, outdoorProducts, relaxProducts, garageProducts } from '@/data/products';
import { FurnitureCard } from './furniture-card';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ProductCategory } from '@/types';

export function ZoneSidebar() {
  const isOpen = useWorkspaceStore((s) => s.isZoneDrawerOpen);
  const activeCategory = useWorkspaceStore((s) => s.activeZoneCategory);
  const activeZoneSlot = useWorkspaceStore((s) => s.activeZoneSlot);
  const setZoneDrawerOpen = useWorkspaceStore((s) => s.setZoneDrawerOpen);
  const setZoneItem = useWorkspaceStore((s) => s.setZoneItem);

  const getProductsForCategory = (category: ProductCategory | null) => {
    switch (category) {
      case 'coffee': return coffeeProducts;
      case 'outdoor': return outdoorProducts;
      case 'relax': return relaxProducts;
      case 'garage': return garageProducts;
      default: return [];
    }
  };

  const getCategoryTitle = (category: ProductCategory | null) => {
    switch (category) {
      case 'coffee': return 'Coffee Station';
      case 'outdoor': return 'Outdoor Gear';
      case 'relax': return 'Relax Zone';
      case 'garage': return 'Garage Space';
      default: return '';
    }
  };

  const products = getProductsForCategory(activeCategory);
  const title = getCategoryTitle(activeCategory);

  const handleSelect = (productId: string) => {
    if (activeZoneSlot) {
      setZoneItem(activeZoneSlot, productId);
      setZoneDrawerOpen(false);
    }
  };

  const sidebarContent = (
    <>
      <div className="flex-1 overflow-y-auto p-6 pt-4 no-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <FurnitureCard
              key={product.id}
              product={product}
              isSelected={false}
              onSelect={handleSelect}
              draggable={true}
            />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-400">
            No products available
          </div>
        )}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && activeCategory && (
        <>
          {/* Desktop Sidebar Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="hidden md:flex h-[calc(100vh-2rem)] w-[340px] flex-col rounded-3xl border border-zinc-200/60 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70"
          >
            <div className="flex items-center justify-between p-6 pb-2">
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {title}
              </h2>
              <button
                onClick={() => setZoneDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <X className="h-5 w-5 text-zinc-500" />
              </button>
            </div>
            {sidebarContent}
          </motion.div>

          {/* Mobile Bottom Sheet Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoneDrawerOpen(false)}
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
                  {title}
                </h2>
                <button 
                  onClick={() => setZoneDrawerOpen(false)}
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
  );
}
