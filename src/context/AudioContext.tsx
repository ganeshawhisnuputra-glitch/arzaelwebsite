import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Track, AudioPlayerState } from '../types/music';
import { SELF_SABOTAGE_TRACKS } from '../data/selfSabotageEra';

interface AudioContextType {
  state: AudioPlayerState;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (progressPercent: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  isSpotifyPowered: boolean;
  spotifyArtistUrl: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/5Z1BQaKqJf7FhvaEWC2vOR?si=vdqtGkXvTye5ehe0bHMN7w";

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AudioPlayerState>({
    currentTrack: SELF_SABOTAGE_TRACKS[0] || null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 222,
    volume: 0.8,
    isMuted: false,
    isLoading: false,
    error: null,
  });

  const timerRef = useRef<number | null>(null);

  // Listen to global events: e.g. when YouTube starts playing, pause site audio
  useEffect(() => {
    const handlePauseAudio = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };
    window.addEventListener('arzael:pause-site-audio', handlePauseAudio);
    return () => {
      window.removeEventListener('arzael:pause-site-audio', handlePauseAudio);
    };
  }, []);

  // When audio starts playing, notify any active YouTube player to pause
  useEffect(() => {
    if (state.isPlaying) {
      window.dispatchEvent(new CustomEvent('arzael:pause-youtube-video'));
    }
  }, [state.isPlaying]);

  // Simulated progress timer when playing
  useEffect(() => {
    if (state.isPlaying) {
      timerRef.current = window.setInterval(() => {
        setState((prev) => {
          if (prev.currentTime >= prev.duration) {
            return { ...prev, isPlaying: false, currentTime: 0, progress: 0 };
          }
          const nextTime = prev.currentTime + 1;
          return {
            ...prev,
            currentTime: nextTime,
            progress: (nextTime / prev.duration) * 100,
          };
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isPlaying]);

  const playTrack = useCallback((track: Track) => {
    // Notify YouTube player to pause
    window.dispatchEvent(new CustomEvent('arzael:pause-youtube-video'));

    setState((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      progress: 0,
      error: null,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((prev) => {
      const willPlay = !prev.isPlaying;
      if (willPlay) {
        window.dispatchEvent(new CustomEvent('arzael:pause-youtube-video'));
      }
      return {
        ...prev,
        isPlaying: willPlay,
      };
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const seek = useCallback((progressPercent: number) => {
    setState((prev) => {
      const clamped = Math.max(0, Math.min(100, progressPercent));
      const targetTime = (clamped / 100) * prev.duration;
      return {
        ...prev,
        progress: clamped,
        currentTime: targetTime,
      };
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, vol)) }));
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const nextTrack = useCallback(() => {
    if (!state.currentTrack) return;
    const currentIndex = SELF_SABOTAGE_TRACKS.findIndex((t) => t.id === state.currentTrack?.id);
    const nextIndex = (currentIndex + 1) % SELF_SABOTAGE_TRACKS.length;
    playTrack(SELF_SABOTAGE_TRACKS[nextIndex]);
  }, [state.currentTrack, playTrack]);

  const prevTrack = useCallback(() => {
    if (!state.currentTrack) return;
    const currentIndex = SELF_SABOTAGE_TRACKS.findIndex((t) => t.id === state.currentTrack?.id);
    const prevIndex = (currentIndex - 1 + SELF_SABOTAGE_TRACKS.length) % SELF_SABOTAGE_TRACKS.length;
    playTrack(SELF_SABOTAGE_TRACKS[prevIndex]);
  }, [state.currentTrack, playTrack]);

  return (
    <AudioContext.Provider
      value={{
        state,
        playTrack,
        togglePlay,
        pause,
        seek,
        setVolume,
        toggleMute,
        nextTrack,
        prevTrack,
        isSpotifyPowered: true,
        spotifyArtistUrl: SPOTIFY_ARTIST_URL,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
