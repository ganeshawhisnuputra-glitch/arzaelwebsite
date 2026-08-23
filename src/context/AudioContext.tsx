import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
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
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to first track queued in stopped/paused state (strictly ZERO autoplay)
  const [state, setState] = useState<AudioPlayerState>({
    currentTrack: SELF_SABOTAGE_TRACKS[0] || null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 222, // 3:42 simulated duration for demonstration
    volume: 0.8,
    isMuted: false,
    isLoading: false,
    error: null,
  });

  const timerRef = useRef<number | null>(null);

  // Simulated continuous progress ticker when audio is simulated in V0
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

  const playTrack = (track: Track) => {
    setState((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      progress: 0,
      error: null,
    }));
  };

  const togglePlay = () => {
    setState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const pause = () => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  };

  const seek = (progressPercent: number) => {
    setState((prev) => {
      const clamped = Math.max(0, Math.min(100, progressPercent));
      const targetTime = (clamped / 100) * prev.duration;
      return {
        ...prev,
        progress: clamped,
        currentTime: targetTime,
      };
    });
  };

  const setVolume = (vol: number) => {
    setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, vol)) }));
  };

  const toggleMute = () => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const nextTrack = () => {
    if (!state.currentTrack) return;
    const currentIndex = SELF_SABOTAGE_TRACKS.findIndex((t) => t.id === state.currentTrack?.id);
    const nextIndex = (currentIndex + 1) % SELF_SABOTAGE_TRACKS.length;
    playTrack(SELF_SABOTAGE_TRACKS[nextIndex]);
  };

  const prevTrack = () => {
    if (!state.currentTrack) return;
    const currentIndex = SELF_SABOTAGE_TRACKS.findIndex((t) => t.id === state.currentTrack?.id);
    const prevIndex = (currentIndex - 1 + SELF_SABOTAGE_TRACKS.length) % SELF_SABOTAGE_TRACKS.length;
    playTrack(SELF_SABOTAGE_TRACKS[prevIndex]);
  };

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
