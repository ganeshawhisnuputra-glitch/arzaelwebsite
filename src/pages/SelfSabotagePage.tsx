import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAudio } from '../context/AudioContext';
import { Track } from '../types/music';

interface TrackItem {
  id: string;
  title: string;
  statement: string;
  treatment: 'anesthesia' | 'car-hit' | 'wait-a-minute' | 'liar' | 'promise-breaker' | 'desperate-medicine';
}

const TRACKS: TrackItem[] = [
  { 
    id: 'anesthesia', 
    title: 'ANESTHESIA', 
    statement: 'For when feeling nothing feels safer than feeling everything.',
    treatment: 'anesthesia'
  },
  { 
    id: 'the-car-hit', 
    title: 'THE CAR HIT', 
    statement: 'The moment you realize the crash already happened.',
    treatment: 'car-hit'
  },
  { 
    id: 'wait-a-minute', 
    title: 'WAIT A MINUTE', 
    statement: 'Asking time to stop while you figure out what you just lost.',
    treatment: 'wait-a-minute'
  },
  { 
    id: 'liar', 
    title: 'LIAR', 
    statement: 'The version of you that promises things you both know you won\'t keep.',
    treatment: 'liar'
  },
  { 
    id: 'promise-breaker', 
    title: 'PROMISE BREAKER', 
    statement: 'Breaking your own word so many times it stops sounding like a word.',
    treatment: 'promise-breaker'
  },
  { 
    id: 'desperate-medicine', 
    title: 'DESPERATE MEDICINE', 
    statement: 'Taking the cure that is also the disease.',
    treatment: 'desperate-medicine'
  },
];

export const SelfSabotagePage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { playTrack, state, togglePlay } = useAudio();
  const currentTrackId = state.currentTrack?.id;
  const isPlaying = state.isPlaying;

  const handleTrackClick = (track: TrackItem) => {
    if (selectedTrack === track.id) {
      setSelectedTrack(null);
    } else {
      setSelectedTrack(track.id);
      const trackObj: Track = {
        id: track.id,
        title: track.title,
        artist: 'ARZAEL',
        era: 'SELF SABOTAGE',
        statement: track.statement,
        artworkPlaceholderId: 'PLACEHOLDER_ALBUM_ART',
        isAvailableForPlayback: true,
      };
      playTrack(trackObj);
    }
  };

  return (
    <div className="min-h-screen bg-[#041D1E] text-[#F3EBD7] relative overflow-hidden font-sans selection:bg-[#D9878D] selection:text-[#041D1E]">
      {/* Dynamic Background: Ambient Lamp Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          background: selectedTrack === 'the-car-hit'
            ? 'radial-gradient(circle at 50% 20%, rgba(13, 86, 89, 0.4) 0%, rgba(4, 29, 30, 0.95) 75%)'
            : 'radial-gradient(circle at 50% -10%, rgba(217, 135, 141, 0.22) 0%, transparent 60%)'
        }}
      />
      
      {/* Desk Surface Texture */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")'
        }}
      />

      {/* Specific Ambient effect for THE CAR HIT: rain shimmer */}
      {selectedTrack === 'the-car-hit' && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-25 mix-blend-screen bg-gradient-to-b from-transparent via-[#0D5659]/20 to-transparent animate-pulse" />
      )}

      <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-10 pb-28 flex flex-col items-center">
        
        {/* Main Case Sheet */}
        <div className="w-full max-w-xl bg-[#F3EBD7] text-[#041D1E] p-5 md:p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] rotate-1 transition-transform hover:rotate-0 duration-300 mb-8 relative border border-[#DACBA3]">
          {/* Paper Corner Clips */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#041D1E]/30" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#041D1E]/30" />
          
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#0D5659] border-b border-[#0D5659]/30 pb-0.5">
              OBSERVATION FILE // SS-2026
            </span>
            
            <img 
              src="/assets/brand/self-sabotage-title.png" 
              alt="SELF SABOTAGE"
              className="w-full max-w-xs md:max-w-sm mix-blend-multiply opacity-95 my-1"
            />
            
            <blockquote className="font-serif italic text-sm md:text-base max-w-md mt-1 text-[#041D1E]/85 border-l-2 border-[#D9878D] pl-3 py-0.5 text-left">
              "I thought my biggest problems were the things happening to me. Then I started noticing the things I was doing to myself. This record came from there."
            </blockquote>
          </div>
        </div>

        {/* Tracks / Evidence Spread */}
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-between mb-8 px-2 border-b border-[#0D5659]/40 pb-2">
            <span className="font-mono text-xs tracking-widest text-[#D9878D]">RECORDINGS & EVIDENCE</span>
            <span className="font-mono text-[10px] text-[#F3EBD7]/50 tracking-wider">TAP SHEET TO INSPECT</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-16">
            {TRACKS.map((track, i) => {
              const isSelected = selectedTrack === track.id;
              const isCurrentPlaying = currentTrackId === track.id && isPlaying;
              const baseRotation = i % 3 === 0 ? '-rotate-1' : i % 3 === 1 ? 'rotate-2' : '-rotate-2';
              
              return (
                <div 
                  key={track.id}
                  onClick={() => handleTrackClick(track)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTrackClick(track);
                    }
                  }}
                  className={`
                    relative bg-[#F3EBD7] text-[#041D1E] p-6 shadow-xl cursor-pointer select-none outline-none
                    border border-[#DACBA3]
                    ${!prefersReducedMotion && 'transition-all duration-[280ms] ease-out'}
                    ${isSelected ? 'scale-105 z-30 -translate-y-4 rotate-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-2 ring-[#D9878D]' : `${baseRotation} z-10 hover:z-20 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#D9878D]`}
                  `}
                >
                  {/* Top Bar with Exhibit ID & Play status */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[10px] text-[#0D5659]/80 uppercase tracking-widest font-semibold">
                      ITEM {String(i + 1).padStart(2, '0')}
                    </span>
                    <button 
                      type="button"
                      aria-label={isCurrentPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                      className="w-7 h-7 rounded-full bg-[#041D1E] text-[#F3EBD7] flex items-center justify-center hover:bg-[#D9878D] hover:text-[#041D1E] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentTrackId === track.id) {
                          togglePlay();
                        } else {
                          const trackObj: Track = {
                            id: track.id,
                            title: track.title,
                            artist: 'ARZAEL',
                            era: 'SELF SABOTAGE',
                            statement: track.statement,
                            artworkPlaceholderId: 'PLACEHOLDER_ALBUM_ART',
                            isAvailableForPlayback: true,
                          };
                          playTrack(trackObj);
                        }
                      }}
                    >
                      {isCurrentPlaying ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Title with specific track treatments */}
                  {track.treatment === 'liar' ? (
                    <h4 className={`font-serif font-bold text-lg tracking-wider text-[#041D1E] mb-2 transition-all ${isSelected && !prefersReducedMotion ? 'translate-x-0.5 skew-x-1' : ''}`}>
                      {track.title}
                    </h4>
                  ) : (
                    <h4 className="font-serif font-bold text-lg tracking-wider text-[#041D1E] mb-2">
                      {track.title}
                    </h4>
                  )}

                  {/* Track-specific physical artifact indicator */}
                  {track.treatment === 'anesthesia' && (
                    <div className="text-[9px] font-mono text-[#D9878D] tracking-widest uppercase mb-2 flex items-center gap-1">
                      <span>[ANNOTATION: METAPHORICAL DOSE]</span>
                    </div>
                  )}

                  {track.treatment === 'wait-a-minute' && (
                    <div className="flex items-center gap-2 mb-2 text-[9px] font-mono text-[#0D5659]">
                      <svg 
                        className={`w-3.5 h-3.5 transition-transform duration-700 ${isSelected ? '-rotate-180' : 'rotate-0'}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 8 10" />
                      </svg>
                      <span>COUNTER-CLOCKWISE RETREAT</span>
                    </div>
                  )}

                  {track.treatment === 'car-hit' && (
                    <div className="text-[9px] font-mono text-[#0D5659] tracking-wider mb-2">
                      <span>[DISTURBED GLASS ARCHIVE]</span>
                    </div>
                  )}

                  {track.treatment === 'promise-breaker' && isSelected && (
                    <div className="border-b-2 border-dashed border-[#D9878D]/60 my-1 animate-pulse" />
                  )}
                  
                  {/* Statement reveal */}
                  <div className={`overflow-hidden transition-all duration-300 ${isSelected ? 'max-h-40 opacity-100 mt-3 pt-3 border-t border-[#041D1E]/15' : 'max-h-16 opacity-80'}`}>
                    <p className="font-serif italic text-xs text-[#041D1E]/80 leading-relaxed">
                      "{track.statement}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tucked-in Generator Artifacts */}
        <div className="w-full max-w-4xl border-t border-[#0D5659]/50 pt-10 pb-28">
          <div className="text-center mb-6">
            <span className="font-mono text-xs text-[#D9878D] tracking-widest uppercase">
              // WORKSHOP PROOFS & GENERATORS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Life Stevia: Folded Poster Proof */}
            <Link 
              to="/self-sabotage/life-stevia"
              className="group relative bg-[#F3EBD7] text-[#041D1E] p-6 shadow-xl border border-[#DACBA3] rotate-[-1deg] hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#D9878D] text-[#041D1E] font-mono text-[9px] uppercase tracking-wider font-bold">
                FOLDED PROOF
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#0D5659] block uppercase tracking-widest mb-1">EXHIBIT A</span>
                <h4 className="font-serif font-bold text-xl tracking-wider mb-2">LIFE STEVIA POSTER GENERATOR</h4>
                <p className="font-serif italic text-xs text-[#041D1E]/75 leading-relaxed">
                  Generate your custom lyric & clinical aesthetic poster print.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#041D1E]/10 flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#0D5659] group-hover:text-[#D9878D]">
                <span>UNFOLD PROOF</span>
                <span>→</span>
              </div>
            </Link>

            {/* Profile Picture Generator: Photo Booth Strip */}
            <Link 
              to="/self-sabotage/profile-picture"
              className="group relative bg-[#072C2E] text-[#F3EBD7] p-6 shadow-xl border border-[#0D5659] rotate-[1.5deg] hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#0D5659] text-[#F3EBD7] font-mono text-[9px] uppercase tracking-wider">
                OUROBOROS FRAME
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#D9878D] block uppercase tracking-widest mb-1">EXHIBIT B</span>
                <h4 className="font-serif font-bold text-xl tracking-wider mb-2 text-[#F3EBD7]">PFP / AVATAR GENERATOR</h4>
                <p className="font-serif italic text-xs text-[#F3EBD7]/70 leading-relaxed">
                  Frame yourself inside the cyclical ouroboros mark.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#0D5659] flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#D9878D] group-hover:text-[#F3EBD7]">
                <span>ENTER PHOTO BOOTH</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
