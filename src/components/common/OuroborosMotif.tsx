import React, { useState } from 'react';

interface OuroborosMotifProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  interactive?: boolean;
  className?: string;
}

export const OuroborosMotif: React.FC<OuroborosMotifProps> = ({
  size = 'md',
  interactive = true,
  className = '',
}) => {
  const [touchCount, setTouchCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    hero: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  const discoveryMicrocopy = [
    'Why did you touch it?',
    'Seriously?',
    'Fine. It likes you.',
    'You’ve been here before.',
    'And yet you do it again.',
    'Recognize the pattern?',
  ];

  const handleInteraction = () => {
    if (!interactive) return;
    setTouchCount((prev) => prev + 1);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2800);
  };

  const currentMessage =
    touchCount > 0
      ? discoveryMicrocopy[(touchCount - 1) % discoveryMicrocopy.length]
      : '';

  return (
    <div
      data-ouroboros-slot="ouroboros-symbol-placeholder"
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
    >
      <div
        role={interactive ? 'button' : 'img'}
        aria-label="Ouroboros emblem"
        tabIndex={interactive ? 0 : -1}
        onClick={handleInteraction}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInteraction()}
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-flesh-400 group`}
      >
        {/* Restrained static Ouroboros SVG Emblem (No dizzying spinner) */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(20,114,135,0.3)] transition-opacity duration-300 group-hover:opacity-90"
        >
          {/* Base cyclical serpent body */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#0a2228"
            strokeWidth="3.5"
          />
          {/* Defined serpent stroke transitioning into flesh accent */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#ouroboros-static-gradient)"
            strokeWidth="3.5"
            strokeDasharray="210 40"
            strokeLinecap="round"
          />
          {/* Serpent Head / Eye Detail */}
          <circle cx="50" cy="10" r="3" fill="#d97e78" />
          <circle cx="50" cy="10" r="1" fill="#030c0e" />

          <defs>
            <linearGradient id="ouroboros-static-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97e78" />
              <stop offset="40%" stopColor="#147287" />
              <stop offset="100%" stopColor="#0c282f" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Void */}
        <div className="absolute w-2 h-2 rounded-full bg-petrol-800/80 group-hover:bg-flesh-500/60 transition-colors pointer-events-none" />
      </div>

      {/* Discovery microcopy popup */}
      {interactive && showTooltip && (
        <div
          role="status"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-petrol-900 border border-flesh-500/40 text-flesh-300 font-mono text-[10px] tracking-wider uppercase animate-fade-in pointer-events-none z-30 shadow-lg"
        >
          {currentMessage}
        </div>
      )}
    </div>
  );
};
