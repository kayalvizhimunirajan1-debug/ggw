export type ApprovalCategory = 
  | 'pickup' 
  | 'allergy' 
  | 'medication' 
  | 'fieldtrip' 
  | 'early_dismissal'
  | 'nap_schedule';

export type RoutinePhaseId = 
  | 'morning_welcome' 
  | 'midday_rest' 
  | 'afternoon_play' 
  | 'sunset_pickup';

export interface RoutinePhaseInfo {
  id: RoutinePhaseId;
  name: string;
  shortName: string;
  timeRange: string;
  description: string;
  suggestedFocus: string;
  ambientTone: string;
  themeClass: string;
  bearStatusText: string;
  bearAccessory: 'daisy' | 'nightcap' | 'snack' | 'lantern';
  bannerBg: string;
}

export type CompanionBearMood = 'cheerful' | 'sleepy' | 'focused' | 'snuggling';

export interface ApprovalItem {
  id: string;
  childName: string;
  childAge: string;
  childRoom: string;
  avatarEmoji?: string;
  avatarPhotoUrl?: string;
  category: ApprovalCategory;
  title: string;
  details: string;
  requestedBy: string;
  requestedTime: string;
  urgency: 'normal' | 'time_sensitive' | 'critical';
  status: 'sleeping' | 'tucked_in' | 'woken_up';
  decidedAt?: string;
  decidedBy?: string;
  decisionNote?: string;
  holdDurationMs?: number;
}

export type ToolCategory = 'daily' | 'admin' | 'safety' | 'comms' | 'care';

export interface AdaptiveTool {
  id: string;
  name: string;
  iconName: string;
  category: ToolCategory;
  lastUsedDaysAgo: number;
  isResting: boolean;
  restingReason: string;
  description: string;
  usageCount: number;
  flowerColor: string;
  accentColor: string;
}

export interface AuditLogEvent {
  id: string;
  timestamp: string;
  type: 'bear_tucked_in' | 'bear_woken_up' | 'tool_rested' | 'tool_awakened' | 'request_created';
  title: string;
  description: string;
  actor: string;
  spokenText: string;
  categoryLabel: string;
  childName?: string;
}

export interface RosterKid {
  id: string;
  name: string;
  age: string;
  status: 'present' | 'resting' | 'absent' | 'picked_up';
  cubbyNumber: number;
  allergyNotice?: string;
  favoriteToy: string;
  avatarPhotoUrl?: string;
}
