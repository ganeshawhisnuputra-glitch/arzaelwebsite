import React from 'react';

export type EnvironmentVariant =
  | 'corridor'
  | 'hospital-ward'
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

// All variants map to approved ARZAEL-only assets.
// 'shop' uses no image — CSS-only deep petrol texture until real shop imagery is supplied.
const ENVIRONMENT_IMAGES: Record<EnvironmentVariant, string | null> = {
  corridor: '/assets/environments/corridor.jpg',
  'hospital-ward': '/assets/environments/hospital-ward.jpg',
  archive: '/assets/environments/corridor.jpg',
  watch: '/assets/environments/hospital-ward.jpg',
  shop: null, // CSS-only — no image asset
  letters: '/assets/environments/hospital-ward.jpg',
  about: '/assets/environments/corridor.jpg',
};

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({
  variant = 'corridor',
  className = '',
  isHero = false,
}) => {
  const imgSrc = ENVIRONMENT_IMAGES[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* 1. Base deep petrol void */}
      <div className="absolute inset-0 bg-[#041D1E]" />

      {/* 2. Photography layer (only if variant has an approved image) */}
      {imgSrc && (
        <div
          style={{
            backgroundImage: `url('${imgSrc}')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className={`absolute inset-0 ${
            isHero ? 'opacity-70' : 'opacity-30'
          } transition-opacity duration-700`}
        />
      )}

      {/* 2b. CSS-only texture for shop variant */}
      {!imgSrc && (
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0D5659_1px,transparent_1px)] [background-size:20px_20px]" />
      )}

      {/* 3. Cinematic Petrol-Teal Color-Grade Layer */}
      <div className="absolute inset-0 bg-[#0D5659]/25 mix-blend-color" />

      {/* 4. Top & Bottom atmospheric falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041D1E]/50 via-transparent to-[#041D1E]/80" />
    </div>
  );
};
