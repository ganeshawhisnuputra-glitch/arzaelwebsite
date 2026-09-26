import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Play } from 'lucide-react';

const VIDEOS = [
  { 
    id: 'self-sabotage-mv', 
    title: 'SELF SABOTAGE', 
    subtitle: 'Official Music Video', 
    youtubeId: 'placeholder', 
    thumbnail: '/assets/brand/self-sabotage-title.png' 
  },
  { 
    id: 'anesthesia-viz', 
    title: 'ANESTHESIA', 
    subtitle: 'Official Visualizer', 
    youtubeId: 'placeholder', 
    thumbnail: null 
  },
  { 
    id: 'behind-scenes', 
    title: 'BEHIND THE SCENES', 
    subtitle: 'Making of Self Sabotage', 
    youtubeId: 'placeholder', 
    thumbnail: null 
  },
];

export const WatchPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Reset playing state when video changes
  useEffect(() => {
    setIsPlaying(false);
  }, [activeVideo]);

  return (
    <div className="min-h-screen bg-[#041D1E] flex flex-col items-center pt-6 md:pt-8 pb-28 overflow-x-hidden font-sans text-[#F3EBD7]">
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.15; }
          25% { opacity: 0.2; }
          50% { opacity: 0.1; }
          75% { opacity: 0.18; }
        }
        .projector-cone {
          background: linear-gradient(to bottom, rgba(243, 235, 215, 0.15) 0%, rgba(243, 235, 215, 0) 100%);
          clip-path: polygon(45% 0, 55% 0, 100% 100%, 0 100%);
          animation: ${prefersReducedMotion ? 'none' : 'flicker 0.15s infinite'};
        }
        .film-sprockets-top, .film-sprockets-bottom {
          height: 16px;
          background-color: black;
          background-image: radial-gradient(circle at center, #041D1E 4px, transparent 4.5px);
          background-size: 20px 16px;
          background-repeat: repeat-x;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
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

        {/* Screen Frame */}
        <div className="w-full aspect-video bg-black rounded-sm border-[6px] md:border-[10px] border-[#0D5659] shadow-[0_0_50px_rgba(217,135,141,0.15)] relative overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ring-1 ring-[#041D1E]">
          
          {isPlaying ? (
            <div className="w-full h-full bg-[#041D1E] flex flex-col items-center justify-center relative shadow-[inset_0_0_100px_black]">
              <p className="font-display text-[#D9878D] text-xl md:text-3xl animate-pulse z-10">
                PLAYING VIDEO
              </p>
              <p className="font-sans text-[#F3EBD7]/70 mt-2 z-10">
                ID: {activeVideo.youtubeId}
              </p>
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]"></div>
            </div>
          ) : (
            <div className="relative w-full h-full group">
              {activeVideo.thumbnail ? (
                <img 
                  src={activeVideo.thumbnail} 
                  alt={activeVideo.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              ) : (
                <div className="w-full h-full bg-[#0D5659]/30 flex flex-col items-center justify-center p-8 text-center shadow-[inset_0_0_80px_black]">
                  <h2 className="font-display text-4xl md:text-6xl text-[#D9878D] mb-2">{activeVideo.title}</h2>
                  <p className="font-serif text-[#F3EBD7] text-lg tracking-widest">{activeVideo.subtitle}</p>
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 bg-[#D9878D] rounded-full flex items-center justify-center text-[#041D1E] hover:scale-110 hover:shadow-[0_0_30px_rgba(217,135,141,0.5)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#F3EBD7]"
                  aria-label="Play video"
                >
                  <Play size={32} className="ml-1.5" fill="currentColor" />
                </button>
              </div>
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
      <div className="w-full px-0 md:px-8 mt-2 max-w-[1200px]">
        <h3 className="font-serif text-xs tracking-[0.2em] text-[#F3EBD7]/60 mb-2 px-4 uppercase text-center md:text-left">
          Select a Reel
        </h3>
        
        <div className="bg-black py-3 md:py-4 border-y-2 border-[#0D5659]/30 shadow-2xl relative">
          {/* Top sprockets */}
          <div className="film-sprockets-top w-full absolute top-0 left-0 z-10" />
          
          <div className="flex overflow-x-auto custom-scrollbar snap-x snap-mandatory gap-4 py-6 px-4 md:px-12 relative z-0 items-center min-h-[160px] md:min-h-[220px]">
            {VIDEOS.map((video) => {
              const isActive = activeVideo.id === video.id;
              
              return (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`
                    flex-shrink-0 w-60 md:w-80 aspect-video snap-center
                    relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-[#D9878D]
                    transition-all duration-500 ease-out
                    ${isActive ? 'scale-100 ring-2 ring-[#D9878D] opacity-100 shadow-[0_0_20px_rgba(217,135,141,0.3)]' : 'scale-95 opacity-50 hover:opacity-90 hover:scale-[0.98]'}
                  `}
                  aria-label={`Select video ${video.title}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <div className="w-full h-full bg-[#0D5659]/80">
                    {video.thumbnail ? (
                      <img 
                        src={video.thumbnail} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D5659] to-[#041D1E]">
                        <span className="font-display text-xl md:text-2xl text-[#F3EBD7]/50 px-4 text-center break-words">
                          {video.title}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay for inactive */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300"></div>
                  )}
                  
                  {/* Selected indicator overlay */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-full h-full border-[3px] border-[#D9878D] pointer-events-none"></div>
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
