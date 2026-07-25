'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import type { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface FurnitureCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  draggable?: boolean;
}

export function FurnitureCard({ product, isSelected, onSelect, draggable = false }: FurnitureCardProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${product.id}`,
    data: { productId: product.id },
    disabled: !draggable,
  });

  const content = (
    <motion.div
      ref={draggable ? setNodeRef : undefined}
      onClick={() => onSelect(product.id)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative w-full rounded-xl border p-3 text-left transition-all duration-200',
        isSelected
          ? 'border-zinc-800 bg-zinc-50/80 dark:border-zinc-500/50 dark:bg-zinc-500/10'
          : 'border-zinc-200/60 bg-white/50 hover:border-zinc-300/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20',
        draggable && 'cursor-grab active:cursor-grabbing'
      )}
      {...(draggable ? listeners : {})}
      {...(draggable ? attributes : {})}
    >
      {/* Drag handle */}
      {draggable && (
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500">
          <GripVertical className="h-4 w-4" />
        </div>
      )}

        {/* Product image */}
        <div
          className={cn(
            'relative mb-2 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br transition-all overflow-hidden',
            isSelected
              ? 'from-zinc-100 to-zinc-200 dark:from-zinc-500/10 dark:to-zinc-500/10'
              : 'from-zinc-100 to-zinc-50 dark:from-white/5 dark:to-white/[0.02]',
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="200px"
          />
        </div>

      {/* Info */}
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-white truncate">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
          {product.description}
        </p>
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
          {formatPrice(product.price)}
          <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">/mo</span>
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute -bottom-px left-4 right-4 h-0.5 rounded-full bg-zinc-800 dark:bg-zinc-400"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );

  return content;
}

