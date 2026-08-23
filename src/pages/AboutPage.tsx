import React from 'react';
import { MediaPlaceholder } from '../components/common/MediaPlaceholder';
import { OuroborosMotif } from '../components/common/OuroborosMotif';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Editorial Portrait Frame */}
        <div className="lg:col-span-5 space-y-6">
          <MediaPlaceholder id="PLACEHOLDER_ARTIST_PORTRAIT" />
          <div className="flex items-center justify-between p-4 bg-petrol-900/40 border border-petrol-800 text-xs font-mono text-text-dim">
            <span>ARZAEL</span>
            <span>OUTSIDER REALM • 2026</span>
          </div>
        </div>

        {/* Right: Personal Artist Manifesto */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3 block">
              [ ARTIST MANIFESTO ]
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-bold mb-6">
              SO, WHO IS ARZAEL?
            </h1>
          </div>

          <div className="text-base sm:text-lg text-text-muted leading-relaxed space-y-5 font-sans">
            <p className="font-serif text-xl text-text-primary">
              Hi. I’m ARZAEL.
            </p>

            <p>
              I make pop music about things we’re usually too embarrassed to admit.
            </p>

            <div className="p-6 bg-petrol-900/60 border-l-2 border-flesh-400 space-y-2 text-sm sm:text-base text-text-primary font-mono">
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

            <p className="text-text-primary font-medium">
              I started making a world of my own instead.
            </p>

            <blockquote className="border-t border-b border-petrol-800 py-6 my-6 text-xl sm:text-2xl font-serif text-flesh-200 text-center tracking-editorial">
              “If you’ve ever felt a little strange here too—
              <br />
              <span className="text-flesh-400">you can stay.</span>”
            </blockquote>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <OuroborosMotif size="sm" interactive={false} />
            <span className="font-mono text-xs text-text-dim">
              A PRIVATE PLACE ON THE INTERNET
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
