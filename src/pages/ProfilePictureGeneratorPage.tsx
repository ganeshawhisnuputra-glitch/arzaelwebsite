import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Download, ArrowLeft, ArrowRight, RotateCcw, Image as ImageIcon, ZoomIn, ZoomOut, Sparkles, Check } from 'lucide-react';
import { MASTER_FRAME_VARIANT } from '../data/profileFrameConfig';

export const ProfilePictureGeneratorPage: React.FC = () => {
  // Uploaded image state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [frameImg, setFrameImg] = useState<HTMLImageElement | null>(null);
  const [baseFrameImg, setBaseFrameImg] = useState<HTMLImageElement | null>(null);

  // Transform / crop state
  const [zoom, setZoom] = useState<number>(1.0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // UI state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load master frame assets once
  useEffect(() => {
    const cutout = new Image();
    cutout.crossOrigin = 'anonymous';
    cutout.src = MASTER_FRAME_VARIANT.frameSrc;
    cutout.onload = () => setFrameImg(cutout);

    const base = new Image();
    base.crossOrigin = 'anonymous';
    base.src = MASTER_FRAME_VARIANT.baseFrameSrc;
    base.onload = () => setBaseFrameImg(base);
  }, []);

  // Cleanup object URLs when imageSrc changes or unmounts
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a JPG, PNG, or WebP photograph.');
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Image size is too large (maximum 15MB).');
      return;
    }

    if (imageSrc && imageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(imageSrc);
    }

    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageObj(img);
      setZoom(1.0);
      setOffset({ x: 0, y: 0 });
    };
    img.onerror = () => {
      setErrorMessage('Could not decode the photograph. Please try another image.');
    };
    img.src = objectUrl;

    // Reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  const handleResetCrop = () => {
    setZoom(1.0);
    setOffset({ x: 0, y: 0 });
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageObj) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageObj) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imageObj || e.touches.length === 0) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !imageObj || e.touches.length === 0) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Helper toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Master Canvas Composite Renderer
  const drawCompositeToContext = useCallback((
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const scaleFactor = width / 1080;
    const { cx, cy, radius } = MASTER_FRAME_VARIANT.cutout;

    const scaledCx = cx * scaleFactor;
    const scaledCy = cy * scaleFactor;
    const scaledRadius = radius * scaleFactor;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw photo layer clipped to central ouroboros cutout
    if (imageObj) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(scaledCx, scaledCy, scaledRadius, 0, Math.PI * 2);
      ctx.clip();

      // Calculate photo sizing to cover the circle diameter
      const diameter = scaledRadius * 2;
      const baseScale = Math.max(diameter / imageObj.width, diameter / imageObj.height);
      const activeScale = baseScale * zoom;

      const drawW = imageObj.width * activeScale;
      const drawH = imageObj.height * activeScale;

      const drawX = scaledCx - drawW / 2 + offset.x * scaleFactor;
      const drawY = scaledCy - drawH / 2 + offset.y * scaleFactor;

      ctx.drawImage(imageObj, drawX, drawY, drawW, drawH);
      ctx.restore();

      // 2. Draw transparent frame cutout on top so snake scales sit naturally over photo edges
      if (frameImg) {
        ctx.drawImage(frameImg, 0, 0, width, height);
      }
    } else {
      // If no photo uploaded yet, draw the base master artwork with placeholder
      if (baseFrameImg) {
        ctx.drawImage(baseFrameImg, 0, 0, width, height);
      } else if (frameImg) {
        ctx.drawImage(frameImg, 0, 0, width, height);
      }
    }
  }, [imageObj, frameImg, baseFrameImg, zoom, offset]);

  // Update live interactive canvas preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawCompositeToContext(ctx, canvas.width, canvas.height);
  }, [drawCompositeToContext]);

  // Update circular avatar preview
  useEffect(() => {
    const circleCanvas = circleCanvasRef.current;
    if (!circleCanvas) return;
    const ctx = circleCanvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.arc(circleCanvas.width / 2, circleCanvas.height / 2, circleCanvas.width / 2, 0, Math.PI * 2);
    ctx.clip();

    drawCompositeToContext(ctx, circleCanvas.width, circleCanvas.height);
    ctx.restore();
  }, [drawCompositeToContext]);

  // Download High-Resolution 1080x1080 PNG
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 1080;
      exportCanvas.height = 1080;
      const ctx = exportCanvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context unavailable');
      }

      drawCompositeToContext(ctx, 1080, 1080);

      exportCanvas.toBlob((blob) => {
        if (!blob) {
          showToast('Failed to generate PNG.');
          setIsSaving(false);
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = MASTER_FRAME_VARIANT.exportFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('Profile picture saved (1080 × 1080 PNG).');
        setIsSaving(false);
      }, 'image/png');
    } catch (err) {
      console.error('[ARZAEL] Save failed:', err);
      showToast('Save failed. Please try again.');
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col bg-petrol-950 text-text-primary selection:bg-flesh-500/30 selection:text-flesh-200">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload your face photograph"
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Back navigation */}
        <Link
          to="/self-sabotage"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted hover:text-flesh-300 uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO SELF SABOTAGE</span>
        </Link>

        {/* Main Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: INTERACTIVE CROPPER & PREVIEWS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Interactive Square Cropper Container */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'none' }}
              className={`relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] aspect-square bg-[#06171b] rounded-sm overflow-hidden shadow-2xl border border-petrol-700/60 select-none ${
                imageObj ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
              }`}
              onClick={!imageObj ? handleTriggerUpload : undefined}
              role={!imageObj ? 'button' : undefined}
              tabIndex={!imageObj ? 0 : undefined}
              onKeyDown={!imageObj ? (e) => (e.key === 'Enter' || e.key === ' ') && handleTriggerUpload() : undefined}
              aria-label={imageObj ? 'Drag to reposition your face' : 'Click to upload your face'}
            >
              {/* Primary 1080x1080 Live Canvas (Rendered at CSS resolution) */}
              <canvas
                ref={canvasRef}
                width={1080}
                height={1080}
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Upload Prompt Overlay (When no photo selected yet) */}
              {!imageObj && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 hover:bg-black/30 transition-colors text-center pointer-events-none">
                  <div className="p-4 rounded-full bg-petrol-900/80 border border-flesh-500/50 mb-3 flesh-glow">
                    <Upload className="w-6 h-6 text-flesh-300" />
                  </div>
                  <span className="font-mono text-xs text-flesh-300 uppercase tracking-widest font-medium">
                    UPLOAD YOUR FACE
                  </span>
                  <span className="font-mono text-[10px] text-text-muted mt-1">
                    JPG, PNG, WebP • Drag & zoom
                  </span>
                </div>
              )}
            </div>

            {/* Cropping & Adjustment Controls (Visible when image uploaded) */}
            {imageObj && (
              <div className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] mt-4 space-y-3">
                <div className="p-3 bg-petrol-900/40 border border-petrol-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
                    <ZoomOut className="w-3.5 h-3.5" />
                    <input
                      type="range"
                      min={0.8}
                      max={2.5}
                      step={0.02}
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      aria-label="Adjust zoom scale"
                      className="w-28 sm:w-36 accent-flesh-400 cursor-pointer"
                    />
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetCrop}
                      aria-label="Reset position and zoom"
                      className="px-2.5 py-1 bg-petrol-800 border border-petrol-700 hover:border-petrol-500 text-[11px] font-mono text-text-muted hover:text-text-primary uppercase flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>RESET</span>
                    </button>

                    <button
                      onClick={handleTriggerUpload}
                      aria-label="Change photo"
                      className="px-2.5 py-1 bg-petrol-800 border border-petrol-700 hover:border-flesh-400 text-[11px] font-mono text-flesh-300 uppercase flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>CHANGE</span>
                    </button>
                  </div>
                </div>

                <p className="text-[10px] font-mono text-text-dim text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-flesh-400" />
                  <span>Drag photo to center your face • Adjust zoom as needed</span>
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-3 text-xs font-mono text-flesh-400 text-center">
                {errorMessage}
              </p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: COPY, ACTIONS & SOCIAL PREVIEW */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            {!imageObj ? (
              /* State 1: Before Upload */
              <>
                <div>
                  <span className="text-xs text-flesh-400 tracking-widest uppercase bg-flesh-950/80 px-2.5 py-1 border border-flesh-800/40 font-mono inline-block mb-3">
                    SELF SABOTAGE IDENTITY
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-normal mb-4">
                    PICK YOUR PROBLEM.
                  </h1>
                </div>

                {/* Exact Required Copy */}
                <div className="space-y-2 text-base sm:text-lg text-text-muted leading-relaxed font-sans border-l-2 border-flesh-500/50 pl-4">
                  <p className="text-text-primary font-medium">
                    We all have one.
                  </p>
                  <p className="italic text-text-muted">
                    Yours just gets a profile picture.
                  </p>
                </div>

                {/* Master Variant Quote */}
                <div className="p-5 bg-petrol-900/40 border border-petrol-800 space-y-1">
                  <p className="font-serif text-xl sm:text-2xl text-flesh-300 tracking-editorial font-bold">
                    {MASTER_FRAME_VARIANT.headline}
                  </p>
                  <p className="font-mono text-xs text-text-muted italic">
                    {MASTER_FRAME_VARIANT.subcopy}
                  </p>
                </div>

                {/* Primary Upload CTA */}
                <div className="pt-2">
                  <button
                    onClick={handleTriggerUpload}
                    className="w-full sm:w-auto px-10 py-4 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow inline-flex items-center justify-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>UPLOAD YOUR FACE</span>
                  </button>
                </div>

                {/* Privacy Microcopy */}
                <p className="text-xs font-mono text-text-dim leading-relaxed">
                  Your face stays in your browser. I don’t need another problem.
                </p>
              </>
            ) : (
              /* State 2: Generated & Ready State */
              <>
                <div>
                  <span className="text-xs text-flesh-400 tracking-widest uppercase bg-flesh-950/80 px-2.5 py-1 border border-flesh-800/40 font-mono inline-block mb-3">
                    CUSTOMIZED AVATAR
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-normal mb-3">
                    LOOKS LIKE YOU.
                  </h1>
                  <p className="font-serif italic text-lg sm:text-xl text-flesh-300">
                    Unfortunately.
                  </p>
                </div>

                {/* Circular Social Avatar Crop Preview */}
                <div className="p-4 bg-petrol-900/40 border border-petrol-800 flex items-center gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-flesh-500/60 shrink-0 shadow-lg bg-black">
                    <canvas
                      ref={circleCanvasRef}
                      width={240}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-1">
                      SOCIAL AVATAR PREVIEW
                    </span>
                    <p className="text-xs text-text-muted leading-relaxed font-sans">
                      Centered and framed for Instagram, Twitter, and WhatsApp profile circles.
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Action Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-4 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all duration-300 flesh-glow flex items-center justify-center gap-2.5 font-medium disabled:opacity-50 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isSaving ? 'SAVING...' : 'SAVE IT'}</span>
                  </button>

                  <Link
                    to="/self-sabotage/life-stevia"
                    className="px-8 py-4 bg-petrol-900 border border-petrol-600 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium cursor-pointer"
                  >
                    <span>MAKE IT WORSE</span>
                    <ArrowRight className="w-4 h-4 text-flesh-400" />
                  </Link>
                </div>

                {/* Feedback Toast Notification */}
                {toastMessage && (
                  <div className="p-3 bg-flesh-950 border border-flesh-500 text-flesh-200 text-xs font-mono tracking-wider flex items-center gap-2 animate-fade-in">
                    <Check className="w-4 h-4 text-flesh-400 shrink-0" />
                    <span>{toastMessage}</span>
                  </div>
                )}

                {/* Privacy & Spec Note */}
                <div className="pt-4 border-t border-petrol-800/60 text-[11px] font-mono text-text-dim space-y-1">
                  <p>HIGH RESOLUTION EXPORT • 1080 × 1080 PX</p>
                  <p className="text-petrol-400/70">PROCESSED 100% LOCALLY IN YOUR BROWSER</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
