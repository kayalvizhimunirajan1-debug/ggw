import React, { useState } from 'react';
import { AdaptiveTool } from '../types';
import { 
  UserCheck, 
  Moon, 
  Apple, 
  Sparkles, 
  Camera, 
  HeartHandshake, 
  FileSpreadsheet, 
  Megaphone, 
  Award, 
  ShoppingBag, 
  BellRing,
  BedDouble,
  Play,
  Pause,
  Check,
  Plus,
  Flower2,
  CloudRain,
  LayoutDashboard
} from 'lucide-react';
import { playFlowerRestChime } from '../utils/audio';

interface ActiveGardenToolsProps {
  activeTools: AdaptiveTool[];
  onRestTool: (tool: AdaptiveTool, reason: string) => void;
  onSimulateInactivity: () => void;
}

export const ActiveGardenTools: React.FC<ActiveGardenToolsProps> = ({
  activeTools,
  onRestTool,
  onSimulateInactivity,
}) => {
  // Working interactive states for demo tools
  const [isPlayingRain, setIsPlayingRain] = useState(false);
  const [appleCount, setAppleCount] = useState(14);
  const [pottyCount, setPottyCount] = useState(8);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'Moon': return <Moon className="w-6 h-6" />;
      case 'Apple': return <Apple className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Camera': return <Camera className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'BellRing': return <BellRing className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleToolAction = (toolId: string) => {
    if (toolId === 'tool-nap-sound') {
      setIsPlayingRain(!isPlayingRain);
    } else if (toolId === 'tool-snack') {
      setAppleCount(prev => prev + 1);
    } else if (toolId === 'tool-diaper-potty') {
      setPottyCount(prev => prev + 1);
    } else {
      setActiveToolModal(toolId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Garden Header & Adaptive Simulation Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-emerald-50 p-5 rounded-3xl border border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-amber-700" />
            </div>
            <h2 className="font-swanky text-xl sm:text-2xl text-amber-950">
              Active Kindergarten Toolbox
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Frequently touched daily care tools bloom here in bright sunshine. Try interacting with any tool, or test the adaptive garden by putting an unused button to rest!
          </p>
        </div>

        <button
          onClick={onSimulateInactivity}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 border border-amber-300/80 shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="Simulate 14 days passing: the least-used tool will narrate its graceful rest into the flower bed"
        >
          <BedDouble className="w-4 h-4 text-amber-800" />
          <span>Simulate 14d Inactivity</span>
        </button>
      </div>

      {/* Active Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeTools.map((tool) => (
          <div
            key={tool.id}
            className="group relative rounded-3xl p-5 bg-white border-2 border-amber-200/80 hover:border-amber-400/90 shadow-[0_4px_16px_rgba(245,158,11,0.06)] hover:shadow-[0_8px_24px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Tool Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs ${tool.flowerColor}`}>
                    {getToolIcon(tool.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 leading-tight">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-stone-500 font-medium">
                      Used {tool.usageCount} times this month
                    </span>
                  </div>
                </div>
              </div>

              {/* Tool Description */}
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {tool.description}
              </p>

              {/* Interactive Micro-Widgets for Demo */}
              {tool.id === 'tool-nap-sound' && (
                <div className="mt-3 p-2.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-sky-600" />
                    <span className="font-bold text-sky-900">
                      {isPlayingRain ? 'Rain & White Noise: Playing' : 'Nap Room Sound: Paused'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsPlayingRain(!isPlayingRain)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 cursor-pointer"
                  >
                    {isPlayingRain ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isPlayingRain ? 'Pause' : 'Play'}</span>
                  </button>
                </div>
              )}

              {tool.id === 'tool-snack' && (
                <div className="mt-3 p-2.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Apple className="w-3.5 h-3.5 text-rose-500" />
                    <span>Slices served: {appleCount}</span>
                  </span>
                  <button
                    onClick={() => setAppleCount(prev => prev + 1)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+1 Serving</span>
                  </button>
                </div>
              )}

              {tool.id === 'tool-diaper-potty' && (
                <div className="mt-3 p-2.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Bathroom checks: {pottyCount}</span>
                  </span>
                  <button
                    onClick={() => setPottyCount(prev => prev + 1)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                    <span>Log Check</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions: Open tool vs Send to Flower Bed */}
            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleToolAction(tool.id)}
                className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 text-center transition-colors cursor-pointer"
              >
                Open Tool
              </button>

              <button
                onClick={() => {
                  playFlowerRestChime();
                  onRestTool(
                    tool, 
                    `You haven't needed ${tool.name} today — resting in the cozy flower bed.`
                  );
                }}
                className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold text-stone-500 hover:text-amber-900 hover:bg-amber-50 border border-stone-200/80 transition-all cursor-pointer whitespace-nowrap"
                title="Manually rest this tool in the flower bed to test adaptive narration"
              >
                <BedDouble className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Rest in Bed</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Open Tool Preview */}
      {activeToolModal && (
        <div 
          role="dialog" 
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-2 border-amber-200 shadow-xl">
            <h3 className="font-swanky text-xl text-amber-900 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-amber-700" />
              <span>Little Sprouts Tool Deck</span>
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              Quick action triggered! In the full classroom station, this opens the dedicated station interface with auto-sync to parent portal.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveToolModal(null)}
                className="px-4 py-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
              >
                Close Station
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
