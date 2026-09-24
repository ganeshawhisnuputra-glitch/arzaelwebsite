import React from 'react';

export type EnvironmentVariant =
  | 'corridor'
  | 'hospital-ward'
  | 'hospital-hall'
  | 'archive'
  | 'watch'
  | 'shop'
  | 'letters'
  | 'about';

export interface AtmosphericBackgroundProps {
  variant?: EnvironmentVariant;
  className?: string;
  isHero?: boolean;
  overlayOpacity?: 'light' | 'medium' | 'deep' | 'heavy';
}

const ENVIRONMENT_IMAGES: Record<EnvironmentVariant, string> = {
  corridor: '/assets/environments/corridor.jpg',
  'hospital-ward': '/assets/environments/hospital-ward.jpg',
  'hospital-hall': '/assets/environments/hospital-hall.jpg',
  archive: '/assets/environments/corridor.jpg',
  watch: '/assets/environments/hospital-ward.jpg',
  shop: '/assets/environments/hospital-hall.jpg',
  letters: '/assets/environments/hospital-ward.jpg',
  about: '/assets/environments/corridor.jpg',
};

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({
  variant = 'corridor',
  className = '',
  isHero = false,
}) => {
  const imgSrc = ENVIRONMENT_IMAGES[variant] || ENVIRONMENT_IMAGES.corridor;

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* 1. Base deep petrol void */}
      <div className="absolute inset-0 bg-[#041D1E]" />

      {/* 2. Real Visible Hospital Corridor Photography */}
      <div
        style={{
          backgroundImage: `url('${imgSrc}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className={`absolute inset-0 ${
          isHero ? 'opacity-85' : 'opacity-40'
        } filter contrast-120 brightness-105 saturate-90 motion-safe:animate-ambient-drift transition-opacity duration-700`}
      />

      {/* 3. Cinematic Petrol-Teal Color-Grade Layer */}
      <div className="absolute inset-0 bg-[#0D5659]/30 mix-blend-color" />

      {/* 4. Left-to-Right Contrast Vignette: dark on left for text legibility, open & clear on right for corridor visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041D1E]/95 via-[#041D1E]/60 to-[#041D1E]/15" />
      
      {/* 5. Top & Bottom atmospheric falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041D1E]/60 via-transparent to-[#041D1E]/90" />

      {/* 6. Distant Light Ambient Pulsing Glow in the hallway center */}
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#1FA6AC]/20 rounded-full blur-3xl animate-pulse-subtle pointer-events-none" />
    </div>
  );
};
