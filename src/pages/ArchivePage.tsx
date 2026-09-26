import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ArchivePage: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<string | null>('era-01');
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = (id: string) => {
    setOpenDrawer((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(id);
    }
  };

  const transitionDuration = prefersReducedMotion ? '0ms' : '450ms';

  const eras = [
    {
      id: 'era-01',
      title: 'ERA 01',
      subtitle: 'THE FOUNDATION (2026)',
      status: 'unlocked',
      content: {
        album: 'SELF SABOTAGE',
        quote: '"Every song catches me doing it differently."',
        link: '/self-sabotage',
        linkLabel: 'ENTER THIS ERA →',
      },
    },
    {
      id: 'era-02',
      title: 'ERA 02',
      subtitle: 'CLASSIFIED',
      status: 'locked',
    },
    {
      id: 'era-03',
      title: 'ERA 03',
      subtitle: 'NOT YET FILED',
      status: 'locked',
    },
  ];

  return (
    <div className="min-h-screen bg-[#041D1E] flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-[#D9878D] selection:text-[#041D1E] overflow-x-hidden">
      
      {/* Decorative top piece (Clock/Date) */}
      <div className="mb-2 bg-[#0D5659] p-3 rounded-t-lg border-2 border-[#041D1E] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center space-x-4 relative z-10 w-full max-w-2xl mx-auto md:w-3/4">
        <div className="w-16 h-8 bg-black/60 rounded flex items-center justify-center border border-[#041D1E] shadow-inner">
          <span className="font-display text-[#D9878D] text-sm tracking-widest">20:26</span>
        </div>
        <div className="w-32 h-8 bg-[#F3EBD7] rounded flex items-center justify-center border-2 border-[#C5B383] shadow-inner">
          <span className="font-serif text-[#041D1E] text-xs font-bold tracking-widest uppercase">Chronology</span>
        </div>
      </div>

      {/* Cabinet Body */}
      <div 
        className="relative w-full max-w-2xl mx-auto md:w-3/4 bg-[#0D5659] border-4 border-[#041D1E] shadow-2xl rounded-b-md flex flex-col p-4 md:p-6 space-y-4 md:space-y-6 overflow-hidden"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E")'
        }}
      >
        {/* Drawers */}
        {eras.map((era) => {
          const isOpen = openDrawer === era.id;
          const isLocked = era.status === 'locked';

          return (
            <div key={era.id} className="relative flex flex-col">
              
              {/* Drawer Content Area (Behind Drawer Front) */}
              <div 
                className="bg-[#041D1E] rounded-md mx-2 border-2 border-dashed border-[#0D5659] overflow-hidden"
                style={{
                  maxHeight: isOpen && !isLocked ? '500px' : '0px',
                  opacity: isOpen && !isLocked ? 1 : 0,
                  transition: `max-height ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1), opacity ${transitionDuration} ease-in-out`,
                  marginTop: isOpen && !isLocked ? '1rem' : '0',
                }}
              >
                {!isLocked && era.content && (
                  <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6">
                    
                    {/* Folder Tab */}
                    <div className="self-start -mt-8 ml-4 px-4 py-1 bg-[#F3EBD7] text-[#041D1E] font-serif font-bold text-xs rounded-t shadow-md border-b-0 border-[#C5B383]">
                      FILE // {era.id.toUpperCase()}
                    </div>

                    <div className="w-full bg-[#F3EBD7] p-1 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-sm">
                      <div className="border border-[#041D1E]/20 p-6 flex flex-col items-center">
                        <h3 className="font-display text-2xl md:text-4xl text-[#041D1E] uppercase tracking-wider mb-2">
                          {era.content.album}
                        </h3>
                        <p className="font-serif italic text-sm md:text-base text-[#0D5659] mb-8 text-center max-w-[250px]">
                          {era.content.quote}
                        </p>
                        
                        <div className="mt-auto">
                          <Link 
                            to={era.content.link}
                            className="inline-block border-b-2 border-[#D9878D] pb-1 text-[#041D1E] font-sans font-bold text-sm tracking-[0.2em] hover:text-[#D9878D] hover:border-[#041D1E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9878D] focus:ring-offset-2 focus:ring-offset-[#F3EBD7]"
                          >
                            {era.content.linkLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Front */}
              <div 
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-disabled={isLocked}
                onClick={() => handleToggle(era.id)}
                onKeyDown={(e) => handleKeyDown(e, era.id)}
                className={`relative z-10 w-full bg-[#0D5659] border-t-2 border-l-2 border-[#F3EBD7]/20 border-b-4 border-r-4 border-black/40 rounded shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D9878D] group
                  ${isLocked ? 'cursor-not-allowed opacity-80' : 'hover:bg-[#10696d]'}
                `}
                style={{
                  transform: `translateY(${isOpen ? '8px' : '0px'})`,
                  transition: `transform ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms ease`,
                  boxShadow: isOpen ? '0 -4px 10px rgba(0,0,0,0.5)' : '0 4px 6px rgba(0,0,0,0.3)',
                  zIndex: 20
                }}
              >
                {/* Rivets */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>

                {/* Handle */}
                <div className="w-32 h-6 md:h-8 bg-black/60 rounded-sm shadow-[0_2px_4px_rgba(255,255,255,0.1)_inset,0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center mb-4 transition-transform group-hover:scale-[1.02]">
                  <div className="w-24 h-2 bg-black/80 rounded-full shadow-inner"></div>
                </div>

                {/* Brass Label Plate */}
                <div className="w-40 md:w-48 bg-[#C5B383] p-1 rounded-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.3)] flex flex-col items-center">
                  <div className="w-full bg-[#F3EBD7] px-2 py-1 flex flex-col items-center justify-center border border-[#041D1E]/20 shadow-inner">
                    <span className="font-display text-[10px] md:text-xs text-[#041D1E] tracking-widest opacity-80 mb-0.5">
                      {era.title}
                    </span>
                    <span className={`font-serif text-xs md:text-sm font-bold tracking-widest ${isLocked ? 'text-[#041D1E]/50' : 'text-[#041D1E]'}`}>
                      {era.subtitle}
                    </span>
                  </div>
                </div>

              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};
