import React from 'react';
import { Link } from 'react-router-dom';
import { useEntry } from '../../context/EntryContext';
import { socialLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  const { replayEntry, hasEntered } = useEntry();

  return (
    <footer className="w-full bg-[#041D1E] border-t border-[#0D5659]/50 pt-10 pb-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <p className="font-serif text-lg sm:text-xl text-beige-100 tracking-editorial mb-1">
          YOU MADE IT TO THE BOTTOM.
        </p>
        <p className="text-sm text-beige-100/60 font-sans mb-6">
          I’m surprised too.
        </p>

        {/* Quiet utility links */}
        <div className="flex flex-wrap justify-center items-center gap-5 text-xs font-sans text-beige-100/70 mb-4">
          <Link to="/about" className="hover:text-flesh-500 transition-colors">
            Who is ARZAEL
          </Link>
          <span className="text-[#0D5659]">•</span>
          <Link to="/letters" className="hover:text-flesh-500 transition-colors">
            Letters
          </Link>
          <span className="text-[#0D5659]">•</span>
          <Link to="/shop" className="hover:text-flesh-500 transition-colors">
            Objects
          </Link>
          {hasEntered && (
            <>
              <span className="text-[#0D5659]">•</span>
              <button
                onClick={replayEntry}
                className="text-flesh-500 hover:text-beige-100 transition-colors focus:outline-none cursor-pointer"
              >
                Replay Entrance
              </button>
            </>
          )}
        </div>

        {/* Canonical Quiet Social Fallback Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-sans text-flesh-500 mb-6">
          <a
            href={socialLinks.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinks.tiktok.ariaLabel}
            className="hover:text-beige-100 uppercase tracking-widest transition-colors font-medium"
          >
            TIKTOK
          </a>
          <span className="text-[#0D5659]">·</span>
          <a
            href={socialLinks.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinks.instagram.ariaLabel}
            className="hover:text-beige-100 uppercase tracking-widest transition-colors font-medium"
          >
            INSTAGRAM
          </a>
          <span className="text-[#0D5659]">·</span>
          <a
            href={socialLinks.spotify.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinks.spotify.ariaLabel}
            className="hover:text-beige-100 uppercase tracking-widest transition-colors font-medium"
          >
            SPOTIFY
          </a>
        </div>

        <div className="text-xs text-beige-100/40 space-y-1 font-sans">
          <p>ARZAEL © 2026 — All cycles reserved</p>
          <p className="text-flesh-500/80 tracking-widest uppercase text-[11px] font-medium">
            Don't be a stranger.
          </p>
        </div>
      </div>
    </footer>
  );
};
