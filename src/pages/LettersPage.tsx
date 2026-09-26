import React, { useState } from 'react';
import { CommunitySection } from '../components/community/CommunitySection';
import { AtmosphericBackground } from '../components/common/AtmosphericBackground';

export const LettersPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in flex flex-col items-center space-y-20 relative overflow-hidden">
      {/* Intimate environmental backdrop */}
      <AtmosphericBackground variant="letters" overlayOpacity="deep" />

      <div className="relative z-10 w-full flex flex-col items-center space-y-20">

      {/* 1. Direct Correspondence (Letters) */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-4">
          [ DIRECT CORRESPONDENCE ]
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-normal mb-6">
          CAN I WRITE TO YOU?
        </h1>

        <div className="max-w-xl text-base sm:text-lg text-text-muted leading-relaxed space-y-4 mb-10 text-left sm:text-center font-sans">
          <p>
            Social media feels like talking in a room where everyone is screaming.
          </p>
          <p className="text-text-primary font-medium font-serif italic text-xl">
            I want somewhere quieter.
          </p>
          <p className="text-sm text-text-muted">
            So sometimes I’ll write to you. About the songs. Things I’m making. Things I’m thinking about. Things I probably shouldn’t post.
          </p>
          <p className="text-xs font-mono text-petrol-300 tracking-wider">
            No algorithm between us. Just me → you.
          </p>
        </div>

        {isSubmitted ? (
          <div className="w-full max-w-md p-8 bg-petrol-950/90 border border-flesh-500/60 shadow-2xl animate-fade-in text-center rounded-sm">
            <span className="font-mono text-xs text-flesh-400 tracking-widest uppercase block mb-2">
              [ CONNECTION RECORDED ]
            </span>
            <h2 className="font-serif text-2xl text-text-primary mb-3">
              YOU’RE IN.
            </h2>
            <p className="text-sm text-text-muted mb-2">
              I’ll write soon.
            </p>
            <p className="text-xs text-flesh-300 italic mb-6">
              Until then, don’t disappear on me.
            </p>
            <p className="text-[10px] font-mono text-text-dim">
              (V0 Foundation: email recorded in local mock state)
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-petrol-950/80 border border-petrol-800 p-6 sm:p-8 rounded-sm"
          >
            <div className="text-left mb-6">
              <label
                htmlFor="page-letter-email"
                className="block font-mono text-xs text-text-muted tracking-wider mb-2"
              >
                Email address:
              </label>
              <input
                id="page-letter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="where should I send it?"
                className="w-full px-4 py-3.5 bg-petrol-900/90 border border-petrol-700 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-flesh-400 focus:ring-1 focus:ring-flesh-400 font-mono transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-flesh-900/90 border border-flesh-500 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all flesh-glow cursor-pointer"
            >
              WRITE TO ME
            </button>
          </form>
        )}
      </div>

      {/* 2. Distinctive Community Channels (Meme Pack + House of Zaelion) */}
      <div className="w-full pt-10 border-t border-petrol-800/80">
        <CommunitySection />
      </div>
      </div>
    </div>
  );
};
