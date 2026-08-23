import React from 'react';
import { Link } from 'react-router-dom';
import { SELF_SABOTAGE_ERA, SELF_SABOTAGE_TRACKS } from '../data/selfSabotageEra';
import { MediaPlaceholder } from '../components/common/MediaPlaceholder';
import { useAudio } from '../context/AudioContext';
import { Play, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

export const SelfSabotagePage: React.FC = () => {
  const { playTrack } = useAudio();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-fade-in">
      {/* Header & Era Statement */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-flesh-400 uppercase tracking-widest bg-flesh-950/80 px-2 py-0.5 border border-flesh-800/40">
            ERA 01
          </span>
          <span className="text-xs text-text-dim uppercase tracking-wider font-mono">
            {SELF_SABOTAGE_ERA.years}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-normal mb-6">
          {SELF_SABOTAGE_ERA.title}
        </h1>

        <blockquote className="text-base sm:text-lg text-text-muted leading-relaxed border-l-2 border-flesh-500/50 pl-4 mb-4 italic">
          "{SELF_SABOTAGE_ERA.statement}"
        </blockquote>

        <p className="text-sm text-text-dim leading-relaxed font-sans">
          {SELF_SABOTAGE_ERA.description}
        </p>
      </div>

      {/* Main Content Grid: Artwork & Tracklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Album Art Frame */}
        <div className="lg:col-span-5 space-y-4">
          <MediaPlaceholder id="PLACEHOLDER_ALBUM_ART" title="SELF SABOTAGE" />
          <div className="p-4 bg-petrol-900/40 border border-petrol-800 text-xs text-text-muted space-y-1">
            <p className="text-text-primary font-medium font-serif">SELF SABOTAGE (2026)</p>
            <p className="text-text-dim text-[11px]">ARZAEL • OFFICIAL RELEASE</p>
          </div>
        </div>

        {/* Right Column: Track Stories & Psychological statements */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs text-petrol-400 tracking-widest uppercase block font-mono">
            TRACK MANIFEST & PSYCHOLOGICAL NOTES
          </span>

          <div className="space-y-4">
            {SELF_SABOTAGE_TRACKS.map((track, index) => (
              <article
                key={track.id}
                className="p-5 bg-petrol-900/40 border border-petrol-800/80 hover:border-petrol-600 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs text-text-dim font-mono">
                      0{index + 1}
                    </span>
                    <h2 className="font-serif text-lg text-text-primary group-hover:text-flesh-300 transition-colors font-medium">
                      {track.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => playTrack(track)}
                    aria-label={`Play ${track.title}`}
                    className="px-3 py-1.5 bg-petrol-800/80 border border-petrol-600 text-xs tracking-wider uppercase text-petrol-200 hover:bg-petrol-700 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>PLAY</span>
                  </button>
                </div>

                <p className="text-sm text-flesh-300/90 italic">
                  "{track.statement}"
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Era Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Picture Generator Gateway Card */}
        <section className="p-8 bg-petrol-900/40 border border-flesh-500/40 petrol-glow flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4 text-flesh-400" />
              <span className="text-xs text-flesh-400 uppercase tracking-widest font-mono">
                PROFILE IDENTITY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-text-primary mb-2 font-normal">
              SELF SABOTAGE AVATAR
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              We all have one. Yours just gets a profile picture. Frame your face in the ouroboros.
            </p>
          </div>

          <Link
            to="/self-sabotage/profile-picture"
            className="px-6 py-3.5 bg-flesh-900/80 border border-flesh-500 text-xs sm:text-sm font-mono tracking-widest uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all flesh-glow self-start flex items-center gap-2 font-medium"
          >
            <span>PICK YOUR PROBLEM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Life Stevia Gateway Card */}
        <section className="p-8 bg-petrol-900/40 border border-petrol-700 hover:border-petrol-500 transition-colors flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-petrol-400" />
              <span className="text-xs text-petrol-400 uppercase tracking-widest font-mono">
                POSTER ARTIFACT
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-text-primary mb-2 font-normal">
              LIFE STEVIA
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              The person who keeps loving you anyway. Type their name before you run out of them.
            </p>
          </div>

          <Link
            to="/self-sabotage/life-stevia"
            className="px-6 py-3.5 bg-petrol-900 border border-petrol-600 text-xs sm:text-sm font-mono tracking-widest uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white transition-all self-start flex items-center gap-2 font-medium"
          >
            <span>MAKE YOUR LIFE STEVIA POSTER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};
