import React from 'react';

interface MachineSnakeProps {
  activatedCount: number; // 0, 1, 2, 3
  isOverloaded?: boolean;
  prefersReducedMotion?: boolean;
  className?: string;
}

export const MachineSnake: React.FC<MachineSnakeProps> = ({
  activatedCount,
  isOverloaded = false,
  prefersReducedMotion = false,
  className = '',
}) => {
  // Stroke dashoffset calculation based on progress
  // Total path length is ~1000
  const progressRatio = Math.min(activatedCount / 3, 1);
  const strokeColor = activatedCount > 0 ? '#d97e78' : '#147287';

  return (
    <div className={`w-full pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {/* Outer glass transport tube background */}
        <path
          d="M 50 60 Q 200 10 380 60 T 700 60 T 1050 60 Q 1150 60 1150 100 Q 1150 140 600 140 Q 50 140 50 60 Z"
          stroke="#09252c"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        />

        {/* Cable internal wiring stitches */}
        <path
          d="M 50 60 Q 200 10 380 60 T 700 60 T 1050 60"
          stroke="#061a1f"
          strokeWidth="6"
          strokeDasharray="4 4"
        />

        {/* Traveling Snake body */}
        <path
          d="M 50 60 Q 200 10 380 60 T 700 60 T 1050 60 Q 1150 60 1150 100 Q 1150 140 600 140 Q 50 140 50 60 Z"
          stroke={strokeColor}
          strokeWidth={isOverloaded ? '7' : '4'}
          strokeLinecap="round"
          strokeDasharray="1200"
          strokeDashoffset={isOverloaded ? 0 : 1200 - progressRatio * 950}
          className={`transition-all duration-1000 ${
            isOverloaded && !prefersReducedMotion ? 'animate-pulse' : ''
          }`}
          style={{
            filter: activatedCount > 0 ? 'drop-shadow(0 0 8px rgba(217, 126, 120, 0.6))' : 'none',
          }}
        />

        {/* Snake Head Indicator */}
        <circle
          cx={
            progressRatio === 0
              ? 50
              : progressRatio === 1 / 3
              ? 380
              : progressRatio === 2 / 3
              ? 700
              : isOverloaded
              ? 50
              : 1050
          }
          cy={isOverloaded ? 60 : 60}
          r={isOverloaded ? '8' : '5'}
          fill="#f09f9a"
          className="transition-all duration-700 shadow-md"
        />
      </svg>
    </div>
  );
};
