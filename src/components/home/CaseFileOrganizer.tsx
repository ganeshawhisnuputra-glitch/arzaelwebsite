import React from 'react';
import { Link } from 'react-router-dom';

interface CaseFile {
  id: string;
  label: string;
  path: string;
  subtitle: string;
  tabColor: string;
  rotation: string;
  zIndex: number;
}

const CASE_FILES: CaseFile[] = [
  {
    id: 'self-sabotage',
    label: 'SELF SABOTAGE',
    path: '/self-sabotage',
    subtitle: 'THE RECORD',
    tabColor: 'bg-[#D9878D]',
    rotation: '-rotate-[1.5deg]',
    zIndex: 6,
  },
  {
    id: 'watch',
    label: 'WATCH',
    path: '/watch',
    subtitle: 'VISUAL CINEMA',
    tabColor: 'bg-[#C5B383]',
    rotation: 'rotate-[0.5deg]',
    zIndex: 5,
  },
  {
    id: 'archive',
    label: 'ARCHIVE',
    path: '/archive',
    subtitle: 'ERA CHRONOLOGY',
    tabColor: 'bg-[#A3BCBD]',
    rotation: '-rotate-[0.8deg]',
    zIndex: 4,
  },
  {
    id: 'shop',
    label: 'SHOP',
    path: '/shop',
    subtitle: 'PERSONAL EFFECTS',
    tabColor: 'bg-[#8A3E44]',
    rotation: 'rotate-[1.2deg]',
    zIndex: 3,
  },
  {
    id: 'letters',
    label: 'LETTERS',
    path: '/letters',
    subtitle: 'CORRESPONDENCE',
    tabColor: 'bg-[#E8DCBF]',
    rotation: '-rotate-[0.3deg]',
    zIndex: 2,
  },
  {
    id: 'about',
    label: 'ABOUT',
    path: '/about',
    subtitle: 'PATIENT FILE',
    tabColor: 'bg-[#809498]',
    rotation: 'rotate-[0.7deg]',
    zIndex: 1,
  },
];

const FileInsert: React.FC<{ fileId: string }> = ({ fileId }) => {
  switch (fileId) {
    case 'self-sabotage':
      return (
        <div className="absolute -top-8 left-3 w-14 h-14 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 pointer-events-none">
          <img
            src="/assets/brand/self-sabotage-title.png"
            alt=""
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
      );
    case 'watch':
      return (
        <div className="absolute -top-6 right-3 w-16 h-10 bg-[#1a1a1a] border border-[#333] opacity-0 group-hover:opacity-80 group-focus-visible:opacity-80 transition-all duration-300 pointer-events-none overflow-hidden">
          <div className="grid grid-cols-3 gap-px p-0.5 h-full">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-[#0D5659]/40 rounded-[1px]" />
            ))}
          </div>
        </div>
      );
    case 'archive':
      return (
        <div className="absolute -top-5 left-5 flex opacity-0 group-hover:opacity-90 group-focus-visible:opacity-90 transition-all duration-300 pointer-events-none">
          <div className="w-8 h-10 bg-[#2a2520] border border-[#3d3530] -rotate-3 shadow-sm" />
          <div className="w-8 h-10 bg-[#302b25] border border-[#3d3530] rotate-2 -ml-4 shadow-sm" />
        </div>
      );
    case 'shop':
      return (
        <div className="absolute -top-4 right-4 opacity-0 group-hover:opacity-90 group-focus-visible:opacity-90 transition-all duration-300 pointer-events-none">
          <div className="w-5 h-7 bg-[#F3EBD7] border border-[#C5B383] rounded-[1px] flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-sm">
            <span className="text-[5px] text-[#041D1E] font-bold tracking-wider">A</span>
          </div>
        </div>
      );
    case 'letters':
      return (
        <div className="absolute -top-3 left-4 w-12 h-8 opacity-0 group-hover:opacity-90 group-focus-visible:opacity-90 transition-all duration-300 pointer-events-none origin-bottom-left group-hover:-rotate-6 group-hover:-translate-y-1">
          <div className="w-full h-full bg-[#F3EBD7]/90 border border-[#DACBA3] shadow-sm" />
        </div>
      );
    case 'about':
      return (
        <div className="absolute -top-6 left-4 w-8 h-10 opacity-0 group-hover:opacity-85 group-focus-visible:opacity-85 transition-all duration-300 pointer-events-none group-hover:translate-x-0.5">
          <div className="w-full h-full bg-[#1a2a2b] border border-[#0D5659]/60 overflow-hidden shadow-md">
            <img
              src="/assets/brand/arzael-portrait.png"
              alt=""
              className="w-full h-full object-cover object-top filter brightness-75 contrast-110"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const CaseFileOrganizer: React.FC = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto px-5 sm:px-4" role="navigation" aria-label="Case File Navigation">
      {/* Instruction */}
      <p className="text-center text-xs sm:text-sm font-serif italic text-beige-100/50 mb-4 tracking-wide select-none">
        Pick a file.
      </p>

      {/* Organizer base */}
      <div className="relative">
        {/* Metal tray base */}
        <div className="absolute -bottom-3 inset-x-2 h-5 bg-gradient-to-b from-[#0a3535] to-[#072a2a] border border-[#0D5659]/40 rounded-b-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)]" />

        {/* Files grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 relative">
          {CASE_FILES.map((file) => (
            <Link
              key={file.id}
              to={file.path}
              className={`group relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-flesh-500 rounded-sm ${file.rotation}`}
              style={{ zIndex: file.zIndex }}
            >
              {/* Insert peek content */}
              <FileInsert fileId={file.id} />

              {/* Folder body */}
              <div
                className="relative w-full aspect-[5/3] sm:aspect-square md:aspect-[3/4] bg-gradient-to-b from-[#E8DCBF] to-[#D1C5A5] border border-[#C5B383]/60 rounded-t-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out
                  group-hover:-translate-y-3 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]
                  group-focus-visible:-translate-y-3 group-focus-visible:shadow-[0_8px_20px_rgba(0,0,0,0.4)]
                  group-active:-translate-y-1 group-active:shadow-[0_4px_12px_rgba(0,0,0,0.35)]
                  overflow-hidden"
              >
                {/* Paper texture grain */}
                <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20baseFrequency%3D%220.9%22%20type%3D%22fractalNoise%22%20numOctaves%3D%224%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

                {/* Edge wear marks */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8A882]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#A09070]/30" />

                {/* Small staple mark */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#888]/30 rounded-full" />

                {/* Folder content area */}
                <div className="absolute inset-3 flex flex-col justify-between">
                  {/* Top: subtitle */}
                  <span className="text-[7px] sm:text-[8px] font-sans tracking-[0.15em] text-[#5a4f3f]/70 uppercase leading-none">
                    {file.subtitle}
                  </span>

                  {/* Bottom: file number */}
                  <span className="text-[8px] font-sans text-[#8a7f6f]/50 self-end">
                    {String(CASE_FILES.indexOf(file) + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Tab with label */}
              <div
                className={`w-full py-1.5 sm:py-2 ${file.tabColor} rounded-b-[3px] border-x border-b border-black/10 text-center transition-all duration-200
                  group-hover:brightness-110 group-focus-visible:brightness-110
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`}
              >
                <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.12em] text-[#041D1E]/90 uppercase leading-none select-none block">
                  {file.label}
                </span>
              </div>

              {/* Contact shadow */}
              <div className="absolute -bottom-2 inset-x-1 h-3 bg-[#020708]/25 blur-[3px] rounded-full transition-all duration-200 group-hover:bg-[#020708]/15 group-hover:-bottom-3 group-hover:blur-[5px]" />
            </Link>
          ))}
        </div>

        {/* Small ouroboros mark on the tray */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 opacity-30">
          <img
            src="/assets/brand/ouroboros-cracked.png"
            alt=""
            className="w-full h-full object-contain filter brightness-150"
          />
        </div>
      </div>
    </div>
  );
};
