import React from 'react';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Palette, 
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { RoutinePhaseId } from '../types';
import { ROUTINE_PHASES } from '../utils/routine';

interface RoutineAdaptationBarProps {
  currentRoutine: RoutinePhaseId;
  onSelectRoutine: (phase: RoutinePhaseId) => void;
  isAutoSync: boolean;
  onToggleAutoSync: () => void;
}

export const RoutineAdaptationBar: React.FC<RoutineAdaptationBarProps> = ({
  currentRoutine,
  onSelectRoutine,
  isAutoSync,
  onToggleAutoSync,
}) => {
  const currentInfo = ROUTINE_PHASES[currentRoutine];

  const routineItems: { id: RoutinePhaseId; title: string; time: string; icon: React.ReactNode }[] = [
    {
      id: 'morning_welcome',
      title: 'Morning Circle',
      time: '7:30 - 11:30 AM',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: 'midday_rest',
      title: 'Midday Nap',
      time: '11:30 AM - 2:00 PM',
      icon: <Moon className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      id: 'afternoon_play',
      title: 'Afternoon Play',
      time: '2:00 - 4:30 PM',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" />,
    },
    {
      id: 'sunset_pickup',
      title: 'Sunset Handoff',
      time: '4:30 - 6:30 PM',
      icon: <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />,
    },
  ];

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-amber-200/60 p-3 sm:p-4 shadow-2xs transition-all">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Routine Adaptation Headline & Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100/90 border border-amber-300 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-950 font-swanky uppercase tracking-wider">
                Adapting to Routine:
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-200/80 text-amber-900 border border-amber-300/80">
                {currentInfo.name}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
              {currentInfo.suggestedFocus}
            </p>
          </div>
        </div>

        {/* Right: Routine Phase Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {routineItems.map((item) => {
            const isActive = currentRoutine === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectRoutine(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-2xs scale-102'
                    : 'bg-white/60 hover:bg-amber-50/70 text-stone-600 border-amber-100'
                }`}
                title={`Switch to ${item.title} routine (${item.time})`}
              >
                {item.icon}
                <span>{item.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                )}
              </button>
            );
          })}

          {/* Auto Clock Sync Toggle */}
          <button
            onClick={onToggleAutoSync}
            className={`px-2.5 py-1.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              isAutoSync
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-stone-100 text-stone-500 hover:bg-stone-200 border-stone-200'
            }`}
            title={isAutoSync ? 'Routine is currently automatically following real-time local clock' : 'Tap to sync routine with current local time'}
          >
            {isAutoSync ? '● Auto-Clock' : 'Manual'}
          </button>
        </div>
      </div>
    </div>
  );
};
