import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DoppelgangerScene } from '../components/home/DoppelgangerScene';
import { CaseFileOrganizer } from '../components/home/CaseFileOrganizer';
import { OuroborosTransition } from '../components/common/OuroborosTransition';
import { useEntry } from '../context/EntryContext';
import { useModal } from '../context/ModalContext';
import { socialLinks } from '../data/socialLinks';
import { Mail, Menu, X } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { hasEntered, enterWorld } = useEntry();
  const { openLetters } = useModal();
  const [showIntro, setShowIntro] = useState(!hasEntered);
  const [menuOpen, setMenuOpen] = useState(false);

  // When entry context changes externally (e.g. deep link), sync
  useEffect(() => {
    if (hasEntered) setShowIntro(false);
  }, [hasEntered]);

  const handleIntroComplete = useCallback(() => {
    enterWorld();
    setShowIntro(false);
  }, [enterWorld]);

  // Snake intro gate
  if (showIntro) {
    return <OuroborosTransition onComplete={handleIntroComplete} />;
  }

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#020708] flex flex-col">
      {/* 1. Doppelganger video scene */}
      <DoppelgangerScene />

      {/* 2. Top overlay: ARZAEL identity + menu */}
      <header className="absolute top-0 inset-x-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-2.5 group focus:outline-none focus:ring-1 focus:ring-flesh-500 rounded-sm p-1"
        >
          <span className="font-serif text-base sm:text-lg tracking-[0.25em] font-semibold text-beige-100/90 group-hover:text-flesh-500 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            ARZAEL
          </span>
          <span className="hidden sm:inline text-[9px] font-sans text-flesh-500/70 tracking-[0.2em] uppercase border-l border-beige-100/20 pl-2.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            SELF SABOTAGE
          </span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-3">
          {/* Social icons — desktop only */}
          <div className="hidden md:flex items-center gap-3 mr-2">
            <a href={socialLinks.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-beige-100/40 hover:text-flesh-500 transition-colors text-[10px] font-sans tracking-widest uppercase">TT</a>
            <a href={socialLinks.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-beige-100/40 hover:text-flesh-500 transition-colors text-[10px] font-sans tracking-widest uppercase">IG</a>
            <a href={socialLinks.spotify.url} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-beige-100/40 hover:text-flesh-500 transition-colors text-[10px] font-sans tracking-widest uppercase">SP</a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="px-3 py-1.5 text-[10px] font-sans tracking-[0.2em] uppercase text-beige-100/70 hover:text-beige-100 border border-beige-100/15 hover:border-flesh-500/40 bg-[#020708]/40 backdrop-blur-sm rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Menu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MENU</span>
          </button>
        </div>
      </header>

      {/* 3. Case-file organizer — bottom of viewport */}
      <div className="absolute bottom-14 sm:bottom-16 inset-x-0 z-10 animate-fade-in max-h-[60vh] sm:max-h-[50vh] md:max-h-none overflow-y-auto overflow-x-hidden">
        <CaseFileOrganizer />
      </div>

      {/* 4. Overlay Menu Drawer */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-[#020708]/95 backdrop-blur-md flex flex-col animate-fade-in"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#0D5659]/30">
            <span className="font-serif text-lg tracking-[0.25em] text-beige-100">ARZAEL</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 text-beige-100/70 hover:text-beige-100 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 space-y-6">
            {[
              { label: 'SELF SABOTAGE', path: '/self-sabotage', desc: 'The record' },
              { label: 'WATCH', path: '/watch', desc: 'Visual cinema' },
              { label: 'ARCHIVE', path: '/archive', desc: 'Era chronology' },
              { label: 'SHOP', path: '/shop', desc: 'Personal effects' },
              { label: 'LETTERS', path: '/letters', desc: 'Correspondence' },
              { label: 'ABOUT', path: '/about', desc: 'Patient file' },
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between py-2 border-b border-[#0D5659]/20 hover:border-flesh-500/40 transition-colors"
              >
                <span className="font-serif text-2xl sm:text-3xl text-beige-100 group-hover:text-flesh-500 transition-colors tracking-wide">
                  {item.label}
                </span>
                <span className="text-[10px] font-sans text-beige-100/30 tracking-widest uppercase">
                  {item.desc}
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-8 py-6 border-t border-[#0D5659]/30 space-y-4">
            <button
              onClick={() => { setMenuOpen(false); openLetters(); }}
              className="w-full py-3 border border-flesh-500/60 text-xs font-sans tracking-[0.2em] uppercase text-flesh-500 hover:bg-flesh-500 hover:text-[#041D1E] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              WRITE TO ME
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] font-sans text-beige-100/40 tracking-widest uppercase">
              <a href={socialLinks.tiktok.url} target="_blank" rel="noopener noreferrer" className="hover:text-flesh-500 transition-colors">TIKTOK</a>
              <span className="text-[#0D5659]">·</span>
              <a href={socialLinks.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-flesh-500 transition-colors">INSTAGRAM</a>
              <span className="text-[#0D5659]">·</span>
              <a href={socialLinks.spotify.url} target="_blank" rel="noopener noreferrer" className="hover:text-flesh-500 transition-colors">SPOTIFY</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
