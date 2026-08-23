export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: 'ARZAEL HANDMADE' | 'SELF SABOTAGE' | 'MUSIC' | 'ARCHIVE OBJECTS';
  price: string;
  isHandmade: boolean;
  status: 'available' | 'limited' | 'sold_out';
  description: string;
  handmadeNote?: string;
  imagePlaceholderId: string;
}
