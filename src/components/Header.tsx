import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  LayoutDashboard, 
  Flower2, 
  ScrollText,
  Eye,
  Sun,
  Moon,
  Sparkles,
  HeartHandshake,
  ChevronDown
} from 'lucide-react';
import { RoutinePhaseId } from '../types';
import { ROUTINE_PHASES } from '../utils/routine';

interface HeaderProps {
  currentTab: 'gate' | 'garden' | 'audit';
  onSelectTab: (tab: 'gate' | 'garden' | 'audit') => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onOpenNewGateModal: () => void;
  pendingCount: number;
  restingCount: number;
  currentRoutine: RoutinePhaseId;
  onSelectRoutine: (phase: RoutinePhaseId) => void;
  isEyeSoothing: boolean;
  onToggleEyeSoothing: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  voiceEnabled,
  onToggleVoice,
  onOpenNewGateModal,
  pendingCount,
  restingCount,
  currentRoutine,
  onSelectRoutine,
  isEyeSoothing,
  onToggleEyeSoothing,
}) => {
  const [showRoutineDropdown, setShowRoutineDropdown] = useState(false);
  const currentInfo = ROUTINE_PHASES[currentRoutine];

  const routineIcons: Record<RoutinePhaseId, React.ReactNode> = {
    morning_welcome: <Sun className="w-3.5 h-3.5 text-amber-500" />,
    midday_rest: <Moon className="w-3.5 h-3.5 text-indigo-400" />,
    afternoon_play: <Sparkles className="w-3.5 h-3.5 text-emerald-500" />,
    sunset_pickup: <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />,
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-amber-200/60 shadow-[0_2px_12px_rgba(245,158,11,0.04)] px-4 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Zone: Fitted Brand Wordmark */}
        <button
          onClick={() => onSelectTab('gate')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3 min-w-0"
          aria-label="Little Sprouts Staff Board - Go to The Den"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xs flex-shrink-0 bg-amber-50 group-hover:scale-105 transition-transform">
            <img 
              src="/src/assets/images/bear_mascot_avatar_1790413515209.jpg" 
              alt="Little Sprouts Bear Mascot" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-swanky text-lg sm:text-xl text-[#78350F] tracking-tight group-hover:text-[#92400E] transition-colors truncate">
              Little Sprouts Staff Board
            </span>
            <span className="text-[11px] font-semibold text-stone-500 -mt-0.5 truncate hidden sm:block">
              Sunbeam Cubs · Room 2 · Routine-Adaptive Care
            </span>
          </div>
        </button>

        {/* Center Zone: Clean Navigation Tabs */}
        <nav 
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs font-bold text-stone-600 bg-amber-50/60 p-1 rounded-2xl border border-amber-100"
        >
          <button
            onClick={() => onSelectTab('gate')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              currentTab === 'gate'
                ? 'bg-white text-amber-950 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-700" />
            <span>The Den</span>
            {pendingCount > 0 && (
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('garden')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              currentTab === 'garden'
                ? 'bg-white text-amber-950 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resting Garden</span>
            {restingCount > 0 && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                {restingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('audit')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              currentTab === 'audit'
                ? 'bg-white text-amber-950 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5 text-amber-800" />
            <span>Activity Log</span>
          </button>
        </nav>

        {/* Right Zone: Controls & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Routine Adaptation Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoutineDropdown(!showRoutineDropdown)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100/70 hover:bg-amber-200/80 border border-amber-200/80 text-amber-950 transition-all cursor-pointer"
              title="Current daily routine stage (click to change)"
            >
              {routineIcons[currentRoutine]}
              <span className="truncate max-w-[110px] lg:max-w-none">{currentInfo.shortName}</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {/* Dropdown Menu */}
            {showRoutineDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-amber-200 shadow-lg p-1.5 z-50 text-xs animate-fade-in"
                onMouseLeave={() => setShowRoutineDropdown(false)}
              >
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Switch Routine Mode:
                </div>
                {(Object.keys(ROUTINE_PHASES) as RoutinePhaseId[]).map((phaseId) => {
                  const p = ROUTINE_PHASES[phaseId];
                  const active = currentRoutine === phaseId;
                  return (
                    <button
                      key={phaseId}
                      onClick={() => {
                        onSelectRoutine(phaseId);
                        setShowRoutineDropdown(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left cursor-pointer transition-colors ${
                        active 
                          ? 'bg-amber-100 text-amber-950 font-bold' 
                          : 'text-stone-700 hover:bg-amber-50'
                      }`}
                    >
                      {routineIcons[phaseId]}
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{p.name}</div>
                        <div className="text-[10px] text-stone-400">{p.timeRange}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Eye-Soothing Soft Mode Toggle */}
          <button
            onClick={onToggleEyeSoothing}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              isEyeSoothing
                ? 'bg-teal-100/80 text-teal-900 border-teal-300 shadow-2xs'
                : 'bg-stone-100/80 text-stone-600 border-stone-200 hover:bg-stone-200/70'
            }`}
            title={isEyeSoothing ? 'Eye-Soothing Soft Mode is Active (Low glare, warm tones)' : 'Turn on Eye-Soothing Soft Mode'}
            aria-pressed={isEyeSoothing}
          >
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden lg:inline">{isEyeSoothing ? 'Soft Eyes: On' : 'Soft Eyes'}</span>
          </button>

          {/* Miss Sara Voice Toggle */}
          <button
            onClick={onToggleVoice}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              voiceEnabled
                ? 'bg-amber-100/90 text-amber-900 border-amber-300'
                : 'bg-stone-100/80 text-stone-400 border-stone-200 hover:bg-stone-200/70'
            }`}
            title={voiceEnabled ? 'Spoken narration active' : 'Voice is muted'}
            aria-pressed={voiceEnabled}
          >
            {voiceEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            )}
            <span className="hidden sm:inline">{voiceEnabled ? 'Voice' : 'Muted'}</span>
          </button>

          {/* New Approval Gate Button */}
          <button
            onClick={onOpenNewGateModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Gate</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden items-center justify-around pt-2.5 mt-2 border-t border-amber-100 text-xs font-semibold text-stone-600">
        <button
          onClick={() => onSelectTab('gate')}
          className={`px-3 py-1 rounded-xl flex items-center gap-1.5 ${
            currentTab === 'gate' ? 'text-amber-950 font-bold bg-amber-100/70' : 'text-stone-500'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-amber-700" />
          <span>The Den {pendingCount > 0 && `(${pendingCount})`}</span>
        </button>
        <button
          onClick={() => onSelectTab('garden')}
          className={`px-3 py-1 rounded-xl flex items-center gap-1.5 ${
            currentTab === 'garden' ? 'text-amber-950 font-bold bg-amber-100/70' : 'text-stone-500'
          }`}
        >
          <Flower2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Garden {restingCount > 0 && `(${restingCount})`}</span>
        </button>
        <button
          onClick={() => onSelectTab('audit')}
          className={`px-3 py-1 rounded-xl flex items-center gap-1.5 ${
            currentTab === 'audit' ? 'text-amber-950 font-bold bg-amber-100/70' : 'text-stone-500'
          }`}
        >
          <ScrollText className="w-3.5 h-3.5 text-amber-800" />
          <span>Activity Log</span>
        </button>
      </div>
    </header>
  );
};
