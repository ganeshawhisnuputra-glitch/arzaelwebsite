import React, { useRef, useEffect, useState, useCallback } from 'react';

interface DoppelgangerSceneProps {
  className?: string;
}

export const DoppelgangerScene: React.FC<DoppelgangerSceneProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Attempt autoplay on mount
  useEffect(() => {
    if (prefersReducedMotion.current) {
      setIsPlaying(false);
      setAutoplayBlocked(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          setAutoplayBlocked(true);
        });
    }
  }, []);

  // Pause when tab hidden or navigating away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying]);

  const toggleMotion = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 1. Immediate poster fallback — always visible */}
      <div
        className="absolute inset-0 bg-[#041D1E]"
        style={{
          backgroundImage: "url('/assets/environments/corridor.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Video layer */}
      <video
        ref={videoRef}
        src="/assets/video/doppelganger.mov"
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setHasLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. Atmospheric gradients for readability */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bottom gradient for case files */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#020708]/90 via-[#020708]/40 to-transparent" />
        {/* Top subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020708]/60 to-transparent" />
        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020708]/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020708]/40 to-transparent" />
        {/* Subtle teal tint */}
        <div className="absolute inset-0 bg-[#0D5659]/8 mix-blend-color" />
      </div>

      {/* 4. Motion control */}
      <button
        onClick={toggleMotion}
        aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        className="absolute top-5 right-5 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-[#020708]/60 backdrop-blur-sm border border-[#0D5659]/40 text-beige-100/60 hover:text-beige-100 hover:border-flesh-500/50 transition-all cursor-pointer"
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="1" y="1" width="3.5" height="10" rx="0.5" />
            <rect x="7.5" y="1" width="3.5" height="10" rx="0.5" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <polygon points="2,0 12,6 2,12" />
          </svg>
        )}
      </button>

      {/* Autoplay blocked: show explicit play prompt */}
      {autoplayBlocked && !isPlaying && (
        <button
          onClick={toggleMotion}
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-transparent"
          aria-label="Play background scene"
        >
          <div className="w-16 h-16 rounded-full bg-[#020708]/70 backdrop-blur-sm border border-beige-100/20 flex items-center justify-center hover:border-flesh-500/60 transition-all">
            <svg width="20" height="20" viewBox="0 0 12 12" fill="currentColor" className="text-beige-100/80 ml-0.5">
              <polygon points="2,0 12,6 2,12" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};
