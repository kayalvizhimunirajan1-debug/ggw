import React from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { speakNarration } from '../utils/audio';

interface NarrationBannerProps {
  currentAnnouncement: string;
  recentTimestamp: string;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const NarrationBanner: React.FC<NarrationBannerProps> = ({
  currentAnnouncement,
  recentTimestamp,
  voiceEnabled,
  onToggleVoice,
}) => {
  const handleReplay = () => {
    speakNarration(currentAnnouncement, true);
  };

  return (
    <div
      role="region"
      aria-label="Staff Voice & Screen Reader Live Announcement"
      className="max-w-7xl mx-auto px-4 sm:px-8 mt-3 mb-4"
    >
      <div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50/80 to-emerald-50 border-2 border-amber-200/80 p-3 sm:p-4 shadow-sm transition-all"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Mascot / Voice Icon */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0 w-11 h-11 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-inner bg-[#FEF3C7]">
              <img 
                src="/src/assets/images/owl_teacher_avatar_1790413526463.jpg" 
                alt="Miss Sara Teacher Voice" 
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                <Sparkles className="w-2 h-2 text-white" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900/80">
                  Miss Sara's Live Audio Narration
                </span>
                <span className="text-[11px] text-amber-700/70">
                  · {recentTimestamp || 'Just now'}
                </span>
                {voiceEnabled && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Speech Synced
                  </span>
                )}
              </div>

              {/* Accessible Announcement Text (read by screen readers via aria-live) */}
              <p 
                aria-live="assertive" 
                aria-atomic="true"
                className="text-sm sm:text-base font-semibold text-stone-800 tracking-tight mt-0.5 leading-snug line-clamp-2"
              >
                "{currentAnnouncement}"
              </p>
            </div>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleReplay}
              title="Hear Miss Sara read this announcement again"
              aria-label="Replay Miss Sara's announcement"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer border border-amber-200 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Hear Voice</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle progress wave */}
        <div className="absolute -bottom-2 -left-2 right-0 h-1 bg-gradient-to-r from-amber-300/40 via-emerald-300/40 to-yellow-300/40" />
      </div>
    </div>
  );
};
