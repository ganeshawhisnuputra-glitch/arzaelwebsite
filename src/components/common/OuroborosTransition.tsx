import React, { useEffect, useRef, useState } from 'react';

interface OuroborosTransitionProps {
  onComplete: () => void;
}

export const OuroborosTransition: React.FC<OuroborosTransitionProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showMicrocopy, setShowMicrocopy] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsCrossfading(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Soft crossfade duration
  };

  useEffect(() => {
    completedRef.current = false;

    // Reduced motion check - bypass video immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const video = videoRef.current;
    if (video) {
      // Explicitly reset video playback state
      video.currentTime = 0;
      video.playbackRate = 2.0; // 8.16s source plays smoothly in ~4.08s
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[ARZAEL] Ouroboros entry video playback was interrupted or rejected:', err);
          setTimeout(finish, 800);
        });
      }
    }

    // Trigger progressive scale transition
    const animFrame = requestAnimationFrame(() => {
      setIsScaled(true);
    });

    // Subtle microcopy reveal at ~1.2s, fade out at ~3.2s
    const microcopyTimer = setTimeout(() => {
      if (!completedRef.current) setShowMicrocopy(true);
    }, 1200);

    const microcopyFadeTimer = setTimeout(() => {
      setShowMicrocopy(false);
    }, 3200);

    // Crossfade trigger before video ends (~3.8s)
    const crossfadeTimer = setTimeout(() => {
      if (!completedRef.current) setIsCrossfading(true);
    }, 3800);

    // Absolute fail-safe timeout
    const failSafeTimer = setTimeout(() => {
      finish();
    }, 4600);

    // Keyboard escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(microcopyTimer);
      clearTimeout(microcopyFadeTimer);
      clearTimeout(crossfadeTimer);
      clearTimeout(failSafeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ouroboros Entry Transition"
      className={`fixed inset-0 z-50 bg-[#020708] flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden ${
        isCrossfading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Skip button for keyboard & touch accessibility */}
      <button
        onClick={finish}
        aria-label="Skip entry transition"
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 bg-petrol-950/80 border border-petrol-700/60 text-[11px] font-mono tracking-widest uppercase text-text-muted hover:text-text-primary hover:border-flesh-400 focus:outline-none focus:ring-1 focus:ring-flesh-400 transition-colors cursor-pointer"
      >
        SKIP [ESC]
      </button>

      {/* Centered multi-ouroboros video container with subtle progressive scale */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[540px] md:max-w-[620px] px-4 select-none">
        <div
          className={`relative w-full aspect-square flex items-center justify-center transition-transform duration-[4200ms] ease-out ${
            isScaled ? 'scale-[1.04]' : 'scale-[0.92]'
          }`}
        >
          <video
            ref={videoRef}
            src="/assets/ouroboros/ouroboros-entry.mp4"
            muted
            playsInline
            onEnded={finish}
            onError={(e) => {
              console.warn('[ARZAEL] Video load error:', e);
              finish();
            }}
            className="w-full h-full object-contain rounded-full bg-black select-none pointer-events-none"
          />
          {/* Subtle soft edge vignette */}
          <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_30px_rgba(2,7,8,0.9)]" />
        </div>

        {/* Restrained microcopy: YOU'VE BEEN HERE BEFORE. */}
        <div
          className={`mt-6 text-center transition-opacity duration-700 ${
            showMicrocopy ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <p className="font-serif text-sm md:text-base text-flesh-300/90 tracking-editorial italic">
            YOU’VE BEEN HERE BEFORE.
          </p>
        </div>
      </div>
    </div>
  );
};
