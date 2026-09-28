import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DoppelgangerSceneProps {
  className?: string;
}

export const DoppelgangerScene: React.FC<DoppelgangerSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Attempt autoplay on mount when reduced motion is not active
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlayingVideo(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video started playing successfully
        })
        .catch(() => {
          // Autoplay was prevented by browser policy; fallback to poster
          setIsPlayingVideo(false);
        });
    }
  }, [prefersReducedMotion]);

  // Pause when tab is hidden or scene is off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
        setIsPlayingVideo(false);
      } else {
        video.play().catch(() => {});
      }
    };

    // IntersectionObserver to pause when off-screen
    let observer: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry.isIntersecting) {
            video.pause();
            setIsPlayingVideo(false);
          } else if (!document.hidden) {
            video.play().catch(() => {});
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (observer) observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const toggleMotion = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingVideo) {
      video.pause();
      setIsPlayingVideo(false);
    } else {
      video.play().catch(() => {});
    }
  }, [isPlayingVideo]);

  // Poster is visible during loading, when reduced motion is requested, on error, or when video hasn't played
  const showPoster = !isPlayingVideo || prefersReducedMotion || hasVideoError;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1. Sharp representative poster fallback from the exact video (loading, reduced-motion, error fallback) */}
      <div
        className={`absolute inset-0 bg-[#041D1E] transition-opacity duration-700 pointer-events-none z-0 ${
          showPoster ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: "url('/assets/video/doppelganger-poster.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
        aria-hidden="true"
      />

      {/* 2. Video layer with genuine MP4 (disabled under reduced motion) */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src="/assets/video/doppelganger.mp4"
          poster="/assets/video/doppelganger-poster.jpg"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onPlaying={() => {
            setIsPlayingVideo(true);
            setHasVideoError(false);
          }}
          onPause={() => setIsPlayingVideo(false)}
          onError={() => {
            setHasVideoError(true);
            setIsPlayingVideo(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center sm:object-[center_35%] transition-opacity duration-700 z-0 ${
            isPlayingVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Atmospheric gradients for readability — preserves upper 65% for faces, mirror & lamp */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Soft lower gradient only where needed for label readability (bottom 28%) */}
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#020708]/85 via-[#020708]/30 to-transparent" />
        {/* Top subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020708]/50 to-transparent" />
        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020708]/30 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020708]/30 to-transparent" />
      </div>

      {/* 4. Motion control button (only show when not permanently in reduced-motion) */}
      {!prefersReducedMotion && (
        <button
          onClick={toggleMotion}
          aria-label={isPlayingVideo ? 'Pause background video' : 'Play background video'}
          className="absolute top-5 right-5 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-[#020708]/60 backdrop-blur-sm border border-[#0D5659]/40 text-beige-100/60 hover:text-beige-100 hover:border-flesh-500/50 transition-all cursor-pointer"
        >
          {isPlayingVideo ? (
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
      )}
    </div>
  );
};
