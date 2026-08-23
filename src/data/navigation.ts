export interface NavItem {
  label: string;
  path: string;
  description?: string;
  isPrimary?: boolean;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'ARZAEL', path: '/', isPrimary: true, description: 'Return to entry world' },
  { label: 'SELF SABOTAGE', path: '/self-sabotage', isPrimary: true, description: 'The current record & era' },
  { label: 'ARCHIVE', path: '/archive', isPrimary: true, description: 'Every version of me' },
  { label: 'WATCH', path: '/watch', isPrimary: true, description: 'Visuals and films' },
  { label: 'SHOP', path: '/shop', isPrimary: true, description: 'Take something with you' },
  { label: 'LETTERS', path: '/letters', isPrimary: true, description: 'Somewhere quieter' },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: 'ABOUT', path: '/about', description: 'Who is ARZAEL?' },
];
