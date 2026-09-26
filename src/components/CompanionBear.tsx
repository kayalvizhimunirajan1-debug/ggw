import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Sparkles, 
  X,
  Volume2
} from 'lucide-react';
import { RoutinePhaseId } from '../types';
import { ROUTINE_PHASES } from '../utils/routine';
import { playCompanionPurrChime, playGentleClickChime } from '../utils/audio';

interface CompanionBearProps {
  routineId: RoutinePhaseId;
  pendingApprovalsCount: number;
  voiceEnabled: boolean;
  onAnnounceMessage?: (msg: string) => void;
}

type BearState = 'walking' | 'idle' | 'sitting' | 'sleeping' | 'eating';

/**
 * Pure SVG 8-Bit / 16-Bit Walking Pixel Art Bear
 * Rendered strictly with crisp-edged rectangles on a 32x32 integer grid
 */
export const WalkingPixelBearSprite: React.FC<{
  routineId: RoutinePhaseId;
  walkFrame: number; // 0, 1, 2, 3
  state: BearState;
  isBlinking: boolean;
  size?: number;
}> = ({ routineId, walkFrame, state, isBlinking, size = 64 }) => {
  const isNap = state === 'sleeping' || (routineId === 'midday_rest' && state === 'idle');

  // Paw offsets depending on walk frame (0 to 3)
  const isFrame0 = walkFrame === 0;
  const isFrame1 = walkFrame === 1;
  const isFrame2 = walkFrame === 2;
  const isFrame3 = walkFrame === 3;

  const leftPawX = state === 'walking' 
    ? (isFrame0 ? 6 : isFrame2 ? 9 : 7) 
    : (state === 'sitting' ? 5 : 7);
  const leftPawY = state === 'walking' 
    ? (isFrame0 ? 25 : isFrame2 ? 23 : 24) 
    : (state === 'sitting' ? 26 : 24);

  const rightPawX = state === 'walking' 
    ? (isFrame2 ? 22 : isFrame0 ? 19 : 21) 
    : (state === 'sitting' ? 22 : 21);
  const rightPawY = state === 'walking' 
    ? (isFrame2 ? 25 : isFrame0 ? 23 : 24) 
    : (state === 'sitting' ? 26 : 24);

  const headBobY = state === 'walking' ? (isFrame0 || isFrame2 ? -1 : 0) : 0;

  return (
    <svg 
      viewBox="0 0 32 32" 
      width={size} 
      height={size}
      className="pixelated drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
      shapeRendering="crispEdges"
      aria-label="Desktop Walking Pixel Bear"
    >
      {/* ================= FLOATING PIXEL ZZZ FOR SLEEPING ================= */}
      {state === 'sleeping' && (
        <g>
          {/* Pixel Z #1 */}
          <g className="animate-snore-1">
            <rect x="25" y="4" width="4" height="1" fill="#D97706" />
            <rect x="27" y="5" width="2" height="1" fill="#D97706" />
            <rect x="26" y="6" width="2" height="1" fill="#D97706" />
            <rect x="25" y="7" width="4" height="1" fill="#D97706" />
          </g>
          {/* Pixel z #2 */}
          <g className="animate-snore-2">
            <rect x="22" y="1" width="3" height="1" fill="#B45309" />
            <rect x="23" y="2" width="1" height="1" fill="#B45309" />
            <rect x="22" y="3" width="3" height="1" fill="#B45309" />
          </g>
        </g>
      )}

      {/* ================= BEAR EARS ================= */}
      <g transform={`translate(0, ${headBobY})`}>
        {/* Left Ear */}
        <rect x="4" y="5" width="6" height="6" fill="#78350F" />
        <rect x="5" y="6" width="4" height="4" fill="#92400E" />
        <rect x="6" y="7" width="2" height="2" fill="#FDE68A" />

        {/* Right Ear */}
        <rect x="22" y="5" width="6" height="6" fill="#78350F" />
        <rect x="23" y="6" width="4" height="4" fill="#92400E" />
        <rect x="24" y="7" width="2" height="2" fill="#FDE68A" />

        {/* ================= BEAR HEAD ================= */}
        {/* Outline */}
        <rect x="7" y="9" width="18" height="16" fill="#78350F" />
        <rect x="6" y="11" width="20" height="12" fill="#78350F" />

        {/* Main Fur */}
        <rect x="8" y="10" width="16" height="14" fill="#B45309" />
        <rect x="7" y="12" width="18" height="10" fill="#B45309" />

        {/* Highlight tone */}
        <rect x="9" y="10" width="14" height="2" fill="#D97706" />
        <rect x="8" y="12" width="2" height="6" fill="#D97706" />

        {/* Acorn Nightcap (during nap or sleep) */}
        {isNap && (
          <g>
            <rect x="10" y="8" width="12" height="2" fill="#15803D" />
            <rect x="11" y="6" width="10" height="2" fill="#16A34A" />
            <rect x="13" y="4" width="6" height="2" fill="#16A34A" />
            <rect x="15" y="2" width="4" height="2" fill="#15803D" />
            {/* Pom-Pom */}
            <rect x="18" y="1" width="3" height="3" fill="#FDE047" />
            <rect x="19" y="2" width="1" height="1" fill="#FFFFFF" />
          </g>
        )}

        {/* ================= EYES ================= */}
        {isBlinking ? (
          /* Blink slit */
          <g fill="#451A03">
            <rect x="10" y="14" width="3" height="1" />
            <rect x="19" y="14" width="3" height="1" />
          </g>
        ) : isNap ? (
          /* Sleepy Eyes */
          <g fill="#451A03">
            <rect x="10" y="14" width="3" height="1" />
            <rect x="9" y="13" width="1" height="1" />
            <rect x="19" y="14" width="3" height="1" />
            <rect x="22" y="13" width="1" height="1" />
          </g>
        ) : (
          /* Bright Pixel Eyes */
          <g>
            <rect x="10" y="13" width="3" height="3" fill="#1C1917" />
            <rect x="10" y="13" width="1" height="1" fill="#FFFFFF" />
            <rect x="19" y="13" width="3" height="3" fill="#1C1917" />
            <rect x="19" y="13" width="1" height="1" fill="#FFFFFF" />
          </g>
        )}

        {/* Blush */}
        <rect x="7" y="16" width="2" height="2" fill="#F472B6" />
        <rect x="23" y="16" width="2" height="2" fill="#F472B6" />

        {/* Muzzle & Nose */}
        <rect x="12" y="15" width="8" height="6" fill="#FEF3C7" />
        <rect x="13" y="14" width="6" height="1" fill="#FEF3C7" />
        <rect x="14" y="15" width="4" height="2" fill="#451A03" />
        <rect x="15" y="15" width="2" height="1" fill="#78350F" />
        {/* Smile */}
        <rect x="15" y="18" width="2" height="1" fill="#78350F" />
        <rect x="14" y="17" width="1" height="1" fill="#78350F" />
        <rect x="17" y="17" width="1" height="1" fill="#78350F" />
      </g>

      {/* ================= TORSO & WALKING PAWS ================= */}
      {/* Torso */}
      <rect x="9" y="24" width="14" height="6" fill="#92400E" />
      <rect x="11" y="24" width="10" height="5" fill="#B45309" />

      {/* Left Walking Paw */}
      <rect x={leftPawX} y={leftPawY} width="4" height="4" fill="#78350F" />
      <rect x={leftPawX + 1} y={leftPawY + 1} width="2" height="2" fill="#B45309" />

      {/* Right Walking Paw */}
      <rect x={rightPawX} y={rightPawY} width="4" height="4" fill="#78350F" />
      <rect x={rightPawX + 1} y={rightPawY + 1} width="2" height="2" fill="#B45309" />

      {/* ================= HELD ITEM / ROUTINE ACCESSORY ================= */}
      {routineId === 'morning_welcome' && state !== 'sleeping' && (
        /* Daisy in paw */
        <g>
          <rect x="16" y="24" width="1" height="4" fill="#16A34A" />
          <rect x="15" y="21" width="3" height="3" fill="#F59E0B" />
          <rect x="16" y="20" width="1" height="1" fill="#FFFFFF" />
          <rect x="16" y="24" width="1" height="1" fill="#FFFFFF" />
          <rect x="14" y="22" width="1" height="1" fill="#FFFFFF" />
          <rect x="18" y="22" width="1" height="1" fill="#FFFFFF" />
        </g>
      )}

      {(routineId === 'afternoon_play' || state === 'eating') && state !== 'sleeping' && (
        /* Berry / Honey snack */
        <g>
          <rect x="14" y="23" width="4" height="4" fill="#DC2626" />
          <rect x="15" y="22" width="2" height="1" fill="#16A34A" />
          <rect x="15" y="24" width="1" height="1" fill="#FEF08A" />
        </g>
      )}

      {routineId === 'sunset_pickup' && state !== 'sleeping' && (
        /* Firefly Lantern */
        <g>
          <rect x="14" y="22" width="4" height="5" fill="#78350F" />
          <rect x="15" y="23" width="2" height="3" fill="#FDE047" />
          <rect x="15" y="24" width="1" height="1" fill="#FFFFFF" />
          <rect x="15" y="21" width="2" height="1" fill="#78350F" />
        </g>
      )}
    </svg>
  );
};

export const CompanionBear: React.FC<CompanionBearProps> = ({
  routineId,
  pendingApprovalsCount,
  voiceEnabled,
  onAnnounceMessage,
}) => {
  // Bear Desktop Movement State
  const [posX, setPosX] = useState(150); // in pixels across screen
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [bearState, setBearState] = useState<BearState>('walking');
  const [walkFrame, setWalkFrame] = useState(0); // 0, 1, 2, 3
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [petCount, setPetCount] = useState(0);

  // Tiny speech bubble popup
  const [showSpeech, setShowSpeech] = useState(true);
  const [speechText, setSpeechText] = useState('Happy to walk with you today! 🐾');

  // Dragging support so user can pick up and place the bear anywhere on desktop!
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0 });

  // Natural Blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Walk Frame Animator (stepped retro walk cycle)
  useEffect(() => {
    if (bearState !== 'walking' || isDragging) return;

    const frameInterval = setInterval(() => {
      setWalkFrame((prev) => (prev + 1) % 4);
    }, 220); // 220ms per walk frame for cute 8-bit pacing

    return () => clearInterval(frameInterval);
  }, [bearState, isDragging]);

  // Desktop Wandering Movement Loop
  useEffect(() => {
    if (isDragging) return;

    const moveInterval = setInterval(() => {
      if (bearState !== 'walking') return;

      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const speed = 2.4; // pixels per step

      setPosX((currX) => {
        let nextX = currX;
        if (direction === 'right') {
          nextX = currX + speed;
          if (nextX >= screenWidth - 110) {
            setDirection('left');
            // Random chance to pause & sit when reaching an edge
            if (Math.random() > 0.4) {
              setBearState('sitting');
              setTimeout(() => setBearState('walking'), 4500);
            }
          }
        } else {
          nextX = currX - speed;
          if (nextX <= 40) {
            setDirection('right');
            if (Math.random() > 0.4) {
              setBearState('sitting');
              setTimeout(() => setBearState('walking'), 4500);
            }
          }
        }
        return nextX;
      });
    }, 45);

    return () => clearInterval(moveInterval);
  }, [direction, bearState, isDragging]);

  // Periodic Behavior changes (walk ➔ pause & look ➔ sniff ➔ walk)
  useEffect(() => {
    if (isDragging) return;

    const behaviorInterval = setInterval(() => {
      // If midday nap routine, higher chance of sleeping
      if (routineId === 'midday_rest' && Math.random() > 0.5) {
        setBearState('sleeping');
        setSpeechText('Zzz... taking a cozy nap on your desk 💤');
        setTimeout(() => {
          setBearState('walking');
          setSpeechText('Awake and ready to walk with you! 🐾');
        }, 8000);
        return;
      }

      const roll = Math.random();
      if (roll < 0.35) {
        // Pause and look around
        setBearState('idle');
        setTimeout(() => setBearState('walking'), 3500);
      } else if (roll < 0.55) {
        // Sit down
        setBearState('sitting');
        setTimeout(() => setBearState('walking'), 5000);
      } else {
        setBearState('walking');
      }
    }, 12000);

    return () => clearInterval(behaviorInterval);
  }, [routineId, isDragging]);

  // Update routine dialogue
  useEffect(() => {
    switch (routineId) {
      case 'morning_welcome':
        setSpeechText(`Morning circle time! ${pendingApprovalsCount} cubs asleep.`);
        break;
      case 'midday_rest':
        setSpeechText(`Quiet naptime lullaby... walking softly 💤`);
        break;
      case 'afternoon_play':
        setSpeechText(`Afternoon playground time! Keeping everyone safe 🍓`);
        break;
      case 'sunset_pickup':
        setSpeechText(`Sunset handoff! Checking all pickups 🏮`);
        break;
    }
    setShowSpeech(true);
    const timeout = setTimeout(() => setShowSpeech(false), 8000);
    return () => clearTimeout(timeout);
  }, [routineId, pendingApprovalsCount]);

  // Mouse / Touch Dragging Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffsetRef.current = { x: e.clientX - posX };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const screenWidth = window.innerWidth;
      const newX = Math.max(20, Math.min(e.clientX - dragOffsetRef.current.x, screenWidth - 100));
      setPosX(newX);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setBearState('walking');
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Click / Pet Bear interaction
  const handlePetBear = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCompanionPurrChime();
    setIsPetting(true);
    setPetCount((p) => p + 1);

    const compliments = [
      "Purrr! Barnaby loves walking with you! 🐻💛",
      "*Blink!* 8-bit high paw! You're a wonderful teacher.",
      "Barnaby does a little happy hop beside your tasks!",
      "Walking happily on your desktop 🐾",
      "*Wiggle!* Taking good care of all the little sprouts today!",
    ];
    const picked = compliments[Math.floor(Math.random() * compliments.length)];
    setSpeechText(picked);
    setShowSpeech(true);

    if (onAnnounceMessage && voiceEnabled) {
      onAnnounceMessage(picked);
    }

    setTimeout(() => {
      setIsPetting(false);
    }, 1200);
  };

  const handleFeedSnack = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGentleClickChime();
    setBearState('eating');
    setSpeechText('*Munch munch!* Delicious sweet berry! 🍓');
    setShowSpeech(true);
    setTimeout(() => {
      setBearState('walking');
    }, 4000);
  };

  return (
    <div 
      className="fixed bottom-3 z-40 select-none pointer-events-auto"
      style={{
        left: `${posX}px`,
        transform: `translateX(0px)`,
        transition: isDragging ? 'none' : 'left 0.05s linear',
      }}
    >
      {/* Tiny Retro Pixel Dialogue Bubble */}
      {showSpeech && (
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FFFDF5] border-2 border-[#78350F] px-2.5 py-1 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.12)] text-[11px] font-bold text-[#78350F] flex items-center gap-1.5 animate-bounce pixelated"
          style={{ imageRendering: 'pixelated' }}
        >
          <span>{speechText}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowSpeech(false); }}
            className="text-stone-400 hover:text-stone-700 cursor-pointer ml-1"
          >
            ×
          </button>
          {/* Pixel Tail */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFFDF5] border-r-2 border-b-2 border-[#78350F] rotate-45" />
        </div>
      )}

      {/* Floating Pixel Heart on Pet */}
      {isPetting && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none animate-pixel-heart z-50">
          <div className="flex items-center gap-1 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white shadow-md font-mono">
            <Heart className="w-3 h-3 fill-current text-white" />
            <span>+1 LOVE!</span>
          </div>
        </div>
      )}

      {/* Walking Bear Character Entity */}
      <div 
        onMouseDown={handleMouseDown}
        onClick={handlePetBear}
        className="group relative cursor-grab active:cursor-grabbing flex flex-col items-center select-none"
        title="I'm Barnaby! Click to pet me, or drag me anywhere on your desktop!"
      >
        {/* Animated Direction Container (Faces left or right as it walks) */}
        <div 
          style={{ 
            transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
            transformOrigin: 'center center',
          }}
          className="transition-transform duration-150"
        >
          <WalkingPixelBearSprite
            routineId={routineId}
            walkFrame={walkFrame}
            state={bearState}
            isBlinking={isBlinking}
            size={56}
          />
        </div>

        {/* Shadow Under Bear */}
        <div className="w-8 h-1.5 bg-black/15 rounded-full blur-[0.5px] -mt-1" />

        {/* Cute Interactive Micro-Hover Menu */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 inset-x-0 flex items-center justify-center gap-1 z-50 pointer-events-auto">
          <button
            onClick={handlePetBear}
            className="px-1.5 py-0.5 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded text-[9px] font-bold text-amber-950 shadow-xs cursor-pointer"
            title="Pet Barnaby"
          >
            ❤️ Pet
          </button>
          <button
            onClick={handleFeedSnack}
            className="px-1.5 py-0.5 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded text-[9px] font-bold text-amber-950 shadow-xs cursor-pointer"
            title="Feed berry snack"
          >
            🍓 Snack
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBearState(bearState === 'sleeping' ? 'walking' : 'sleeping');
            }}
            className="px-1.5 py-0.5 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded text-[9px] font-bold text-amber-950 shadow-xs cursor-pointer"
            title="Toggle Nap"
          >
            {bearState === 'sleeping' ? 'Wake' : '💤 Nap'}
          </button>
        </div>
      </div>
    </div>
  );
};
