export interface VideoItem {
  id: string;
  title: string;
  category: 'music_video' | 'visualizer' | 'short_film' | 'live_session';
  era: string;
  duration: string;
  description: string;
  statement?: string;
  thumbnailPlaceholderId: string;
  videoEmbedUrl?: string; // Loaded strictly upon user interaction
}
