import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { useModal } from '../context/ModalContext';
import { useEntry } from '../context/EntryContext';
import { SELF_SABOTAGE_TRACKS } from '../data/selfSabotageEra';
import { MediaPlaceholder } from '../components/common/MediaPlaceholder';
import { OuroborosMotif } from '../components/common/OuroborosMotif';
import { OuroborosTransition } from '../components/common/OuroborosTransition';
import { QuizPreviewCard } from '../components/quiz/QuizPreviewCard';
import { SelfSabotageMachine } from '../components/machine/SelfSabotageMachine';
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

  // Triggered on ENTER click - guarantees fresh transition instance every single time
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
    <div className="w-full flex flex-col bg-petrol-950 text-text-primary selection:bg-flesh-500/30 selection:text-flesh-200">
      {/* Active Ouroboros Entry Video Transition Overlay */}
      {isTransitioning && (
        <OuroborosTransition
          key={transitionKey}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* ========================================================================= */}
      {/* 1. PRE-ENTRY VIEWPORT (Pure, intimate, restrained encounter) */}
      {/* ========================================================================= */}
      {!hasEntered ? (
        <section
          aria-label="Opening Encounter"
          className="min-h-[85vh] md:min-h-[88vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 relative overflow-hidden"
        >
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 bg-radial from-petrol-900/30 via-petrol-950 to-petrol-950 pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center animate-fade-in">
            {/* Ouroboros symbol placeholder slot */}
            <div className="mb-8">
              <OuroborosMotif size="lg" interactive={true} />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-text-primary mb-6 tracking-editorial font-normal">
              YOU’RE HERE.
            </h1>

            <div className="text-base sm:text-lg text-text-muted leading-relaxed mb-10 max-w-md space-y-3 font-sans">
              <p>I don’t know what brought you here.</p>
              <p className="text-text-primary">
                But since you came this far, you might as well come inside.
              </p>
            </div>

            <button
              onClick={handleEnterClick}
              disabled={isTransitioning}
              aria-label="Enter ARZAEL"
              className="px-12 py-4 bg-petrol-900/90 border border-petrol-500/50 text-xs sm:text-sm tracking-widest uppercase text-petrol-200 hover:bg-petrol-800 hover:border-petrol-400 hover:text-white transition-all duration-300 petrol-glow font-medium focus:outline-none focus:ring-2 focus:ring-flesh-400 disabled:opacity-50 cursor-pointer"
            >
              ENTER
            </button>
          </div>
        </section>
      ) : (
        /* ========================================================================= */
        /* 2. REVEALED WORLD (Self Sabotage, Music, Quiz, Letters, Machine, Community) */
        /* ========================================================================= */
        <div ref={eraRevealRef} className="w-full animate-fade-in">
          {/* Era Hero Section */}
          <section
            aria-label="Current Era Reveal"
            className="relative min-h-[75vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 overflow-hidden border-b border-petrol-800/60"
          >
            {/* Clean, untexted background placeholder slot */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <MediaPlaceholder
                id="PLACEHOLDER_HERO_CINEMATIC"
                className="w-full h-full object-cover border-none"
              />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-flesh-400 uppercase tracking-widest bg-flesh-950/80 px-2.5 py-1 border border-flesh-800/40">
                  CURRENT ERA
                </span>
              </div>

              <h1
                ref={enterHeadingRef}
                tabIndex={-1}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl text-text-primary tracking-editorial font-normal mb-6 focus:outline-none"
              >
                SELF SABOTAGE
              </h1>

              <div className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mb-10 space-y-3 font-sans">
                <p>
                  Have you ever watched yourself ruin something while knowing exactly what you were doing?
                </p>
                <p className="text-text-primary font-medium">
                  Me too.
                </p>
                <p className="text-flesh-300 font-serif italic text-lg sm:text-xl">
                  So I made a record about it.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/self-sabotage"
                  className="px-8 py-3.5 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm tracking-widest uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center gap-2 font-medium"
                >
                  <span>ENTER SELF SABOTAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => playTrack(SELF_SABOTAGE_TRACKS[0])}
                  aria-label="Listen to Anesthesia"
                  className="px-8 py-3.5 bg-petrol-900 border border-petrol-600 text-xs sm:text-sm tracking-widest uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all duration-300 flex items-center gap-2.5 font-medium"
                >
                  <Play className="w-4 h-4 fill-current text-flesh-400" />
                  <span>LISTEN</span>
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. MUSIC & TRACK MANIFEST PREVIEW */}
          {/* ========================================================================= */}
          <section
            aria-label="Music and Tracks Preview"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-b border-petrol-800/60"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <MediaPlaceholder id="PLACEHOLDER_ALBUM_ART" title="SELF SABOTAGE" />
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-xs text-petrol-400 uppercase tracking-widest mb-2 font-mono">
                  THE RECORD
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-text-primary tracking-editorial mb-6 font-normal">
                  EVERY SONG CATCHES ME DOING IT DIFFERENTLY.
                </h2>

                <div className="divide-y divide-petrol-800/60 border-t border-b border-petrol-800/60 mb-8">
                  {SELF_SABOTAGE_TRACKS.map((track) => (
                    <div
                      key={track.id}
                      className="py-4 flex items-center justify-between group hover:bg-petrol-900/30 px-3 transition-colors"
                    >
                      <div>
                        <p className="font-serif text-base text-text-primary group-hover:text-flesh-300 transition-colors font-medium">
                          {track.title}
                        </p>
                        {track.statement && (
                          <p className="text-xs text-text-muted italic mt-0.5">
                            "{track.statement}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => playTrack(track)}
                        aria-label={`Play ${track.title}`}
                        className="p-2.5 rounded-full bg-petrol-900 border border-petrol-700 text-text-muted hover:text-flesh-400 hover:border-flesh-500 group-hover:scale-105 transition-all focus:outline-none"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>

                <Link
                  to="/self-sabotage"
                  className="text-xs text-flesh-400 hover:text-flesh-300 uppercase tracking-widest inline-flex items-center gap-2 self-start border-b border-flesh-500/40 pb-1 transition-colors"
                >
                  <span>Explore full era & tracklist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. QUIZ INVITATION — "CAN I ASK YOU SOMETHING?" */}
          {/* ========================================================================= */}
          <section
            ref={quizSectionRef}
            aria-label="Quiz Invitation"
            className="bg-petrol-900/20 border-b border-petrol-800/80 py-20 px-4 sm:px-6 lg:px-8"
          >
            {!showQuiz ? (
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
                <h2 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-normal mb-6">
                  CAN I ASK YOU SOMETHING?
                </h2>

                <div className="text-base sm:text-lg text-text-muted leading-relaxed space-y-2 mb-8 max-w-lg font-sans">
                  <p>You already know you self-sabotage.</p>
                  <p className="text-text-primary font-medium font-serif text-xl sm:text-2xl">
                    I want to know how.
                  </p>
                </div>

                <button
                  onClick={handleRevealQuiz}
                  aria-label="Find out how you self-sabotage"
                  className="px-10 py-4 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm uppercase tracking-widest text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center gap-2.5 font-medium"
                >
                  <Sparkles className="w-4 h-4 text-flesh-300" />
                  <span>FIND OUT</span>
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="max-w-2xl mx-auto mb-8 text-center">
                  <span className="text-xs text-flesh-400 uppercase tracking-widest block mb-2 font-mono">
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
              <p className="text-text-primary font-medium">
                I want somewhere quieter.
              </p>
            </div>

            <button
              onClick={openLetters}
              aria-label="Open Letters subscription modal"
              className="px-10 py-4 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm uppercase tracking-widest text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow inline-flex items-center gap-2.5 font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>LET ME WRITE TO YOU</span>
            </button>
          </section>

          {/* ========================================================================= */}
          {/* 6. THE SELF-SABOTAGE MACHINE (MODEL: SS-01) */}
          {/* ========================================================================= */}
          <div className="border-b border-petrol-800/80">
            <SelfSabotageMachine />
          </div>

          {/* ========================================================================= */}
          {/* 7. COMMUNITY CHANNELS — MEME PACK & HOUSE OF ZAELION */}
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
