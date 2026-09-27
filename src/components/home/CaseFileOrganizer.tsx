import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FolderData {
  id: string;
  label: string;
  path: string;
  clue: React.ReactNode;
  rotation: string;
  desktopOffset: string; // horizontal offset within the tray
  zIndex: number;
}

const FOLDERS: FolderData[] = [
  {
    id: 'self-sabotage',
    label: 'SELF SABOTAGE',
    path: '/self-sabotage',
    rotation: '-rotate-2',
    desktopOffset: 'left-[1%]',
    zIndex: 14,
    clue: (
      <div className="absolute -top-3 right-1 w-10 h-14 bg-[#e0d5ba]/90 border border-[#a89f89] rotate-3 shadow-sm rounded-sm flex items-start justify-end p-1 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
        <div className="w-3.5 h-3.5 border border-[#8b0000] rounded-full opacity-60"></div>
      </div>
    ),
  },
  {
    id: 'watch',
    label: 'WATCH',
    path: '/watch',
    rotation: 'rotate-[2.5deg]',
    desktopOffset: 'left-[17%]',
    zIndex: 18,
    clue: (
      <div className="absolute -top-4 left-3 w-14 h-10 bg-black flex flex-col justify-between p-[2px] shadow-sm rotate-[-3deg] pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
        <div className="w-full flex justify-between px-1"><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div></div>
        <div className="w-full h-3 bg-gray-800"></div>
        <div className="w-full flex justify-between px-1"><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div></div>
      </div>
    ),
  },
  {
    id: 'archive',
    label: 'ARCHIVE',
    path: '/archive',
    rotation: '-rotate-1',
    desktopOffset: 'left-[33%]',
    zIndex: 12,
    clue: (
      <div className="absolute -top-2.5 right-6 w-11 h-11 bg-white/90 p-0.5 shadow-md rotate-[5deg] pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="w-full h-full bg-[#d9d9d9] border border-gray-400 flex items-end justify-end p-0.5">
          <span className="text-[7px] font-sans text-gray-700 font-bold">1998</span>
        </div>
      </div>
    ),
  },
  {
    id: 'shop',
    label: 'SHOP',
    path: '/shop',
    rotation: 'rotate-[1.5deg]',
    desktopOffset: 'left-[50%]',
    zIndex: 20,
    clue: (
      <div className="absolute -top-5 left-1/2 w-7 h-10 bg-[#eceadd]/90 shadow-sm -rotate-2 -translate-x-1/2 border-t border-r border-l border-gray-300/70 rounded-t-sm flex flex-col items-center pt-0.5 pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="text-[4px] font-sans tracking-widest text-black font-bold mt-0.5">ARZAEL</div>
        <div className="text-[3px] font-sans text-gray-500 mt-0.5 text-center">100%<br/>COTTON</div>
      </div>
    ),
  },
  {
    id: 'letters',
    label: 'LETTERS',
    path: '/letters',
    rotation: '-rotate-[2.5deg]',
    desktopOffset: 'left-[66%]',
    zIndex: 16,
    clue: (
      <div className="absolute -top-3 right-3 w-16 h-8 bg-[#f4ebd8]/90 shadow-sm rotate-[3deg] border border-[#d2c5a3] flex items-center justify-center overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
        <div className="w-full border-b border-dashed border-gray-400 opacity-50 absolute top-1/2"></div>
        <div className="absolute right-1.5 top-0.5 text-[7px] font-serif italic text-black/60 rotate-[-4deg]">To:</div>
      </div>
    ),
  },
  {
    id: 'about',
    label: 'ABOUT',
    path: '/about',
    rotation: 'rotate-[3deg]',
    desktopOffset: 'left-[82%]',
    zIndex: 22,
    clue: (
      <div className="absolute -top-4 left-1.5 w-10 h-10 bg-gray-200/80 shadow-md rotate-[-5deg] border-2 border-gray-400/60 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-3">
        <div className="w-full h-full bg-gradient-to-tr from-gray-400 to-gray-200 rounded-full scale-150 blur-[0.5px]"></div>
      </div>
    ),
  }
];

export const CaseFileOrganizer: React.FC = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleNavigate = (path: string, id: string) => {
    if (prefersReducedMotion) {
      navigate(path);
      return;
    }
    setAnimatingId(id);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const handleKeyDown = (e: KeyboardEvent, path: string, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate(path, id);
    }
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Case files directory"
      className="w-full"
    >
      {/* ─── Desktop: shallow transparent tray in lower viewport ─── */}
      <div className="hidden md:block relative w-full h-[180px] lg:h-[210px]">
        {/* Subtle desk surface — contact shadow and delicate surface reflection */}
        <div className="absolute inset-x-6 lg:inset-x-12 bottom-0 h-[120px] lg:h-[140px] rounded-t-lg border-t border-white/[0.08] bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none shadow-[0_-10px_25px_rgba(0,0,0,0.5)]" />
        {/* Delicate tray rim line */}
        <div className="absolute inset-x-6 lg:inset-x-12 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#F3EBD7]/20 to-transparent pointer-events-none" />

        <div className="relative w-full max-w-6xl mx-auto h-full px-4">
          {FOLDERS.map((folder) => {
            const isAnimating = animatingId === folder.id;
            return (
              <div
                key={folder.id}
                tabIndex={0}
                onClick={() => handleNavigate(folder.path, folder.id)}
                onKeyDown={(e) => handleKeyDown(e, folder.path, folder.id)}
                className={`group absolute bottom-3 lg:bottom-4 w-[110px] lg:w-[135px] h-[135px] lg:h-[160px] bg-[#F3EBD7]/95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#D9878D] transition-all
                  ${!prefersReducedMotion ? 'duration-300 ease-out hover:-translate-y-4 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:rotate-0' : ''}
                  ${isAnimating && !prefersReducedMotion ? 'scale-105 -translate-y-6 opacity-0 duration-300 !z-50' : ''}
                  shadow-[0_4px_14px_rgba(0,0,0,0.5)]
                  border border-[#d2c5a3]/90 rounded-sm rounded-tr-lg lg:rounded-tr-xl
                  flex flex-col justify-end p-2
                  ${folder.rotation} ${folder.desktopOffset}
                `}
                style={{ 
                  zIndex: isAnimating ? 50 : folder.zIndex,
                  transformOrigin: 'bottom center'
                }}
              >
                {folder.clue}
                {/* Paper line texture */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-sm rounded-tr-xl" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 3.5px)', backgroundSize: '100% 3.5px' }}></div>
                {/* Label */}
                <div className="relative z-10 w-full bg-[#041D1E]/95 text-[#F3EBD7] py-1 px-1 font-serif text-center uppercase tracking-widest text-[9px] lg:text-[10px] shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                  {folder.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Mobile: controlled staggered stack in lower half ─── */}
      <div className="flex md:hidden flex-col gap-1.5 w-full px-4 py-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        {FOLDERS.map((folder) => {
          const isAnimating = animatingId === folder.id;
          return (
            <div
              key={folder.id}
              tabIndex={0}
              onClick={() => handleNavigate(folder.path, folder.id)}
              onKeyDown={(e) => handleKeyDown(e, folder.path, folder.id)}
              className={`relative w-full bg-[#F3EBD7]/90 backdrop-blur-sm py-2 px-3.5 rounded border border-[#d2c5a3]/70 shadow-[0_2px_8px_rgba(0,0,0,0.4)] flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D9878D] transition-all
                ${!prefersReducedMotion ? 'active:scale-[0.98] active:shadow-sm duration-150' : ''}
                ${isAnimating && !prefersReducedMotion ? 'scale-95 opacity-50' : ''}
              `}
            >
              <span className="font-serif text-[#041D1E] font-bold tracking-widest text-[11px] z-10 relative">
                {folder.label}
              </span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 pointer-events-none overflow-hidden h-full flex items-center">
                <div className="scale-[0.55] origin-right">
                  {folder.clue}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
