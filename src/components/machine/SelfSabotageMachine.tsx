import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TikTokScrollMechanism } from './TikTokScrollMechanism';
import { InstagramMirrorMechanism } from './InstagramMirrorMechanism';
import { SpotifyRecordMechanism } from './SpotifyRecordMechanism';
import { MachineSnake } from './MachineSnake';
import { AnalyticsEventType } from '../../types/analytics';
import { AlertTriangle, Sparkles, Gauge, Zap, RotateCcw, CheckCircle2 } from 'lucide-react';

interface SelfSabotageMachineProps {
  onAnalyticsEvent?: (event: AnalyticsEventType, properties?: Record<string, string | number | boolean | undefined>) => void;
  className?: string;
}

const MACHINE_EXCUSES = [
  "I'LL START TOMORROW.",
  "JUST 5 MORE MINUTES.",
  "IT'S DIFFERENT THIS TIME.",
  "I'M JUST TIRED.",
  "ONE LAST SCROLL.",
];

export const SelfSabotageMachine: React.FC<SelfSabotageMachineProps> = ({
  onAnalyticsEvent,
  className = '',
}) => {
  // Activated mechanisms tracker
  const [activatedMechanisms, setActivatedMechanisms] = useState<{
    tiktok: boolean;
    instagram: boolean;
    spotify: boolean;
  }>({
    tiktok: false,
    instagram: false,
    spotify: false,
  });

  // Machine state
  const [isOverloaded, setIsOverloaded] = useState<boolean>(false);
  const [hasOverloadedOnce, setHasOverloadedOnce] = useState<boolean>(false);
  const [overloadStage, setOverloadStage] = useState<number>(0); // 0 = idle, 1 = freeze/congrats, 2 = fixed nothing, 3 = do it again, 4 = restored
  const [doNotPressClicks, setDoNotPressClicks] = useState<number>(0);
  const [activeExcuseIndex, setActiveExcuseIndex] = useState<number>(0);
  const [isNearViewport, setIsNearViewport] = useState<boolean>(false);
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Viewport intersection observer (entrance sequence & performance safeguard)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          if (!hasEnteredView) {
            setHasEnteredView(true);
            onAnalyticsEvent?.('self_sabotage_machine_viewed');
          }
        } else {
          setIsNearViewport(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasEnteredView, onAnalyticsEvent]);

  // Activate mechanism handler
  const handleActivateMechanism = useCallback((platform: 'tiktok' | 'instagram' | 'spotify') => {
    setActivatedMechanisms((prev) => {
      if (prev[platform]) return prev;
      const next = { ...prev, [platform]: true };
      onAnalyticsEvent?.('machine_mechanism_activated', { platform });
      return next;
    });
  }, [onAnalyticsEvent]);

  // Compute total bad decisions count
  const badDecisionsCount = (activatedMechanisms.tiktok ? 1 : 0) +
    (activatedMechanisms.instagram ? 1 : 0) +
    (activatedMechanisms.spotify ? 1 : 0);

  // Trigger Final Overload Sequence when 3/3 reached
  useEffect(() => {
    if (badDecisionsCount === 3 && !hasOverloadedOnce) {
      setIsOverloaded(true);
      setHasOverloadedOnce(true);
      setOverloadStage(1); // CONGRATULATIONS
      onAnalyticsEvent?.('machine_overload_completed');

      const t1 = setTimeout(() => setOverloadStage(2), 800);  // YOU FIXED NOTHING.
      const t2 = setTimeout(() => setOverloadStage(3), 1800); // It’ll do it again.
      const t3 = setTimeout(() => {
        setOverloadStage(4); // Reset / Rebuild in reverse
        setIsOverloaded(false);
      }, 3000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [badDecisionsCount, hasOverloadedOnce, onAnalyticsEvent]);

  // DO NOT PRESS Button interaction
  const handleDoNotPress = () => {
    setDoNotPressClicks((prev) => prev + 1);
    setActiveExcuseIndex((prev) => (prev + 1) % MACHINE_EXCUSES.length);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="The Self-Sabotage Machine"
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 select-none transition-all ${className}`}
    >
      {/* Background Frame Envelope & Texture */}
      <div className="relative p-6 sm:p-10 lg:p-12 bg-[#030c0e] border-2 border-petrol-800 rounded-sm shadow-2xl overflow-hidden">
        {/* Subtle Ambient Scanline Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#147287_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* ========================================================================= */}
        {/* 1. MACHINE HEADER & STATUS PANEL */}
        {/* ========================================================================= */}
        <div className="relative z-10 border-b border-petrol-800/90 pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-flesh-400 uppercase tracking-widest bg-flesh-950 px-2.5 py-1 border border-flesh-800/60 font-bold">
                MODEL: SS-01
              </span>
              <span className="text-xs font-mono text-petrol-400 tracking-widest uppercase">
                [ A PERFECTLY FUNCTIONING MACHINE ]
              </span>
            </div>

            {/* Bad Decisions Progress Meter */}
            <div className="flex items-center gap-3 bg-petrol-950 px-4 py-1.5 border border-petrol-700">
              <Zap className={`w-3.5 h-3.5 ${badDecisionsCount > 0 ? 'text-flesh-400' : 'text-petrol-600'}`} />
              <span className="font-mono text-xs tracking-widest text-text-primary uppercase font-bold">
                BAD DECISIONS: {badDecisionsCount}/3
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-editorial font-normal leading-tight">
              DON’T TOUCH IT. <span className="text-flesh-300 italic block sm:inline">IT’S WORKING.</span>
            </h2>

            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans">
              It turns attention into comparison, time into scrolling, and feelings into replays.
            </p>

            <p className="text-xs sm:text-sm font-mono text-flesh-400 uppercase tracking-wider">
              Pick a way to make it worse.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CONNECTING SNAKE CIRCUIT TUBE */}
        {/* ========================================================================= */}
        <div className="relative z-10 mb-6 hidden md:block">
          <MachineSnake
            activatedCount={badDecisionsCount}
            isOverloaded={isOverloaded}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* ========================================================================= */}
        {/* 3. THREE FUNCTIONING MECHANISMS (Asymmetric Layout) */}
        {/* ========================================================================= */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          {/* Mechanism 1: TikTok Endless Scroll (Left Column) */}
          <div className="lg:col-span-4 flex flex-col">
            <TikTokScrollMechanism
              isActivated={activatedMechanisms.tiktok}
              onActivate={() => handleActivateMechanism('tiktok')}
              isOverloaded={isOverloaded}
              prefersReducedMotion={prefersReducedMotion}
              className="h-full"
            />
          </div>

          {/* Mechanism 2: Instagram Comparison Mirror (Center Column) */}
          <div className="lg:col-span-4 flex flex-col">
            <InstagramMirrorMechanism
              isActivated={activatedMechanisms.instagram}
              onActivate={() => handleActivateMechanism('instagram')}
              isOverloaded={isOverloaded}
              prefersReducedMotion={prefersReducedMotion}
              className="h-full"
            />
          </div>

          {/* Mechanism 3: Spotify Broken Record Player (Right Column) */}
          <div className="lg:col-span-4 flex flex-col">
            <SpotifyRecordMechanism
              isActivated={activatedMechanisms.spotify}
              onActivate={() => handleActivateMechanism('spotify')}
              isOverloaded={isOverloaded}
              prefersReducedMotion={prefersReducedMotion}
              className="h-full"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TEMPTING ACCESSORIES: DO NOT PRESS BUTTON & EXCUSE RECEIPT PRINTER */}
        {/* ========================================================================= */}
        <div className="relative z-10 p-5 bg-[#020709] border border-petrol-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Continuous Receipt Tape */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-flesh-500 rounded-full animate-ping" />
            <div className="font-mono text-xs text-text-muted">
              <span className="text-text-dim text-[10px] uppercase block tracking-wider">
                EXCUSE DISPENSER //
              </span>
              <span className="text-flesh-300 font-bold">
                "{MACHINE_EXCUSES[activeExcuseIndex]}"
              </span>
            </div>
          </div>

          {/* Tempting DO NOT PRESS Button */}
          <div className="flex items-center gap-4">
            {doNotPressClicks > 0 && (
              <span className="text-[10px] font-mono text-text-dim uppercase">
                (PRESSED {doNotPressClicks}X • WHY?)
              </span>
            )}

            <button
              onClick={handleDoNotPress}
              aria-label="Tempting button explicitly labeled Do Not Press"
              className="px-5 py-2.5 bg-petrol-900 border-2 border-flesh-500 text-xs font-mono tracking-widest uppercase text-flesh-300 hover:bg-flesh-900/60 hover:text-white transition-all flesh-glow active:scale-95 cursor-pointer font-bold flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-flesh-400" />
              <span>DO NOT PRESS</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. FINAL OVERLOAD NOTIFICATION OVERLAY */}
        {/* ========================================================================= */}
        {isOverloaded && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-30 bg-[#020708]/95 flex flex-col items-center justify-center p-8 text-center animate-fade-in"
          >
            <div className="max-w-xl space-y-4">
              <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase block">
                [ MACHINE STATUS: CRITICAL OVERLOAD ]
              </span>

              {overloadStage >= 1 && (
                <h3 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-bold animate-fade-in">
                  CONGRATULATIONS.
                </h3>
              )}

              {overloadStage >= 2 && (
                <p className="font-serif text-2xl sm:text-4xl text-flesh-300 tracking-editorial italic animate-fade-in">
                  YOU FIXED NOTHING.
                </p>
              )}

              {overloadStage >= 3 && (
                <p className="font-mono text-xs sm:text-sm text-text-dim tracking-wider uppercase pt-2 animate-fade-in">
                  It’ll do it again.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
