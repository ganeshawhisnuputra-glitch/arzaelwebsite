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
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="font-sans text-xs text-flesh-500 tracking-widest uppercase block font-semibold">
          SANCTUARY & EVIDENCE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-beige-100 tracking-editorial font-normal">
          FIND WHERE YOU BELONG.
        </h2>
      </div>

      {/* Grid: Distinctive Meme Pack Card vs HOUSE OF ZAELION Community Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ========================================================================= */}
        {/* 1. DISTINCTIVE ARZAEL MEME PACK CARD */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-[#072C2E]/90 border border-flesh-500/50 rounded-sm relative overflow-hidden flesh-glow">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-flesh-500">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                REACTION VAULT
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-beige-100 tracking-editorial font-normal">
              {MEME_PACK_DESTINATION.title}
            </h3>

            <div className="space-y-2 text-base text-beige-100/80 leading-relaxed font-sans">
              {MEME_PACK_DESTINATION.copy.map((line, idx) => (
                <p key={idx} className={idx === 1 ? 'text-flesh-500 font-serif italic text-lg' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <a
              href={MEME_PACK_DESTINATION.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(MEME_PACK_DESTINATION.analyticsEvent)}
              className="w-full py-3.5 bg-flesh-500 border border-flesh-500 text-xs font-sans tracking-widest uppercase text-[#041D1E] hover:bg-[#FAF6EE] hover:text-[#041D1E] transition-all duration-300 flex items-center justify-center gap-2 font-bold cursor-pointer rounded-xs"
            >
              <span>{MEME_PACK_DESTINATION.cta}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HOUSE OF ZAELION COMMUNITY AREA */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-[#072C2E]/80 border border-[#0D5659] rounded-sm space-y-6">
          <div>
            <span className="text-xs text-flesh-500 tracking-widest uppercase font-sans font-semibold block mb-1">
              THE INNER CIRCLE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-beige-100 tracking-editorial font-normal">
              HOUSE OF ZAELION
            </h3>
            <p className="text-sm text-beige-100/60 mt-1 font-sans">
              Choose your room.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Option A: WhatsApp (The Quieter Room) */}
            <div className="p-5 bg-[#041D1E]/90 border border-[#0D5659]/80 hover:border-flesh-500/60 transition-colors flex flex-col justify-between space-y-4 rounded-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-beige-100/60 text-xs font-sans tracking-widest uppercase">
                  <MessageCircle className="w-3.5 h-3.5 text-flesh-500" />
                  <span>{HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.label}</span>
                </div>

                <h4 className="font-serif text-lg text-beige-100 font-medium">
                  WHATSAPP
                </h4>

                <div className="text-xs text-beige-100/70 leading-relaxed space-y-1 font-sans">
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
                className="w-full py-2.5 bg-[#0D5659] border border-[#0D5659] text-xs font-sans tracking-widest uppercase text-beige-100 hover:bg-flesh-500 hover:text-[#041D1E] hover:border-flesh-500 transition-colors flex items-center justify-center gap-2 font-medium rounded-xs"
              >
                <span>{HOUSE_OF_ZAELION_DESTINATIONS.whatsapp.cta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Option B: Instagram (The Louder Hallway) */}
            <div className="p-5 bg-[#041D1E]/90 border border-[#0D5659]/80 hover:border-flesh-500/60 transition-colors flex flex-col justify-between space-y-4 rounded-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-flesh-500 text-xs font-sans tracking-widest uppercase">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>{HOUSE_OF_ZAELION_DESTINATIONS.instagram.label}</span>
                </div>

                <h4 className="font-serif text-lg text-beige-100 font-medium">
                  INSTAGRAM
                </h4>

                <div className="text-xs text-beige-100/70 leading-relaxed space-y-1 font-sans">
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
                className="w-full py-2.5 bg-[#0D5659] border border-[#0D5659] text-xs font-sans tracking-widest uppercase text-beige-100 hover:bg-flesh-500 hover:text-[#041D1E] hover:border-flesh-500 transition-colors flex items-center justify-center gap-2 font-medium rounded-xs"
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
