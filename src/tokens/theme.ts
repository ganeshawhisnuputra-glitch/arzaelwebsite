export const ARZAEL_THEME = {
  colors: {
    petrol: {
      void: '#030c0e',
      surface: '#06171b',
      card: '#0a2228',
      border: 'rgba(20, 114, 135, 0.22)',
      subtle: '#0f2f37',
      primary: '#147287',
      glow: '#1fb4d4',
    },
    flesh: {
      shadow: '#2a1615',
      border: '#48201e',
      primary: '#d97e78',
      highlight: '#f09f9a',
      glow: 'rgba(217, 126, 120, 0.18)',
    },
    text: {
      primary: '#e8ecec',
      muted: '#809498',
      dim: '#48595d',
    },
  },
  typography: {
    letterSpacing: {
      artist: '0.25em',
      editorial: '0.12em',
      condensed: '0.04em',
    },
  },
  motion: {
    duration: {
      fast: 150,
      normal: 300,
      cinematic: 800,
    },
    easing: {
      editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      natural: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;
