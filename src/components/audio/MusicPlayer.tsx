import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useEntry } from '../../context/EntryContext';
import { useLocation } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const { state, togglePlay, toggleMute, spotifyArtistUrl } = useAudio();
  const { hasEntered } = useEntry();
  const location = useLocation();
  const [showEmbed, setShowEmbed] = useState(false);

  // If on homepage and visitor has not entered, do NOT display the player
  const isVisible = hasEntered || location.pathname !== '/';
  if (!isVisible) {
    return null;
  }

  const currentTrack = state.currentTrack;

  return (
    <>
      {/* Optional Spotify Compact Embed Drawer when listener wants full native Spotify embed */}
      {showEmbed && (
        <div className="fixed bottom-14 left-4 z-40 w-[300px] sm:w-[352px] bg-petrol-950/95 border border-petrol-800 rounded-lg shadow-2xl p-2 animate-fade-in backdrop-blur-md">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-[10px] font-mono text-[#D9878D] uppercase tracking-wider flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.858.208c-2.35-1.436-5.308-1.76-8.792-.963a.625.625 0 1 1-.277-1.219c3.81-.87 7.078-.497 9.719 1.116.31.189.41.59.208.858zm1.224-2.724a.782.782 0 0 1-1.077.257c-2.69-1.654-6.79-2.132-9.971-1.166a.782.782 0 1 1-.456-1.496c3.633-1.103 8.148-.568 11.247 1.328.373.228.492.716.257 1.077zm.105-2.836C14.692 8.92 8.397 8.71 4.75 9.818a.938.938 0 1 1-.544-1.794c4.19-1.272 11.143-1.031 15.118 1.33a.938.938 0 0 1-.41 1.762.92.92 0 0 1-.999-.252z"/></svg>
              SPOTIFY PLAYER
            </span>
            <button 
              onClick={() => setShowEmbed(false)}
              className="text-beige-100/50 hover:text-beige-100 text-xs px-1"
              aria-label="Close Spotify Embed"
            >
              ✕
            </button>
          </div>
          <iframe 
            src="https://open.spotify.com/embed/artist/5Z1BQaKqJf7FhvaEWC2vOR?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="ARZAEL on Spotify"
            className="rounded-md"
          />
        </div>
      )}

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

          {/* Spotify Badge & Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Spotify Indicator */}
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1DB954]/10 border border-[#1DB954]/30 hover:bg-[#1DB954]/20 hover:border-[#1DB954]/60 text-beige-100 transition-all group"
              title="Toggle Spotify Player"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.858.208c-2.35-1.436-5.308-1.76-8.792-.963a.625.625 0 1 1-.277-1.219c3.81-.87 7.078-.497 9.719 1.116.31.189.41.59.208.858zm1.224-2.724a.782.782 0 0 1-1.077.257c-2.69-1.654-6.79-2.132-9.971-1.166a.782.782 0 1 1-.456-1.496c3.633-1.103 8.148-.568 11.247 1.328.373.228.492.716.257 1.077zm.105-2.836C14.692 8.92 8.397 8.71 4.75 9.818a.938.938 0 1 1-.544-1.794c4.19-1.272 11.143-1.031 15.118 1.33a.938.938 0 0 1-.41 1.762.92.92 0 0 1-.999-.252z"/></svg>
              <span className="text-[9px] font-mono tracking-wider text-beige-100/80 group-hover:text-beige-100">
                SPOTIFY
              </span>
            </button>

            {/* Direct Open in Spotify Link */}
            <a
              href={spotifyArtistUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open ARZAEL in Spotify"
              className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-[#D9878D] hover:text-beige-100 transition-colors uppercase tracking-wider"
            >
              <span>OPEN IN SPOTIFY</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

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
    </>
  );
};
