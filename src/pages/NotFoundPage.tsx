import React from 'react';
import { Link } from 'react-router-dom';
import { OuroborosMotif } from '../components/common/OuroborosMotif';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-fade-in">
      <OuroborosMotif size="lg" className="mb-6" />

      <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3">
        [ VOID 404 ]
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl text-text-primary tracking-editorial font-bold mb-4">
        YOU WENT TOO FAR.
      </h1>

      <p className="text-base text-text-muted leading-relaxed mb-2 max-w-sm">
        There’s nothing here.
      </p>
      <p className="text-xs font-mono text-text-dim mb-8">
        I checked.
      </p>

      <Link
        to="/"
        className="px-8 py-3.5 bg-petrol-900 border border-petrol-500/60 text-xs font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all petrol-glow"
      >
        TAKE ME BACK
      </Link>
    </div>
  );
};
