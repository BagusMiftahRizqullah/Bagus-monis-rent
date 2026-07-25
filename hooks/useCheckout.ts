import { useMemo } from 'react';
import { useWorkspaceStore } from '@/store/workspace';
import { getProductById } from '@/data/products';
import { TAX_RATE, DEPOSIT_RATE, DELIVERY_DAYS } from '@/constants';
import type { CheckoutState } from '@/types';

export function useCheckout(): CheckoutState & { itemCount: number } {
  const selectedDesk = useWorkspaceStore((s) => s.selectedDesk);
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const accessories = useWorkspaceStore((s) => s.accessories);
  const rentalDuration = useWorkspaceStore((s) => s.rentalDuration);

  return useMemo(() => {
    const deskProduct = selectedDesk ? getProductById(selectedDesk) : null;
    const chairProduct = selectedChair ? getProductById(selectedChair) : null;

    const deskPrice = deskProduct?.price ?? 0;
    const chairPrice = chairProduct?.price ?? 0;
    const accessoriesPrice = accessories.reduce((sum, a) => {
      const product = getProductById(a.productId);
      return sum + (product?.price ?? 0);
    }, 0);

    const monthlySubtotal = deskPrice + chairPrice + accessoriesPrice;
    const subtotal = monthlySubtotal * rentalDuration;
    const tax = Math.round(subtotal * TAX_RATE);
    const deposit = Math.round(monthlySubtotal * DEPOSIT_RATE);
    const grandTotal = subtotal + tax + deposit;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + DELIVERY_DAYS);

    const itemCount =
      (selectedDesk ? 1 : 0) +
      (selectedChair ? 1 : 0) +
      accessories.length;

    return {
      rentalDuration,
      subtotal,
      tax,
      deposit,
      deliveryEstimate: deliveryDate.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      grandTotal,
      itemCount,
    };
  }, [selectedDesk, selectedChair, accessories, rentalDuration]);
}