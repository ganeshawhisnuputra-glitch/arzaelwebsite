import React from 'react';
import { Link } from 'react-router-dom';
import { SELF_SABOTAGE_ERA, SELF_SABOTAGE_TRACKS } from '../data/selfSabotageEra';
import { AtmosphericBackground } from '../components/common/AtmosphericBackground';
import { useAudio } from '../context/AudioContext';
import { Play, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

export const SelfSabotagePage: React.FC = () => {
  const { playTrack } = useAudio();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 animate-fade-in relative overflow-hidden">
      {/* Environmental Corridor Backdrop */}
      <AtmosphericBackground variant="hospital-ward" overlayOpacity="deep" />

      <div className="relative z-10">
      {/* Header & Clinical Admission Statement */}
      <div className="max-w-3xl mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-petrol-950/90 border border-petrol-700/60 text-xs font-mono tracking-widest text-flesh-300 uppercase">
          <span>CASE FILE</span>
          <span className="text-petrol-600">•</span>
          <span>{SELF_SABOTAGE_ERA.years}</span>
        </div>

        <div className="max-w-md pt-1">
          <img
            src="/assets/brand/self-sabotage-title.png"
            alt="SELF SABOTAGE"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_25px_rgba(217,126,120,0.3)]"
          />
        </div>

        <blockquote className="text-lg sm:text-2xl text-text-primary leading-relaxed border-l-2 border-flesh-500/60 pl-5 font-serif italic">
          “{SELF_SABOTAGE_ERA.statement}”
        </blockquote>

        <p className="text-base text-text-muted leading-relaxed font-sans max-w-2xl">
          {SELF_SABOTAGE_ERA.description}
        </p>
      </div>

      {/* Main Content Grid: Artwork Monogram & Track Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Broken Glass Monogram Frame */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative w-full aspect-square bg-[#040f12]/90 border border-petrol-800/80 rounded-sm p-8 flex items-center justify-center shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#147287_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <img
              src="/assets/brand/ouroboros-cracked.png"
              alt="ARZAEL Ouroboros Cracked"
              className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_0_35px_rgba(20,114,135,0.4)] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-text-dim">
              <span>PRIMARY ARTIFACT</span>
              <span>SELF SABOTAGE (2026)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Track Stories & Psychological Notes */}
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase block">
            [ TRACK MANIFEST & CLINICAL NOTES ]
          </span>

          <div className="space-y-4">
            {SELF_SABOTAGE_TRACKS.map((track, index) => (
              <article
                key={track.id}
                className="p-5 bg-petrol-950/70 border border-petrol-800/80 hover:border-petrol-600 transition-all rounded-sm group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-text-dim">
                      0{index + 1}
                    </span>
                    <h2 className="font-serif text-lg text-text-primary group-hover:text-flesh-300 transition-colors font-medium">
                      {track.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => playTrack(track)}
                    aria-label={`Play ${track.title}`}
                    className="px-3.5 py-1.5 bg-petrol-900 border border-petrol-700 text-xs font-mono tracking-wider uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current text-flesh-400" />
                    <span>PLAY</span>
                  </button>
                </div>

                <p className="text-sm text-flesh-300/90 italic font-sans pl-6">
                  “{track.statement}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Era Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Picture Generator Gateway Card */}
        <section className="p-8 bg-[#040f12]/80 border border-flesh-500/40 rounded-sm flex flex-col justify-between gap-6 hover:shadow-[0_0_35px_rgba(217,126,120,0.12)] transition-shadow">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-flesh-400" />
              <span className="text-xs text-flesh-400 uppercase tracking-widest font-mono">
                PROFILE IDENTITY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-text-primary font-normal">
              SELF SABOTAGE AVATAR
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-sans">
              We all have one. Yours just gets a profile picture. Frame your face in the ouroboros.
            </p>
          </div>

          <Link
            to="/self-sabotage/profile-picture"
            className="px-6 py-3.5 bg-flesh-900/90 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all flesh-glow self-start flex items-center gap-2 font-medium"
          >
            <span>PICK YOUR PROBLEM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Life Stevia Gateway Card */}
        <section className="p-8 bg-[#040f12]/80 border border-petrol-700/80 hover:border-petrol-500 rounded-sm flex flex-col justify-between gap-6 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-petrol-400" />
              <span className="text-xs text-petrol-400 uppercase tracking-widest font-mono">
                POSTER ARTIFACT
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-text-primary font-normal">
              LIFE STEVIA
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-sans">
              The person who keeps loving you anyway. Type their name before you run out of them.
            </p>
          </div>

          <Link
            to="/self-sabotage/life-stevia"
            className="px-6 py-3.5 bg-petrol-900 border border-petrol-600 text-xs sm:text-sm font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all self-start flex items-center gap-2 font-medium"
          >
            <span>MAKE YOUR LIFE STEVIA POSTER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
      </div>
    </div>
  );
};
