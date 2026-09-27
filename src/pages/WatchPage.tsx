import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Play, ExternalLink } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  officialUrl: string;
  thumbnail: string;
}

const VIDEOS: VideoItem[] = [
  { 
    id: 'seniority-mv', 
    title: 'SENIORITY', 
    subtitle: 'Official Music Video', 
    youtubeId: 'pVi__x5bDTo', 
    officialUrl: 'https://www.youtube.com/watch?v=pVi__x5bDTo',
    thumbnail: 'https://img.youtube.com/vi/pVi__x5bDTo/hqdefault.jpg' 
  },
  { 
    id: 'top-one-mv', 
    title: 'TOP ONE', 
    subtitle: 'Official Music Video', 
    youtubeId: 'pvZCg6_PBxY', 
    officialUrl: 'https://www.youtube.com/watch?v=pvZCg6_PBxY',
    thumbnail: 'https://img.youtube.com/vi/pvZCg6_PBxY/hqdefault.jpg' 
  },
  { 
    id: 'seniority-bts', 
    title: 'SENIORITY', 
    subtitle: 'Behind The Scenes', 
    youtubeId: 'VTu4Bn7trU8', 
    officialUrl: 'https://www.youtube.com/watch?v=VTu4Bn7trU8',
    thumbnail: 'https://img.youtube.com/vi/VTu4Bn7trU8/hqdefault.jpg' 
  },
];

export const WatchPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const transitionTimeoutRef = useRef<number | null>(null);

  // When active video changes, reset play state & transition
  const handleSelectVideo = (video: VideoItem) => {
    if (activeVideo.id === video.id) return;
    
    setHasLoadError(false);
    if (prefersReducedMotion) {
      setActiveVideo(video);
      setIsPlaying(false);
      return;
    }

    setIsTransitioning(true);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setActiveVideo(video);
      setIsPlaying(false);
      setIsTransitioning(false);
    }, 350);
  };

  // Listen to global events: e.g. when site audio plays, pause YouTube video
  useEffect(() => {
    const handlePauseYouTube = () => {
      setIsPlaying(false);
    };
    window.addEventListener('arzael:pause-youtube-video', handlePauseYouTube);
    return () => {
      window.removeEventListener('arzael:pause-youtube-video', handlePauseYouTube);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const handleStartPlayback = () => {
    // Notify audio context to pause site audio
    window.dispatchEvent(new CustomEvent('arzael:pause-site-audio'));
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#041D1E] flex flex-col items-center pt-6 md:pt-8 pb-28 overflow-x-hidden font-sans text-[#F3EBD7]">
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.12; }
          25% { opacity: 0.18; }
          50% { opacity: 0.08; }
          75% { opacity: 0.15; }
        }
        .projector-cone {
          background: linear-gradient(to bottom, rgba(243, 235, 215, 0.15) 0%, rgba(243, 235, 215, 0) 100%);
          clip-path: polygon(45% 0, 55% 0, 100% 100%, 0 100%);
          animation: ${prefersReducedMotion ? 'none' : 'flicker 0.15s infinite'};
        }
        .film-sprockets-top, .film-sprockets-bottom {
          height: 14px;
          background-color: black;
          background-image: radial-gradient(circle at center, #041D1E 3.5px, transparent 4px);
          background-size: 18px 14px;
          background-repeat: repeat-x;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #041D1E;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0D5659;
          border-radius: 4px;
        }
      `}</style>

      {/* Screen Area */}
      <div className="relative w-full max-w-2xl px-4 mb-4 flex flex-col items-center z-10">
        
        {/* Projector Light Cone */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[140%] max-w-[600px] h-[300px] projector-cone pointer-events-none -z-10" />

        {/* Screen Frame with sliding gate effect */}
        <div className={`w-full aspect-video bg-black rounded-sm border-[6px] md:border-[10px] border-[#0D5659] shadow-[0_0_50px_rgba(217,135,141,0.15)] relative overflow-hidden flex flex-col items-center justify-center ring-1 ring-[#041D1E] transition-all duration-350 ${
          isTransitioning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
        }`}>
          
          {isPlaying ? (
            <div className="w-full h-full bg-black relative">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${activeVideo.title} — ${activeVideo.subtitle}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={() => setHasLoadError(true)}
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="relative w-full h-full group">
              <img 
                src={activeVideo.thumbnail} 
                alt={`${activeVideo.title} thumbnail`} 
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300">
                <button 
                  onClick={handleStartPlayback}
                  className="w-16 h-16 bg-[#D9878D] rounded-full flex items-center justify-center text-[#041D1E] hover:scale-110 hover:shadow-[0_0_30px_rgba(217,135,141,0.6)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#F3EBD7] cursor-pointer"
                  aria-label={`Play ${activeVideo.title}`}
                >
                  <Play size={30} className="ml-1 text-[#041D1E]" fill="currentColor" />
                </button>
                <span className="text-[10px] font-mono tracking-widest text-[#F3EBD7] uppercase mt-3 bg-black/60 px-2 py-0.5 rounded">
                  LOAD PROJECTOR GATE
                </span>
              </div>
            </div>
          )}

          {/* YouTube Load Error Fallback */}
          {hasLoadError && (
            <div className="absolute inset-0 bg-[#041D1E]/95 flex flex-col items-center justify-center p-6 text-center z-20">
              <p className="font-serif text-base text-[#D9878D] mb-2">{activeVideo.title} — {activeVideo.subtitle}</p>
              <p className="font-sans text-xs text-[#F3EBD7]/70 mb-4">Playback could not be loaded directly in the gate.</p>
              <a 
                href={activeVideo.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#D9878D] text-[#D9878D] font-mono text-xs uppercase tracking-wider hover:bg-[#D9878D] hover:text-[#041D1E] transition-colors flex items-center gap-1.5"
              >
                <span>WATCH ON YOUTUBE</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
          
          {/* Subtle screen glow overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(243,235,215,0.05)]"></div>
        </div>
        
        {/* Video Info under Screen */}
        <div className="mt-3 text-center max-w-xl">
          <h1 className="font-display text-2xl md:text-3xl text-[#F3EBD7] tracking-wider mb-1 drop-shadow-md">
            {activeVideo.title}
          </h1>
          <p className="font-serif text-[#D9878D] tracking-[0.2em] uppercase text-xs md:text-sm">
            {activeVideo.subtitle}
          </p>
        </div>
      </div>

      {/* Film Strip Area */}
      <div className="w-full px-0 md:px-8 mt-2 max-w-[1000px]">
        <div className="flex items-center justify-between mb-2 px-4">
          <h3 className="font-serif text-xs tracking-[0.2em] text-[#F3EBD7]/60 uppercase">
            Select a Reel
          </h3>
          <a
            href="https://www.youtube.com/@arzaelworld"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-mono text-[#D9878D] hover:text-beige-100 transition-colors uppercase tracking-wider"
          >
            <span>VIEW ALL ON YOUTUBE</span>
            <ExternalLink size={12} />
          </a>
        </div>
        
        <div className="bg-black py-2.5 md:py-3 border-y-2 border-[#0D5659]/30 shadow-2xl relative">
          {/* Top sprockets */}
          <div className="film-sprockets-top w-full absolute top-0 left-0 z-10" />
          
          <div className="flex overflow-x-auto custom-scrollbar snap-x snap-mandatory gap-4 py-5 px-4 md:px-8 relative z-0 items-center">
            {VIDEOS.map((video) => {
              const isActive = activeVideo.id === video.id;
              
              return (
                <button
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`
                    flex-shrink-0 w-52 sm:w-64 aspect-video snap-center
                    relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#D9878D]
                    transition-all duration-300 ease-out cursor-pointer rounded-xs
                    ${isActive ? 'scale-100 ring-2 ring-[#D9878D] opacity-100 shadow-[0_0_20px_rgba(217,135,141,0.4)]' : 'scale-95 opacity-55 hover:opacity-90 hover:scale-[0.98]'}
                  `}
                  aria-label={`Select film frame for ${video.title} - ${video.subtitle}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <div className="w-full h-full bg-[#0D5659]/80 relative">
                    <img 
                      src={video.thumbnail} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2">
                      <p className="font-display text-sm text-[#F3EBD7] truncate">{video.title}</p>
                      <p className="font-sans text-[10px] text-[#D9878D] truncate uppercase tracking-wider">{video.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Overlay for inactive */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300"></div>
                  )}
                  
                  {/* Selected indicator overlay */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-full h-full border-[2.5px] border-[#D9878D] pointer-events-none"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Bottom sprockets */}
          <div className="film-sprockets-bottom w-full absolute bottom-0 left-0 z-10" />
        </div>
      </div>
      
    </div>
  );
};
