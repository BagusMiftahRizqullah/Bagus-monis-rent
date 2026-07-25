export const TAX_RATE = 0.11;
export const DEPOSIT_RATE = 0.5;
export const DELIVERY_DAYS = 5;
export const MIN_RENTAL_MONTHS = 1;
export const MAX_RENTAL_MONTHS = 24;

export const CATEGORIES = [
  { id: 'desk', label: 'Desks' },
  { id: 'chair', label: 'Chairs' },
  { id: 'monitor', label: 'Monitors' },
  { id: 'accessory', label: 'Accessories' },
] as const;

export const KEYBOARD_SHORTCUTS = {
  UNDO: 'mod+z',
  REDO: 'mod+shift+z',
  RESET: 'mod+shift+r',
  TOGGLE_CHECKOUT: 'mod+b',
  TOGGLE_THEME: 'mod+shift+d',
} as const;