import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DoppelgangerSceneProps {
  className?: string;
  mode?: 'desktop' | 'mobile';
}

export const DoppelgangerScene: React.FC<DoppelgangerSceneProps> = ({ 
  className = '',
  mode = 'desktop' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Set explicit HTML attributes on the DOM node for iOS Safari / WebKit compliance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('preload', 'auto');

    if (prefersReducedMotion) {
      setIsPlaying(false);
      return;
    }

    const attemptPlay = () => {
      video.playbackRate = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
            setHasStartedPlaying(true);
          })
          .catch((err) => {
            console.warn('[Doppelganger] Autoplay rejected or blocked by browser:', err);
            setIsPlaying(false);
            setAutoplayBlocked(true);
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
      video.removeEventListener('canplay', attemptPlay);
      video.removeEventListener('loadedmetadata', attemptPlay);
    };
  }, [prefersReducedMotion]);

  // Tab visibility & off-screen pause handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else if (!autoplayBlocked) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry.isIntersecting) {
            video.pause();
            setIsPlaying(false);
          } else if (!document.hidden && !autoplayBlocked) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {});
          }
        },
        { threshold: 0 }
      );
      observer.observe(containerRef.current);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, [prefersReducedMotion, autoplayBlocked]);

  const handleManualPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().then(() => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
      setHasStartedPlaying(true);
    }).catch((err) => {
      console.warn('[Doppelganger] Manual play error:', err);
    });
  }, []);

  const toggleMotion = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      handleManualPlay();
    }
  }, [isPlaying, handleManualPlay]);

  const showPoster = !hasStartedPlaying || prefersReducedMotion || hasVideoError;

  // ─────────────────────────────────────────────────────────────
  // MOBILE SCENE: dedicated 16:9 scene viewport with object-contain
  // ─────────────────────────────────────────────────────────────
  if (mode === 'mobile') {
    return (
      <div 
        ref={containerRef}
        className={`relative w-full aspect-video max-h-[38vh] bg-black overflow-hidden ${className}`}
      >
        {/* Subtle blurred ambient extension of the scene to fill any letterbox edges */}
        <div 
          className="absolute inset-0 opacity-25 scale-110 blur-lg pointer-events-none"
          style={{
            backgroundImage: "url('/assets/video/doppelganger-poster.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />

        {/* 1. Poster fallback with object-contain (shows until video plays) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none z-0 flex items-center justify-center ${
            showPoster ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <img 
            src="/assets/video/doppelganger-poster.jpg" 
            alt="ARZAEL Doppelganger Scene"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 2. Genuine MP4 video element with object-contain: full landscape scene visible */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src="/assets/video/doppelganger.mp4"
            poster="/assets/video/doppelganger-poster.jpg"
            muted
            autoPlay
            loop
            playsInline
            {...{ 'webkit-playsinline': 'true' }}
            preload="auto"
            onPlaying={() => {
              setHasStartedPlaying(true);
              setIsPlaying(true);
              setAutoplayBlocked(false);
              setHasVideoError(false);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setHasVideoError(true);
              setIsPlaying(false);
            }}
            className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 ${
              hasStartedPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* 3. Subtle vignette overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]" />

        {/* 4. If iPhone Safari blocks autoplay: accessible PLAY THE SCENE control */}
        {autoplayBlocked && !isPlaying && !prefersReducedMotion && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
            <button
              onClick={handleManualPlay}
              className="px-4 py-2 rounded-xs border border-[#D9878D] bg-[#041D1E]/95 text-[#F3EBD7] font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#D9878D] hover:text-[#041D1E] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-2xl"
              aria-label="Play the scene"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>PLAY THE SCENE</span>
            </button>
          </div>
        )}

        {/* 5. Minimal motion toggle in bottom-right of 16:9 frame */}
        {!prefersReducedMotion && hasStartedPlaying && (
          <button
            onClick={toggleMotion}
            aria-label={isPlaying ? 'Pause scene video' : 'Play scene video'}
            className="absolute bottom-2 right-2 z-30 w-7 h-7 flex items-center justify-center rounded-full bg-[#020708]/70 backdrop-blur-sm border border-[#0D5659]/50 text-beige-100/70 hover:text-beige-100 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                <rect x="1.5" y="1" width="3" height="10" rx="0.5" />
                <rect x="7.5" y="1" width="3" height="10" rx="0.5" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                <polygon points="2,0 12,6 2,12" />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DESKTOP SCENE: original approved fullscreen ambient composition
  // ─────────────────────────────────────────────────────────────
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1. Sharp representative poster fallback */}
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

      {/* 2. Genuine MP4 video element */}
      {!prefersReducedMotion && (
        <video
          id="hero-video"
          ref={videoRef}
          src="/assets/video/doppelganger.mp4"
          poster="/assets/video/doppelganger-poster.jpg"
          muted
          autoPlay
          loop
          playsInline
          {...{ 'webkit-playsinline': 'true' }}
          preload="auto"
          onPlaying={() => {
            setHasStartedPlaying(true);
            setIsPlaying(true);
            setAutoplayBlocked(false);
            setHasVideoError(false);
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setHasVideoError(true);
            setIsPlaying(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center sm:object-[center_35%] transition-opacity duration-700 z-0 ${
            hasStartedPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Atmospheric gradients for readability — preserves upper 65% for faces, mirror & lamp */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#020708]/85 via-[#020708]/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020708]/50 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020708]/30 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020708]/30 to-transparent" />
      </div>

      {/* 4. Desktop motion control button */}
      {!prefersReducedMotion && (
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
      )}
    </div>
  );
};
