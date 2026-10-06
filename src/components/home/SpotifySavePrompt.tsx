import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'arzael-car-hit-save-prompt-v2';
const SPOTIFY_TRACK_URL = 'https://open.spotify.com/track/5zkc9mWdEknUc0gHhCWJz8?si=4204f115af314531';

interface SpotifySavePromptProps {
  /** Only show after intro completes and visitor is on homepage */
  show: boolean;
}

export const SpotifySavePrompt: React.FC<SpotifySavePromptProps> = ({ show }) => {
  const [visible, setVisible] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [exiting, setExiting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'true') return;
    } catch { /* storage unavailable */ }

    // Brief 400ms delay so intro crossfade completes smoothly
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setAnimatingIn(true));
    }, 400);
    return () => clearTimeout(timer);
  }, [show]);

  const dismiss = useCallback(() => {
    setExiting(true);
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      setAnimatingIn(false);
    }, 300);
  }, []);

  const handleSave = useCallback(() => {
    window.open(SPOTIFY_TRACK_URL, '_blank', 'noopener,noreferrer');
    dismiss();
  }, [dismiss]);

  // Keyboard ESC listener
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="SELF SABOTAGE PRESENTS THE CAR HIT"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020708]/80 backdrop-blur-md transition-opacity duration-300 ease-out ${
        exiting ? 'opacity-0' : animatingIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Oversized dark-chrome CD jewel case / album artifact */}
      <div
        ref={modalRef}
        className={`relative w-[90vw] max-w-[460px] sm:max-w-[500px] max-h-[82dvh] bg-[#030d0e]/95 border border-[#0D5659]/70 rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-hidden flex flex-col transition-transform duration-300 ease-out ${
          exiting ? 'scale-[0.96]' : animatingIn ? 'scale-100' : 'scale-[0.96]'
        }`}
      >
        {/* Smoked glass metallic highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/50 pointer-events-none z-10" />

        {/* Faint pink accent line across top */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D9878D]/80 to-transparent shrink-0 relative z-20" />

        {/* Plastic jewel case hinge ribbing on left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-5 bg-gradient-to-r from-white/[0.08] via-[#041D1E]/90 to-transparent border-r border-[#0D5659]/40 flex flex-col justify-between py-6 px-[2px] pointer-events-none z-20">
          <div className="space-y-1.5 opacity-40">
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
          </div>
          <div className="space-y-1.5 opacity-40">
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
            <div className="h-0.5 w-full bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Close button top right */}
        <button
          onClick={dismiss}
          aria-label="Dismiss prompt"
          className="absolute top-3 right-3 z-30 p-1.5 text-beige-100/50 hover:text-beige-100 hover:bg-white/[0.06] border border-transparent hover:border-[#0D5659]/40 rounded-xs transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Inner smoked sleeve content */}
        <div className="pl-6 sm:pl-8 pr-6 sm:pr-8 pt-7 pb-7 flex flex-col items-center text-center overflow-y-auto relative z-20">
          {/* Ouroboros badge mark */}
          <div className="w-8 h-8 rounded-full border border-[#D9878D]/50 flex items-center justify-center mb-4 bg-[#041D1E]/80 shadow-inner shrink-0">
            <div className="w-4 h-4 rounded-full border border-[#D9878D]/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D9878D]/70" />
            </div>
          </div>

          {/* Sub-header */}
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-[#D9878D]/90 mb-3">
            SELF SABOTAGE PRESENTS
          </span>

          {/* Main Title */}
          <h2 className="font-serif text-2xl sm:text-3xl text-[#E2E8F0] tracking-[0.06em] font-bold leading-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            THE CAR HIT
          </h2>
          <span className="font-serif text-lg sm:text-xl text-[#E2E8F0]/70 tracking-[0.08em] font-normal uppercase mb-3">
            (BE A DICK)
          </span>

          {/* Tagline quote */}
          <p className="font-serif italic text-xs sm:text-sm text-beige-100/60 tracking-wider mb-6 max-w-xs">
            if it hit you, keep it.
          </p>

          {/* Smoked line divider */}
          <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-[#0D5659]/80 to-transparent mb-6" />

          {/* Primary CTA Button */}
          <a
            href={SPOTIFY_TRACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.preventDefault(); handleSave(); }}
            className="group relative w-full py-3.5 px-6 bg-gradient-to-r from-[#041D1E] via-[#0D5659] to-[#041D1E] hover:from-[#0D5659] hover:to-[#0D5659] border border-[#1DB954]/40 hover:border-[#1DB954]/80 text-[#F3EBD7] hover:text-white rounded-xs transition-all shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mb-2"
          >
            {/* Spotify Green Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954" className="shrink-0 transition-transform group-hover:scale-110">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.858.208c-2.35-1.436-5.308-1.76-8.792-.963a.625.625 0 1 1-.277-1.219c3.81-.87 7.078-.497 9.719 1.116.31.189.41.59.208.858zm1.224-2.724a.782.782 0 0 1-1.077.257c-2.69-1.654-6.79-2.132-9.971-1.166a.782.782 0 1 1-.456-1.496c3.633-1.103 8.148-.568 11.247 1.328.373.228.492.716.257 1.077zm.105-2.836C14.692 8.92 8.397 8.71 4.75 9.818a.938.938 0 1 1-.544-1.794c4.19-1.272 11.143-1.031 15.118 1.33a.938.938 0 0 1-.41 1.762.92.92 0 0 1-.999-.252z"/>
            </svg>
            <span className="font-mono text-xs tracking-[0.25em] uppercase font-semibold">
              SAVE ON SPOTIFY ↗
            </span>
          </a>

          {/* Helper text */}
          <p className="text-[10px] font-mono text-beige-100/40 tracking-wider mb-5">
            tap ♡ in Spotify to save it.
          </p>

          {/* Secondary NOT NOW action */}
          <button
            onClick={dismiss}
            className="py-1.5 px-4 font-mono text-[11px] tracking-[0.2em] uppercase text-beige-100/50 hover:text-beige-100 transition-colors cursor-pointer"
          >
            NOT NOW
          </button>
        </div>
      </div>
    </div>
  );
};
