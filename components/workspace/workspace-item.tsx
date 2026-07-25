'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { X } from 'lucide-react';
import type { Product, Position } from '@/types';
import { cn } from '@/lib/utils';

interface WorkspaceItemProps {
  product: Product;
  position: Position;
  rotation: number;
  scale: number;
  zIndex: number;
  centered?: boolean;
  draggable?: boolean;
  onRemove?: () => void;
}

export function WorkspaceItem({
  product,
  position,
  rotation,
  scale,
  zIndex,
  centered = false,
  draggable = true,
  onRemove,
}: WorkspaceItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `workspace-${product.id}`,
    data: { productId: product.id },
    disabled: !draggable,
  });

  const dragTransform = transform
    ? { x: position.x + transform.x, y: position.y + transform.y }
    : { x: position.x, y: position.y };

  const itemSize = 
    product.category === 'desk' ? 'w-250 h-50' : 
    product.category === 'chair' ? 'w-32 h-40' : 
    product.category === 'monitor' ? 'w-40 h-32' : 
    product.id.includes('lamp') ? 'w-32 h-32' :
    'w-20 h-20';

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.05 : scale,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: centered ? 'relative' : 'absolute',
        left: centered ? undefined : 0,
        top: centered ? undefined : 0,
        x: dragTransform.x,
        y: dragTransform.y,
        rotate: rotation,
        zIndex: isDragging ? 999 : zIndex,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      className={cn(
        'group select-none pointer-events-auto',
        isDragging && 'drop-shadow-2xl',
      )}
      {...listeners}
      {...attributes}
    >
      <div className={cn(
        itemSize, 
        'relative'
      )}>
        {/* Product image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          sizes={product.category === 'desk' ? '600px' : product.category === 'chair' ? '180px' : '80px'}
          priority={product.category === 'desk' || product.category === 'chair'}
        />

        {/* Label */}
        <span
          className={cn(
            'absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium transition-opacity',
            isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            'text-zinc-600 dark:text-zinc-300',
          )}
        >
          {product.name}
        </span>

        {/* Remove button */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 opacity-0 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-200 group-hover:opacity-100 dark:border-white/20 dark:bg-zinc-800 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            aria-label={`Remove ${product.name}`}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

