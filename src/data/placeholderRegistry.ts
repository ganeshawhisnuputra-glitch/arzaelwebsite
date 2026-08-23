export interface PlaceholderSpec {
  id: string;
  role: string;
  aspectRatio: '16/9' | '21/9' | '4/5' | '1/1' | '9/16';
  label: string;
  subtext: string;
  suggestedDimensions: string;
}

export const PLACEHOLDER_REGISTRY: Record<string, PlaceholderSpec> = {
  PLACEHOLDER_HERO_CINEMATIC: {
    id: 'PLACEHOLDER_HERO_CINEMATIC',
    role: 'Homepage & Era Hero Background',
    aspectRatio: '21/9',
    label: 'CINEMATIC HERO PORTRAIT',
    subtext: 'High-tension atmospheric visual • Intimate scale',
    suggestedDimensions: '2560 × 1080 px',
  },
  PLACEHOLDER_HERO_PORTRAIT: {
    id: 'PLACEHOLDER_HERO_PORTRAIT',
    role: 'Mobile Hero Art Direction',
    aspectRatio: '9/16',
    label: 'MOBILE HERO COMPOSITION',
    subtext: 'Vertical portrait composition • Subject centered',
    suggestedDimensions: '1080 × 1920 px',
  },
  PLACEHOLDER_ARTIST_PORTRAIT: {
    id: 'PLACEHOLDER_ARTIST_PORTRAIT',
    role: 'About / Artist Manifesto Profile',
    aspectRatio: '4/5',
    label: 'ARZAEL — EDITORIAL PORTRAIT',
    subtext: 'Raw, honest, emotionally specific lighting',
    suggestedDimensions: '1200 × 1500 px',
  },
  PLACEHOLDER_ALBUM_ART: {
    id: 'PLACEHOLDER_ALBUM_ART',
    role: 'Self Sabotage Primary Album Art',
    aspectRatio: '1/1',
    label: 'SELF SABOTAGE — VINYL / COVER',
    subtext: 'Official Era Artwork • High resolution square',
    suggestedDimensions: '2000 × 2000 px',
  },
  PLACEHOLDER_TRACK_ANESTHESIA: {
    id: 'PLACEHOLDER_TRACK_ANESTHESIA',
    role: 'Track Single Art (Anesthesia)',
    aspectRatio: '1/1',
    label: 'SINGLE ART — ANESTHESIA',
    subtext: 'For when feeling nothing feels safer than feeling everything',
    suggestedDimensions: '1200 × 1200 px',
  },
  PLACEHOLDER_TRACK_SABOTAGE: {
    id: 'PLACEHOLDER_TRACK_SABOTAGE',
    role: 'Track Single Art (Self Sabotage)',
    aspectRatio: '1/1',
    label: 'SINGLE ART — SELF SABOTAGE',
    subtext: 'Watching yourself ruin it while knowing exactly what you are doing',
    suggestedDimensions: '1200 × 1200 px',
  },
  PLACEHOLDER_VIDEO_POSTER_01: {
    id: 'PLACEHOLDER_VIDEO_POSTER_01',
    role: 'Music Video Poster Thumbnail',
    aspectRatio: '16/9',
    label: 'VIDEO THUMBNAIL — ANESTHESIA',
    subtext: 'Official Music Video • Directed sequence',
    suggestedDimensions: '1920 × 1080 px',
  },
  PLACEHOLDER_VIDEO_POSTER_02: {
    id: 'PLACEHOLDER_VIDEO_POSTER_02',
    role: 'Visualizer Poster Thumbnail',
    aspectRatio: '16/9',
    label: 'VISUALIZER — OUROBOROS LIVE',
    subtext: 'Cyclical performative visual',
    suggestedDimensions: '1920 × 1080 px',
  },
  PLACEHOLDER_ARCHIVE_ERA_01: {
    id: 'PLACEHOLDER_ARCHIVE_ERA_01',
    role: 'Archive Era Gateway (Self Sabotage)',
    aspectRatio: '16/9',
    label: 'ERA 01 — SELF SABOTAGE (2026)',
    subtext: 'The opening record',
    suggestedDimensions: '1920 × 1080 px',
  },
  PLACEHOLDER_PRODUCT_HANDMADE_01: {
    id: 'PLACEHOLDER_PRODUCT_HANDMADE_01',
    role: 'Handmade Artifact Showcase',
    aspectRatio: '1/1',
    label: 'HANDMADE ARTIFACT 01',
    subtext: 'Physically crafted by ARZAEL • Unique piece',
    suggestedDimensions: '1200 × 1200 px',
  },
  PLACEHOLDER_PRODUCT_VINYL: {
    id: 'PLACEHOLDER_PRODUCT_VINYL',
    role: 'Vinyl Record Showcase',
    aspectRatio: '1/1',
    label: 'SELF SABOTAGE — LIMITED VINYL',
    subtext: 'Heavyweight petrol-teal vinyl edition',
    suggestedDimensions: '1200 × 1200 px',
  },
  PLACEHOLDER_PRODUCT_GARMENT: {
    id: 'PLACEHOLDER_PRODUCT_GARMENT',
    role: 'Era Apparel Showcase',
    aspectRatio: '4/5',
    label: 'OUROBOROS HEAVYWEIGHT TEE',
    subtext: 'Raw-edge custom washed black cotton',
    suggestedDimensions: '1200 × 1500 px',
  },
};
