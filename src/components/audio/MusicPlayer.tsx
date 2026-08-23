import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { useEntry } from '../../context/EntryContext';
import { useLocation } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const { state, togglePlay, toggleMute } = useAudio();
  const { hasEntered } = useEntry();
  const location = useLocation();

  // If on homepage and visitor has not entered, do NOT display the player
  const isVisible = hasEntered || location.pathname !== '/';
  if (!isVisible) {
    return null;
  }

  const currentTrack = state.currentTrack;

  return (
    <aside
      aria-label="Persistent Audio Player"
      className="fixed bottom-0 left-0 right-0 z-40 bg-petrol-950/95 backdrop-blur-md border-t border-petrol-800/80 px-4 py-2 sm:py-2.5 transition-all duration-500 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track identity */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={togglePlay}
            aria-label={state.isPlaying ? 'Pause' : `Play ${currentTrack?.title || 'Anesthesia'}`}
            className="w-8 h-8 rounded-full bg-petrol-900 border border-petrol-600/60 text-text-primary flex items-center justify-center hover:bg-petrol-800 hover:border-flesh-400 transition-all focus:outline-none focus:ring-1 focus:ring-flesh-400 shrink-0"
          >
            {state.isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-flesh-300 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 text-petrol-200 fill-current ml-0.5" />
            )}
          </button>

          <div className="min-w-0 truncate">
            <div className="flex items-baseline gap-2">
              <p className="font-serif text-xs sm:text-sm text-text-primary truncate font-medium">
                {currentTrack ? currentTrack.title : 'ANESTHESIA'}
              </p>
              <span className="text-[11px] text-text-muted truncate">
                ARZAEL
              </span>
            </div>
            {currentTrack?.statement && (
              <p className="text-[10px] text-text-dim truncate italic hidden sm:block">
                "{currentTrack.statement}"
              </p>
            )}
          </div>
        </div>

        {/* State indicator & Mute */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono text-petrol-400/80 tracking-wider hidden md:inline-block">
            {state.isPlaying ? '[ PLAYING ]' : '[ SOUNDTRACK READY ]'}
          </span>

          <button
            onClick={toggleMute}
            aria-label={state.isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="text-text-muted hover:text-text-primary p-1.5 transition-colors focus:outline-none"
          >
            {state.isMuted ? (
              <VolumeX className="w-4 h-4 text-flesh-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
