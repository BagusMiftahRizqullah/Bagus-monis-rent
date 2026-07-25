'use client';

import { Sidebar } from '@/components/sidebar/sidebar';
import { ZoneSidebar } from '@/components/sidebar/zone-sidebar';
import { WorkspaceCanvas } from '@/components/workspace/workspace-canvas';
import { LifestyleZones } from '@/components/workspace/lifestyle-zones';
import { CheckoutPanel } from '@/components/checkout/checkout-panel';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { useWorkspaceStore } from '@/store/workspace';
import { desks, chairs, accessories, monitors, products } from '@/data/products';
import { FurnitureCard } from '@/components/sidebar/furniture-card';
import { useState, useMemo } from 'react';
import { ShoppingCart, Sun, Moon, Undo2, Redo2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

export function WorkspaceLayout() {
  const updateAccessoryPosition = useWorkspaceStore((s) => s.updateAccessoryPosition);
  const addAccessory = useWorkspaceStore((s) => s.addAccessory);
  const workspaceAccessories = useWorkspaceStore((s) => s.accessories);
  const selectedDesk = useWorkspaceStore((s) => s.selectedDesk);
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const toggleCheckout = useWorkspaceStore((s) => s.toggleCheckout);
  const theme = useWorkspaceStore((s) => s.theme);
  const toggleTheme = useWorkspaceStore((s) => s.toggleTheme);
  const undo = useWorkspaceStore((s) => s.undo);
  const redo = useWorkspaceStore((s) => s.redo);
  const resetWorkspace = useWorkspaceStore((s) => s.resetWorkspace);
  const historyIndex = useWorkspaceStore((s) => s.historyIndex);
  const historyLength = useWorkspaceStore((s) => s.history.length);
  const zoneItems = useWorkspaceStore((s) => s.zoneItems);
  const setSidebarOpen = useWorkspaceStore((s) => s.setSidebarOpen);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const hasItems = selectedDesk || selectedChair || workspaceAccessories.length > 0 || Object.keys(zoneItems).length > 0;

  const cartItemCount = useMemo(() => {
    let count = 0;
    if (selectedDesk) count++;
    if (selectedChair) count++;
    count += workspaceAccessories.length;
    // Add zone items count
    count += Object.keys(zoneItems).length;
    return count;
  }, [selectedDesk, selectedChair, workspaceAccessories, zoneItems]);

  const cartTotal = useMemo(() => {
    let total = 0;
    const desk = desks.find((d) => d.id === selectedDesk);
    const chair = chairs.find((c) => c.id === selectedChair);
    if (desk) total += desk.price;
    if (chair) total += chair.price;
    workspaceAccessories.forEach((a) => {
      const product = [...accessories, ...monitors].find((p) => p.id === a.productId);
      if (product) total += product.price;
    });
    // Add zone items to cart total
    Object.values(zoneItems).forEach((productId) => {
      const product = products.find((p) => p.id === productId);
      if (product) total += product.price;
    });
    return total;
  }, [selectedDesk, selectedChair, workspaceAccessories, zoneItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveDragId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDragId(null);
    const { active, over, delta } = event;
    
    if (!over) return;

    const productId = String(active.id).replace('workspace-', '').replace('sidebar-', '');
    
    // Check if dropping on a zone slot
    if (String(over.id).startsWith('zone-slot-')) {
      const slotId = String(over.id).replace('zone-slot-', '');
      const slotCategory = over.data.current?.category;
      
      const draggedProduct = products.find((p) => p.id === productId);
      
      // Only allow dropping if categories match
      if (draggedProduct && draggedProduct.category === slotCategory) {
        useWorkspaceStore.getState().setZoneItem(slotId, productId);
        return;
      }
    }

    if (over.id !== 'workspace-canvas') return;
    
    // Check if dragging from sidebar
    if (String(active.id).startsWith('sidebar-')) {
      const isAlreadyInWorkspace = workspaceAccessories.some(a => a.productId === productId);
      
      if (!isAlreadyInWorkspace) {
        // Need to calculate drop position relative to canvas
        // This is a simplified approach, in a real app we'd use getBoundingClientRect
        const defaultProduct = [...accessories, ...monitors].find(a => a.id === productId);
        if (defaultProduct) {
          addAccessory(productId, defaultProduct.defaultPosition);
        }
      }
    } 
    // Dragging an existing item inside the canvas
    else if (String(active.id).startsWith('workspace-')) {
      if (!delta) return;

      const isDesk = String(active.id).includes('desk');
      const isChair = String(active.id).includes('chair');

      if (isDesk) {
        const { deskPosition, updateDeskPosition } = useWorkspaceStore.getState();
        updateDeskPosition({
          x: deskPosition.x + delta.x,
          y: deskPosition.y + delta.y,
        });
      } else if (isChair) {
        const { chairPosition, updateChairPosition } = useWorkspaceStore.getState();
        updateChairPosition({
          x: chairPosition.x + delta.x,
          y: chairPosition.y + delta.y,
        });
      } else {
        const currentItem = workspaceAccessories.find((a) => a.productId === productId);
        if (currentItem) {
          updateAccessoryPosition(productId, {
            x: currentItem.position.x + delta.x,
            y: currentItem.position.y + delta.y,
          });
        }
      }
    }
  }

  const activeProduct = activeDragId 
    ? products.find(a => a && a.id === String(activeDragId).replace('sidebar-', '').replace('workspace-', '')) 
    : null;

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative h-full w-full">
        {/* Canvas — full screen */}
        <WorkspaceCanvas /> 

        {/* Global Background Overlay for Empty State */}
        {!hasItems && (
          <div className="absolute inset-0 z-30 bg-white/60 dark:bg-black/60 backdrop-blur-sm pointer-events-auto flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-center px-6 pointer-events-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Design YOUR workspaces
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                Create your perfect setup. Drag and drop premium desks, ergonomic chairs, and accessories to build a workspace that inspires you.
              </p>
              <button 
                className="px-8 py-4 bg-zinc-900 text-white rounded-full text-base font-medium hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(true);
                }}
              >
                Ready to Rent ?
              </button>
            </motion.div>
          </div>
        )}

        {/* Top Right Floating buttons */}
        <div className="pointer-events-none absolute top-4 right-4 z-40 flex items-start">
          <div className="pointer-events-auto flex items-center gap-3">
            {/* Toolbar Group */}
            <div className={`flex items-center gap-1 rounded-full border border-zinc-200/60 bg-[#f7f5f0]/90 p-1 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-zinc-800/90 transition-opacity duration-500 ${hasItems ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-700"
                aria-label="Undo"
              >
                <Undo2 className="h-4 w-4" />
              </button>
              
              <button
                onClick={redo}
                disabled={historyIndex >= historyLength - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-700"
                aria-label="Redo"
              >
                <Redo2 className="h-4 w-4" />
              </button>

              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />

              <button
                onClick={resetWorkspace}
                className="flex h-10 w-10 items-center justify-center rounded-full text-red-500 transition-all hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-500/10"
                aria-label="Reset workspace"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200/60 bg-[#f7f5f0]/90 shadow-lg backdrop-blur-xl transition-all hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-zinc-800/90 dark:hover:bg-zinc-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
              ) : (
                <Moon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
              )}
            </button>
          </div>
        </div>

        {/* Sidebar — overlay left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-50 flex items-start p-4">
          <div className="pointer-events-auto">
            <Sidebar />
          </div>
        </div>

        {/* Zone Sidebar — overlay right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-50 flex items-start p-4 pt-20">
          <div className="pointer-events-auto">
            <ZoneSidebar />
          </div>
        </div>

        {/* Bottom Zones */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-0 md:px-12 pb-20 md:pb-0">
          <LifestyleZones />
        </div>

        {/* Floating buttons */}
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-end p-4 pb-24 md:pb-4 transition-opacity duration-500 ${hasItems ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="pointer-events-auto flex items-center gap-3">
            <button
              onClick={toggleCheckout}
              className="group relative flex items-center justify-start rounded-full border border-zinc-200/60 bg-[#f7f5f0]/90 p-1 pr-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-zinc-800/90 dark:hover:bg-zinc-800 w-[52px] hover:w-auto overflow-visible"
            >
              <div className="relative shrink-0 flex items-center justify-center w-11 h-11">
                <ShoppingCart className="h-5 w-5 text-zinc-700 dark:text-zinc-300 transition-transform group-hover:scale-110" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-[11px] font-semibold text-white dark:bg-white dark:text-zinc-800 border-2 border-[#f7f5f0] group-hover:border-white transition-colors z-10">
                    {cartItemCount}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 opacity-0 w-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0 whitespace-nowrap pl-1 overflow-hidden">
                {cartItemCount > 0 && (
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {formatPrice(cartTotal)}/mo
                  </span>
                )}
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mr-1">
                  View cart
                </span>
              </div>
            </button>
            <CheckoutPanel />
          </div>
        </div>
      </div>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.4',
              },
            },
          }),
        }}
      >
        {activeDragId && activeProduct ? (
          <div className="w-64 opacity-80 scale-105 pointer-events-none z-50">
            <FurnitureCard 
              product={activeProduct} 
              isSelected={true} 
              onSelect={() => {}} 
              draggable={false} 
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
