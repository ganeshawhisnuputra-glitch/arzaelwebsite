import React from 'react';
import { socialLinks } from '../../data/socialLinks';
import { ExternalLink } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.31 0 .61.05.88.15V9.01a6.34 6.34 0 0 0-.88-.06A6.33 6.33 0 0 0 3 15.28a6.33 6.33 0 0 0 6.34 6.34 6.33 6.33 0 0 0 6.33-6.34V8.41a8.31 8.31 0 0 0 4.92 1.6V6.69z" />
  </svg>
);

const SpotifyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.858.208c-2.35-1.436-5.308-1.76-8.792-.963a.625.625 0 1 1-.277-1.219c3.81-.87 7.078-.497 9.719 1.116.31.189.41.59.208.858zm1.224-2.724a.782.782 0 0 1-1.077.257c-2.69-1.654-6.79-2.132-9.971-1.166a.782.782 0 1 1-.456-1.496c3.633-1.103 8.148-.568 11.247 1.328.373.228.492.716.257 1.077zm.105-2.836C14.692 8.92 8.397 8.71 4.75 9.818a.938.938 0 1 1-.544-1.794c4.19-1.272 11.143-1.031 15.118 1.33a.938.938 0 0 1-.41 1.762.92.92 0 0 1-.999-.252z"/>
  </svg>
);

export const AvoidMyselfSection: React.FC = () => {
  return (
    <section
      aria-label="The Places I Go To Avoid Myself"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="font-sans text-xs text-flesh-500 tracking-widest uppercase block font-semibold">
          THE WARD EXITS
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-beige-100 tracking-editorial font-normal leading-tight">
          THE PLACES I GO TO AVOID MYSELF.
        </h2>

        <p className="text-base sm:text-lg text-beige-100/70 leading-relaxed font-sans">
          Three ways to stay distracted. Three rooms in the same institution.
        </p>

        <p className="font-serif italic text-base text-flesh-500">
          Pick an exit that leads back in.
        </p>
      </div>

      {/* Three Spatial Portals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* ========================================================================= */}
        {/* 1. THE ENDLESS SCREEN (TikTok) */}
        {/* ========================================================================= */}
        <a
          href={socialLinks.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLinks.tiktok.ariaLabel}
          className="group relative flex flex-col justify-between p-8 bg-[#072C2E]/80 border border-[#0D5659] hover:border-flesh-500/70 rounded-sm transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(217,135,141,0.15)] cursor-pointer"
        >
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-sm bg-[#041D1E] border border-[#0D5659] flex items-center justify-center text-beige-100 group-hover:text-flesh-500 group-hover:border-flesh-500 transition-colors">
              <TikTokIcon />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-xs text-flesh-500/90 uppercase tracking-widest block font-medium">
                {socialLinks.tiktok.handle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-beige-100 group-hover:text-flesh-500 transition-colors tracking-editorial">
                THE ENDLESS SCREEN
              </h3>
              <p className="text-sm text-flesh-500 italic font-serif">
                “{socialLinks.tiktok.microcopy}”
              </p>
            </div>

            <p className="text-sm text-beige-100/70 leading-relaxed font-sans">
              Falling through five hours of stranger's lives so you don't have to look at your own.
            </p>
          </div>

          <div className="pt-8 relative z-10 flex items-center gap-2 text-xs font-sans tracking-widest text-flesh-500 group-hover:text-beige-100 uppercase transition-colors font-semibold">
            <span>ENTER THE LOOP</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* ========================================================================= */}
        {/* 2. THE CRACKED MIRROR (Instagram) */}
        {/* ========================================================================= */}
        <a
          href={socialLinks.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLinks.instagram.ariaLabel}
          className="group relative flex flex-col justify-between p-8 bg-[#072C2E]/80 border border-[#0D5659] hover:border-flesh-500/70 rounded-sm transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(217,135,141,0.15)] cursor-pointer"
        >
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-sm bg-[#041D1E] border border-[#0D5659] flex items-center justify-center text-beige-100 group-hover:text-flesh-500 group-hover:border-flesh-500 transition-colors">
              <InstagramIcon />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-xs text-flesh-500/90 uppercase tracking-widest block font-medium">
                {socialLinks.instagram.handle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-beige-100 group-hover:text-flesh-500 transition-colors tracking-editorial">
                THE CRACKED MIRROR
              </h3>
              <p className="text-sm text-flesh-500 italic font-serif">
                “{socialLinks.instagram.microcopy}”
              </p>
            </div>

            <p className="text-sm text-beige-100/70 leading-relaxed font-sans">
              Comparing your raw internal wreckage against everybody else's edited exhibition.
            </p>
          </div>

          <div className="pt-8 relative z-10 flex items-center gap-2 text-xs font-sans tracking-widest text-flesh-500 group-hover:text-beige-100 uppercase transition-colors font-semibold">
            <span>LOOK CLOSER</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* ========================================================================= */}
        {/* 3. THE WORN TURNTABLE (Spotify) */}
        {/* ========================================================================= */}
        <a
          href={socialLinks.spotify.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLinks.spotify.ariaLabel}
          className="group relative flex flex-col justify-between p-8 bg-[#072C2E]/80 border border-[#0D5659] hover:border-flesh-500/70 rounded-sm transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(217,135,141,0.15)] cursor-pointer"
        >
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-sm bg-[#041D1E] border border-[#0D5659] flex items-center justify-center text-beige-100 group-hover:text-flesh-500 group-hover:border-flesh-500 transition-colors">
              <SpotifyIcon />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-xs text-flesh-500/90 uppercase tracking-widest block font-medium">
                {socialLinks.spotify.handle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-beige-100 group-hover:text-flesh-500 transition-colors tracking-editorial">
                THE WORN RECORD
              </h3>
              <p className="text-sm text-flesh-500 italic font-serif">
                “{socialLinks.spotify.microcopy}”
              </p>
            </div>

            <p className="text-sm text-beige-100/70 leading-relaxed font-sans">
              Replaying the exact same feelings over and over until the needle carves straight through the bone.
            </p>
          </div>

          <div className="pt-8 relative z-10 flex items-center gap-2 text-xs font-sans tracking-widest text-flesh-500 group-hover:text-beige-100 uppercase transition-colors font-semibold">
            <span>HEAR THE RECORD</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
};
