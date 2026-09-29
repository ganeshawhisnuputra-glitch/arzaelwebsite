import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FolderData {
  id: string;
  label: string;
  sublabel: string;
  code: string;
  path: string;
  clue: React.ReactNode;
  mobileClue: React.ReactNode;
  rotation: string;
  mobileRotation: string;
  desktopOffset: string; // horizontal offset within the tray
  zIndex: number;
}

const FOLDERS: FolderData[] = [
  {
    id: 'self-sabotage',
    label: 'SELF SABOTAGE',
    sublabel: 'RECORD // 13 ITEMS',
    code: 'FILE 01',
    path: '/self-sabotage',
    rotation: '-rotate-2',
    mobileRotation: '-rotate-1',
    desktopOffset: 'left-[1%]',
    zIndex: 14,
    clue: (
      <div className="absolute -top-3 right-1 w-10 h-14 bg-[#e0d5ba]/90 border border-[#a89f89] rotate-3 shadow-sm rounded-sm flex items-start justify-end p-1 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
        <div className="w-3.5 h-3.5 border border-[#8b0000] rounded-full opacity-60"></div>
      </div>
    ),
    mobileClue: (
      <div className="w-7 h-9 bg-[#e0d5ba] border border-[#a89f89] rotate-3 shadow-xs rounded-xs flex items-center justify-center p-0.5">
        <div className="w-4 h-4 rounded-full border border-[#8b0000] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full border border-[#8b0000]/60"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'watch',
    label: 'WATCH',
    sublabel: 'CINEMA // VISUALS',
    code: 'FILE 02',
    path: '/watch',
    rotation: 'rotate-[2.5deg]',
    mobileRotation: 'rotate-1',
    desktopOffset: 'left-[17%]',
    zIndex: 18,
    clue: (
      <div className="absolute -top-4 left-3 w-14 h-10 bg-black flex flex-col justify-between p-[2px] shadow-sm rotate-[-3deg] pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
        <div className="w-full flex justify-between px-1"><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div></div>
        <div className="w-full h-3 bg-gray-800"></div>
        <div className="w-full flex justify-between px-1"><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div><div className="w-1 h-1 bg-white/70 rounded-full"></div></div>
      </div>
    ),
    mobileClue: (
      <div className="w-8 h-8 bg-black flex flex-col justify-between p-[2px] shadow-xs rotate-[-2deg] rounded-xs border border-gray-700">
        <div className="flex justify-between px-0.5"><div className="w-1 h-1 bg-white/80 rounded-full"></div><div className="w-1 h-1 bg-white/80 rounded-full"></div></div>
        <div className="w-full h-2 bg-[#1a2b2c] flex items-center justify-center text-[5px] text-white/40 font-mono">35MM</div>
        <div className="flex justify-between px-0.5"><div className="w-1 h-1 bg-white/80 rounded-full"></div><div className="w-1 h-1 bg-white/80 rounded-full"></div></div>
      </div>
    ),
  },
  {
    id: 'archive',
    label: 'ARCHIVE',
    sublabel: 'ERA CHRONOLOGY',
    code: 'FILE 03',
    path: '/archive',
    rotation: '-rotate-1',
    mobileRotation: 'rotate-1.5',
    desktopOffset: 'left-[33%]',
    zIndex: 12,
    clue: (
      <div className="absolute -top-2.5 right-6 w-11 h-11 bg-white/90 p-0.5 shadow-md rotate-[5deg] pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="w-full h-full bg-[#d9d9d9] border border-gray-400 flex items-end justify-end p-0.5">
          <span className="text-[7px] font-sans text-gray-700 font-bold">1998</span>
        </div>
      </div>
    ),
    mobileClue: (
      <div className="w-7 h-8 bg-white/90 p-0.5 shadow-xs rotate-[4deg] border border-gray-300 rounded-xs flex flex-col justify-between">
        <div className="w-full h-4 bg-gray-400/80"></div>
        <span className="text-[6px] font-mono text-gray-700 font-bold text-right leading-none">1998</span>
      </div>
    ),
  },
  {
    id: 'shop',
    label: 'SHOP',
    sublabel: 'PERSONAL EFFECTS',
    code: 'FILE 04',
    path: '/shop',
    rotation: 'rotate-[1.5deg]',
    mobileRotation: '-rotate-1',
    desktopOffset: 'left-[50%]',
    zIndex: 20,
    clue: (
      <div className="absolute -top-5 left-1/2 w-7 h-10 bg-[#eceadd]/90 shadow-sm -rotate-2 -translate-x-1/2 border-t border-r border-l border-gray-300/70 rounded-t-sm flex flex-col items-center pt-0.5 pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="text-[4px] font-sans tracking-widest text-black font-bold mt-0.5">ARZAEL</div>
        <div className="text-[3px] font-sans text-gray-500 mt-0.5 text-center">100%<br/>COTTON</div>
      </div>
    ),
    mobileClue: (
      <div className="w-6 h-9 bg-[#eceadd] border border-gray-300 shadow-xs -rotate-2 rounded-t-xs flex flex-col items-center justify-center p-0.5">
        <div className="text-[5px] font-sans font-black text-black">AZ</div>
        <div className="text-[4px] font-sans text-gray-600 text-center leading-tight mt-0.5">100%<br/>TAG</div>
      </div>
    ),
  },
  {
    id: 'letters',
    label: 'LETTERS',
    sublabel: 'CORRESPONDENCE',
    code: 'FILE 05',
    path: '/letters',
    rotation: '-rotate-[2.5deg]',
    mobileRotation: '-rotate-0.5',
    desktopOffset: 'left-[66%]',
    zIndex: 16,
    clue: (
      <div className="absolute -top-3 right-3 w-16 h-8 bg-[#f4ebd8]/90 shadow-sm rotate-[3deg] border border-[#d2c5a3] flex items-center justify-center overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
        <div className="w-full border-b border-dashed border-gray-400 opacity-50 absolute top-1/2"></div>
        <div className="absolute right-1.5 top-0.5 text-[7px] font-serif italic text-black/60 rotate-[-4deg]">To:</div>
      </div>
    ),
    mobileClue: (
      <div className="w-9 h-7 bg-[#f4ebd8] border border-[#d2c5a3] shadow-xs rotate-[2deg] rounded-xs flex flex-col justify-between p-1 overflow-hidden">
        <div className="text-[6px] font-serif italic text-black/70">To:</div>
        <div className="w-full border-b border-dashed border-gray-400"></div>
      </div>
    ),
  },
  {
    id: 'about',
    label: 'ABOUT',
    sublabel: 'PATIENT DOSSIER',
    code: 'FILE 06',
    path: '/about',
    rotation: 'rotate-[3deg]',
    mobileRotation: 'rotate-1',
    desktopOffset: 'left-[82%]',
    zIndex: 22,
    clue: (
      <div className="absolute -top-4 left-1.5 w-10 h-10 bg-gray-200/80 shadow-md rotate-[-5deg] border-2 border-gray-400/60 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-3">
        <div className="w-full h-full bg-gradient-to-tr from-gray-400 to-gray-200 rounded-full scale-150 blur-[0.5px]"></div>
      </div>
    ),
    mobileClue: (
      <div className="w-8 h-8 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border border-gray-400/80 shadow-xs rotate-[-3deg] rounded-xs flex items-center justify-center overflow-hidden">
        <div className="w-4 h-4 rounded-full bg-gray-500/30 blur-[0.5px]"></div>
      </div>
    ),
  }
];

interface CaseFileOrganizerProps {
  mode?: 'desktop' | 'mobile' | 'responsive';
}

export const CaseFileOrganizer: React.FC<CaseFileOrganizerProps> = ({ mode = 'responsive' }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleNavigate = (path: string, id: string) => {
    if (prefersReducedMotion) {
      navigate(path);
      return;
    }
    setAnimatingId(id);
    // Tactile 220ms lift/pull feedback before navigation
    setTimeout(() => {
      navigate(path);
    }, 220);
  };

  const handleKeyDown = (e: KeyboardEvent, path: string, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate(path, id);
    }
  };

  const showDesktop = mode === 'desktop' || mode === 'responsive';
  const showMobile = mode === 'mobile' || mode === 'responsive';

  return (
    <nav 
      role="navigation" 
      aria-label="Case files directory"
      className="w-full"
    >
      {/* ─── Desktop: shallow transparent tray in lower viewport ─── */}
      {showDesktop && (
        <div className={`${mode === 'responsive' ? 'hidden md:block' : 'block'} relative w-full h-[180px] lg:h-[210px]`}>
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
      )}

      {/* ─── Mobile: tactile 2-column physical folder organizer beneath 16:9 scene ─── */}
      {showMobile && (
        <div className={`${mode === 'responsive' ? 'block md:hidden' : 'block'} w-full`}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
            {FOLDERS.map((folder) => {
              const isAnimating = animatingId === folder.id;
              return (
                <div
                  key={folder.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${folder.label} case file`}
                  onClick={() => handleNavigate(folder.path, folder.id)}
                  onKeyDown={(e) => handleKeyDown(e, folder.path, folder.id)}
                  className={`group relative min-h-[110px] bg-[#F3EBD7]/95 rounded-sm rounded-tr-xl border border-[#d2c5a3] shadow-[0_4px_12px_rgba(0,0,0,0.45)] p-2.5 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9878D] transition-all
                    ${folder.mobileRotation}
                    ${!prefersReducedMotion ? 'duration-200 active:scale-[1.03] active:-translate-y-2 active:shadow-[0_12px_24px_rgba(0,0,0,0.7)]' : ''}
                    ${isAnimating && !prefersReducedMotion ? '-translate-y-2 scale-[1.03] shadow-[0_14px_28px_rgba(0,0,0,0.8)] border-[#D9878D] z-30' : ''}
                  `}
                  style={{
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Folder Tab Notch at top */}
                  <div className="absolute -top-2.5 left-2 px-2 py-0.5 bg-[#e5dbc2] border-t border-l border-r border-[#c4b796] rounded-t text-[8px] font-mono text-[#041D1E]/70 font-bold uppercase tracking-wider shadow-xs">
                    {folder.code}
                  </div>

                  {/* Top row with tactile physical clue */}
                  <div className="flex items-start justify-end w-full pt-0.5">
                    <div className="pointer-events-none transition-transform duration-200 group-hover:scale-105">
                      {folder.mobileClue}
                    </div>
                  </div>

                  {/* Subtle paper line texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-sm rounded-tr-xl" 
                    style={{ 
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 3.5px)', 
                      backgroundSize: '100% 3.5px' 
                    }} 
                  />

                  {/* Bottom folder information */}
                  <div className="relative z-10 mt-2">
                    <div className="w-full bg-[#041D1E] text-[#F3EBD7] py-1 px-1.5 rounded-xs font-serif text-center uppercase tracking-widest text-[10px] sm:text-[11px] font-bold shadow-xs">
                      {folder.label}
                    </div>
                    <div className="mt-1 text-center text-[7.5px] font-mono text-[#041D1E]/60 uppercase tracking-widest">
                      {folder.sublabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
