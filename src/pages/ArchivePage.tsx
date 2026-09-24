import React from 'react';
import { Link } from 'react-router-dom';
import { ARCHIVE_ERAS } from '../data/archiveEras';
import { MediaPlaceholder } from '../components/common/MediaPlaceholder';
import { AtmosphericBackground } from '../components/common/AtmosphericBackground';
import { ArrowRight } from 'lucide-react';

export const ArchivePage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 animate-fade-in relative">
      {/* Environmental Backdrop */}
      <AtmosphericBackground variant="archive" overlayOpacity="deep" />

      <div className="max-w-2xl mb-16 space-y-4">
        <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase block">
          [ ERA CHRONOLOGY ]
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-normal">
          THE ARCHIVE
        </h1>
        <p className="font-serif text-xl text-text-muted italic">
          “Every version of me thought he knew what he was doing.”
        </p>
        <p className="text-sm text-text-dim font-sans">
          Here they are anyway.
        </p>
      </div>

      <div className="space-y-16">
        {ARCHIVE_ERAS.map((era) => (
          <div
            key={era.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#040f12]/80 border border-petrol-800/80 p-6 sm:p-10 hover:border-petrol-600 transition-all rounded-sm"
          >
            <div className="lg:col-span-6">
              <MediaPlaceholder id={era.artworkPlaceholderId} />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase bg-flesh-950 px-2 py-0.5 border border-flesh-800/40">
                  {era.subtitle}
                </span>
                <span className="font-mono text-xs text-text-dim">
                  {era.years}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-text-primary tracking-editorial font-normal mb-4">
                {era.title}
              </h2>

              <p className="text-base text-text-muted leading-relaxed mb-3 italic font-serif">
                “{era.statement}”
              </p>

              <p className="text-xs text-text-dim leading-relaxed mb-8 font-sans">
                {era.description}
              </p>

              <Link
                to={`/${era.slug}`}
                className="self-start px-6 py-3.5 bg-petrol-900 border border-petrol-500/60 text-xs font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-flesh-900/80 hover:border-flesh-500 hover:text-white flex items-center gap-2 transition-all petrol-glow"
              >
                <span>ENTER THIS ERA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
