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

interface AtmosphericBackgroundProps {
  variant?: EnvironmentVariant;
  className?: string;
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

const OVERLAY_CLASSES: Record<string, string> = {
  light: 'bg-petrol-950/70',
  medium: 'bg-petrol-950/80',
  deep: 'bg-petrol-950/88',
  heavy: 'bg-petrol-950/94',
};

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({
  variant = 'corridor',
  className = '',
  overlayOpacity = 'deep',
}) => {
  const imgSrc = ENVIRONMENT_IMAGES[variant] || ENVIRONMENT_IMAGES.corridor;

  return (
    <div className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden ${className}`}>
      {/* 1. Base dark void */}
      <div className="absolute inset-0 bg-[#020708]" />

      {/* 2. Color-graded environmental imagery with subtle ambient drift */}
      <div
        style={{
          backgroundImage: `url('${imgSrc}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="absolute inset-0 opacity-25 mix-blend-luminosity filter contrast-125 brightness-75 scale-105 motion-safe:animate-ambient-drift"
      />

      {/* 3. Deep petrol-teal color grading tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031114]/90 via-[#04191e]/85 to-[#020708]/95 mix-blend-multiply" />

      {/* 4. Atmospheric Vignette & Contrast Guard */}
      <div
        className={`absolute inset-0 ${OVERLAY_CLASSES[overlayOpacity]} [background:radial-gradient(circle_at_center,transparent_0%,#020708_85%)]`}
      />
    </div>
  );
};
