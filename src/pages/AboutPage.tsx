import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const AboutPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [cracked, setCracked] = useState(false);
  const [crackPos, setCrackPos] = useState({ x: 50, y: 50 });
  const [showFull, setShowFull] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const targetParallax = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize between -1 and 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetParallax.current = { x: x * 10, y: y * 10 }; // max 10px parallax
    },
    [reducedMotion]
  );

  const updateParallax = useCallback(() => {
    // Lerp smoothing
    currentParallax.current.x += (targetParallax.current.x - currentParallax.current.x) * 0.1;
    currentParallax.current.y += (targetParallax.current.y - currentParallax.current.y) * 0.1;
    
    // Only update state if change is significant to avoid unnecessary re-renders
    setParallax({ x: currentParallax.current.x, y: currentParallax.current.y });
    
    requestRef.current = requestAnimationFrame(updateParallax);
  }, []);

  useEffect(() => {
    if (!reducedMotion) {
      requestRef.current = requestAnimationFrame(updateParallax);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [reducedMotion, updateParallax]);

  const handleMirrorClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (cracked) return;
    
    // For mouse clicks, calculate position for the crack origin
    if ('clientX' in e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX;
      const clickY = e.clientY;
      // Get percentage position relative to the mirror element
      const x = ((clickX - rect.left) / rect.width) * 100;
      const y = ((clickY - rect.top) / rect.height) * 100;
      setCrackPos({ x, y });
    } else {
      // For keyboard, default to center
      setCrackPos({ x: 50, y: 50 });
    }
    
    setCracked(true);
  };

  return (
    <div 
      className="min-h-screen bg-[#041D1E] text-[#F3EBD7] font-sans selection:bg-[#D9878D] selection:text-[#041D1E] overflow-x-hidden flex flex-col items-center"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Scene 1: Mirror */}
      <div className="relative w-full min-h-[calc(100dvh-4rem-3.5rem)] flex flex-col items-center justify-center p-4 py-6">
        
        {/* Mirror Object */}
        <div 
          className="relative w-full max-w-[280px] sm:max-w-md aspect-[3/4] cursor-pointer overflow-hidden shadow-2xl transition-transform duration-700 ease-out border-4 border-[#0D5659]/30 bg-[#0D5659]/10 rounded-t-[45%] rounded-b-xl"
          onClick={handleMirrorClick}
          role="button"
          tabIndex={0}
          aria-label={cracked ? "Cracked mirror" : "Click to interact with the mirror"}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMirrorClick(e);
            }
          }}
        >
          {/* Surface Gradient (Glass Effect) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D5659]/40 via-transparent to-[#041D1E]/80 mix-blend-overlay pointer-events-none z-10" />
          <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/10 via-transparent to-transparent -rotate-45 pointer-events-none z-10 transform -translate-y-1/4" />
          
          {/* Portrait Reflection */}
          <div 
            className="absolute inset-0 opacity-40 transition-opacity duration-1000 saturate-50 contrast-125 mix-blend-luminosity"
            style={{
              transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.05)`,
            }}
          >
            <img 
              src="/assets/brand/arzael-portrait.png" 
              alt="Arzael Reflection"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* Crack Overlay */}
          {cracked && (
            <div 
              className={`absolute inset-0 z-20 pointer-events-none ${reducedMotion ? '' : 'animate-crack-appear'}`}
              style={{
                background: `radial-gradient(circle at ${crackPos.x}% ${crackPos.y}%, rgba(4,29,30,0.8) 0%, transparent 60%)`,
              }}
            >
              <svg className="absolute top-0 left-0 w-full h-full text-white/50 drop-shadow-md overflow-visible" preserveAspectRatio="none">
                {/* Scale up SVG coordinate system and center it on the click position */}
                <g stroke="currentColor" strokeWidth="1.5" fill="none" transform={`translate(${crackPos.x * 3} ${crackPos.y * 4}) scale(2)`}>
                    {/* Primary cracks */}
                    <path d="M0,0 L30,-70 L25,-150 M0,0 L60,-30 L120,-15 M0,0 L-45,60 L-75,120 M0,0 L-15,-90 L-60,-135 M0,0 L75,75 L135,180" 
                          className={reducedMotion ? '' : 'animate-draw-crack'} />
                    {/* Secondary cracks */}
                    <path d="M0,0 L-75,-30 L-150,-15 M0,0 L15,90 L30,150 M0,0 L-120,60 M0,0 L120,-90" 
                          strokeWidth="0.75"
                          className={reducedMotion ? '' : 'animate-draw-crack'} />
                    <path d="M30,-70 L50,-50 M-45,60 L-30,80 M75,75 L50,100" 
                          strokeWidth="0.5"
                          className={reducedMotion ? '' : 'animate-draw-crack'} />
                </g>
              </svg>
            </div>
          )}

          {/* Fragment Text */}
          <div 
            className={`absolute inset-0 flex items-center justify-center p-8 z-30 transition-all duration-1000 delay-300 ${cracked ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <p className="font-serif text-[#D9878D] text-xl md:text-2xl text-center leading-relaxed tracking-wider drop-shadow-2xl font-bold bg-[#041D1E]/40 p-4 rounded-sm backdrop-blur-sm">
              "I stopped trying to make myself easier to understand."
            </p>
          </div>
        </div>

        {/* Button below mirror */}
        <div className="mt-6 sm:mt-8 flex justify-center z-40">
          <button
            onClick={() => {
              setShowFull(true);
              setTimeout(() => {
                window.scrollBy({ top: window.innerHeight, behavior: reducedMotion ? 'auto' : 'smooth' });
              }, 100);
            }}
            className="group px-8 py-3 bg-transparent border border-[#D9878D] text-[#D9878D] font-serif tracking-widest text-sm hover:bg-[#D9878D] hover:text-[#041D1E] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9878D] focus:ring-offset-2 focus:ring-offset-[#041D1E]"
          >
            OPEN THE STATEMENT
          </button>
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div 
        className={`w-full max-w-4xl mx-auto px-6 pb-24 transition-all duration-1000 transform ${showFull ? 'opacity-100 translate-y-0 min-h-screen block' : 'opacity-0 translate-y-12 pointer-events-none hidden'}`}
      >
        <div className="border-t border-[#0D5659] pt-16 mt-8">
          <h2 className="font-serif text-3xl md:text-5xl text-[#D9878D] mb-12 tracking-wider">
            SO, WHO IS ARZAEL?
          </h2>
          
          <div className="space-y-8 font-sans text-lg text-[#F3EBD7]/90 leading-relaxed max-w-2xl">
            <p className="text-2xl font-serif text-[#F3EBD7]">
              Hi. I'm ARZAEL.
            </p>
            
            <p>
              I make pop music about things we're usually too embarrassed to admit.
            </p>
            
            <ul className="list-disc list-inside space-y-3 text-[#D9878D] pl-4 font-serif text-xl tracking-wide">
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Self-sabotage</span></li>
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Insecurity</span></li>
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Ego</span></li>
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Shame</span></li>
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Power</span></li>
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Being an outsider</span></li>
              <li><span className="text-[#F3EBD7]/80 font-sans text-lg">Wanting to belong and hating that you want to belong</span></li>
            </ul>
            
            <p className="italic text-[#F3EBD7]/70 font-serif">
              Basically, all the fun stuff.
            </p>
            
            <p>
              I spent a lot of my life feeling like I didn't quite fit into the world around me. 
              Eventually I stopped trying to make myself easier to understand.
            </p>
            
            <p className="text-3xl font-serif text-[#D9878D] pt-8 leading-tight">
              I started making a world of my own instead.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-crack {
          from { stroke-dasharray: 0 1000; stroke-dashoffset: 0; opacity: 0; }
          to { stroke-dasharray: 1000 1000; stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes crack-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-draw-crack {
          animation: draw-crack 500ms ease-out forwards;
        }
        .animate-crack-appear {
          animation: crack-appear 400ms ease-out forwards;
        }
      `}} />
    </div>
  );
};
