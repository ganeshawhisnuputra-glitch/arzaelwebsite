import React from 'react';
import { AtmosphericBackground } from '../components/common/AtmosphericBackground';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 animate-fade-in relative">
      {/* Environmental Backdrop */}
      <AtmosphericBackground variant="hospital-ward" overlayOpacity="deep" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Editorial Portrait / Damaged Monogram Frame */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative w-full aspect-[4/5] bg-[#040f12]/90 border border-petrol-800/80 rounded-sm p-8 flex flex-col items-center justify-center shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#147287_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <img
              src="/assets/brand/broken-a.png"
              alt="ARZAEL Monogram"
              className="w-3/5 h-3/5 object-contain filter drop-shadow-[0_0_35px_rgba(20,114,135,0.4)] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-text-dim">
              <span>ARZAEL</span>
              <span>OUTSIDER REALM • 2026</span>
            </div>
          </div>
        </div>

        {/* Right: Personal Artist Manifesto */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3 block">
              [ ARTIST MANIFESTO ]
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-normal mb-6">
              SO, WHO IS ARZAEL?
            </h1>
          </div>

          <div className="text-base sm:text-lg text-text-muted leading-relaxed space-y-5 font-sans">
            <p className="font-serif text-2xl text-text-primary">
              Hi. I’m ARZAEL.
            </p>

            <p>
              I make pop music about things we’re usually too embarrassed to admit.
            </p>

            <div className="p-6 bg-petrol-950/80 border-l-2 border-flesh-400 space-y-2 text-sm sm:text-base text-text-primary font-mono rounded-r-sm">
              <p>Self-sabotage.</p>
              <p>Insecurity.</p>
              <p>Ego.</p>
              <p>Shame.</p>
              <p>Power.</p>
              <p>Being an outsider.</p>
              <p className="text-flesh-300">
                Wanting to belong and hating that you want to belong.
              </p>
            </div>

            <p className="italic text-text-dim">
              Basically, all the fun stuff.
            </p>

            <p>
              I spent a lot of my life feeling like I didn’t quite fit into the world around me. Eventually I stopped trying to make myself easier to understand.
            </p>

            <p className="text-text-primary font-medium font-serif text-xl">
              I started making a world of my own instead.
            </p>

            <blockquote className="border-t border-b border-petrol-800/80 py-6 my-6 text-xl sm:text-2xl font-serif text-flesh-200 text-center tracking-editorial">
              “If you’ve ever felt a little strange here too—
              <br />
              <span className="text-flesh-400">you can stay.</span>”
            </blockquote>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/assets/brand/ouroboros-cracked.png"
                alt="Ouroboros mark"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-mono text-xs text-text-dim tracking-widest uppercase">
              A PRIVATE PLACE ON THE INTERNET
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
