import React from 'react';
import { PixelArtPlayground } from './PixelArtPlayground';
import { RoutinePhaseId } from '../types';

interface WhimsicalBackgroundProps {
  routineId?: RoutinePhaseId;
}

export const WhimsicalBackground: React.FC<WhimsicalBackgroundProps> = ({ 
  routineId = 'midday_rest' 
}) => {
  // Routine-adaptive sky gradient and atmosphere
  const getSkyGradient = () => {
    switch (routineId) {
      case 'morning_welcome':
        return 'from-[#E0F2FE] via-[#FFFDF7] to-[#DCFCE7]';
      case 'midday_rest':
        // Soothing twilight lullaby & soft lavender mist
        return 'from-[#EDE9FE]/80 via-[#F5F3FF] to-[#E0E7FF]/70';
      case 'afternoon_play':
        // Warm afternoon honey apricot & meadow greens
        return 'from-[#FEF3C7]/90 via-[#FFFDF5] to-[#DCFCE7]';
      case 'sunset_pickup':
        // Warm sunset peach & twilight rose
        return 'from-[#FED7AA]/80 via-[#FCE7F3] to-[#E0E7FF]/80';
      default:
        return 'from-[#E0F2FE] via-[#FFFDF7] to-[#DCFCE7]';
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-1000 ease-in-out" 
      aria-hidden="true"
    >
      {/* Sky Warm Pastel Gradient that smoothly adapts to user's routine */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getSkyGradient()} transition-colors duration-1000`} />

      {/* Retro Pixel Playground, Smiling Sun & Running Kids */}
      <div className={routineId === 'midday_rest' ? 'opacity-70 transition-opacity duration-700' : 'opacity-100 transition-opacity duration-700'}>
        <PixelArtPlayground />
      </div>

      {/* Gentle Floating Cloud 1 */}
      <div 
        className="absolute top-10 left-8 w-64 h-24 bg-white/75 rounded-full blur-[1px] animate-cloud-slow"
        style={{
          boxShadow: '16px 16px 50px rgba(186, 230, 253, 0.45)',
        }}
      >
        <div className="absolute -top-10 left-12 w-28 h-28 bg-white/85 rounded-full" />
        <div className="absolute -top-6 left-28 w-20 h-20 bg-white/80 rounded-full" />
      </div>

      {/* Gentle Floating Cloud 2 */}
      <div 
        className="absolute top-24 left-1/3 w-72 h-24 bg-white/65 rounded-full blur-[1px] animate-cloud-fast"
        style={{
          boxShadow: '-16px 16px 50px rgba(254, 240, 138, 0.35)',
        }}
      >
        <div className="absolute -top-10 left-14 w-28 h-28 bg-white/80 rounded-full" />
        <div className="absolute -top-7 left-32 w-22 h-22 bg-white/75 rounded-full" />
      </div>

      {/* Night / Midday Resting Stars (Only visible during nap / quiet routine) */}
      {routineId === 'midday_rest' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-1/4 w-2 h-2 bg-indigo-300/70 rounded-full animate-pulse" />
          <div className="absolute top-28 right-1/3 w-2.5 h-2.5 bg-amber-200/80 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-20 left-1/4 w-1.5 h-1.5 bg-purple-300/70 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      )}

      {/* Playful Floating Dandelion Spores */}
      <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-amber-200/60 rounded-full blur-[0.5px] animate-pulse" />
      <div className="absolute bottom-56 left-1/3 w-2 h-2 bg-emerald-200/60 rounded-full blur-[0.5px] animate-pulse" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-64 right-1/3 w-3 h-3 bg-sky-200/60 rounded-full blur-[0.5px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 right-1/4 w-2.5 h-2.5 bg-rose-200/60 rounded-full blur-[0.5px] animate-pulse" style={{ animationDelay: '3.1s' }} />

      {/* Rolling Kindergarten Hills (Bottom Silhouette) */}
      <div className="absolute -bottom-16 left-0 right-0 h-44 overflow-hidden opacity-45 pointer-events-none">
        {/* Back Hill */}
        <div 
          className="absolute -bottom-20 -left-20 w-[120%] h-48 bg-[#DCFCE7]/60 rounded-[100%]"
        />
        {/* Front Hill */}
        <div 
          className="absolute -bottom-24 -right-10 w-[110%] h-44 bg-[#BBF7D0]/50 rounded-[100%]"
        />
      </div>

      {/* Subtle grass blades in the corner */}
      <div className="absolute bottom-2 left-4 flex items-end gap-1.5 opacity-60 animate-sway">
        <span className="w-1.5 h-6 bg-emerald-500 rounded-t-full rotate-[-12deg]" />
        <span className="w-2 h-9 bg-emerald-600 rounded-t-full" />
        <span className="w-1.5 h-7 bg-emerald-500 rounded-t-full rotate-[10deg]" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-1 mb-6 shadow-xs" />
      </div>

      <div className="absolute bottom-2 right-6 flex items-end gap-1.5 opacity-60 animate-sway" style={{ animationDelay: '1.5s' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 mr-1 mb-7 shadow-xs" />
        <span className="w-1.5 h-8 bg-emerald-500 rounded-t-full rotate-[-8deg]" />
        <span className="w-2 h-10 bg-emerald-600 rounded-t-full" />
        <span className="w-1.5 h-6 bg-emerald-500 rounded-t-full rotate-[14deg]" />
      </div>
    </div>
  );
};
