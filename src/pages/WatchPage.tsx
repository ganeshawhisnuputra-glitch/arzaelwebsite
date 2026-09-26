import React, { useState } from 'react';
import { VIDEOS_DATA } from '../data/videos';
import { MediaPlaceholder } from '../components/common/MediaPlaceholder';
import { AtmosphericBackground } from '../components/common/AtmosphericBackground';
import { Play } from 'lucide-react';

export const WatchPage: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 animate-fade-in relative overflow-hidden">
      {/* Environmental Backdrop */}
      <AtmosphericBackground variant="watch" overlayOpacity="deep" />

      <div className="relative z-10">
      <div className="max-w-2xl mb-14 space-y-3">
        <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase block">
          [ VISUAL CINEMA ]
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-normal">
          YOU SHOULD PROBABLY SEE THIS.
        </h1>
        <p className="font-serif text-xl text-text-muted italic">
          “Some things made more sense when I stopped trying to explain them.”
        </p>
      </div>

      <div className="space-y-16">
        {VIDEOS_DATA.map((video, idx) => (
          <article
            key={video.id}
            className="bg-[#040f12]/85 border border-petrol-800/80 p-6 sm:p-8 hover:border-petrol-600 transition-all rounded-sm"
          >
            <div className="relative mb-6">
              {activeVideoId === video.id ? (
                <div className="w-full aspect-video bg-black flex flex-col items-center justify-center p-8 text-center border border-petrol-600">
                  <p className="font-mono text-xs text-flesh-400 uppercase tracking-widest mb-2">
                    [ VIDEO PLAYBACK SIMULATED ]
                  </p>
                  <h4 className="font-serif text-lg text-white mb-2">{video.title}</h4>
                  <p className="text-xs text-text-muted max-w-md">
                    Stream container initialized. In production, this embeds the direct high-bitrate visual stream.
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => setActiveVideoId(video.id)}
                  className="relative cursor-pointer group"
                >
                  <MediaPlaceholder id={video.thumbnailPlaceholderId} />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-petrol-950/40 group-hover:bg-petrol-950/20 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-petrol-900/90 border border-flesh-500/60 text-flesh-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-flesh-900 transition-all flesh-glow">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[10px] text-flesh-400 uppercase tracking-widest bg-flesh-950 px-2 py-0.5 border border-flesh-800/40">
                    {video.category.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs text-text-dim">
                    {video.duration}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-text-primary font-medium">
                  {video.title}
                </h2>
                {video.statement && (
                  <p className="text-xs sm:text-sm text-text-muted italic mt-1 font-sans">
                    “{video.statement}”
                  </p>
                )}
              </div>

              {idx === 0 && (
                <div className="text-right sm:self-center">
                  <span className="font-mono text-[10px] text-petrol-400 tracking-wider block uppercase">
                    FEATURED VISUAL
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center border-t border-petrol-800/80 pt-12">
        <p className="font-serif text-xl text-text-primary mb-1">Still here?</p>
        <p className="font-mono text-xs text-text-muted tracking-wider uppercase">
          More films and visualizers are being cut in the dark.
        </p>
      </div>
      </div>
    </div>
  );
};
