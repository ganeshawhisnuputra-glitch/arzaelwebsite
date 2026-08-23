import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Download, Share2, ArrowLeft, Check, Sparkles } from 'lucide-react';

export const LifeSteviaPage: React.FC = () => {
  // Intro overlay state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [introStage, setIntroStage] = useState<number>(0);

  // Name editing state
  const [name, setName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [prevName, setPrevName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const posterContainerRef = useRef<HTMLDivElement>(null);

  // Intro sequential animation timer
  useEffect(() => {
    if (!showIntro) return;

    const t1 = setTimeout(() => setIntroStage(1), 300);   // "TIME TO TELL YOUR"
    const t2 = setTimeout(() => setIntroStage(2), 1200);  // "LIFE STEVIA"
    const t3 = setTimeout(() => setIntroStage(3), 2100);  // "YOU LOVE THEM."
    const t4 = setTimeout(() => {
      setShowIntro(false);
    }, 3600); // Transition to editor

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowIntro(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showIntro]);

  // Direct Inline Editing handlers
  const handleStartEdit = () => {
    setPrevName(name);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  };

  const handleFinishEdit = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setName(prevName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFinishEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Helper to show transient toast feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Formatted display text
  const displayName = name.trim() ? name.trim().toUpperCase() : 'NAME';
  const displayWithParentheses = `(${displayName})`;

  // Calculate dynamic font scale percentage for long names
  const getScaleFactor = (str: string) => {
    const len = str.length;
    if (len <= 7) return 1;
    if (len <= 12) return 0.85;
    if (len <= 16) return 0.70;
    if (len <= 20) return 0.58;
    return 0.48;
  };

  const currentScale = getScaleFactor(displayName);

  // Generate 1080x1920 high-resolution Canvas Blob
  const generatePosterBlob = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/assets/self-sabotage/life-stevia-poster.png';

      img.onload = () => {
        // 1. Draw base 1080x1920 poster
        ctx.drawImage(img, 0, 0, 1080, 1920);

        // 2. Cover original (NAME) area with exact sampled background color #063F47
        ctx.fillStyle = '#063F47';
        ctx.fillRect(180, 1060, 720, 150);

        // 3. Draw customized dynamic (NAME)
        const baseFontSize = 91;
        const fontSize = Math.round(baseFontSize * currentScale);

        ctx.font = `900 ${fontSize}px "Inter", "Montserrat", system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = '#B85565';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Precise vertical center at Y=1133
        ctx.fillText(displayWithParentheses, 540, 1133);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate image blob'));
          }
        }, 'image/png');
      };

      img.onerror = () => {
        reject(new Error('Failed to load poster template'));
      };
    });
  }, [currentScale, displayWithParentheses]);

  // Download Handler
  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const blob = await generatePosterBlob();
      const url = URL.createObjectURL(blob);
      const filename = `running-out-of-${displayName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-arzael.png`;

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Poster downloaded successfully.');
    } catch (err) {
      console.error('[ARZAEL] Download failed:', err);
      showToast('Download failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Share Handler
  const handleShare = async () => {
    try {
      setIsGenerating(true);
      const blob = await generatePosterBlob();
      const filename = `running-out-of-${displayName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-arzael.png`;
      const file = new File([blob], filename, { type: 'image/png' });
      const shareText = "I’m running out of my Life Stevia.";

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'ARZAEL — Life Stevia',
          text: shareText,
          files: [file],
        });
      } else {
        // Fallback: download image and copy text
        await handleDownload();
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          showToast('Poster saved & share text copied to clipboard.');
        }
      }
    } catch (err: unknown) {
      // User cancelled share dialog - silently handle without error
      if (err instanceof Error && err.name !== 'AbortError') {
        console.warn('[ARZAEL] Share action note:', err);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col bg-petrol-950 text-text-primary selection:bg-flesh-500/30 selection:text-flesh-200">
      {/* ========================================================================= */}
      {/* 1. ANIMATED INTRO OVERLAY */}
      {/* ========================================================================= */}
      {showIntro && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Opening message"
          className="fixed inset-0 z-50 bg-[#020708] flex flex-col items-center justify-center p-6 text-center animate-fade-in"
        >
          {/* Skip Button */}
          <button
            onClick={() => setShowIntro(false)}
            aria-label="Skip introduction"
            className="absolute top-6 right-6 px-3.5 py-1.5 bg-petrol-950/80 border border-petrol-700/60 text-[11px] font-mono tracking-widest uppercase text-text-muted hover:text-text-primary hover:border-flesh-400 focus:outline-none focus:ring-1 focus:ring-flesh-400 transition-colors cursor-pointer"
          >
            SKIP [ESC]
          </button>

          {/* Sequential Typographic Reveal */}
          <div className="max-w-xl space-y-4 select-none">
            <p
              className={`font-mono text-xs sm:text-sm text-text-muted tracking-widest-artist uppercase transition-all duration-700 ${
                introStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              TIME TO TELL YOUR
            </p>

            <h1
              className={`font-serif text-4xl sm:text-6xl md:text-7xl text-flesh-300 tracking-editorial font-bold transition-all duration-700 drop-shadow-[0_0_25px_rgba(217,126,120,0.3)] ${
                introStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              LIFE STEVIA
            </h1>

            <p
              className={`font-serif text-xl sm:text-2xl text-text-primary tracking-editorial italic transition-all duration-700 ${
                introStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              YOU LOVE THEM.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. POSTER EDITOR & WORKSPACE */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Back navigation */}
        <Link
          to="/self-sabotage"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted hover:text-flesh-300 uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO SELF SABOTAGE</span>
        </Link>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive 9:16 Poster Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              ref={posterContainerRef}
              className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] aspect-[9/16] bg-[#063F47] rounded-sm overflow-hidden shadow-2xl border border-petrol-700/60 group select-none"
            >
              {/* Base locked visual poster */}
              <img
                src="/assets/self-sabotage/life-stevia-poster.png"
                alt="ARZAEL Life Stevia Poster Template"
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Dynamic (NAME) Patch & Editable Hotspot */}
              <div
                style={{
                  top: '56.6%',
                  left: '16%',
                  width: '68%',
                  height: '7.8%',
                }}
                onClick={handleStartEdit}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStartEdit()}
                aria-label="Directly edit person's name on poster"
                className="absolute flex items-center justify-center bg-[#063F47] cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-flesh-400 group/hotspot rounded-sm"
              >
                {!isEditing ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Live styled name text */}
                    <span
                      style={{
                        color: '#B85565',
                        fontSize: `calc(clamp(14px, 4.2vw, 24px) * ${currentScale})`,
                        fontWeight: 900,
                        letterSpacing: '0.02em',
                      }}
                      className="font-sans text-center truncate leading-none transition-all"
                    >
                      {displayWithParentheses}
                    </span>

                    {/* Subtle interactive hover cue (not included in download) */}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/hotspot:opacity-100 transition-opacity bg-petrol-900/90 border border-flesh-500/40 text-[9px] font-mono text-flesh-300 px-1.5 py-0.5 whitespace-nowrap pointer-events-none uppercase tracking-wider">
                      TAP TO EDIT NAME
                    </span>
                  </div>
                ) : (
                  /* Active inline text input */
                  <div className="w-full h-full flex items-center justify-center px-1">
                    <span
                      style={{
                        color: '#B85565',
                        fontSize: `calc(clamp(14px, 4.2vw, 24px) * ${currentScale})`,
                        fontWeight: 900,
                      }}
                      className="font-sans leading-none mr-0.5"
                    >
                      (
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      maxLength={24}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={handleFinishEdit}
                      onKeyDown={handleKeyDown}
                      placeholder="NAME"
                      style={{
                        color: '#B85565',
                        fontSize: `calc(clamp(14px, 4.2vw, 24px) * ${currentScale})`,
                        fontWeight: 900,
                      }}
                      className="w-full bg-transparent text-center uppercase focus:outline-none border-b border-flesh-400/80 font-sans tracking-wide p-0 m-0"
                    />
                    <span
                      style={{
                        color: '#B85565',
                        fontSize: `calc(clamp(14px, 4.2vw, 24px) * ${currentScale})`,
                        fontWeight: 900,
                      }}
                      className="font-sans leading-none ml-0.5"
                    >
                      )
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tap instruction hint on mobile */}
            <p className="text-[11px] font-mono text-text-dim mt-3 flex items-center gap-1.5 lg:hidden">
              <Sparkles className="w-3.5 h-3.5 text-flesh-400" />
              <span>Tap the name on the poster to customize</span>
            </p>
          </div>

          {/* Right Column: Exact Supporting Copy & Action Controls */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div>
              <span className="text-xs text-flesh-400 tracking-widest uppercase bg-flesh-950/80 px-2.5 py-1 border border-flesh-800/40 font-mono inline-block mb-3">
                SELF SABOTAGE ARTIFACT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-normal mb-4">
                LIFE STEVIA
              </h2>
            </div>

            {/* Exact Required Copy */}
            <div className="space-y-3 text-base sm:text-lg text-text-muted leading-relaxed font-sans border-l-2 border-flesh-500/50 pl-4">
              <p className="text-text-primary font-medium">
                The person who keeps loving you anyway.
              </p>
              <p className="italic text-text-muted">
                Type their name before you run out of them.
              </p>
            </div>

            {/* Current Person Badge & Quick Edit Button */}
            <div className="p-4 bg-petrol-900/60 border border-petrol-800 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider block">
                  DEDICATED TO:
                </span>
                <span className="font-serif text-lg text-flesh-300 font-medium">
                  {displayName}
                </span>
              </div>
              <button
                onClick={handleStartEdit}
                className="px-3.5 py-1.5 bg-petrol-800 border border-petrol-600 hover:border-flesh-400 text-xs font-mono uppercase tracking-wider text-text-primary transition-colors"
              >
                EDIT NAME
              </button>
            </div>

            {/* Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="px-8 py-4 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center justify-center gap-2.5 font-medium disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'GENERATING...' : 'DOWNLOAD POSTER'}</span>
              </button>

              <button
                onClick={handleShare}
                disabled={isGenerating}
                className="px-8 py-4 bg-petrol-900 border border-petrol-600 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 font-medium disabled:opacity-50 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-flesh-400" />
                <span>SHARE</span>
              </button>
            </div>

            {/* Feedback Toast Notification */}
            {toastMessage && (
              <div className="p-3 bg-flesh-950 border border-flesh-500 text-flesh-200 text-xs font-mono tracking-wider flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-flesh-400 shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}

            <div className="pt-4 border-t border-petrol-800/60 text-[11px] font-mono text-text-dim space-y-1">
              <p>HIGH RESOLUTION EXPORT • 1080 × 1920 PX</p>
              <p className="text-petrol-400/70">OFFICIAL SELF SABOTAGE ARTIFACT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
