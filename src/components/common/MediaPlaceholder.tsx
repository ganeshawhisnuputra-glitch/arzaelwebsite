import React from 'react';
import { PLACEHOLDER_REGISTRY } from '../../data/placeholderRegistry';

interface MediaPlaceholderProps {
  id: string;
  className?: string;
  aspectRatioClass?: string;
  title?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  id,
  className = '',
  aspectRatioClass,
  title,
}) => {
  const spec = PLACEHOLDER_REGISTRY[id] || {
    id,
    aspectRatio: '1/1',
    label: 'SELF SABOTAGE',
  };

  const defaultAspectClass =
    spec.aspectRatio === '21/9'
      ? 'aspect-[21/9]'
      : spec.aspectRatio === '16/9'
      ? 'aspect-video'
      : spec.aspectRatio === '4/5'
      ? 'aspect-[4/5]'
      : spec.aspectRatio === '9/16'
      ? 'aspect-[9/16]'
      : 'aspect-square';

  const aspect = aspectRatioClass || defaultAspectClass;

  return (
    <div
      className={`relative w-full ${aspect} bg-petrol-900/40 border border-petrol-800/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden group select-none ${className}`}
      data-asset-slot={id}
    >
      {/* Restrained tonal background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-petrol-950 via-petrol-900/60 to-petrol-950 opacity-90" />

      {/* Subtle corner crosshairs */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-petrol-700/50" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-petrol-700/50" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-petrol-700/50" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-petrol-700/50" />

      {/* Minimal, elegant artwork frame */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xs px-4 text-center">
        <div className="w-6 h-6 rounded-full border border-flesh-500/40 mb-3 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-flesh-400" />
        </div>
        <span className="font-serif text-sm md:text-base text-text-primary tracking-editorial font-medium">
          {title || 'SELF SABOTAGE'}
        </span>
        <span className="text-[11px] text-text-muted mt-1 font-mono">
          ARZAEL
        </span>
      </div>

      {/* Subtle ambient hover */}
      <div className="absolute inset-0 bg-petrol-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
