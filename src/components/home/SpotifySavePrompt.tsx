import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'arzael-car-hit-save-prompt-v1';
const SPOTIFY_URL = 'https://open.spotify.com/artist/5Z1BQaKqJf7FhvaEWC2vOR?si=XL0MEQ6vQcuZL-tPOXqYHA';

interface SpotifySavePromptProps {
  /** Only show after intro completes — parent controls this */
  show: boolean;
}

export const SpotifySavePrompt: React.FC<SpotifySavePromptProps> = ({ show }) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!show) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'dismissed') return;
    } catch { /* storage unavailable */ }
    // Delay appearance 1.2s after homepage renders so hero video settles
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [show]);

  const dismiss = useCallback(() => {
    setExiting(true);
    try { localStorage.setItem(STORAGE_KEY, 'dismissed'); } catch {}
    setTimeout(() => setVisible(false), 350);
  }, []);

  const handleSave = useCallback(() => {
    window.open(SPOTIFY_URL, '_blank', 'noopener,noreferrer');
    dismiss();
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Save THE CAR HIT on Spotify"
      className={`fixed z-40 transition-all duration-300 ease-out
        bottom-[68px] sm:bottom-[72px]
        right-3 sm:right-5 md:right-8
        ${exiting ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'}
      `}
    >
      {/* Physical record slip / listening note */}
      <div
        className="relative w-[260px] sm:w-[280px] overflow-hidden select-none"
        style={{
          background: 'linear-gradient(168deg, #e8dfca 0%, #ddd4be 40%, #d5ccb4 100%)',
          borderRadius: '2px 8px 2px 2px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
          transform: 'rotate(-0.8deg)',
        }}
      >
        {/* Faint horizontal ruled lines like a notepad */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 12px, #000 12px, #000 13px)',
            backgroundSize: '100% 13px',
          }}
        />

        {/* Top edge: dark petrol band like a record sleeve header */}
        <div className="relative bg-[#041D1E] px-3.5 py-2 flex items-center justify-between">
          {/* Tiny ouroboros circle mark */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-[#D9878D]/60 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full border border-[#D9878D]/40" />
            </div>
            <span className="text-[8px] font-mono text-[#D9878D]/80 tracking-[0.2em] uppercase">
              LISTENING NOTE
            </span>
          </div>
          {/* Spotify green dot indicator */}
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
            <span className="text-[7px] font-mono text-[#1DB954]/70 tracking-wider uppercase">SPOTIFY</span>
          </div>
        </div>

        {/* Body content */}
        <div className="relative px-3.5 pt-3 pb-3">
          {/* Track title */}
          <h3 className="font-serif text-[15px] sm:text-[16px] text-[#041D1E] font-bold tracking-[0.04em] leading-tight mb-0.5">
            THE CAR HIT (BE A DICK)
          </h3>

          {/* Tagline */}
          <p className="text-[11px] font-serif italic text-[#041D1E]/60 mb-3 leading-snug">
            if it hit you, keep it.
          </p>

          {/* Thin separator like a receipt line */}
          <div className="w-full h-px bg-[#041D1E]/10 mb-2.5" />

          {/* Primary CTA */}
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.preventDefault(); handleSave(); }}
            className="group flex items-center justify-center gap-1.5 w-full py-2 bg-[#041D1E] hover:bg-[#0D5659] active:scale-[0.98] transition-all cursor-pointer rounded-xs"
          >
            {/* Spotify icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954" className="shrink-0">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.858.208c-2.35-1.436-5.308-1.76-8.792-.963a.625.625 0 1 1-.277-1.219c3.81-.87 7.078-.497 9.719 1.116.31.189.41.59.208.858zm1.224-2.724a.782.782 0 0 1-1.077.257c-2.69-1.654-6.79-2.132-9.971-1.166a.782.782 0 1 1-.456-1.496c3.633-1.103 8.148-.568 11.247 1.328.373.228.492.716.257 1.077zm.105-2.836C14.692 8.92 8.397 8.71 4.75 9.818a.938.938 0 1 1-.544-1.794c4.19-1.272 11.143-1.031 15.118 1.33a.938.938 0 0 1-.41 1.762.92.92 0 0 1-.999-.252z"/>
            </svg>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F3EBD7] group-hover:text-white">
              SAVE ON SPOTIFY
            </span>
            <span className="text-[10px] text-[#F3EBD7]/60 group-hover:text-white/70">↗</span>
          </a>

          {/* Helper text */}
          <p className="text-center text-[9px] font-mono text-[#041D1E]/40 mt-1.5 tracking-wide">
            tap ♡ in Spotify to save it.
          </p>

          {/* Secondary dismiss */}
          <button
            onClick={dismiss}
            className="block w-full text-center mt-2 py-1 text-[10px] font-mono text-[#041D1E]/45 hover:text-[#041D1E]/70 tracking-[0.15em] uppercase cursor-pointer transition-colors"
          >
            NOT NOW
          </button>
        </div>

        {/* Bottom edge: subtle torn/rough edge effect */}
        <div
          className="w-full h-[3px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #c9c0a8 0%, #d5ccb4 25%, #c4bb9f 50%, #d0c7af 75%, #c9c0a8 100%)',
          }}
        />
      </div>
    </div>
  );
};
