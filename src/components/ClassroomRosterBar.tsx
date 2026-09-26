import React, { useState } from 'react';
import { RosterKid } from '../types';
import { Sun, Moon, AlertTriangle, UserCheck } from 'lucide-react';

interface ClassroomRosterBarProps {
  kids: RosterKid[];
  selectedKidId: string | null;
  onSelectKid: (kidName: string | null) => void;
}

/**
 * Perfectly proportioned SVG Bear Face that sits 100% inside a circular badge
 * with zero clipping, overflow, or distorted emoji scaling.
 */
const FittedBearIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg 
    viewBox="0 0 32 32" 
    className={className} 
    shapeRendering="geometricPrecision"
    aria-label="Attendance Bear Mascot"
  >
    {/* Left Bear Ear */}
    <circle cx="8.5" cy="9.5" r="4" fill="#92400E" />
    <circle cx="8.5" cy="9.5" r="2.2" fill="#FDE68A" />

    {/* Right Bear Ear */}
    <circle cx="23.5" cy="9.5" r="4" fill="#92400E" />
    <circle cx="23.5" cy="9.5" r="2.2" fill="#FDE68A" />

    {/* Bear Head Body */}
    <circle cx="16" cy="18" r="10.5" fill="#B45309" />

    {/* Muzzle */}
    <ellipse cx="16" cy="20.5" rx="5.5" ry="4" fill="#FEF3C7" />

    {/* Little Button Nose */}
    <ellipse cx="16" cy="19" rx="1.8" ry="1.2" fill="#78350F" />

    {/* Gentle Smile */}
    <path 
      d="M 14.5 21.2 Q 16 22.8 17.5 21.2" 
      stroke="#78350F" 
      strokeWidth="1" 
      fill="none" 
      strokeLinecap="round" 
    />

    {/* Peaceful Kind Eyes */}
    <circle cx="12.5" cy="16" r="1.2" fill="#451A03" />
    <circle cx="19.5" cy="16" r="1.2" fill="#451A03" />

    {/* Rosy Pastel Cheeks */}
    <ellipse cx="10" cy="18.5" rx="1.6" ry="1" fill="#F472B6" opacity="0.8" />
    <ellipse cx="22" cy="18.5" rx="1.6" ry="1" fill="#F472B6" opacity="0.8" />

    {/* Tiny Acorn Cap / Little Sprout on Head */}
    <path 
      d="M 15 7.5 Q 16 6 17 7.5 Z" 
      fill="#22C55E" 
    />
  </svg>
);

export const ClassroomRosterBar: React.FC<ClassroomRosterBarProps> = ({
  kids,
  selectedKidId,
  onSelectKid,
}) => {
  const [activeKidDetails, setActiveKidDetails] = useState<RosterKid | null>(null);
  const [showRealPhotos, setShowRealPhotos] = useState(false);

  const presentCount = kids.filter(k => k.status === 'present').length;
  const restingCount = kids.filter(k => k.status === 'resting').length;
  const absentCount = kids.filter(k => k.status === 'absent').length;

  return (
    <div className="rounded-3xl p-5 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/80 border-2 border-emerald-200/80 shadow-[0_2px_12px_rgba(16,185,129,0.06)] mb-6">
      {/* Top Bar: Room Title & Counts */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-2xs">
            <Sun className="w-5 h-5 text-amber-600 animate-spin" style={{ animationDuration: '30s' }} />
          </div>
          <div>
            <h3 className="font-swanky text-base sm:text-lg text-emerald-950 leading-tight">
              Sunbeam Room Roster (Ages 3–5)
            </h3>
            <p className="text-xs text-stone-500">
              Lead: Miss Sara & Educator Jenny · Room #2
            </p>
          </div>
        </div>

        {/* Live Counters & Photo Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold flex-wrap">
          <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {presentCount} Present
          </span>
          <span className="flex items-center gap-1.5 text-sky-800 bg-sky-100/90 px-2.5 py-1 rounded-full border border-sky-200">
            <Moon className="w-3.5 h-3.5 text-sky-600" />
            {restingCount} Resting
          </span>
          <span className="text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
            {absentCount} Absent
          </span>

          {/* Toggle between Bear Icons and Real Photos */}
          <button
            onClick={() => setShowRealPhotos(!showRealPhotos)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-semibold cursor-pointer transition-colors shadow-2xs"
            title="Toggle between Fitted Bear Badges and Real Child Photos"
          >
            {showRealPhotos ? 'Switch to Bear Badges' : 'Switch to Kid Photos'}
          </button>
        </div>
      </div>

      {/* Children Cubby Carousel / Pills */}
      <div className="mt-3.5 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {kids.map((kid) => {
          const isSelected = selectedKidId === kid.name;
          const hasAllergy = kid.allergyNotice && kid.allergyNotice !== 'None' && !kid.allergyNotice.includes('sniffles');

          return (
            <button
              key={kid.id}
              onClick={() => {
                if (isSelected) {
                  onSelectKid(null);
                  setActiveKidDetails(null);
                } else {
                  onSelectKid(kid.name);
                  setActiveKidDetails(kid);
                }
              }}
              className={`flex-shrink-0 flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-amber-300 text-amber-950 border-amber-500 shadow-xs ring-2 ring-amber-400'
                  : 'bg-white hover:bg-amber-50/80 text-stone-700 border-amber-100'
              }`}
              title={`${kid.name} - Cubby #${kid.cubbyNumber}${hasAllergy ? ` (${kid.allergyNotice})` : ''}`}
            >
              {/* Perfectly Fitted Circular Badge: Bear fits completely inside with 0 overflow */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-amber-100 to-amber-200/90 border border-amber-300 flex items-center justify-center overflow-hidden shadow-2xs flex-shrink-0">
                {showRealPhotos && kid.avatarPhotoUrl ? (
                  <img
                    src={kid.avatarPhotoUrl}
                    alt={kid.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-0.5">
                    <FittedBearIcon className="w-7 h-7" />
                  </div>
                )}
                {/* Cubby Number Badge: positioned cleanly on bottom right */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 text-[8px] rounded-full flex items-center justify-center font-bold text-amber-950 border border-white leading-none">
                  {kid.cubbyNumber}
                </span>
              </div>

              <span>{kid.name.split(' ')[0]}</span>
              {hasAllergy && (
                <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" title={kid.allergyNotice} />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Kid Detail Card if clicked */}
      {activeKidDetails && (
        <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Real photo thumbnail */}
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-300 bg-white shadow-2xs flex-shrink-0">
              <img
                src={activeKidDetails.avatarPhotoUrl || '/src/assets/images/bear_mascot_avatar_1790413515209.jpg'}
                alt={activeKidDetails.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">{activeKidDetails.name}</span>
                <span className="text-stone-500 font-medium">· Cubby #{activeKidDetails.cubbyNumber}</span>
                <span className="text-stone-500 font-medium">· Favorite: {activeKidDetails.favoriteToy}</span>
              </div>
              {activeKidDetails.allergyNotice && activeKidDetails.allergyNotice !== 'None' && (
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-200 text-[11px]">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    {activeKidDetails.allergyNotice}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              onSelectKid(null);
              setActiveKidDetails(null);
            }}
            className="text-[11px] text-amber-900 underline cursor-pointer hover:text-amber-950 font-semibold"
          >
            Clear Child Filter
          </button>
        </div>
      )}
    </div>
  );
};

