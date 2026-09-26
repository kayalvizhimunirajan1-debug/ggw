import React, { useState, useRef, useEffect } from 'react';
import { ApprovalItem } from '../types';
import { 
  Clock, 
  UserCheck, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Heart,
  Moon
} from 'lucide-react';
import { playHoldTick } from '../utils/audio';

interface SleepingBearCardProps {
  item: ApprovalItem;
  onTuckIn: (item: ApprovalItem, holdTimeMs: number) => void;
  onWakeUp: (item: ApprovalItem, holdTimeMs: number, reason: string) => void;
  onResetToSleep: (item: ApprovalItem) => void;
}

export const SleepingBearCard: React.FC<SleepingBearCardProps> = ({
  item,
  onTuckIn,
  onWakeUp,
  onResetToSleep,
}) => {
  // Hold state
  const [activeAction, setActiveAction] = useState<'tuck' | 'wake' | null>(null);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isRollingOver, setIsRollingOver] = useState(false);
  const holdStartRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const REQUIRED_HOLD_MS = 1200; // 1.2s deliberate hold to eradicate rubber stamping

  const startHolding = (action: 'tuck' | 'wake') => {
    if (item.status !== 'sleeping') return;
    setActiveAction(action);
    setProgress(0);
    holdStartRef.current = Date.now();

    const checkProgress = () => {
      if (!holdStartRef.current) return;
      const elapsed = Date.now() - holdStartRef.current;
      const currentRatio = Math.min(elapsed / REQUIRED_HOLD_MS, 1);
      const currentPercent = Math.round(currentRatio * 100);

      setProgress(currentPercent);
      if (currentPercent % 20 === 0 && currentPercent > 0) {
        playHoldTick(currentRatio);
      }

      if (currentRatio >= 1) {
        const totalDuration = Date.now() - holdStartRef.current;
        holdStartRef.current = null;
        setActiveAction(null);
        setProgress(0);

        if (action === 'tuck') {
          onTuckIn(item, totalDuration);
        } else {
          onWakeUp(item, totalDuration, 'Staff flagged for parent verification & clarification');
        }
      } else {
        animFrameRef.current = requestAnimationFrame(checkProgress);
      }
    };

    animFrameRef.current = requestAnimationFrame(checkProgress);
  };

  const cancelHolding = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    holdStartRef.current = null;
    setActiveAction(null);
    setProgress(0);
  };

  const handleQuickTapReject = () => {
    if (item.status !== 'sleeping') return;
    setIsRollingOver(true);
    setTimeout(() => {
      setIsRollingOver(false);
      onWakeUp(item, 300, 'Quick-tap: Bear rolled over, action politely declined.');
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const getCategoryTheme = () => {
    switch (item.category) {
      case 'medication':
        return {
          pill: 'bg-rose-100/70 border-rose-200/80 text-rose-900',
          dot: 'bg-rose-400',
          ambient: 'from-rose-50/50 to-stone-50/40',
        };
      case 'allergy':
        return {
          pill: 'bg-amber-100/70 border-amber-200/80 text-amber-900',
          dot: 'bg-amber-400',
          ambient: 'from-amber-50/50 to-stone-50/40',
        };
      case 'pickup':
        return {
          pill: 'bg-sky-100/70 border-sky-200/80 text-sky-900',
          dot: 'bg-sky-400',
          ambient: 'from-sky-50/50 to-stone-50/40',
        };
      case 'fieldtrip':
        return {
          pill: 'bg-emerald-100/70 border-emerald-200/80 text-emerald-900',
          dot: 'bg-emerald-400',
          ambient: 'from-emerald-50/50 to-stone-50/40',
        };
      default:
        return {
          pill: 'bg-purple-100/70 border-purple-200/80 text-purple-900',
          dot: 'bg-purple-400',
          ambient: 'from-purple-50/50 to-stone-50/40',
        };
    }
  };

  const catTheme = getCategoryTheme();

  // Circular progress math (radius: 46, circumference: 289)
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <article 
      className={`scroll-fade-item relative rounded-[2rem] p-5 sm:p-6 transition-all duration-300 border ${
        item.status === 'sleeping'
          ? 'bg-[#FAF8F5]/90 border-amber-200/70 shadow-[0_4px_24px_rgba(215,185,150,0.08)] hover:border-amber-300/80'
          : item.status === 'tucked_in'
          ? 'bg-[#F2F8F4]/90 border-emerald-300/80 shadow-xs'
          : 'bg-[#FAF2F2]/90 border-rose-200/80 shadow-xs'
      }`}
    >
      {/* Top Header: Child identity with soothing soft tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/50">
        <div className="flex items-center gap-3">
          {/* Real child portrait in soft rounded circle */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stone-200/80 shadow-2xs flex-shrink-0 bg-stone-100">
            <img 
              src={item.avatarPhotoUrl || '/src/assets/images/bear_mascot_avatar_1790413515209.jpg'} 
              alt={item.childName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight leading-tight">
                {item.childName}
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                · {item.childAge} · {item.childRoom}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${catTheme.pill}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${catTheme.dot}`} />
                {item.category.toUpperCase().replace('_', ' ')}
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-stone-500">
                <Clock className="w-3 h-3 text-stone-400" />
                Requested: {item.requestedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Soft, low-strain status indicator */}
        <div className="flex items-center gap-2">
          {item.status === 'sleeping' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 border border-amber-200/70 text-amber-900">
              <Moon className="w-3.5 h-3.5 text-amber-700" />
              <span>Asleep by Default</span>
            </span>
          ) : item.status === 'tucked_in' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 border border-emerald-300 text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tucked in & Approved</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100/70 border border-rose-200 text-rose-900">
              <RotateCcw className="w-3.5 h-3.5 text-rose-700" />
              <span>Rolled Over (Declined)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Peaceful Body Flow */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center my-4">
        {/* Sleeping Bear Pod */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-3xl bg-stone-100/60 border border-stone-200/50 relative overflow-hidden min-h-[160px]">
          {/* Animated Snoring 'Zzz' */}
          {item.status === 'sleeping' && !activeAction && (
            <div className="absolute top-2 right-4 pointer-events-none" aria-hidden="true">
              <span className="absolute font-swanky text-xs font-bold text-amber-700/60 animate-snore-1">Z</span>
              <span className="absolute font-swanky text-sm font-bold text-amber-700/70 animate-snore-2" style={{ top: '-8px', left: '7px' }}>z</span>
              <span className="absolute font-swanky text-base font-bold text-amber-800/80 animate-snore-3" style={{ top: '-18px', left: '15px' }}>Z</span>
            </div>
          )}

          {/* Circular Bear Pod with Progress Ring */}
          <div 
            className="relative w-28 h-28 flex items-center justify-center cursor-pointer select-none"
            onMouseDown={() => startHolding('tuck')}
            onMouseUp={cancelHolding}
            onMouseLeave={cancelHolding}
            onTouchStart={() => startHolding('tuck')}
            onTouchEnd={cancelHolding}
            title={item.status === 'sleeping' ? 'Hold down to Tuck In & Approve! Or tap Roll Over button' : undefined}
          >
            {/* SVG Circular Progress Ring */}
            {item.status === 'sleeping' && (
              <svg 
                className="absolute inset-0 w-28 h-28 -rotate-90 pointer-events-none z-20"
                viewBox="0 0 112 112"
              >
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#E7E5E4"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke={activeAction === 'wake' ? '#F43F5E' : '#10B981'}
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-75"
                />
              </svg>
            )}

            {/* Inner Circular Bed */}
            <div className="w-22 h-22 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-stone-50 to-amber-50/80 border border-stone-200/70 shadow-inner z-10 relative">
              <div className={`relative flex items-center justify-center transition-transform duration-300 ${isRollingOver ? 'animate-bear-roll' : ''}`}>
                {item.status === 'sleeping' ? (
                  /* Sleeping Bear Cub curled up */
                  <div className={`flex flex-col items-center justify-center ${activeAction ? 'scale-105' : 'animate-breathe'} transition-transform`}>
                    <div className="relative w-14 h-11 flex items-center justify-center">
                      <div className="absolute top-0 left-1.5 w-3.5 h-3.5 rounded-full bg-[#92400E]" />
                      <div className="absolute top-0 right-1.5 w-3.5 h-3.5 rounded-full bg-[#92400E]" />
                      <div className="absolute -top-1.5 left-2.5 w-4.5 h-3.5 bg-amber-600 rounded-t-full rotate-[-15deg] flex items-center justify-center z-10 shadow-2xs">
                        <span className="w-1 h-1 bg-yellow-200 rounded-full -top-0.5 absolute" />
                      </div>
                      <div className="w-12 h-10 rounded-full bg-[#B45309] relative flex flex-col items-center justify-center shadow-2xs">
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold text-amber-950 leading-none">˘</span>
                          <span className="text-[10px] font-bold text-amber-950 leading-none">˘</span>
                        </div>
                        <div className="w-4.5 h-2.5 bg-[#FDE68A] rounded-full mt-0.5 flex items-center justify-center">
                          <span className="w-1.5 h-1 bg-[#78350F] rounded-full" />
                        </div>
                      </div>
                    </div>
                    {/* Cozy Quilt */}
                    <div className="-mt-1.5 w-18 h-7 rounded-t-xl bg-gradient-to-r from-amber-300 via-rose-200 to-sky-200 border border-amber-600/40 shadow-2xs flex items-center justify-around px-2">
                      <Sparkles className="w-2 h-2 text-amber-900/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      <Sparkles className="w-2 h-2 text-amber-900/60" />
                    </div>
                  </div>
                ) : item.status === 'tucked_in' ? (
                  /* Awakened & Smiling inside circle */
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-11 h-11" shapeRendering="geometricPrecision">
                        <circle cx="8" cy="9" r="4" fill="#92400E" />
                        <circle cx="8" cy="9" r="2" fill="#FDE68A" />
                        <circle cx="24" cy="9" r="4" fill="#92400E" />
                        <circle cx="24" cy="9" r="2" fill="#FDE68A" />
                        <circle cx="16" cy="18" r="11" fill="#D97706" />
                        <ellipse cx="16" cy="20.5" rx="5.5" ry="4" fill="#FEF3C7" />
                        <ellipse cx="16" cy="19" rx="1.8" ry="1.2" fill="#78350F" />
                        <path d="M 14.5 21.2 Q 16 23 17.5 21.2" stroke="#78350F" strokeWidth="1" fill="none" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="1.4" fill="#1C1917" />
                        <circle cx="20" cy="16" r="1.4" fill="#1C1917" />
                        <ellipse cx="9.5" cy="18.5" rx="1.5" ry="1" fill="#F472B6" opacity="0.8" />
                        <ellipse cx="22.5" cy="18.5" rx="1.5" ry="1" fill="#F472B6" opacity="0.8" />
                      </svg>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 absolute -bottom-0.5 -right-0.5" />
                    </div>
                  </div>
                ) : (
                  /* Rolled Over inside circle */
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-14 h-14 rounded-full bg-rose-50 border border-rose-300 flex items-center justify-center rotate-12">
                      <svg viewBox="0 0 32 32" className="w-10 h-10" shapeRendering="geometricPrecision">
                        <circle cx="8" cy="9" r="4" fill="#92400E" />
                        <circle cx="24" cy="9" r="4" fill="#92400E" />
                        <circle cx="16" cy="18" r="11" fill="#B45309" />
                        <ellipse cx="16" cy="20.5" rx="5.5" ry="4" fill="#FEF3C7" />
                        <ellipse cx="16" cy="19" rx="1.8" ry="1.2" fill="#78350F" />
                        <path d="M 14.5 22 Q 16 20.5 17.5 22" stroke="#78350F" strokeWidth="1" fill="none" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="1.2" fill="#451A03" />
                        <circle cx="20" cy="16" r="1.2" fill="#451A03" />
                      </svg>
                      <RotateCcw className="w-3 h-3 text-rose-600 absolute -bottom-0.5 -right-0.5" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[11px] font-medium text-stone-600">
              {item.status === 'sleeping' 
                ? (activeAction ? `Holding... ${progress}%` : 'Hold to Tuck In & Approve')
                : item.status === 'tucked_in'
                ? 'Approved by Miss Sara'
                : 'Declined / Kept on hold'}
            </span>
          </div>
        </div>

        {/* Action Details & Parent Source */}
        <div className="md:col-span-8 flex flex-col justify-between h-full space-y-2.5">
          <div>
            <h4 className="text-base font-bold text-stone-800 leading-snug">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed bg-stone-50/70 p-3 rounded-2xl border border-stone-200/50">
              {item.details}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-stone-500">
              <span><strong>Requester:</strong> {item.requestedBy}</span>
              {item.decidedAt && (
                <span><strong>Decided:</strong> {item.decidedAt} by {item.decidedBy}</span>
              )}
            </div>
          </div>

          {/* Audit footprint or put back button */}
          {item.status !== 'sleeping' && (
            <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-600">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  Hold confirmed ({((item.holdDurationMs || 1200) / 1000).toFixed(2)}s intentional hold)
                </span>
              </div>
              <button
                onClick={() => onResetToSleep(item)}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer underline underline-offset-2"
                title="Return to asleep state"
              >
                <RotateCcw className="w-3 h-3" />
                Put Back to Sleep
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Hold-To-Decide Control Stage (Active only when Asleep) */}
      {item.status === 'sleeping' && (
        <div className="mt-3 pt-3 border-t border-stone-200/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>
                Tap to roll over (decline), or hold 1.2s to tuck in & approve.
              </span>
            </div>

            {/* Soft, Eye-Pleasing Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {/* Roll Over button */}
              <button
                onClick={handleQuickTapReject}
                onMouseDown={() => startHolding('wake')}
                onMouseUp={cancelHolding}
                onMouseLeave={cancelHolding}
                onTouchStart={() => startHolding('wake')}
                onTouchEnd={cancelHolding}
                className="relative overflow-hidden flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/80 active:scale-95 transition-all select-none cursor-pointer"
                aria-label={`Roll over and decline ${item.childName}'s request`}
              >
                {activeAction === 'wake' && (
                  <span 
                    className="absolute inset-0 bg-rose-200/50 transition-all pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Roll Over & Decline</span>
                </span>
              </button>

              {/* Hold to Tuck In & Approve */}
              <button
                onMouseDown={() => startHolding('tuck')}
                onMouseUp={cancelHolding}
                onMouseLeave={cancelHolding}
                onTouchStart={() => startHolding('tuck')}
                onTouchEnd={cancelHolding}
                className="relative overflow-hidden flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-2xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-2xs active:scale-95 transition-all select-none cursor-pointer border border-emerald-500/80"
                aria-label={`Hold to tuck in and approve ${item.childName}'s request`}
              >
                {activeAction === 'tuck' && (
                  <span 
                    className="absolute inset-0 bg-emerald-400/40 transition-all pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Hold to Tuck In & Approve</span>
                  {activeAction === 'tuck' && <span className="text-[10px] font-mono">({progress}%)</span>}
                </span>
              </button>
            </div>
          </div>

          {/* Active Hold Progress */}
          {activeAction && (
            <div className="mt-2.5">
              <div className="w-full bg-stone-200/70 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-75 ${
                    activeAction === 'tuck' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-center text-stone-600 font-medium mt-1">
                Holding gently... {progress}%
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
