import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../../context/ModalContext';
import { X } from 'lucide-react';

export const LettersModal: React.FC = () => {
  const { isLettersOpen, closeLetters } = useModal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLettersOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isLettersOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLettersOpen) {
        closeLetters();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLettersOpen, closeLetters]);

  if (!isLettersOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    // Development-only submission state for V0 foundation
    setSubmitted(true);
  };

  const handleDecline = () => {
    setDeclined(true);
    setTimeout(() => {
      closeLetters();
      setDeclined(false);
    }, 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="letters-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-petrol-950/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-petrol-900 border border-petrol-700/70 p-6 sm:p-10 shadow-2xl petrol-glow">
        <button
          onClick={closeLetters}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-flesh-400"
        >
          <X className="w-5 h-5" />
        </button>

        {declined ? (
          <div className="text-center py-8">
            <p className="font-serif text-xl text-text-primary mb-2">Fair enough.</p>
            <p className="text-sm text-text-muted font-mono tracking-wider">See you around.</p>
          </div>
        ) : submitted ? (
          <div className="text-center py-6 animate-fade-in">
            <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3 inline-block">
              [ DIRECT CHANNEL OPENED ]
            </span>
            <h3 className="font-serif text-2xl text-text-primary mb-4 tracking-editorial">
              YOU’RE IN.
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-sm mx-auto">
              I’ll write soon.
              <br />
              Until then, don’t disappear on me.
            </p>
            <span className="text-[10px] font-mono text-petrol-400/80 block mb-6">
              (V0 Development Mode: Subscription recorded locally)
            </span>
            <button
              onClick={closeLetters}
              className="px-6 py-2.5 bg-petrol-800 border border-petrol-600 text-xs font-mono tracking-widest-artist uppercase text-text-primary hover:bg-petrol-700"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3 inline-block">
              LETTERS FROM ARZAEL
            </span>
            <h3 id="letters-title" className="font-serif text-2xl sm:text-3xl text-text-primary mb-4 tracking-editorial">
              CAN I WRITE TO YOU?
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Social media feels like talking in a room where everyone is screaming.
              <br />
              I want somewhere quieter.
            </p>
            <p className="text-xs text-text-muted/80 leading-relaxed mb-6">
              So sometimes I’ll write to you. About the songs. Things I’m making. Things I’m thinking about. Things I probably shouldn’t post.
              <br />
              <strong className="text-petrol-300 font-normal">No algorithm between us. Just me → you.</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="letter-email-input"
                  className="block font-mono text-xs text-text-muted tracking-wider mb-2"
                >
                  Email address:
                </label>
                <input
                  id="letter-email-input"
                  ref={inputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="where should I send it?"
                  className="w-full px-4 py-3 bg-petrol-950/80 border border-petrol-700/80 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-flesh-400 focus:ring-1 focus:ring-flesh-400 transition-colors font-mono"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-flesh-900/80 border border-flesh-500 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all flesh-glow"
                >
                  WRITE TO ME
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="text-xs font-mono text-text-dim hover:text-text-muted py-2 transition-colors"
                >
                  no, let me disappear
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
