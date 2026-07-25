'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/store/workspace';
import { useCheckout } from '@/hooks/useCheckout';
import { desks, chairs, products } from '@/data/products';
import {
  X,
  Calendar,
  ShieldCheck,
  Truck,
  Trash2,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function CheckoutPanel() {
  const isOpen = useWorkspaceStore((s) => s.isCheckoutOpen);
  const toggleCheckout = useWorkspaceStore((s) => s.toggleCheckout);
  const selectedDesk = useWorkspaceStore((s) => s.selectedDesk);
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const workspaceAccessories = useWorkspaceStore((s) => s.accessories);
  const rentalDuration = useWorkspaceStore((s) => s.rentalDuration);
  const setRentalDuration = useWorkspaceStore((s) => s.setRentalDuration);
  const resetWorkspace = useWorkspaceStore((s) => s.resetWorkspace);

  const checkout = useCheckout();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const selectDesk = useWorkspaceStore((s) => s.selectDesk);
  const selectChair = useWorkspaceStore((s) => s.selectChair);
  const removeAccessory = useWorkspaceStore((s) => s.removeAccessory);
  const removeZoneItem = useWorkspaceStore((s) => s.removeZoneItem);
  const zoneItems = useWorkspaceStore((s) => s.zoneItems);

  const deskProduct = useMemo(() => desks.find((d) => d.id === selectedDesk), [selectedDesk]);
  const chairProduct = useMemo(() => chairs.find((c) => c.id === selectedChair), [selectedChair]);

  const accessoryProducts = useMemo(() => {
    return workspaceAccessories
      .map((a) => {
        const product = products.find((p) => p.id === a.productId);
        return product ? { ...a, product } : null;
      })
      .filter(Boolean) as Array<typeof workspaceAccessories[number] & { product: (typeof products)[number] }>;
  }, [workspaceAccessories]);

  const zoneProductsList = useMemo(() => {
    return Object.entries(zoneItems).map(([slotId, productId]) => {
      const product = products.find((p) => p.id === productId);
      return product ? { slotId, product } : null;
    }).filter(Boolean) as Array<{ slotId: string, product: (typeof products)[number] }>;
  }, [zoneItems]);

  const hasItems = selectedDesk || selectedChair || workspaceAccessories.length > 0 || Object.keys(zoneItems).length > 0;

  const DURATIONS = [3, 6, 12, 24];

  const handleCheckout = () => {
    toggleCheckout(); // Close panel
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    resetWorkspace();
  };

  return (
    <>
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-[90%] max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-zinc-900"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <ShieldCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
                </motion.div>
              </div>
              <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Congratulations!
              </h2>
              <p className="mb-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Thank you for renting with MonisRent. Your perfect workspace is being prepared. Our team will contact you shortly to arrange delivery and setup.
              </p>
              <button
                onClick={handleCloseModal}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Back to Canvas
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="checkout-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={toggleCheckout}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="checkout-panel"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/95 dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200/50 px-6 py-4 dark:border-white/10 pt-12 md:pt-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Order Summary</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {hasItems ? 'Review your workspace' : 'Select items to begin'}
                </p>
              </div>
              <button
                onClick={toggleCheckout}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/10 dark:hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-6">
                {!hasItems ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5">
                      <ShieldCheck className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />
                    </div>
                    <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">Your workspace is empty</p>
                    <p className="text-xs text-zinc-300 dark:text-zinc-600">Select a desk and chair to get started</p>
                  </div>
                ) : (
                  <>
                    {/* Selected items */}
                    {deskProduct && <SummaryItem label={deskProduct.name} price={deskProduct.price} onRemove={() => selectDesk(null)} />}
                    {chairProduct && <SummaryItem label={chairProduct.name} price={chairProduct.price} onRemove={() => selectChair(null)} />}
                    {accessoryProducts.map((item) => (
                      <SummaryItem key={item.productId} label={item.product.name} price={item.product.price} onRemove={() => removeAccessory(item.productId)} />
                    ))}
                    {zoneProductsList.map((item) => (
                      <SummaryItem key={item.slotId} label={item.product.name} price={item.product.price} onRemove={() => removeZoneItem(item.slotId)} />
                    ))}

                    <hr className="border-zinc-200/50 dark:border-white/10" />

                    {/* Rental duration */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Rental Duration
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {DURATIONS.map((months) => (
                          <button
                            key={months}
                            onClick={() => setRentalDuration(months)}
                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                              rentalDuration === months
                                ? 'border-zinc-800 bg-zinc-50 text-zinc-700 dark:border-zinc-500 dark:bg-zinc-500/10 dark:text-zinc-300'
                                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-white/20'
                            }`}
                          >
                            {months} mo
                          </button>
                        ))}
                      </div>
                    </div>

                    <hr className="border-zinc-200/50 dark:border-white/10" />

                    {/* Price breakdown */}
                    <div className="space-y-2">
                      <PriceRow label="Subtotal" value={formatPrice(checkout.subtotal)} />
                      <PriceRow label="Tax (11%)" value={formatPrice(checkout.tax)} />
                      <PriceRow label="Refundable Deposit" value={formatPrice(checkout.deposit)} />
                      <hr className="border-zinc-200/50 dark:border-white/10" />
                      <PriceRow
                        label="Total"
                        value={formatPrice(checkout.grandTotal)}
                        highlight
                      />

                      {/* Delivery */}
                      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 dark:bg-green-500/5">
                        <Truck className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-700 dark:text-green-300">
                          Estimated delivery: {checkout.deliveryEstimate}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            {hasItems && (
              <div className="border-t border-zinc-200/50 p-6 dark:border-white/10">
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-500/25 transition-all hover:bg-zinc-700 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:shadow-zinc-300/25"
                >
                  Rent Workspace — {formatPrice(checkout.grandTotal)}
                </button>
                <p className="mt-2 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
                  Free delivery &bull; Setup included &bull; Cancel anytime
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SummaryItem({ label, price, onRemove }: { label: string; price: number; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-white/5 group">
      <div className="flex items-center gap-2">
        <button 
          onClick={onRemove}
          className="text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
          title="Remove item"
        >
          <Trash2 className="h-3 w-3" />
        </button>
        <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
      </div>
      <span className="text-sm font-medium text-zinc-900 dark:text-white">{formatPrice(price)}/mo</span>
    </div>
  );
}

function PriceRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-xs ${
          highlight
            ? 'font-semibold text-zinc-900 dark:text-white'
            : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        {label}
      </span>
      <span
        className={`text-xs ${
          highlight
            ? 'font-semibold text-zinc-900 dark:text-white'
            : 'text-zinc-600 dark:text-zinc-300'
        }`}
      >
        {value}
      </span>
    </div>
  );
}