import type { Product } from '@/types';

export const products: Product[] = [
  // =====================================================
  // DESKS
  // =====================================================
  {
    id: 'desk-executive',
    name: 'Executive Standing Desk',
    slug: 'executive-standing-desk',
    category: 'desk',
    price: 850000,
    image: '/assets/ExecutiveStandingDesk.webp',
    thumbnail: '/assets/ExecutiveStandingDesk.webp',
    description:
      'Premium sit-stand desk with walnut finish. Electric height adjustment with memory presets.',

    // Titik tengah seluruh setup
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 2,

    tags: ['standing', 'premium', 'walnut'],
    availability: true,
  },
  {
    id: 'desk-minimal',
    name: 'Minimal Wood Desk',
    slug: 'minimal-wood-desk',
    category: 'desk',
    price: 450000,
    image: '/assets/desk-minimal.webp',
    thumbnail: '/assets/desk-minimal.webp',
    description:
      'Clean Scandinavian design. Spacious surface with cable management tray.',

    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 2,

    tags: ['minimal', 'wood', 'scandinavian'],
    availability: true,
  },
  {
    id: 'desk-minimal-white',
    name: 'Minimal White Desk',
    slug: 'minimal-white-desk',
    category: 'desk',
    price: 450000,
    image: '/assets/desk-minimal-white.webp',
    thumbnail: '/assets/desk-minimal-white.webp',
    description:
      'Clean Scandinavian design in a sleek white finish. Brightens up any modern workspace.',

    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 2,

    tags: ['minimal', 'white', 'scandinavian'],
    availability: true,
  },

  // =====================================================
  // CHAIRS
  // =====================================================
  {
    id: 'chair-ergonomic',
    name: 'Ergonomic Pro Chair',
    slug: 'ergonomic-pro-chair',
    category: 'chair',
    price: 650000,
    image: '/assets/ErgonomicProChair.webp',
    thumbnail: '/assets/ErgonomicProChair.webp',
    description:
      'Full mesh back with lumbar support. 4D armrests and tilt mechanism.',

    // Di depan dan tepat di tengah meja
    defaultPosition: { x: 0, y: 90 },
    defaultRotation: 0,
    defaultScale: 0.82,
    zIndex: 20,

    tags: ['ergonomic', 'mesh', 'premium'],
    availability: true,
  },
  {
    id: 'chair-minimal',
    name: 'Minimal Office Chair',
    slug: 'minimal-office-chair',
    category: 'chair',
    price: 350000,
    image: '/assets/MinimalOfficeChair.webp',
    thumbnail: '/assets/MinimalOfficeChair.webp',
    description:
      'Sleek profile with comfortable foam seat. Perfect for modern workspaces.',

    defaultPosition: { x: 0, y: 90 },
    defaultRotation: 0,
    defaultScale: 0.82,
    zIndex: 20,

    tags: ['minimal', 'foam', 'modern'],
    availability: true,
  },

  // =====================================================
  // MONITOR
  // =====================================================
  {
    id: 'acc-monitor',
    name: 'Ultrawide Monitor 34"',
    slug: 'ultrawide-monitor',
    category: 'monitor',
    price: 400000,
    image: '/assets/acc-monitor.webp',
    thumbnail: '/assets/thumb-acc-monitor.webp',
    description:
      '34-inch curved ultrawide display. USB-C connectivity with built-in speakers.',

    // Tengah dan sedikit ke belakang di atas meja
    defaultPosition: { x: 0, y: -87 },
    defaultRotation: 0,
    defaultScale: 0.68,
    zIndex: 8,

    tags: ['monitor', 'ultrawide', 'curved'],
    availability: true,
  },
  {
    id: 'acc-monitor-left',
    name: 'Left Monitor 27"',
    slug: 'left-monitor-27',
    category: 'monitor',
    price: 300000,
    image: '/assets/monitor-left1.webp',
    thumbnail: '/assets/monitor-left1.webp',
    description: '27-inch high refresh rate monitor, perfect for left side setup.',
    defaultPosition: { x: -140, y: -85 },
    defaultRotation: 0,
    defaultScale: 0.68,
    zIndex: 8,
    tags: ['monitor', 'left', 'display'],
    availability: true,
  },
  {
    id: 'acc-monitor-mid',
    name: 'Middle Monitor 27"',
    slug: 'middle-monitor-27',
    category: 'monitor',
    price: 300000,
    image: '/assets/monitor-mid1.webp',
    thumbnail: '/assets/monitor-mid1.webp',
    description: '27-inch high refresh rate monitor, perfect for center setup.',
    defaultPosition: { x: 0, y: -87 },
    defaultRotation: 0,
    defaultScale: 0.68,
    zIndex: 8,
    tags: ['monitor', 'center', 'display'],
    availability: true,
  },
  {
    id: 'acc-monitor-right',
    name: 'Right Monitor 27"',
    slug: 'right-monitor-27',
    category: 'monitor',
    price: 300000,
    image: '/assets/monitor-right1.webp',
    thumbnail: '/assets/monitor-right1.webp',
    description: '27-inch high refresh rate monitor, perfect for right side setup.',
    defaultPosition: { x: 140, y: -85 },
    defaultRotation: 0,
    defaultScale: 0.68,
    zIndex: 8,
    tags: ['monitor', 'right', 'display'],
    availability: true,
  },

  // =====================================================
  // DESK ACCESSORIES
  // =====================================================
  {
    id: 'acc-black-keyboard',
    name: 'Black Mechanical Keyboard',
    slug: 'black-mechanical-keyboard',
    category: 'accessory',
    price: 180000,
    image: '/assets/black-keyboard.webp',
    thumbnail: '/assets/black-keyboard.webp',
    description: 'Hot-swappable switches with matte black frame.',
    defaultPosition: { x: 0, y: -18 },
    defaultRotation: 0,
    defaultScale: 0.46,
    zIndex: 11,
    tags: ['keyboard', 'mechanical', 'black'],
    availability: true,
  },
  {
    id: 'acc-white-keyboard',
    name: 'White Mechanical Keyboard',
    slug: 'white-mechanical-keyboard',
    category: 'accessory',
    price: 180000,
    image: '/assets/white-keyboard.webp',
    thumbnail: '/assets/white-keyboard.webp',
    description: 'Hot-swappable switches with clean white frame.',
    defaultPosition: { x: 0, y: -18 },
    defaultRotation: 0,
    defaultScale: 0.46,
    zIndex: 11,
    tags: ['keyboard', 'mechanical', 'white'],
    availability: true,
  },
  {
    id: 'acc-black-lamp',
    name: 'Black Desk Lamp',
    slug: 'black-desk-lamp',
    category: 'accessory',
    price: 150000,
    image: '/assets/black-lamp.webp',
    thumbnail: '/assets/black-lamp.webp',
    description: 'Modern black desk lamp with adjustable arm.',
    defaultPosition: { x: 170, y: -70 },
    defaultRotation: 0,
    defaultScale: 1.0,
    zIndex: 10,
    tags: ['lamp', 'black', 'lighting'],
    availability: true,
  },
  {
    id: 'acc-white-lamp',
    name: 'White Desk Lamp',
    slug: 'white-desk-lamp',
    category: 'accessory',
    price: 150000,
    image: '/assets/white-lamp.webp',
    thumbnail: '/assets/white-lamp.webp',
    description: 'Minimalist white desk lamp with adjustable arm.',
    defaultPosition: { x: 170, y: -70 },
    defaultRotation: 0,
    defaultScale: 1.0,
    zIndex: 10,
    tags: ['lamp', 'white', 'lighting'],
    availability: true,
  },
  {
    id: 'acc-black-mouse',
    name: 'Black Precision Mouse',
    slug: 'black-precision-mouse',
    category: 'accessory',
    price: 85000,
    image: '/assets/black-mouse.webp',
    thumbnail: '/assets/black-mouse.webp',
    description: 'Ergonomic wireless mouse in matte black.',
    defaultPosition: { x: 85, y: -14 },
    defaultRotation: 0,
    defaultScale: 0.3,
    zIndex: 12,
    tags: ['mouse', 'black', 'wireless'],
    availability: true,
  },
  {
    id: 'acc-white-mouse',
    name: 'White Precision Mouse',
    slug: 'white-precision-mouse',
    category: 'accessory',
    price: 85000,
    image: '/assets/white-mouse.webp',
    thumbnail: '/assets/white-mouse.webp',
    description: 'Ergonomic wireless mouse in clean white.',
    defaultPosition: { x: 85, y: -14 },
    defaultRotation: 0,
    defaultScale: 0.3,
    zIndex: 12,
    tags: ['mouse', 'white', 'wireless'],
    availability: true,
  },
  {
    id: 'acc-plant-1',
    name: 'Monstera Plant',
    slug: 'monstera-plant',
    category: 'accessory',
    price: 65000,
    image: '/assets/plan1.webp',
    thumbnail: '/assets/plan1.webp',
    description: 'Beautiful indoor plant to freshen up your workspace.',
    defaultPosition: { x: -145, y: -40 },
    defaultRotation: 0,
    defaultScale: 0.4,
    zIndex: 10,
    tags: ['plant', 'decoration', 'green'],
    availability: true,
  },
  {
    id: 'acc-plant-2',
    name: 'Potted Succulent',
    slug: 'potted-succulent',
    category: 'accessory',
    price: 45000,
    image: '/assets/plan2.webp',
    thumbnail: '/assets/plan2.webp',
    description: 'Small potted succulent, perfect for minimalist desks.',
    defaultPosition: { x: 145, y: -40 },
    defaultRotation: 0,
    defaultScale: 0.35,
    zIndex: 10,
    tags: ['plant', 'succulent', 'decoration'],
    availability: true,
  },

  // =====================================================
  // UNDER DESK
  // =====================================================
  {
    id: 'acc-drawer',
    name: 'Mobile Drawer Unit',
    slug: 'mobile-drawer-unit',
    category: 'accessory',
    price: 180000,
    image: '/assets/acc-drawer.webp',
    thumbnail: '/assets/acc-drawer.webp',
    description:
      '3-drawer rolling cabinet with lock. Fits perfectly under any desk.',

    // Di bawah meja sebelah kanan
    defaultPosition: { x: 160, y: 45 },
    defaultRotation: 0,
    defaultScale: 0.62,
    zIndex: 3,

    tags: ['drawer', 'storage', 'mobile'],
    availability: true,
  },
  // =====================================================
  // COFFEE STATION
  // =====================================================
  {
    id: 'coffee-machine',
    name: 'Espresso Machine',
    slug: 'espresso-machine',
    category: 'coffee',
    price: 450000,
    image: '/assets/coffee-machine.webp',
    thumbnail: '/assets/coffee-machine.webp',
    description: 'Premium espresso machine for your daily caffeine fix.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['coffee', 'machine', 'premium'],
    availability: true,
  },
  {
    id: 'coffee-grinder',
    name: 'Burr Coffee Grinder',
    slug: 'burr-coffee-grinder',
    category: 'coffee',
    price: 150000,
    image: '/assets/coffee-grinder.webp',
    thumbnail: '/assets/coffee-grinder.webp',
    description: 'Precision burr grinder for the perfect espresso shot.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['coffee', 'grinder', 'accessory'],
    availability: true,
  },
  
  // =====================================================
  // OUTDOOR GEAR
  // =====================================================
  {
    id: 'outdoor-surfboard',
    name: 'Surfboard',
    slug: 'surfboard',
    category: 'outdoor',
    price: 350000,
    image: '/assets/surfboard.webp',
    thumbnail: '/assets/surfboard.webp',
    description: 'High-performance surfboard for weekend getaways.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['outdoor', 'surfboard', 'gear'],
    availability: true,
  },
  {
    id: 'outdoor-motorcycle',
    name: 'Motorcycle',
    slug: 'motorcycle',
    category: 'outdoor',
    price: 1500000,
    image: '/assets/motorcycle.webp',
    thumbnail: '/assets/motorcycle.webp',
    description: 'Classic motorcycle model for display.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['outdoor', 'motorcycle', 'vehicle'],
    availability: true,
  },

  // =====================================================
  // RELAX ZONE
  // =====================================================
  {
    id: 'relax-beanbag',
    name: 'Premium Bean Bag',
    slug: 'premium-bean-bag',
    category: 'relax',
    price: 250000,
    image: '/assets/beanbag.webp',
    thumbnail: '/assets/beanbag.webp',
    description: 'Ultra-comfortable bean bag for relaxing breaks.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['relax', 'beanbag', 'comfort'],
    availability: true,
  },
  {
    id: 'relax-lounge-chair',
    name: 'Lounge Chair',
    slug: 'lounge-chair',
    category: 'relax',
    price: 450000,
    image: '/assets/lounge-chair.webp',
    thumbnail: '/assets/lounge-chair.webp',
    description: 'Minimalist lounge chair for reading or resting.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['relax', 'chair', 'lounge'],
    availability: true,
  },

  // =====================================================
  // GARAGE SPACE
  // =====================================================
  {
    id: 'garage-toolshelf',
    name: 'Heavy Duty Tool Shelf',
    slug: 'tool-shelf',
    category: 'garage',
    price: 550000,
    image: '/assets/toolshelf.webp',
    thumbnail: '/assets/toolshelf.webp',
    description: 'Industrial grade tool shelf for maximum storage.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['garage', 'shelf', 'storage'],
    availability: true,
  },
  {
    id: 'garage-toolbox',
    name: 'Pro Toolbox Cabinet',
    slug: 'pro-toolbox-cabinet',
    category: 'garage',
    price: 350000,
    image: '/assets/toolbox.webp',
    thumbnail: '/assets/toolbox.webp',
    description: 'Rolling toolbox cabinet with multiple drawers.',
    defaultPosition: { x: 0, y: 0 },
    defaultRotation: 0,
    defaultScale: 1,
    zIndex: 10,
    tags: ['garage', 'toolbox', 'storage'],
    availability: true,
  },
];

export const desks = products.filter(
  (product) => product.category === 'desk',
);

export const chairs = products.filter(
  (product) => product.category === 'chair',
);

export const monitors = products.filter(
  (product) => product.category === 'monitor',
);

export const accessories = products.filter(
  (product) => product.category === 'accessory',
);

export const coffeeProducts = products.filter(
  (product) => product.category === 'coffee',
);

export const outdoorProducts = products.filter(
  (product) => product.category === 'outdoor',
);

export const relaxProducts = products.filter(
  (product) => product.category === 'relax',
);

export const garageProducts = products.filter(
  (product) => product.category === 'garage',
);

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}