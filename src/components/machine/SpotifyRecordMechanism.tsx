import React, { useState, useEffect, useRef, useCallback } from 'react';
import { socialLinks } from '../../data/socialLinks';
import { ExternalLink, Activity } from 'lucide-react';

interface SpotifyRecordMechanismProps {
  isActivated: boolean;
  onActivate: () => void;
  isOverloaded?: boolean;
  prefersReducedMotion?: boolean;
  className?: string;
}

export const SpotifyRecordMechanism: React.FC<SpotifyRecordMechanismProps> = ({
  isActivated,
  onActivate,
  isOverloaded = false,
  prefersReducedMotion = false,
  className = '',
}) => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [replayCount, setReplayCount] = useState<number>(47);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [armAngle, setArmAngle] = useState<number>(22); // Normal groove angle
  const [isInteracted, setIsInteracted] = useState<boolean>(isActivated);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Rotating vinyl record loop
  const animateVinyl = useCallback(() => {
    if (prefersReducedMotion) return;

    setRotationAngle((prev) => (prev + (isOverloaded ? 8 : 1.5)) % 360);
    animationFrameRef.current = requestAnimationFrame(animateVinyl);
  }, [isOverloaded, prefersReducedMotion]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animateVinyl);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animateVinyl]);

  // Replay count auto-ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setReplayCount((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Needle snap back interaction
  const handleBumpNeedle = () => {
    setIsScratching(true);
    setArmAngle(10); // Jumps off groove
    setReplayCount((prev) => prev + 1);

    setTimeout(() => {
      setArmAngle(22); // Snaps back into the groove
      setIsScratching(false);
      setIsInteracted(true);
      onActivate();
    }, 450);
  };

  const handlePointerDownVinyl = (e: React.PointerEvent) => {
    e.preventDefault();
    handleBumpNeedle();
  };

  return (
    <div
      ref={containerRef}
      className={`relative p-5 bg-[#051114] border border-petrol-800 rounded-sm flex flex-col justify-between select-none overflow-hidden ${
        isInteracted ? 'border-flesh-500/50 flesh-glow' : 'hover:border-petrol-600'
      } ${className}`}
    >
      {/* Mechanism Header */}
      <div className="flex items-center justify-between border-b border-petrol-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              isInteracted || isActivated ? 'bg-flesh-400 flesh-glow' : 'bg-petrol-700'
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            MECHANISM 03 // BROKEN RECORD
          </span>
        </div>
        <span className="font-mono text-[10px] text-flesh-400/80 bg-flesh-950 px-1.5 py-0.5 border border-flesh-900">
          {isScratching ? 'NEEDLE SKIPPED' : 'LOCKED IN GROOVE'}
        </span>
      </div>

      {/* Center Zone: Turntable Platter + Needle Arm + Oscilloscope */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Left: Turntable Platter & Needle */}
        <div
          onPointerDown={handlePointerDownVinyl}
          className="col-span-8 relative h-48 bg-[#020708] border border-petrol-900 rounded-sm overflow-hidden flex items-center justify-center cursor-pointer group"
          title="Click to bump needle or scratch record"
        >
          {/* Vinyl Disc with Grooves */}
          <div
            style={{ transform: `rotate(${rotationAngle}deg)` }}
            className={`relative w-36 h-36 rounded-full bg-[#0d1f24] border-4 border-[#061215] shadow-inner flex items-center justify-center transition-transform ${
              isScratching ? 'scale-98 ring-2 ring-flesh-400/50' : ''
            }`}
          >
            {/* Concentric Grooves */}
            <div className="w-28 h-28 rounded-full border border-petrol-800/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-petrol-800/60 flex items-center justify-center">
                {/* Center Label Badge */}
                <div className="w-12 h-12 rounded-full bg-flesh-900/80 border border-flesh-500/80 flex flex-col items-center justify-center text-[7px] font-mono text-flesh-200">
                  <span>SELF</span>
                  <span className="text-[6px] text-text-muted">SABOTAGE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tonearm & Needle Arm overlaid at top-right */}
          <div
            style={{
              transform: `rotate(${armAngle}deg)`,
              transformOrigin: 'top right',
            }}
            className="absolute top-2 right-4 w-2 h-28 bg-petrol-700/80 border-r border-petrol-500 transition-transform duration-200 pointer-events-none"
          >
            {/* Needle Cartridge Head */}
            <div className="absolute bottom-0 -left-1 w-4 h-3 bg-flesh-400 rounded-xs shadow-xs" />
          </div>

          {/* Subtle click hint */}
          <span className="absolute bottom-2 left-2 text-[8px] font-mono text-text-dim group-hover:text-flesh-400 transition-colors pointer-events-none">
            [ TAP TO BUMP NEEDLE ]
          </span>
        </div>

        {/* Right: Looping Waveform + Replay Counter */}
        <div className="col-span-4 flex flex-col justify-between h-48 py-1">
          {/* Replays Counter */}
          <div className="bg-petrol-950 border border-petrol-800 p-1.5 rounded-xs text-center">
            <span className="block text-[8px] font-mono text-text-dim uppercase tracking-wider">
              REPLAYS
            </span>
            <span className="font-mono text-xs text-flesh-300 font-bold tracking-widest">
              #{replayCount}
            </span>
          </div>

          {/* Looping Oscilloscope Visualizer */}
          <div className="bg-petrol-950 border border-petrol-900 p-2 rounded-xs flex flex-col items-center justify-center h-16 relative overflow-hidden">
            <Activity className="w-4 h-4 text-petrol-500/70 mb-1" />
            <div className="flex items-center gap-0.5 w-full justify-center">
              {[8, 14, 22, 12, 18, 26, 15, 9, 20, 14].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${isScratching ? h * 1.5 : h}px` }}
                  className="w-1 bg-flesh-400/80 rounded-full transition-all duration-75"
                />
              ))}
            </div>
          </div>

          {/* Accessible Action Button */}
          <button
            onClick={handleBumpNeedle}
            aria-label="Bump turntable needle"
            className="w-full py-1 bg-petrol-900 border border-petrol-700 text-[9px] font-mono uppercase tracking-wider text-text-muted hover:text-flesh-300 hover:border-flesh-500 transition-colors cursor-pointer"
          >
            BUMP NEEDLE
          </button>
        </div>
      </div>

      {/* Bottom Destination Reveal Zone */}
      <div className="mt-4 pt-3 border-t border-petrol-800/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-serif text-sm text-text-primary font-bold tracking-editorial block">
              {socialLinks.spotify.platform.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-text-dim">
              {socialLinks.spotify.handle}
            </span>
          </div>
          <span className="font-mono text-[9px] text-flesh-400 italic">
            {socialLinks.spotify.microcopy}
          </span>
        </div>

        <a
          href={socialLinks.spotify.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLinks.spotify.ariaLabel}
          onClick={onActivate}
          className="w-full py-2.5 bg-flesh-900/80 border border-flesh-500 hover:bg-flesh-800 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 hover:text-white transition-all flex items-center justify-center gap-1.5 font-medium cursor-pointer"
        >
          <span>{socialLinks.spotify.cta}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
