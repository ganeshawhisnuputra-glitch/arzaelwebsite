import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface OuroborosTransitionProps {
  onComplete: () => void;
}

export const OuroborosTransition: React.FC<OuroborosTransitionProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showMicrocopy, setShowMicrocopy] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const completedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsCrossfading(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Soft crossfade duration into doppelganger homepage
  }, [onComplete]);

  // Handle video element setup and playback
  useEffect(() => {
    completedRef.current = false;

    // Progressive scale visual transition
    const animFrame = requestAnimationFrame(() => {
      setIsScaled(true);
    });

    // Reveal microcopy at ~1.2s
    const microcopyTimer = setTimeout(() => {
      if (!completedRef.current) setShowMicrocopy(true);
    }, 1200);

    // Absolute fail-safe: never loop forever or block navigation
    const failSafeTimer = setTimeout(() => {
      finish();
    }, 5500);

    // Keyboard listener for ESC or Enter to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        finish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // If reduced motion is preferred, show deliberate static snake fallback instead of silently bypassing
    if (prefersReducedMotion) {
      return () => {
        cancelAnimationFrame(animFrame);
        clearTimeout(microcopyTimer);
        clearTimeout(failSafeTimer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }

    const video = videoRef.current;
    if (video) {
      // Set explicit DOM attributes for strict iOS WebKit / Safari compatibility
      video.defaultMuted = true;
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('autoplay', '');
      video.setAttribute('preload', 'auto');
      video.currentTime = 0;
      video.playbackRate = 1.6; // 8.16s source plays smoothly in ~5.1s

      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch((err) => {
              console.warn('[ARZAEL] Ouroboros autoplay restricted by browser:', err);
              setAutoplayBlocked(true);
              // Do NOT silently bypass: fallback to static snake + visible ENTER / SKIP controls
            });
        }
      };

      if (video.readyState >= 2) {
        attemptPlay();
      } else {
        video.addEventListener('canplay', attemptPlay, { once: true });
        video.addEventListener('loadedmetadata', attemptPlay, { once: true });
      }

      return () => {
        cancelAnimationFrame(animFrame);
        clearTimeout(microcopyTimer);
        clearTimeout(failSafeTimer);
        window.removeEventListener('keydown', handleKeyDown);
        video.removeEventListener('canplay', attemptPlay);
        video.removeEventListener('loadedmetadata', attemptPlay);
      };
    }

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(microcopyTimer);
      clearTimeout(failSafeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finish, prefersReducedMotion]);

  const showStaticFallback = prefersReducedMotion || hasVideoError || autoplayBlocked;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ouroboros Entry Transition"
      className={`fixed inset-0 z-50 bg-[#020708] flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden select-none ${
        isCrossfading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Visible SKIP control */}
      <button
        onClick={finish}
        aria-label="Skip entry transition"
        className="absolute top-6 right-6 z-30 px-3.5 py-1.5 bg-[#041D1E]/90 border border-[#0D5659]/70 text-[11px] font-mono tracking-widest uppercase text-beige-100/70 hover:text-beige-100 hover:border-[#D9878D] focus:outline-none focus:ring-1 focus:ring-[#D9878D] transition-colors cursor-pointer rounded-xs"
      >
        SKIP [ESC]
      </button>

      {/* 2. Centered multi-ouroboros visual container with progressive scale */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[500px] md:max-w-[580px] px-6">
        <div
          className={`relative w-full aspect-square flex items-center justify-center transition-transform duration-[4500ms] ease-out ${
            isScaled ? 'scale-[1.04]' : 'scale-[0.92]'
          }`}
        >
          {/* Static Snake Fallback: displayed when video cannot load, autoplay is restricted, or reduced motion is active */}
          {showStaticFallback ? (
            <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden bg-black">
              <img
                src="/assets/ouroboros/ouroboros-poster.jpg"
                alt="ARZAEL Ouroboros Motif"
                className="w-full h-full object-contain rounded-full select-none pointer-events-none"
                onError={(e) => {
                  // Secondary fallback to ouroboros logo if poster path fails
                  (e.currentTarget as HTMLImageElement).src = '/assets/brand/ouroboros-logo.png';
                }}
              />
              {/* Soft edge circular vignette */}
              <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_35px_rgba(2,7,8,0.95)]" />
            </div>
          ) : (
            /* Genuine Ouroboros MP4 video element */
            <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden bg-black">
              <video
                ref={videoRef}
                src="/assets/ouroboros/ouroboros-entry.mp4"
                poster="/assets/ouroboros/ouroboros-poster.jpg"
                muted
                autoPlay
                playsInline
                {...{ 'webkit-playsinline': 'true' }}
                preload="auto"
                onEnded={finish}
                onError={() => {
                  console.warn('[ARZAEL] Ouroboros video element error, falling back to static visual');
                  setHasVideoError(true);
                }}
                className={`w-full h-full object-contain rounded-full bg-black select-none pointer-events-none transition-opacity duration-300 ${
                  isPlaying ? 'opacity-100' : 'opacity-90'
                }`}
              />
              {/* Soft edge circular vignette */}
              <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_35px_rgba(2,7,8,0.95)]" />
            </div>
          )}
        </div>

        {/* 3. Restrained microcopy: YOU'VE BEEN HERE BEFORE. */}
        <div
          className={`mt-6 text-center transition-opacity duration-700 ${
            showMicrocopy ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <p className="font-serif text-sm md:text-base text-[#D9878D]/90 tracking-[0.2em] italic uppercase">
            YOU’VE BEEN HERE BEFORE.
          </p>
        </div>

        {/* 4. If autoplay was restricted or reduced motion is active: accessible ENTER button */}
        {showStaticFallback && (
          <div className="mt-5 animate-fade-in">
            <button
              onClick={finish}
              className="px-5 py-2 rounded-xs border border-[#D9878D] bg-[#041D1E]/95 text-[#F3EBD7] font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-[#D9878D] hover:text-[#041D1E] active:scale-95 transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>ENTER THE WORLD</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
