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
    <div className="w-full flex flex-col text-beige-100 selection:bg-flesh-500/30 selection:text-beige-100 relative min-h-screen">
      {/* Active Ouroboros Entry Video Transition Overlay */}
      {isTransitioning && (
        <OuroborosTransition
          key={transitionKey}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Atmospheric Full-Bleed Hospital Corridor Backdrop (Visible, Graded in Petrol Teal) */}
      <AtmosphericBackground variant="corridor" isHero={true} />

      {/* ========================================================================= */}
      {/* 1. PRE-ENTRY VIEWPORT (Intimate opening encounter) */}
      {/* ========================================================================= */}
      {!hasEntered ? (
        <section
          aria-label="Opening Encounter"
          className="min-h-[88vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center animate-fade-in space-y-6">
            {/* Authentic cracked ouroboros artwork */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-2 group">
              <img
                src="/assets/brand/ouroboros-cracked.png"
                alt="ARZAEL Ouroboros"
                className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(217,135,141,0.3)] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-beige-100 tracking-editorial font-normal">
              YOU’RE HERE.
            </h1>

            <div className="text-base sm:text-lg text-beige-100/80 leading-relaxed max-w-md space-y-2 font-sans">
              <p>I don’t know what brought you here.</p>
              <p className="text-flesh-500 font-serif italic text-xl">
                But since you came this far, you might as well come inside.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleEnterClick}
                disabled={isTransitioning}
                aria-label="Enter ARZAEL"
                className="px-12 py-4 bg-[#0D5659] border-2 border-flesh-500 text-sm font-sans tracking-widest uppercase text-beige-100 hover:bg-flesh-500 hover:text-[#041D1E] transition-all duration-300 flesh-glow font-bold rounded-xs focus:outline-none focus:ring-2 focus:ring-flesh-500 disabled:opacity-50 cursor-pointer"
              >
                ENTER
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* ========================================================================= */
        /* 2. REVEALED ALBUM WORLD (Corridor, Hand-painted Typography, Notes, Portals) */
        /* ========================================================================= */
        <div ref={eraRevealRef} className="w-full animate-fade-in">
          {/* Spatial Hero Entrance Section */}
          <section
            aria-label="Self Sabotage Hero"
            className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-24 sm:py-32 overflow-hidden border-b border-[#0D5659]/50"
          >
            <div className="relative z-10 max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Hand-Painted Display Title & Emotional Copy */}
              <div className="lg:col-span-8 space-y-8">
                {/* Era Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#072C2E]/90 border border-flesh-500/40 text-xs font-sans tracking-widest text-flesh-500 uppercase rounded-xs">
                  <span className="font-semibold">CLINICAL ADMISSION</span>
                  <span className="text-beige-100/40">•</span>
                  <span>RECORD 01</span>
                </div>

                {/* Hand-painted display title */}
                <div className="space-y-1">
                  <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-beige-100 tracking-wide leading-none select-none drop-shadow-[0_4px_24px_rgba(4,29,30,0.8)]">
                    SELF SABOTAGE
                  </h1>
                </div>

                {/* Intimate Album Manifesto in High-Contrast Serif */}
                <div className="text-lg sm:text-2xl text-beige-100/90 leading-relaxed max-w-2xl space-y-3 font-serif">
                  <p>
                    Have you ever watched yourself ruin something while knowing exactly what you were doing?
                  </p>
                  <p className="italic text-2xl sm:text-3xl text-flesh-500 font-medium">
                    Me too. So I made a record about it.
                  </p>
                </div>

                {/* Physical Action Buttons */}
                <div className="flex flex-wrap items-center gap-5 pt-4">
                  <Link
                    to="/self-sabotage"
                    className="px-8 py-4 bg-flesh-500 border border-flesh-500 text-xs sm:text-sm font-sans tracking-widest uppercase text-[#041D1E] hover:bg-beige-50 hover:text-[#041D1E] transition-all duration-300 flex items-center gap-2.5 font-bold rounded-xs shadow-lg"
                  >
                    <span>EXPLORE THE CORRIDOR</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => playTrack(SELF_SABOTAGE_TRACKS[0])}
                    aria-label="Listen to Anesthesia"
                    className="px-8 py-4 bg-[#072C2E]/90 border border-[#0D5659] text-xs sm:text-sm font-sans tracking-widest uppercase text-beige-100 hover:bg-[#0D5659] hover:border-flesh-500 transition-all duration-300 flex items-center gap-2.5 font-semibold rounded-xs cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current text-flesh-500" />
                    <span>LISTEN: ANESTHESIA</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Physical Pinned Campaign Artifact */}
              <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center">
                <div className="relative w-64 p-4 bg-[#FAF6EE] text-[#041D1E] shadow-2xl rounded-xs -rotate-2 hover:rotate-0 transition-transform duration-500 border border-[#DACBA3]">
                  {/* Pinned tape effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#E8DCBF]/80 backdrop-blur-xs border border-[#C5B383] -rotate-1 shadow-xs" />

                  <img
                    src="/assets/brand/self-sabotage-title.png"
                    alt="Self Sabotage Pinned Graphic"
                    className="w-full h-auto object-contain filter contrast-125 mb-3"
                  />

                  <div className="border-t border-[#041D1E]/20 pt-2 flex justify-between items-center text-[10px] font-sans text-[#041D1E]/70 uppercase tracking-wider font-semibold">
                    <span>EVIDENCE DOSSIER</span>
                    <span>OCT 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. TRACK MANIFEST (Clinical Evidence & Intimate Confessions) */}
          {/* ========================================================================= */}
          <section
            aria-label="Track Manifest"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-b border-[#0D5659]/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Broken Monogram Mark */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-square bg-[#072C2E]/80 border border-[#0D5659] rounded-sm p-8 flex items-center justify-center shadow-2xl overflow-hidden group">
                  <img
                    src="/assets/brand/broken-a.png"
                    alt="ARZAEL Damaged Monogram"
                    className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_0_25px_rgba(217,135,141,0.25)] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-sans text-beige-100/60 uppercase tracking-widest">
                    <span>EVIDENCE NO. 01</span>
                    <span className="text-flesh-500">SELF-INFLICTED</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Manifest Tracks */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="font-sans text-xs text-flesh-500 tracking-widest uppercase block font-semibold">
                    CASE FILES
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl text-beige-100 tracking-editorial font-normal">
                    EVERY SONG CATCHES ME DOING IT DIFFERENTLY.
                  </h2>
                </div>

                <div className="divide-y divide-[#0D5659]/60 border-t border-b border-[#0D5659]/60">
                  {SELF_SABOTAGE_TRACKS.map((track, idx) => (
                    <div
                      key={track.id}
                      className="py-4 px-3 flex items-center justify-between group hover:bg-[#072C2E]/60 transition-colors rounded-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-xs text-flesh-500 font-bold">
                            0{idx + 1}
                          </span>
                          <p className="font-serif text-lg sm:text-xl text-beige-100 group-hover:text-flesh-500 transition-colors font-medium">
                            {track.title}
                          </p>
                        </div>
                        {track.statement && (
                          <p className="text-sm text-beige-100/70 italic pl-7 font-serif">
                            “{track.statement}”
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => playTrack(track)}
                        aria-label={`Play ${track.title}`}
                        className="p-3 rounded-full bg-[#041D1E] border border-[#0D5659] text-beige-100/80 hover:text-flesh-500 hover:border-flesh-500 transition-all focus:outline-none cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>

                <Link
                  to="/self-sabotage"
                  className="text-xs font-sans text-flesh-500 hover:text-beige-100 uppercase tracking-widest inline-flex items-center gap-2 self-start transition-colors pt-2 font-semibold"
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
            className="bg-[#072C2E]/70 border-b border-[#0D5659]/60 py-20 px-4 sm:px-6 lg:px-8"
          >
            {!showQuiz ? (
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center space-y-6">
                <span className="font-sans text-xs text-flesh-500 tracking-widest uppercase block font-semibold">
                  PSYCHOLOGICAL ASSESSMENT
                </span>

                <h2 className="font-serif text-3xl sm:text-5xl text-beige-100 tracking-editorial font-normal">
                  CAN I ASK YOU SOMETHING?
                </h2>

                <div className="text-base sm:text-lg text-beige-100/80 leading-relaxed space-y-2 max-w-lg font-sans">
                  <p>You already know you self-sabotage.</p>
                  <p className="text-flesh-500 font-serif italic text-2xl font-medium">
                    I want to know how.
                  </p>
                </div>

                <button
                  onClick={handleRevealQuiz}
                  aria-label="Find out how you self-sabotage"
                  className="px-10 py-4 bg-flesh-500 border border-flesh-500 text-xs sm:text-sm font-sans uppercase tracking-widest text-[#041D1E] hover:bg-beige-50 hover:text-[#041D1E] transition-all duration-300 flesh-glow flex items-center gap-2.5 font-bold rounded-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#041D1E]" />
                  <span>FIND OUT</span>
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="max-w-2xl mx-auto mb-8 text-center space-y-2">
                  <span className="text-xs text-flesh-500 uppercase tracking-widest block font-sans font-semibold">
                    CAN I ASK YOU SOMETHING?
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-beige-100">
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
            className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-24 text-center border-b border-[#0D5659]/50 space-y-6"
          >
            <span className="font-sans text-xs text-flesh-500 tracking-widest uppercase block font-semibold">
              DIRECT CORRESPONDENCE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-beige-100 tracking-editorial font-normal">
              CAN I WRITE TO YOU?
            </h2>

            <div className="max-w-lg mx-auto text-base sm:text-lg text-beige-100/80 leading-relaxed space-y-3 font-sans">
              <p>
                Social media feels like talking in a room where everyone is screaming.
              </p>
              <p className="text-flesh-500 font-serif italic text-2xl">
                I want somewhere quieter.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={openLetters}
                aria-label="Open Letters subscription modal"
                className="px-10 py-4 bg-[#072C2E] border border-flesh-500 text-xs sm:text-sm font-sans uppercase tracking-widest text-flesh-500 hover:bg-flesh-500 hover:text-[#041D1E] transition-all duration-300 flesh-glow inline-flex items-center gap-2.5 font-bold rounded-xs cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>LET ME WRITE TO YOU</span>
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. THE PLACES I GO TO AVOID MYSELF (Spatial Portals to Socials) */}
          {/* ========================================================================= */}
          <div className="border-b border-[#0D5659]/50">
            <AvoidMyselfSection />
          </div>

          {/* ========================================================================= */}
          {/* 7. SANCTUARY & COMMUNITY — MEME PACK & HOUSE OF ZAELION */}
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
