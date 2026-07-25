export type ProductCategory = 'desk' | 'chair' | 'monitor' | 'accessory' | 'coffee' | 'outdoor' | 'relax' | 'garage';

export interface Position {
  x: number;
  y: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  image: string;
  thumbnail: string;
  description: string;
  defaultPosition: Position;
  defaultRotation: number;
  defaultScale: number;
  zIndex: number;
  tags: string[];
  availability: boolean;
}

export interface WorkspaceItem {
  productId: string;
  position: Position;
  rotation: number;
  scale: number;
  zIndex: number;
}

export interface CheckoutState {
  rentalDuration: number;
  subtotal: number;
  tax: number;
  deposit: number;
  deliveryEstimate: string;
  grandTotal: number;
}

export type ThemeMode = 'light' | 'dark';

export interface HistoryEntry {
  items: WorkspaceItem[];
  zoneItems: Record<string, string>;
  deskId: string | null;
  chairId: string | null;
  deskPosition: Position;
  chairPosition: Position;
}

export interface WorkspaceState {
  _hasHydrated: boolean;
  selectedDesk: string | null;
  selectedChair: string | null;
  deskPosition: Position;
  chairPosition: Position;
  accessories: WorkspaceItem[];
  zoneItems: Record<string, string>; // slotId -> productId
  rentalDuration: number;
  theme: ThemeMode;
  history: HistoryEntry[];
  historyIndex: number;
  isCheckoutOpen: boolean;
  isSidebarOpen: boolean;
  isZoneDrawerOpen: boolean;
  activeZoneCategory: ProductCategory | null;
  activeZoneSlot: string | null;
}

export interface WorkspaceActions {
  setHasHydrated: (state: boolean) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setZoneDrawerOpen: (isOpen: boolean, category?: ProductCategory, slotId?: string) => void;
  setZoneItem: (slotId: string, productId: string) => void;
  removeZoneItem: (slotId: string) => void;
  selectDesk: (deskId: string | null) => void;
  selectChair: (chairId: string | null) => void;
  updateDeskPosition: (position: Position) => void;
  updateChairPosition: (position: Position) => void;
  addAccessory: (productId: string, position?: Position) => void;
  removeAccessory: (productId: string) => void;
  updateAccessoryPosition: (productId: string, position: Position) => void;
  setRentalDuration: (months: number) => void;
  toggleTheme: () => void;
  toggleCheckout: () => void;
  resetWorkspace: () => void;
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions;