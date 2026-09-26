import { RoutinePhaseId, RoutinePhaseInfo } from '../types';

export const ROUTINE_PHASES: Record<RoutinePhaseId, RoutinePhaseInfo> = {
  morning_welcome: {
    id: 'morning_welcome',
    name: 'Morning Arrival & Circle Time',
    shortName: 'Morning Circle',
    timeRange: '7:30 AM – 11:30 AM',
    description: 'Fresh morning sunshine. Cubs arrive, cubbies are assigned, and daily attendance roll call is confirmed.',
    suggestedFocus: 'Review morning allergy notes, breakfast snacks, and roll call check-ins.',
    ambientTone: 'Golden morning light with energetic birdsong and fresh garden dew.',
    themeClass: 'routine-morning',
    bearStatusText: 'Cheerfully greeting cubs with a daisy flower',
    bearAccessory: 'daisy',
    bannerBg: 'from-amber-100/90 via-[#FFF9ED] to-emerald-100/80',
  },
  midday_rest: {
    id: 'midday_rest',
    name: 'Midday Nap & Quiet Time',
    shortName: 'Midday Nap',
    timeRange: '11:30 AM – 2:00 PM',
    description: 'Lights are dimmed, soft white noise hums, and all cubs rest on soft cots. Decisions remain gently asleep.',
    suggestedFocus: 'Administer post-nap medications (like Oliver Patel amoxicillin) and keep approval gates quiet.',
    ambientTone: 'Ultra-soothing twilight mist, soft lavender tones, and tranquil breathing lullaby.',
    themeClass: 'routine-midday',
    bearStatusText: 'Curled in moss with acorn nightcap & dream cloud',
    bearAccessory: 'nightcap',
    bannerBg: 'from-indigo-100/80 via-[#F5F3FF] to-teal-100/70',
  },
  afternoon_play: {
    id: 'afternoon_play',
    name: 'Afternoon Discovery & Snack',
    shortName: 'Afternoon Play',
    timeRange: '2:00 PM – 4:30 PM',
    description: 'Post-nap awakening, wholesome snack distribution, sandbox crafts, and outdoor playground adventures.',
    suggestedFocus: 'Check banana muffin allergy approvals, outdoor field trip slips, and garden tools.',
    ambientTone: 'Warm apricot amber and vibrant meadow green breeze.',
    themeClass: 'routine-afternoon',
    bearStatusText: 'Enjoying a sweet honey snack and waving his paw',
    bearAccessory: 'snack',
    bannerBg: 'from-amber-100/90 via-[#FFFDF5] to-orange-100/70',
  },
  sunset_pickup: {
    id: 'sunset_pickup',
    name: 'Sunset Dismissal & Handoff',
    shortName: 'Sunset Pickup',
    timeRange: '4:30 PM – 6:30 PM',
    description: 'Golden hour dismissal. Parents arrive at the vestibule, authorized guardian IDs are verified, and backpacks are packed.',
    suggestedFocus: 'Carefully verify alternate pickup requests (Aunt Clara for Leo) with 1.2s deliberate signoff.',
    ambientTone: 'Warm sunset rose and cozy peach twilight glow.',
    themeClass: 'routine-sunset',
    bearStatusText: 'Holding a gentle glowing twilight lantern for safe pickup',
    bearAccessory: 'lantern',
    bannerBg: 'from-rose-100/85 via-[#FFF1F2] to-amber-100/80',
  },
};

/**
 * Calculates current routine phase based on current local hour.
 * 7:30 to 11:30 -> morning_welcome
 * 11:30 to 14:00 -> midday_rest
 * 14:00 to 16:30 -> afternoon_play
 * 16:30 to 19:30 -> sunset_pickup
 * otherwise defaults to midday_rest or night quiet
 */
export function getCurrentRoutinePhase(overrideHour?: number): RoutinePhaseId {
  const hour = overrideHour !== undefined ? overrideHour : new Date().getHours();
  const minute = new Date().getMinutes();
  const decimalTime = hour + minute / 60;

  if (decimalTime >= 7.5 && decimalTime < 11.5) {
    return 'morning_welcome';
  } else if (decimalTime >= 11.5 && decimalTime < 14.0) {
    return 'midday_rest';
  } else if (decimalTime >= 14.0 && decimalTime < 16.5) {
    return 'afternoon_play';
  } else if (decimalTime >= 16.5 && decimalTime < 19.5) {
    return 'sunset_pickup';
  } else {
    // Night/early morning defaults to quiet rest
    return 'midday_rest';
  }
}
