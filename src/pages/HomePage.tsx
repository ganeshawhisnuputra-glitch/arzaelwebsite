import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { useModal } from '../context/ModalContext';
import { useEntry } from '../context/EntryContext';
import { SELF_SABOTAGE_TRACKS } from '../data/selfSabotageEra';
import { OuroborosTransition } from '../components/common/OuroborosTransition';
import { AtmosphericBackground } from '../components/common/AtmosphericBackground';
import { QuizPreviewCard } from '../components/quiz/QuizPreviewCard';
import { AvoidMyselfSection } from '../components/community/AvoidMyselfSection';
import { CommunitySection } from '../components/community/CommunitySection';
import { Play, ArrowRight, Mail, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { hasEntered, enterWorld } = useEntry();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionKey, setTransitionKey] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const { playTrack } = useAudio();
  const { openLetters } = useModal();
  const enterHeadingRef = useRef<HTMLHeadingElement>(null);
  const eraRevealRef = useRef<HTMLDivElement>(null);
  const quizSectionRef = useRef<HTMLDivElement>(null);

  // Triggered on ENTER click - guarantees fresh transition instance
  const handleEnterClick = () => {
    if (isTransitioning) return;
    setTransitionKey(Date.now());
    setIsTransitioning(true);
  };

  // Called when video transition completes or is skipped
  const handleTransitionComplete = () => {
    enterWorld();
    setIsTransitioning(false);
    setTimeout(() => {
      enterHeadingRef.current?.focus();
      eraRevealRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRevealQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => {
      quizSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full flex flex-col text-text-primary selection:bg-flesh-500/30 selection:text-flesh-200 relative">
      {/* Active Ouroboros Entry Video Transition Overlay */}
      {isTransitioning && (
        <OuroborosTransition
          key={transitionKey}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Atmospheric Clinical Ward / Corridor Backdrop */}
      <AtmosphericBackground variant="corridor" overlayOpacity="deep" />

      {/* ========================================================================= */}
      {/* 1. PRE-ENTRY VIEWPORT (Intimate, atmospheric encounter) */}
      {/* ========================================================================= */}
      {!hasEntered ? (
        <section
          aria-label="Opening Encounter"
          className="min-h-[88vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center animate-fade-in space-y-6">
            {/* Authentic cracked ouroboros artwork */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-2 group">
              <img
                src="/assets/brand/ouroboros-cracked.png"
                alt="ARZAEL Ouroboros"
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(20,114,135,0.4)] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-normal">
              YOU’RE HERE.
            </h1>

            <div className="text-base sm:text-lg text-text-muted leading-relaxed max-w-md space-y-2 font-sans">
              <p>I don’t know what brought you here.</p>
              <p className="text-text-primary font-medium">
                But since you came this far, you might as well come inside.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleEnterClick}
                disabled={isTransitioning}
                aria-label="Enter ARZAEL"
                className="px-12 py-4 bg-petrol-900/90 border border-petrol-500/60 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-flesh-900/80 hover:border-flesh-500 hover:text-white transition-all duration-500 petrol-glow font-medium focus:outline-none focus:ring-2 focus:ring-flesh-400 disabled:opacity-50 cursor-pointer"
              >
                ENTER
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* ========================================================================= */
        /* 2. REVEALED ALBUM WORLD (Corridor, Clinical Notes, Music, Portals, Letters) */
        /* ========================================================================= */
        <div ref={eraRevealRef} className="w-full animate-fade-in">
          {/* Spatial Hero Entrance Section */}
          <section
            aria-label="Current Era Reveal"
            className="relative min-h-[80vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 overflow-hidden border-b border-petrol-800/60"
          >
            <div className="relative z-10 max-w-4xl space-y-8">
              {/* Campaign Mark: Hand-Drawn Title & Monogram */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-petrol-950/80 border border-petrol-700/60 text-xs font-mono tracking-widest text-flesh-300 uppercase">
                  <span>CLINICAL ADMISSION</span>
                  <span className="text-petrol-600">•</span>
                  <span>RECORD 01</span>
                </div>

                <div className="max-w-md sm:max-w-lg pt-2">
                  <img
                    src="/assets/brand/self-sabotage-title.png"
                    alt="SELF SABOTAGE"
                    className="w-full h-auto object-contain filter drop-shadow-[0_0_20px_rgba(217,126,120,0.25)]"
                  />
                </div>
              </div>

              {/* Intimate Album Manifesto */}
              <div className="text-base sm:text-xl text-text-muted leading-relaxed max-w-2xl space-y-3 font-sans">
                <p className="text-text-primary">
                  Have you ever watched yourself ruin something while knowing exactly what you were doing?
                </p>
                <p className="font-serif italic text-2xl text-flesh-300 font-medium">
                  Me too. So I made a record about it.
                </p>
              </div>

              {/* Spatial Actions */}
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Link
                  to="/self-sabotage"
                  className="px-8 py-4 bg-flesh-900/90 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center gap-2.5 font-medium"
                >
                  <span>EXPLORE THE CORRIDOR</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => playTrack(SELF_SABOTAGE_TRACKS[0])}
                  aria-label="Listen to Anesthesia"
                  className="px-8 py-4 bg-petrol-900/90 border border-petrol-600 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all duration-300 flex items-center gap-2.5 font-medium cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-flesh-400" />
                  <span>LISTEN: ANESTHESIA</span>
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. TRACK MANIFEST (Clinical Evidence & Intimate Notes) */}
          {/* ========================================================================= */}
          <section
            aria-label="Track Manifest"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-b border-petrol-800/60"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Broken Monogram Visual */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-square bg-[#040f12] border border-petrol-800/80 rounded-sm p-8 flex items-center justify-center shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#147287_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  <img
                    src="/assets/brand/broken-a.png"
                    alt="ARZAEL Damaged Monogram"
                    className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_0_30px_rgba(20,114,135,0.3)] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-text-dim">
                    <span>EVIDENCE NO. 01</span>
                    <span>SELF-INFLICTED</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Manifest Tracks */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div>
                  <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase block mb-2">
                    [ CASE FILES ]
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-text-primary tracking-editorial font-normal">
                    EVERY SONG CATCHES ME DOING IT DIFFERENTLY.
                  </h2>
                </div>

                <div className="divide-y divide-petrol-800/60 border-t border-b border-petrol-800/60">
                  {SELF_SABOTAGE_TRACKS.map((track, idx) => (
                    <div
                      key={track.id}
                      className="py-4 px-3 flex items-center justify-between group hover:bg-petrol-900/40 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-text-dim">0{idx + 1}</span>
                          <p className="font-serif text-base text-text-primary group-hover:text-flesh-300 transition-colors font-medium">
                            {track.title}
                          </p>
                        </div>
                        {track.statement && (
                          <p className="text-xs text-text-muted italic pl-7 font-sans">
                            “{track.statement}”
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => playTrack(track)}
                        aria-label={`Play ${track.title}`}
                        className="p-3 rounded-full bg-petrol-950 border border-petrol-700 text-text-muted hover:text-flesh-300 hover:border-flesh-500 transition-all focus:outline-none cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>

                <Link
                  to="/self-sabotage"
                  className="text-xs font-mono text-flesh-400 hover:text-flesh-200 uppercase tracking-widest inline-flex items-center gap-2 self-start transition-colors pt-2"
                >
                  <span>Read full case notes & confessions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. QUIZ REFLECTION — "CAN I ASK YOU SOMETHING?" */}
          {/* ========================================================================= */}
          <section
            ref={quizSectionRef}
            aria-label="Quiz Reflection"
            className="bg-petrol-950/60 border-b border-petrol-800/80 py-20 px-4 sm:px-6 lg:px-8"
          >
            {!showQuiz ? (
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center space-y-6">
                <h2 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-normal">
                  CAN I ASK YOU SOMETHING?
                </h2>

                <div className="text-base sm:text-lg text-text-muted leading-relaxed space-y-2 max-w-lg font-sans">
                  <p>You already know you self-sabotage.</p>
                  <p className="text-text-primary font-medium font-serif text-xl sm:text-2xl text-flesh-300 italic">
                    I want to know how.
                  </p>
                </div>

                <button
                  onClick={handleRevealQuiz}
                  aria-label="Find out how you self-sabotage"
                  className="px-10 py-4 bg-flesh-900/90 border border-flesh-500 text-xs sm:text-sm font-mono uppercase tracking-widest-artist text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center gap-2.5 font-medium cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-flesh-300" />
                  <span>FIND OUT</span>
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="max-w-2xl mx-auto mb-8 text-center space-y-2">
                  <span className="text-xs text-flesh-400 uppercase tracking-widest block font-mono">
                    CAN I ASK YOU SOMETHING?
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-text-primary">
                    You already know you self-sabotage. I want to know how.
                  </h3>
                </div>
                <QuizPreviewCard />
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 5. LETTERS TEASER — "CAN I WRITE TO YOU?" */}
          {/* ========================================================================= */}
          <section
            aria-label="Letters from ARZAEL Teaser"
            className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-24 text-center border-b border-petrol-800/60"
          >
            <h2 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-normal mb-6">
              CAN I WRITE TO YOU?
            </h2>

            <div className="max-w-lg mx-auto text-base sm:text-lg text-text-muted leading-relaxed space-y-3 mb-10 font-sans">
              <p>
                Social media feels like talking in a room where everyone is screaming.
              </p>
              <p className="text-text-primary font-medium font-serif italic text-xl">
                I want somewhere quieter.
              </p>
            </div>

            <button
              onClick={openLetters}
              aria-label="Open Letters subscription modal"
              className="px-10 py-4 bg-flesh-900/90 border border-flesh-500 text-xs sm:text-sm font-mono uppercase tracking-widest-artist text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow inline-flex items-center gap-2.5 font-medium cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>LET ME WRITE TO YOU</span>
            </button>
          </section>

          {/* ========================================================================= */}
          {/* 6. THE PLACES I GO TO AVOID MYSELF (Spatial Portals to Socials) */}
          {/* ========================================================================= */}
          <div className="border-b border-petrol-800/80">
            <AvoidMyselfSection />
          </div>

          {/* ========================================================================= */}
          {/* 7. COMMUNITY SANCTUARY — MEME PACK & HOUSE OF ZAELION */}
          {/* ========================================================================= */}
          <section
            aria-label="Community Channels"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          >
            <CommunitySection />
          </section>
        </div>
      )}
    </div>
  );
};
