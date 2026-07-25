'use client';

import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { useWorkspaceStore } from '@/store/workspace';
import { desks, chairs, getProductById } from '@/data/products';
import { WorkspaceItem } from './workspace-item';

export function WorkspaceCanvas() {
  const selectedDesk = useWorkspaceStore((s) => s.selectedDesk);
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const workspaceAccessories = useWorkspaceStore((s) => s.accessories);
  const removeAccessory = useWorkspaceStore((s) => s.removeAccessory);
  const deskPosition = useWorkspaceStore((s) => s.deskPosition);
  const chairPosition = useWorkspaceStore((s) => s.chairPosition);

  const selectedDeskProduct = useMemo(
    () => desks.find((d) => d.id === selectedDesk),
    [selectedDesk],
  );

  const selectedChairProduct = useMemo(
    () => chairs.find((c) => c.id === selectedChair),
    [selectedChair],
  );

  const accessoryProducts = useMemo(() => {
    return workspaceAccessories
      .map((a) => {
        const product = getProductById(a.productId);
        return product ? { ...a, product } : null;
      })
      .filter(Boolean) as Array<typeof workspaceAccessories[number] & { product: NonNullable<ReturnType<typeof getProductById>> }>;
  }, [workspaceAccessories]);

  const { setNodeRef } = useDroppable({
    id: 'workspace-canvas',
  });

  const isHydrated = useWorkspaceStore((s) => s._hasHydrated);
  const theme = useWorkspaceStore((s) => s.theme);

  if (!isHydrated) return null;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden !p-0">
      <div ref={setNodeRef} className="absolute inset-0 z-0" />
      
      {/* Global Background Overlay for Empty State */}
      {/* Moved to workspace-layout to cover all elements */}

      {/* Desk background image */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: theme === 'dark' ? "url('/assets/desk-bg-dark.webp')" : "url('/assets/desk-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

        <AnimatePresence>
          {/* Desk — always centered */}
            {selectedDeskProduct && (
              <div key={`desk-wrapper-${selectedDeskProduct.id}`} className="absolute inset-0 flex items-center justify-center pointer-events-none pb-32">
                <div className="pointer-events-auto absolute">
                  <WorkspaceItem
                    key={`desk-${selectedDeskProduct.id}`}
                    product={selectedDeskProduct}
                    position={deskPosition}
                    rotation={0}
                    scale={0.8}
                    zIndex={1}
                    centered
                    draggable={true}
                  />
                </div>
              </div>
            )}

            {/* Chair — centered in front of desk */}
            {selectedChairProduct && (
              <div key={`chair-wrapper-${selectedChairProduct.id}`} className="absolute inset-0 flex items-center justify-center pointer-events-none pb-32">
                <div className="pointer-events-auto absolute">
                  <WorkspaceItem
                    key={`chair-${selectedChairProduct.id}`}
                    product={selectedChairProduct}
                    position={chairPosition}
                    rotation={0}
                    scale={1}
                    zIndex={2}
                    centered
                    draggable={true}
                  />
                </div>
              </div>
            )}

            {/* Accessories */}
            {accessoryProducts.map((item) => (
              <div key={item.productId} className="absolute inset-0 flex items-center justify-center pointer-events-none pb-32">
                <div className="pointer-events-auto absolute">
                  <WorkspaceItem
                    product={item.product}
                    position={item.position}
                    rotation={item.rotation ?? item.product.defaultRotation}
                    scale={item.scale ?? item.product.defaultScale}
                    zIndex={item.zIndex ?? item.product.zIndex}
                    centered
                    draggable={true}
                    onRemove={() => removeAccessory(item.productId)}
                  />
                </div>
              </div>
            ))}
          </AnimatePresence>
    </div>
  );
}
