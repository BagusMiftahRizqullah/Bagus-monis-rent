'use client';

import { useWorkspaceStore } from '@/store/workspace';
import { getProductById } from '@/data/products';
import { useDroppable } from '@dnd-kit/core';
import Image from 'next/image';
import type { ProductCategory } from '@/types';

interface ZoneSlotProps {
  id: string;
  category: ProductCategory;
}

function ZoneSlot({ id, category }: ZoneSlotProps) {
  const zoneItems = useWorkspaceStore(s => s.zoneItems);
  const setZoneDrawerOpen = useWorkspaceStore(s => s.setZoneDrawerOpen);
  const productId = zoneItems[id];
  const product = productId ? getProductById(productId) : null;
  const removeZoneItem = useWorkspaceStore(s => s.removeZoneItem);

  const { setNodeRef, isOver } = useDroppable({
    id: `zone-slot-${id}`,
    data: { category }
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        ref={setNodeRef}
        onClick={() => !product && setZoneDrawerOpen(true, category, id)}
        className={`relative w-[80px] h-[100px] md:w-[100px] md:h-[120px] rounded-2xl border-[1.5px] border-dashed flex items-center justify-center transition-all group
          ${product ? 'border-transparent bg-transparent cursor-default' : 'border-zinc-400/60 dark:border-zinc-500/60 cursor-pointer hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30'}
          ${isOver ? 'border-zinc-600 bg-zinc-200/50 dark:bg-zinc-600/50 scale-105' : ''}
        `}
      >
        {product ? (
          <>
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
            <button 
              onClick={(e) => { e.stopPropagation(); removeZoneItem(id); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md"
            >
              ×
            </button>
          </>
        ) : null}

        {!product && (
          <div className="absolute -bottom-3.5 bg-[#f6eee3] dark:bg-[#3d3831] px-3 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)] whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-1">
            + Add
          </div>
        )}
      </div>
    </div>
  );
}

export function LifestyleZones() {
  const isHydrated = useWorkspaceStore(s => s._hasHydrated);
  if (!isHydrated) return null;

  return (
    <div className="w-full max-w-[1200px] flex justify-start md:justify-center mt-auto px-4 md:px-8 overflow-x-auto no-scrollbar z-50 pointer-events-auto">
      {/* Container holding the zones with dashed border and transparent background */}
      <div className="flex min-w-max md:w-full border-[1.5px] border-dashed border-zinc-400/60 dark:border-zinc-500/60 relative pt-10 md:pt-14 pb-12 md:pb-8 rounded-t-[1.5rem] md:rounded-t-[2.5rem] gap-4 md:gap-0 border-b-0 md:border-b-[1.5px]">
        
        {/* Coffee Station */}
        <div className="flex-1 min-w-[240px] flex flex-col items-center relative md:border-r-[1.5px] border-dashed border-zinc-400/60 dark:border-zinc-500/60">
          <div className="absolute -top-[18px] bg-[#f6eee3] dark:bg-[#3d3831] px-4 md:px-8 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 shadow-md">
            Coffee Station
          </div>
          <div className="flex gap-2 md:gap-5 mt-2">
            <ZoneSlot id="coffee-1" category="coffee" />
            <ZoneSlot id="coffee-2" category="coffee" />
          </div>
        </div>

        {/* Outdoor Gear */}
        <div className="flex-1 min-w-[240px] flex flex-col items-center relative md:border-r-[1.5px] border-dashed border-zinc-400/60 dark:border-zinc-500/60">
          <div className="absolute -top-[18px] bg-[#f6eee3] dark:bg-[#3d3831] px-4 md:px-8 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 shadow-md">
            Outdoor Gear
          </div>
          <div className="flex gap-2 md:gap-5 mt-2">
            <ZoneSlot id="outdoor-1" category="outdoor" />
            <ZoneSlot id="outdoor-2" category="outdoor" />
          </div>
        </div>

        {/* Relax Zone */}
        <div className="flex-1 min-w-[240px] flex flex-col items-center relative md:border-r-[1.5px] border-dashed border-zinc-400/60 dark:border-zinc-500/60">
          <div className="absolute -top-[18px] bg-[#f6eee3] dark:bg-[#3d3831] px-4 md:px-8 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 shadow-md">
            Relax Zone
          </div>
          <div className="flex gap-2 md:gap-5 mt-2">
            <ZoneSlot id="relax-1" category="relax" />
            <ZoneSlot id="relax-2" category="relax" />
          </div>
        </div>

        {/* Garage Space */}
        <div className="flex-1 min-w-[240px] flex flex-col items-center relative pr-4 md:pr-0">
          <div className="absolute -top-[18px] bg-[#f6eee3] dark:bg-[#3d3831] px-4 md:px-8 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 shadow-md">
            Garage Space
          </div>
          <div className="flex gap-2 md:gap-5 mt-2">
            <ZoneSlot id="garage-1" category="garage" />
            <ZoneSlot id="garage-2" category="garage" />
          </div>
        </div>

      </div>
    </div>
  );
}
