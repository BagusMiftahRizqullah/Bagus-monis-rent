import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkspaceStore, Position, WorkspaceItem, HistoryEntry } from '@/types';
import { getProductById } from '@/data/products';

function createInitialHistory(): HistoryEntry {
  return { 
    items: [], 
    zoneItems: {},
    deskId: null, 
    chairId: null,
    deskPosition: { x: 0, y: 0 },
    chairPosition: { x: 0, y: 90 }
  };
}
export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      isSidebarOpen: false,
      isZoneDrawerOpen: false,
      activeZoneCategory: null,
      activeZoneSlot: null,
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setZoneDrawerOpen: (isOpen, category, slotId) => set({ 
        isZoneDrawerOpen: isOpen, 
        activeZoneCategory: category || null,
        activeZoneSlot: slotId || null
      }),
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
      selectedDesk: null,
  selectedChair: null,
  deskPosition: { x: 0, y: 0 },
  chairPosition: { x: 0, y: 90 },
  accessories: [],
  zoneItems: {},
  rentalDuration: 12,
  theme: 'light',
  history: [createInitialHistory()],
  historyIndex: 0,
  isCheckoutOpen: false,

  pushHistory: () => {
    const { accessories, zoneItems, selectedDesk, selectedChair, deskPosition, chairPosition, history, historyIndex } = get();
    const newEntry = { 
      items: [...accessories], 
      zoneItems: { ...zoneItems },
      deskId: selectedDesk, 
      chairId: selectedChair,
      deskPosition: { ...deskPosition },
      chairPosition: { ...chairPosition }
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newEntry);
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  selectDesk: (deskId: string | null) => {
    const { pushHistory } = get();
    pushHistory();
    set({ selectedDesk: deskId });
  },

  selectChair: (chairId: string | null) => {
    const { pushHistory } = get();
    pushHistory();
    set({ selectedChair: chairId });
  },

  updateDeskPosition: (position: Position) => {
    const { pushHistory } = get();
    pushHistory();
    set({ deskPosition: position });
  },

  updateChairPosition: (position: Position) => {
    const { pushHistory } = get();
    pushHistory();
    set({ chairPosition: position });
  },

  addAccessory: (productId: string, position?: Position) => {
    const { pushHistory, accessories } = get();
    pushHistory();
    const product = getProductById(productId);
    if (!product) return;
    const alreadyExists = accessories.find((a) => a.productId === productId);
    if (alreadyExists) return;
    const newItem: WorkspaceItem = {
      productId,
      position: position ?? { ...product.defaultPosition },
      rotation: product.defaultRotation,
      scale: product.defaultScale,
      zIndex: product.zIndex,
    };
    set({ accessories: [...accessories, newItem] });
  },

  removeAccessory: (productId: string) => {
    const { pushHistory, accessories } = get();
    pushHistory();
    set({ accessories: accessories.filter((a) => a.productId !== productId) });
  },

  updateAccessoryPosition: (productId: string, position: Position) => {
    const { accessories } = get();
    set({
      accessories: accessories.map((a) =>
        a.productId === productId ? { ...a, position } : a,
      ),
    });
  },

  setZoneItem: (slotId: string, productId: string) => {
    const { pushHistory, zoneItems } = get();
    pushHistory();
    set({ zoneItems: { ...zoneItems, [slotId]: productId } });
  },

  removeZoneItem: (slotId: string) => {
    const { pushHistory, zoneItems } = get();
    pushHistory();
    const newZoneItems = { ...zoneItems };
    delete newZoneItems[slotId];
    set({ zoneItems: newZoneItems });
  },

  setRentalDuration: (months: number) => {
    set({ rentalDuration: months });
  },

  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
  },

  toggleCheckout: () => {
    set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen }));
  },

  resetWorkspace: () => {
    const { pushHistory } = get();
    pushHistory();
    set({
      selectedDesk: null,
      selectedChair: null,
      deskPosition: { x: 0, y: 0 },
      chairPosition: { x: 0, y: 90 },
      accessories: [],
      zoneItems: {},
      rentalDuration: 12,
    });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    const entry = history[newIndex];
    set({
      historyIndex: newIndex,
      accessories: entry.items,
      zoneItems: entry.zoneItems,
      selectedDesk: entry.deskId,
      selectedChair: entry.chairId,
      deskPosition: entry.deskPosition,
      chairPosition: entry.chairPosition,
    });
  },

  redo: () => {
      const { historyIndex, history } = get();
      if (historyIndex >= history.length - 1) return;
      const newIndex = historyIndex + 1;
      const entry = history[newIndex];
      set({
        historyIndex: newIndex,
        accessories: entry.items,
        zoneItems: entry.zoneItems,
        selectedDesk: entry.deskId,
        selectedChair: entry.chairId,
        deskPosition: entry.deskPosition,
        chairPosition: entry.chairPosition,
      });
    },
  }),
  {
    name: 'workspace-storage',
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    },
  }
));

// Selectors
export const selectDesk = (state: WorkspaceStore) => state.selectedDesk;
export const selectChair = (state: WorkspaceStore) => state.selectedChair;
export const selectAccessories = (state: WorkspaceStore) => state.accessories;
export const selectTheme = (state: WorkspaceStore) => state.theme;
export const selectRentalDuration = (state: WorkspaceStore) => state.rentalDuration;
export const selectIsCheckoutOpen = (state: WorkspaceStore) => state.isCheckoutOpen;