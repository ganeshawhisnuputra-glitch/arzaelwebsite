import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FolderData {
  id: string;
  label: string;
  path: string;
  clue: React.ReactNode;
  position: string;
  zIndex: number;
}

const FOLDERS: FolderData[] = [
  {
    id: 'self-sabotage',
    label: 'SELF SABOTAGE',
    path: '/self-sabotage',
    position: 'left-[2%] lg:left-[5%] top-[10%] rotate-[-2deg]',
    zIndex: 10,
    clue: (
      <div className="absolute -top-4 right-2 w-12 h-16 bg-[#e0d5ba] border border-[#a89f89] rotate-3 shadow-sm rounded-sm flex items-start justify-end p-1 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="w-4 h-4 border border-[#8b0000] rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    ),
  },
  {
    id: 'watch',
    label: 'WATCH',
    path: '/watch',
    position: 'left-[15%] lg:left-[22%] top-[25%] rotate-[3deg]',
    zIndex: 20,
    clue: (
      <div className="absolute -top-5 left-4 w-16 h-12 bg-black flex flex-col justify-between p-[2px] shadow-sm rotate-[-4deg] pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="w-full flex justify-between px-1"><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div></div>
        <div className="w-full h-4 bg-gray-800"></div>
        <div className="w-full flex justify-between px-1"><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div></div>
      </div>
    ),
  },
  {
    id: 'archive',
    label: 'ARCHIVE',
    path: '/archive',
    position: 'left-[30%] lg:left-[40%] top-[8%] rotate-[-1deg]',
    zIndex: 15,
    clue: (
      <div className="absolute -top-3 right-8 w-14 h-14 bg-white p-1 shadow-md rotate-[6deg] pointer-events-none transition-transform duration-300 group-hover:-translate-y-6">
        <div className="w-full h-full bg-[#d9d9d9] border border-gray-400 flex items-end justify-end p-1">
          <span className="text-[8px] font-sans text-gray-700 font-bold">1998</span>
        </div>
      </div>
    ),
  },
  {
    id: 'shop',
    label: 'SHOP',
    path: '/shop',
    position: 'left-[45%] lg:left-[58%] top-[30%] rotate-[1deg]',
    zIndex: 25,
    clue: (
      <div className="absolute -top-6 left-1/2 w-8 h-12 bg-[#eceadd] shadow-sm -rotate-2 -translate-x-1/2 border-t border-r border-l border-gray-300 rounded-t-sm flex flex-col items-center pt-1 pointer-events-none transition-transform duration-300 group-hover:-translate-y-6">
        <div className="text-[5px] font-sans tracking-widest text-black font-bold mt-1">ARZAEL</div>
        <div className="text-[4px] font-sans text-gray-500 mt-1 text-center">100%<br/>COTTON</div>
      </div>
    ),
  },
  {
    id: 'letters',
    label: 'LETTERS',
    path: '/letters',
    position: 'left-[60%] lg:left-[72%] top-[15%] rotate-[-3deg]',
    zIndex: 12,
    clue: (
      <div className="absolute -top-4 right-4 w-20 h-10 bg-[#f4ebd8] shadow-sm rotate-4 border border-[#d2c5a3] flex items-center justify-center overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-5">
        <div className="w-full border-b border-dashed border-gray-400 opacity-50 absolute top-1/2"></div>
        <div className="absolute right-2 top-1 text-[8px] font-serif italic text-black/70 rotate-[-5deg]">To:</div>
      </div>
    ),
  },
  {
    id: 'about',
    label: 'ABOUT',
    path: '/about',
    position: 'left-[75%] lg:left-[85%] top-[35%] rotate-[4deg]',
    zIndex: 30,
    clue: (
      <div className="absolute -top-5 left-2 w-12 h-12 bg-gray-200 shadow-md rotate-[-6deg] border-2 border-gray-400 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:-translate-y-4">
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
      className="w-full max-w-7xl mx-auto p-4 md:p-8"
    >
      {/* Desktop Tray Container */}
      <div className="hidden md:block relative w-full h-[550px] bg-gradient-to-b from-[#0a2324] to-[#041d1e] rounded-xl border border-[#0d5659] shadow-[inset_0_10px_30px_rgba(0,0,0,0.5),0_20px_25px_-5px_rgba(0,0,0,0.8)] p-6">
        {/* Tray inner rim shadow for depth */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] rounded-xl"></div>
        
        {FOLDERS.map((folder) => {
          const isAnimating = animatingId === folder.id;
          
          return (
            <div
              key={folder.id}
              tabIndex={0}
              onClick={() => handleNavigate(folder.path, folder.id)}
              onKeyDown={(e) => handleKeyDown(e, folder.path, folder.id)}
              className={`group absolute w-40 lg:w-48 h-56 lg:h-64 bg-[#F3EBD7] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#D9878D] transition-all
                ${!prefersReducedMotion ? 'duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl hover:rotate-0' : ''}
                ${isAnimating && !prefersReducedMotion ? 'scale-110 translate-y-[-20px] opacity-0 transition-all duration-300 z-50' : ''}
                shadow-[0_8px_15px_rgba(0,0,0,0.5),_inset_0_0_10px_rgba(0,0,0,0.05)]
                border border-[#d2c5a3] rounded-sm rounded-tr-2xl lg:rounded-tr-3xl
                flex flex-col justify-end p-3 lg:p-4
                ${folder.position}
              `}
              style={{ 
                zIndex: isAnimating ? 50 : folder.zIndex,
                transformOrigin: 'bottom center'
              }}
            >
              {/* Visible clue at idle */}
              {folder.clue}
              
              {/* Folder texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none rounded-sm rounded-tr-3xl" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 4px)', backgroundSize: '100% 4px' }}></div>

              <div className="relative z-10 w-full bg-[#041D1E] text-[#F3EBD7] p-2 font-serif text-center uppercase tracking-widest text-xs lg:text-sm shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
                {folder.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked Layout */}
      <div className="flex md:hidden flex-col gap-4 w-full bg-gradient-to-b from-[#0a2324] to-[#041d1e] p-5 rounded-lg border border-[#0d5659] shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]">
        <h2 className="sr-only">Case Files</h2>
        {FOLDERS.map((folder) => {
          const isAnimating = animatingId === folder.id;
          return (
            <div
              key={folder.id}
              tabIndex={0}
              onClick={() => handleNavigate(folder.path, folder.id)}
              onKeyDown={(e) => handleKeyDown(e, folder.path, folder.id)}
              className={`relative w-full bg-[#F3EBD7] p-4 rounded-md border border-[#d2c5a3] shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D9878D] transition-all
                ${!prefersReducedMotion ? 'active:scale-95 active:shadow-sm duration-200' : ''}
                ${isAnimating && !prefersReducedMotion ? 'scale-95 opacity-50' : ''}
              `}
            >
              <span className="font-serif text-[#041D1E] font-bold tracking-widest text-sm z-10 relative">
                {folder.label}
              </span>
              
              {/* Simplified clue display for mobile */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 pointer-events-none overflow-hidden h-full flex items-center">
                <div className="scale-75 origin-right">
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
