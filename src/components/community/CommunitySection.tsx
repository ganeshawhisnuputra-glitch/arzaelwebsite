import React from 'react';
import { MEME_PACK_DESTINATION, HOUSE_OF_ZAELION_DESTINATIONS } from '../../data/communityData';
import { AnalyticsEventType } from '../../types/analytics';
import { ExternalLink, Sparkles, MessageCircle } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface CommunitySectionProps {
  onAnalyticsEvent?: (event: AnalyticsEventType) => void;
  className?: string;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  onAnalyticsEvent,
  className = '',
}) => {
  const handleLinkClick = (event: AnalyticsEventType) => {
    if (onAnalyticsEvent) {
      onAnalyticsEvent(event);
    }
  };

  return (
    <div className={`w-full space-y-12 ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase block mb-2">
          [ SANCTUARY & EVIDENCE ]
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-text-primary tracking-editorial font-normal">
          FIND WHERE YOU BELONG.
        </h2>
      </div>

      {/* Grid: Distinctive Meme Pack Card vs HOUSE OF ZAELION Community Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ========================================================================= */}
        {/* 1. DISTINCTIVE ARZAEL MEME PACK FEATURE CARD (Sticker/Internet-culture) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-8 bg-[#091e23]/70 border-2 border-dashed border-flesh-500/40 rounded-sm relative overflow-hidden flesh-glow">
          {/* Subtle scrapbook label */}
          <div className="absolute top-4 right-4 rotate-3 bg-flesh-950/90 border border-flesh-500/60 px-2 py-0.5 text-[10px] font-mono text-flesh-300 uppercase tracking-widest">
            DIGITAL CONTRABAND
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-flesh-400" />
              <span className="text-[11px] font-mono text-flesh-400 tracking-widest uppercase">
                REACTION VAULT
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-text-primary tracking-editorial font-bold">
              {MEME_PACK_DESTINATION.title}
            </h3>

            <div className="space-y-2 text-sm sm:text-base text-text-muted leading-relaxed font-sans">
              {MEME_PACK_DESTINATION.copy.map((line, idx) => (
                <p key={idx} className={idx === 1 ? 'text-flesh-300 font-serif italic text-base' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <a
              href={MEME_PACK_DESTINATION.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(MEME_PACK_DESTINATION.analyticsEvent)}
              className="w-full py-4 bg-flesh-900/90 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center justify-center gap-2 font-medium cursor-pointer"
            >
              <span>{MEME_PACK_DESTINATION.cta}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HOUSE OF ZAELION COMMUNITY AREA (The Quieter Room + The Louder Hallway) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-8 bg-petrol-900/40 border border-petrol-700/80 rounded-sm space-y-6">
          <div>
            <span className="text-xs text-petrol-400 tracking-widest uppercase font-mono block mb-1">
              THE INNER CIRCLE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-text-primary tracking-editorial font-normal">
              HOUSE OF ZAELION
            </h3>
            <p className="text-xs text-text-dim mt-1 font-sans">
              Choose your atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Option A: WhatsApp (The Quieter Room) */}
            <div className="p-5 bg-petrol-950/80 border border-petrol-800 hover:border-petrol-600 transition-colors flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-petrol-400 text-[10px] font-mono tracking-widest uppercase">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.label}</span>
                </div>

                <h4 className="font-serif text-lg text-text-primary font-medium">
                  WHATSAPP
                </h4>

                <div className="text-xs text-text-muted leading-relaxed space-y-1 font-sans">
                  {HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.copy.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              <a
                href={HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.analyticsEvent)}
                className="w-full py-2.5 bg-petrol-900 border border-petrol-600 text-xs font-mono tracking-widest uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <span>{HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.cta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Option B: Instagram (The Louder Hallway) */}
            <div className="p-5 bg-petrol-950/80 border border-petrol-800 hover:border-petrol-600 transition-colors flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-flesh-400 text-[10px] font-mono tracking-widest uppercase">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>{HOUSE_OF_ZAELION_DESTINATIONS.instagram.label}</span>
                </div>

                <h4 className="font-serif text-lg text-text-primary font-medium">
                  INSTAGRAM
                </h4>

                <div className="text-xs text-text-muted leading-relaxed space-y-1 font-sans">
                  {HOUSE_OF_ZAELION_DESTINATIONS.instagram.copy.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              <a
                href={HOUSE_OF_ZAELION_DESTINATIONS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(HOUSE_OF_ZAELION_DESTINATIONS.instagram.analyticsEvent)}
                className="w-full py-2.5 bg-petrol-900 border border-petrol-600 text-xs font-mono tracking-widest uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <span>{HOUSE_OF_ZAELION_DESTINATIONS.instagram.cta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
