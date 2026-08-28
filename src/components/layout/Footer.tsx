import React from 'react';
import { Link } from 'react-router-dom';
import { useEntry } from '../../context/EntryContext';
import { socialLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  const { replayEntry, hasEntered } = useEntry();

  return (
    <footer className="w-full bg-petrol-950 border-t border-petrol-800/60 pt-10 pb-20 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <p className="font-serif text-base sm:text-lg text-text-primary tracking-editorial mb-1">
          YOU MADE IT TO THE BOTTOM.
        </p>
        <p className="text-xs text-text-muted font-sans mb-6">
          I’m surprised too.
        </p>

        {/* Quiet utility links */}
        <div className="flex flex-wrap justify-center items-center gap-5 text-xs text-text-muted mb-4">
          <Link to="/about" className="hover:text-text-primary transition-colors">
            Who is ARZAEL
          </Link>
          <span className="text-petrol-700">•</span>
          <Link to="/letters" className="hover:text-text-primary transition-colors">
            Letters
          </Link>
          <span className="text-petrol-700">•</span>
          <Link to="/shop" className="hover:text-text-primary transition-colors">
            Objects
          </Link>
          {hasEntered && (
            <>
              <span className="text-petrol-700">•</span>
              <button
                onClick={replayEntry}
                className="text-flesh-400/90 hover:text-flesh-300 transition-colors focus:outline-none cursor-pointer"
              >
                Replay Entrance
              </button>
            </>
          )}
        </div>

        {/* Canonical Quiet Social Fallback Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-[11px] font-mono text-petrol-400/80 mb-6">
          <a
            href={socialLinks.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinks.tiktok.ariaLabel}
            className="hover:text-flesh-300 uppercase tracking-widest transition-colors"
          >
            TIKTOK
          </a>
          <span className="text-petrol-800">·</span>
          <a
            href={socialLinks.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinks.instagram.ariaLabel}
            className="hover:text-flesh-300 uppercase tracking-widest transition-colors"
          >
            INSTAGRAM
          </a>
          <span className="text-petrol-800">·</span>
          <a
            href={socialLinks.spotify.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinks.spotify.ariaLabel}
            className="hover:text-flesh-300 uppercase tracking-widest transition-colors"
          >
            SPOTIFY
          </a>
        </div>

        <div className="text-[11px] text-text-dim space-y-1">
          <p>ARZAEL © 2026 — All cycles reserved</p>
          <p className="text-petrol-400/70 tracking-widest uppercase text-[10px] font-mono">
            Don't be a stranger.
          </p>
        </div>
      </div>
    </footer>
  );
};
