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
    <div className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden ${className}`}>
      {/* 1. Deep Blue-Black Petrol Void base */}
      <div className="absolute inset-0 bg-[#041D1E]" />

      {/* 2. Real Visible Environmental Photography with gentle 20s drift */}
      <div
        style={{
          backgroundImage: `url('${imgSrc}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className={`absolute inset-0 ${
          isHero ? 'opacity-80 sm:opacity-90' : 'opacity-45 sm:opacity-55'
        } filter contrast-115 brightness-95 motion-safe:animate-ambient-drift transition-opacity duration-1000`}
      />

      {/* 3. Cinematic Petrol-Teal Color-Grade Layer */}
      <div className="absolute inset-0 bg-[#0D5659]/30 mix-blend-color" />

      {/* 4. Left-to-right reading gradient + Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041D1E]/95 via-[#041D1E]/65 to-[#041D1E]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041D1E] via-transparent to-[#041D1E]/75" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_70%_45%,transparent_25%,rgba(4,29,30,0.85)_100%)]" />

      {/* 5. Restrained Distant Light Ambient Breathing */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#1FA6AC]/15 rounded-full blur-3xl animate-pulse-subtle pointer-events-none" />
    </div>
  );
};
