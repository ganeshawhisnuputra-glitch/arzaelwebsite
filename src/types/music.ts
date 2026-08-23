export interface Track {
  id: string;
  title: string;
  artist: string;
  era: string;
  duration?: string;
  audioUrl?: string; // Optional real or demo audio stream
  statement?: string; // Psychological statement (e.g. "For when feeling nothing feels safer than feeling everything")
  artworkPlaceholderId: string;
  lyricsSnippet?: string;
  isAvailableForPlayback: boolean;
}

export interface AudioPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0 - 100 percentage
  currentTime: number; // seconds
  duration: number; // seconds
  volume: number; // 0 - 1
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
}
