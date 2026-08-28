import React, { useState, useEffect, useRef, useCallback } from 'react';
import { socialLinks } from '../../data/socialLinks';
import { ExternalLink, Flame } from 'lucide-react';

interface TikTokScrollMechanismProps {
  isActivated: boolean;
  onActivate: () => void;
  isOverloaded?: boolean;
  prefersReducedMotion?: boolean;
  className?: string;
}

const FEED_ITEMS = [
  { id: 1, tag: '01:14 AM', text: 'ONE MORE VIDEO', type: 'DOPAMINE BLIP' },
  { id: 2, tag: '02:30 AM', text: 'YOU SHOULD BE SLEEPING', type: 'IGNORED WARNING' },
  { id: 3, tag: '03:45 AM', text: '3 HOURS LOST TO THE VOID', type: 'PERMANENT LOSS' },
  { id: 4, tag: '04:10 AM', text: 'WHY ARE YOU WATCHING THIS', type: 'RABBIT HOLE' },
  { id: 5, tag: '04:59 AM', text: 'ALARM IN 2 HOURS (LOL)', type: 'REGRET' },
  { id: 6, tag: '05:00 AM', text: 'START TOMORROW AGAIN', type: 'CYCLE COMPLETE' },
];

export const TikTokScrollMechanism: React.FC<TikTokScrollMechanismProps> = ({
  isActivated,
  onActivate,
  isOverloaded = false,
  prefersReducedMotion = false,
  className = '',
}) => {
  const [leverPosition, setLeverPosition] = useState<number>(0); // 0 (up) to 1 (pulled down)
  const [scrollSpeed, setScrollSpeed] = useState<number>(1);
  const [timeLostSeconds, setTimeLostSeconds] = useState<number>(42);
  const [isDraggingLever, setIsDraggingLever] = useState<boolean>(false);
  const [isJammed, setIsJammed] = useState<boolean>(isActivated);
  const [dragStartY, setDragStartY] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const leverTrackRef = useRef<HTMLDivElement>(null);
  const scrollOffsetRef = useRef<number>(0);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Time lost counter ticker
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setTimeLostSeconds((prev) => prev + (isJammed ? 0 : Math.floor(scrollSpeed)));
    }, 1200);
    return () => clearInterval(interval);
  }, [scrollSpeed, isJammed, prefersReducedMotion]);

  // Handle continuous feed scrolling
  const updateFeedScroll = useCallback(() => {
    if (prefersReducedMotion || isJammed) return;

    const baseSpeed = isOverloaded ? 12 : scrollSpeed * 1.2;
    scrollOffsetRef.current = (scrollOffsetRef.current + baseSpeed) % 480;

    if (filmstripRef.current) {
      filmstripRef.current.style.transform = `translateY(-${scrollOffsetRef.current}px)`;
    }

    animationFrameRef.current = requestAnimationFrame(updateFeedScroll);
  }, [scrollSpeed, isJammed, isOverloaded, prefersReducedMotion]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateFeedScroll);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [updateFeedScroll]);

  // Lever interaction
  const handleLeverPull = useCallback(() => {
    setLeverPosition(1);
    setScrollSpeed(6);

    setTimeout(() => {
      setIsJammed(true);
      setLeverPosition(0.85);
      onActivate();
    }, 900);
  }, [onActivate]);

  const handlePointerDownLever = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingLever(true);
    setDragStartY(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingLever || !leverTrackRef.current) return;
    const deltaY = e.clientY - dragStartY;
    const trackHeight = leverTrackRef.current.clientHeight || 120;
    const newPos = Math.min(Math.max(deltaY / trackHeight, 0), 1);
    setLeverPosition(newPos);
    setScrollSpeed(1 + newPos * 6);

    if (newPos >= 0.8 && !isJammed) {
      handleLeverPull();
      setIsDraggingLever(false);
    }
  };

  const handlePointerUp = () => {
    if (isDraggingLever) {
      setIsDraggingLever(false);
      if (!isJammed) {
        setLeverPosition(0);
        setScrollSpeed(1);
      }
    }
  };

  const formatTimeLost = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative p-5 bg-[#051114] border border-petrol-800 rounded-sm flex flex-col justify-between select-none overflow-hidden ${
        isJammed ? 'border-flesh-500/50 flesh-glow' : 'hover:border-petrol-600'
      } ${className}`}
    >
      {/* Mechanism Header */}
      <div className="flex items-center justify-between border-b border-petrol-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              isJammed || isActivated ? 'bg-flesh-400 flesh-glow' : 'bg-petrol-700'
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            MECHANISM 01 // ENDLESS SCROLL
          </span>
        </div>
        <span className="font-mono text-[10px] text-flesh-400/80 bg-flesh-950 px-1.5 py-0.5 border border-flesh-900">
          {isJammed ? 'FEED JAMMED' : 'RUNNING'}
        </span>
      </div>

      {/* Center Zone: Feed Window + Interactive Lever */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Left: Feed Window viewport */}
        <div className="col-span-8 relative h-48 bg-[#020708] border border-petrol-900 rounded-sm overflow-hidden p-2">
          {/* Scanlines / Tape grain effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none z-10" />

          {/* Scrolling filmstrip items */}
          <div ref={filmstripRef} className="space-y-2.5">
            {[...FEED_ITEMS, ...FEED_ITEMS].map((item, idx) => (
              <div
                key={idx}
                className="p-2 bg-petrol-950/80 border border-petrol-800/60 rounded-xs text-left"
              >
                <div className="flex justify-between items-center text-[8px] font-mono text-text-dim mb-0.5">
                  <span>{item.tag}</span>
                  <span className="text-flesh-400/80">{item.type}</span>
                </div>
                <p className="font-mono text-[10px] text-text-primary tracking-tight font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Glitch Jam Banner if activated */}
          {isJammed && (
            <div className="absolute inset-0 z-20 bg-flesh-950/90 border border-flesh-500/80 p-3 flex flex-col justify-center items-center text-center animate-fade-in">
              <Flame className="w-5 h-5 text-flesh-400 mb-1 animate-bounce" />
              <p className="font-mono text-[11px] text-flesh-200 font-bold uppercase tracking-wider">
                MECHANISM OVERLOAD
              </p>
              <p className="font-mono text-[9px] text-text-muted mt-0.5">
                Feed spool caught in loop
              </p>
            </div>
          )}
        </div>

        {/* Right: Physical Lever & Time Counter */}
        <div className="col-span-4 flex flex-col items-center justify-between h-48 py-1">
          {/* Time Lost Digital Display */}
          <div className="text-center w-full bg-petrol-950 border border-petrol-800 p-1.5 rounded-xs">
            <span className="block text-[8px] font-mono text-text-dim uppercase tracking-wider">
              TIME LOST
            </span>
            <span className="font-mono text-[10px] text-flesh-300 font-bold tracking-widest">
              {formatTimeLost(timeLostSeconds)}
            </span>
          </div>

          {/* Vertical Lever Track */}
          <div
            ref={leverTrackRef}
            className="relative w-4 h-24 bg-petrol-900/60 border border-petrol-700 rounded-full flex flex-col items-center justify-start p-0.5 cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDownLever}
            title="Drag lever downward to accelerate scroll"
          >
            {/* Moving Handle Knob */}
            <div
              style={{ transform: `translateY(${leverPosition * 64}px)` }}
              className="w-5 h-5 -left-0.5 rounded-full bg-flesh-400 border border-flesh-200 shadow-md flex items-center justify-center cursor-pointer transition-transform"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-petrol-950" />
            </div>
          </div>

          {/* Accessible Lever Pull Button */}
          <button
            onClick={handleLeverPull}
            disabled={isJammed}
            aria-label="Pull TikTok mechanism scroll lever"
            className="w-full py-1 bg-petrol-900 border border-petrol-700 text-[9px] font-mono uppercase tracking-wider text-text-muted hover:text-flesh-300 hover:border-flesh-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isJammed ? 'JAMMED' : 'PULL LEVER'}
          </button>
        </div>
      </div>

      {/* Bottom Destination Reveal Zone */}
      <div className="mt-4 pt-3 border-t border-petrol-800/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-serif text-sm text-text-primary font-bold tracking-editorial block">
              {socialLinks.tiktok.platform.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-text-dim">
              {socialLinks.tiktok.handle}
            </span>
          </div>
          <span className="font-mono text-[9px] text-flesh-400 italic">
            {socialLinks.tiktok.microcopy}
          </span>
        </div>

        <a
          href={socialLinks.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLinks.tiktok.ariaLabel}
          onClick={onActivate}
          className="w-full py-2.5 bg-flesh-900/80 border border-flesh-500 hover:bg-flesh-800 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 hover:text-white transition-all flex items-center justify-center gap-1.5 font-medium cursor-pointer"
        >
          <span>{socialLinks.tiktok.cta}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
