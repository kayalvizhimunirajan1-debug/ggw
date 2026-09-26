import React from 'react';
import { AdaptiveTool } from '../types';
import { Sparkles, Moon, Sun, ArrowUpCircle, Sprout, Flower2 } from 'lucide-react';
import { playFlowerBloomChime } from '../utils/audio';

interface SleepingFlowerBedProps {
  restingTools: AdaptiveTool[];
  onAwakenTool: (tool: AdaptiveTool) => void;
  onWakeAll: () => void;
}

export const SleepingFlowerBed: React.FC<SleepingFlowerBedProps> = ({
  restingTools,
  onAwakenTool,
  onWakeAll,
}) => {
  return (
    <section 
      aria-label="The Sleeping Flower Bed - Adaptive Resting Toolbar"
      className="mt-8 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#2E1810] via-[#3B1F14] to-[#2B150E] text-amber-50 shadow-[0_10px_35px_rgba(43,21,14,0.4)] border-4 border-[#593021] relative overflow-hidden"
    >
      {/* Garden Soil & Moss Ambient Decor */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-800 via-amber-800 to-emerald-900 opacity-60" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#593021]/80">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/70 border border-emerald-600/50 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-swanky text-xl sm:text-2xl text-amber-200 tracking-wide">
              The Sleeping Flower Bed (Resting Garden)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-300/80 mt-1 max-w-2xl leading-relaxed">
            Instead of silent removals, tools you haven't used lately rest here as sleeping flower buds. Every movement is spoken aloud by Miss Sara. Tap any sleeping flower to wake it right back into your active toolbar!
          </p>
        </div>

        {restingTools.length > 0 && (
          <button
            onClick={onWakeAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
            title="Wake all sleeping tools back to the active garden"
          >
            <Sun className="w-3.5 h-3.5 text-amber-900" />
            <span>Wake All Flowers ({restingTools.length})</span>
          </button>
        )}
      </div>

      {/* Flower Bed Grid */}
      {restingTools.length === 0 ? (
        <div className="py-12 text-center rounded-2xl bg-[#23120A]/70 border border-[#593021] p-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-950/60 border border-amber-600/40 flex items-center justify-center mb-2">
            <Sun className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '40s' }} />
          </div>
          <h4 className="font-swanky text-lg text-amber-200 mt-2">All Flowers Are Awake!</h4>
          <p className="text-xs text-amber-300/70 max-w-md mx-auto mt-1">
            Every staff tool is currently active in your main toolbar above. When a tool goes unused, it will gently tuck into this warm soil bed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {restingTools.map((tool) => (
            <div
              key={tool.id}
              className="group relative rounded-2xl p-4 bg-gradient-to-b from-[#4A281A] to-[#361B10] border-2 border-[#6E3C29] hover:border-amber-400/70 transition-all duration-300 flex flex-col justify-between shadow-md"
            >
              {/* Sleeping Flower Graphic */}
              <div className="flex items-start gap-3.5">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-2xl bg-[#26130B] border border-[#7D4630] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {/* Closed sleeping flower bud */}
                  <Flower2 className="w-6 h-6 text-pink-300/80 group-hover:text-pink-300 transition-colors" />
                  {/* Tiny Sleeping Moon Indicator */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-900/90 text-yellow-300 text-[10px] border border-indigo-700">
                    <Moon className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-amber-100 truncate group-hover:text-amber-200">
                      {tool.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-amber-400/90 font-mono">
                      {tool.lastUsedDaysAgo}d unused
                    </span>
                  </div>

                  {/* Accessible Caption */}
                  <p className="text-xs text-amber-300/80 mt-1 leading-snug italic">
                    "{tool.restingReason}"
                  </p>
                </div>
              </div>

              {/* Tap to Wake Up Action */}
              <div className="mt-4 pt-3 border-t border-[#593021] flex items-center justify-between">
                <span className="text-[11px] text-amber-400/70 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Gently asleep in moss
                </span>

                <button
                  onClick={() => {
                    playFlowerBloomChime();
                    onAwakenTool(tool);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-200 active:scale-95 transition-all cursor-pointer shadow-xs"
                  aria-label={`Wake ${tool.name} back to active tools`}
                >
                  <ArrowUpCircle className="w-3.5 h-3.5 text-amber-900" />
                  <span>Tap to Wake</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bed Base Soil Texture Details */}
      <div className="mt-6 pt-3 flex items-center justify-between text-[11px] text-amber-400/60 border-t border-[#593021]/60">
        <span>Soil Temperature: Warm & Cozy (72°F)</span>
        <span>Screen Reader Live Polling: Active</span>
      </div>
    </section>
  );
};
