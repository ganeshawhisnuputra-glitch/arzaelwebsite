import { Product } from '../types/shop';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-handmade-01',
    title: 'OUROBOROS TALISMAN — CAST IN PEWTER',
    subtitle: 'Hand-carved and hand-poured',
    category: 'ARZAEL HANDMADE',
    price: '$75.00',
    isHandmade: true,
    status: 'limited',
    description: 'A tactile reminder of the cycles you recognize and repeat anyway.',
    handmadeNote: 'MADE BY ME. Literally. Not “designed by me.” I actually touched these. Which either makes them more valuable or significantly worse. You decide. Every piece is a little different. That’s the point.',
    imagePlaceholderId: 'PLACEHOLDER_PRODUCT_HANDMADE_01',
  },
  {
    id: 'prod-vinyl-self-sabotage',
    title: 'SELF SABOTAGE — DEEP PETROL VINYL',
    subtitle: '180g Heavyweight Teal Edition',
    category: 'MUSIC',
    price: '$38.00',
    isHandmade: false,
    status: 'available',
    description: 'Includes full-color inner lyric sleeve, 12" art booklet, and download card.',
    imagePlaceholderId: 'PLACEHOLDER_PRODUCT_VINYL',
  },
  {
    id: 'prod-garment-tee',
    title: 'CYCLE HEAVYWEIGHT TEE',
    subtitle: 'Washed Black Custom Cut',
    category: 'SELF SABOTAGE',
    price: '$45.00',
    isHandmade: false,
    status: 'available',
    description: 'Subtle embroidered ouroboros at collarbone, flesh-pink interior print.',
    imagePlaceholderId: 'PLACEHOLDER_PRODUCT_GARMENT',
  },
];
