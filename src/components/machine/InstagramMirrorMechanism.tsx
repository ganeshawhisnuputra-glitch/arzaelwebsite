import React, { useState, useEffect, useRef, useCallback } from 'react';
import { socialLinks } from '../../data/socialLinks';
import { ExternalLink, Eye } from 'lucide-react';

interface InstagramMirrorMechanismProps {
  isActivated: boolean;
  onActivate: () => void;
  isOverloaded?: boolean;
  prefersReducedMotion?: boolean;
  className?: string;
}

export const InstagramMirrorMechanism: React.FC<InstagramMirrorMechanismProps> = ({
  isActivated,
  onActivate,
  prefersReducedMotion = false,
  className = '',
}) => {
  const [isWiped, setIsWiped] = useState<boolean>(isActivated);
  const [eyePosition, setEyePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const totalPixelsWipedRef = useRef<number>(0);

  // Initialize condensation fog layer on canvas
  const initFogLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(10, 32, 38, 0.92)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw condensation speckles and dust grain
    ctx.fillStyle = 'rgba(217, 126, 120, 0.15)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 8 + 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Initial subtle text cue on the fog
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(217, 126, 120, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('[ WIPE CONDENSATION ]', canvas.width / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    initFogLayer();
  }, [initFogLayer]);

  // Wipe fog on pointer movement
  const handleWipeAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    // Erase fog circle
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    totalPixelsWipedRef.current += 1;
    const progress = Math.min(Math.round((totalPixelsWipedRef.current / 35) * 100), 100);

    if (progress >= 35 && !isWiped) {
      setIsWiped(true);
      onActivate();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    handleWipeAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Eye tracking calculation
    if (containerRef.current && !prefersReducedMotion) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      setEyePosition({
        x: Math.min(Math.max(deltaX * 6, -6), 6),
        y: Math.min(Math.max(deltaY * 4, -4), 4),
      });
    }

    if (isPointerDownRef.current || isHovering) {
      handleWipeAt(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  const handleCleanAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsWiped(true);
    onActivate();
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        setIsHovering(false);
      }}
      onPointerEnter={() => setIsHovering(true)}
      className={`relative p-5 bg-[#051114] border border-petrol-800 rounded-sm flex flex-col justify-between select-none overflow-hidden ${
        isWiped ? 'border-flesh-500/50 flesh-glow' : 'hover:border-petrol-600'
      } ${className}`}
    >
      {/* Mechanism Header */}
      <div className="flex items-center justify-between border-b border-petrol-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              isWiped || isActivated ? 'bg-flesh-400 flesh-glow' : 'bg-petrol-700'
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            MECHANISM 02 // COMPARISON MIRROR
          </span>
        </div>
        <span className="font-mono text-[10px] text-flesh-400/80 bg-flesh-950 px-1.5 py-0.5 border border-flesh-900">
          {isWiped ? 'REVEALED' : 'FOGGED'}
        </span>
      </div>

      {/* Center Zone: Damaged Mirror Surface + Revealed Messages + Mechanical Eye */}
      <div className="relative h-48 bg-[#02090b] border border-petrol-900 rounded-sm overflow-hidden flex items-center justify-center cursor-crosshair">
        {/* Layer 1: Underneath Mirror Thoughts & Mechanical Eye */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
          {/* Top Note */}
          <div className="flex justify-between items-start">
            <span className="font-serif italic text-xs text-flesh-300 tracking-wider">
              “THEY’RE DOING BETTER.”
            </span>
            {/* Mechanical Eye watching */}
            <div
              style={{
                transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
              }}
              className="w-7 h-7 rounded-full border border-petrol-700 bg-petrol-950 flex items-center justify-center transition-transform duration-75"
            >
              <Eye className="w-4 h-4 text-flesh-400/90" />
            </div>
          </div>

          {/* Center Subtle Question */}
          <div className="text-center">
            <span className="font-mono text-[11px] text-text-dim uppercase tracking-widest">
              COMPARE: OFF-BALANCE
            </span>
          </div>

          {/* Bottom Note */}
          <div className="text-left">
            <span className="font-serif italic text-xs text-flesh-300/90 tracking-wider">
              “YOU CHECKED AGAIN.”
            </span>
          </div>
        </div>

        {/* Layer 2: Interactive Wiping Canvas (Steam / Condensation Layer) */}
        <canvas
          ref={canvasRef}
          width={320}
          height={192}
          className="absolute inset-0 w-full h-full object-cover touch-none"
        />

        {/* Layer 3: Mirror Glass Cracks & Distortion Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="15%" y1="0%" x2="45%" y2="60%" stroke="#147287" strokeWidth="1" />
          <line x1="45%" y1="60%" x2="85%" y2="100%" stroke="#147287" strokeWidth="0.8" />
          <line x1="45%" y1="60%" x2="20%" y2="90%" stroke="#d97e78" strokeWidth="0.6" strokeDasharray="3 3" />
        </svg>

        {/* Quick Wipe Button for Keyboard/Touch Accessibility */}
        {!isWiped && (
          <button
            onClick={handleCleanAll}
            aria-label="Wipe mirror condensation clean"
            className="absolute bottom-2 right-2 px-2 py-0.5 bg-petrol-950/90 border border-petrol-700 text-[8px] font-mono uppercase tracking-wider text-text-muted hover:text-flesh-300 hover:border-flesh-500 transition-colors z-20 cursor-pointer"
          >
            WIPE MIRROR
          </button>
        )}
      </div>

      {/* Bottom Destination Reveal Zone */}
      <div className="mt-4 pt-3 border-t border-petrol-800/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-serif text-sm text-text-primary font-bold tracking-editorial block">
              {socialLinks.instagram.platform.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-text-dim">
              {socialLinks.instagram.handle}
            </span>
          </div>
          <span className="font-mono text-[9px] text-flesh-400 italic">
            {socialLinks.instagram.microcopy}
          </span>
        </div>

        <a
          href={socialLinks.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLinks.instagram.ariaLabel}
          onClick={onActivate}
          className="w-full py-2.5 bg-flesh-900/80 border border-flesh-500 hover:bg-flesh-800 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 hover:text-white transition-all flex items-center justify-center gap-1.5 font-medium cursor-pointer"
        >
          <span>{socialLinks.instagram.cta}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
