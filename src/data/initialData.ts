import { ApprovalItem, AdaptiveTool, AuditLogEvent, RosterKid } from '../types';

export const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 'appr-1',
    childName: 'Leo Miller',
    childAge: '4 yrs',
    childRoom: 'Sunbeam Cubs (Room 2)',
    avatarPhotoUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80',
    category: 'pickup',
    title: 'Alternate Pickup: Aunt Clara',
    details: 'Aunt Clara Miller will pick up Leo at 3:15 PM. She will present State ID #9021. Mom confirmed via phone call at 10:45 AM.',
    requestedBy: 'Elena Miller (Mother)',
    requestedTime: '10:45 AM today',
    urgency: 'time_sensitive',
    status: 'sleeping'
  },
  {
    id: 'appr-2',
    childName: 'Maya Chen',
    childAge: '4.5 yrs',
    childRoom: 'Sunbeam Cubs (Room 2)',
    avatarPhotoUrl: 'https://images.unsplash.com/photo-1595454223600-91fbdd77e583?auto=format&fit=crop&w=150&q=80',
    category: 'allergy',
    title: 'Snack Override: Homemade Banana Muffins',
    details: 'Grandma brought homemade banana oat muffins for Maya\'s birthday circle. Verified 100% peanut & tree-nut free facility, contains oat flour and cinnamon.',
    requestedBy: 'Grandma Lin Chen',
    requestedTime: '11:15 AM today',
    urgency: 'critical',
    status: 'sleeping'
  },
  {
    id: 'appr-3',
    childName: 'Oliver Patel',
    childAge: '3.8 yrs',
    childRoom: 'Sunbeam Cubs (Room 2)',
    avatarPhotoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=150&q=80',
    category: 'medication',
    title: 'Prescription Dispensation: Amoxicillin 5ml',
    details: 'Administer 5.0 mL liquid amoxicillin at 1:30 PM post-nap. Medicine in original labeled pharmacy bottle inside refrigerator lockbox.',
    requestedBy: 'Dr. Sarah Higgins / Sunita Patel',
    requestedTime: '8:30 AM today',
    urgency: 'critical',
    status: 'sleeping'
  },
  {
    id: 'appr-4',
    childName: 'Zoe Washington',
    childAge: '5 yrs',
    childRoom: 'Sunbeam Cubs (Room 2)',
    avatarPhotoUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=150&q=80',
    category: 'fieldtrip',
    title: 'Field Trip Slip: Butterfly Pavilion Walk',
    details: 'Signed permission for tomorrow\'s 10:00 AM nature walk to Greenleaf Botanical Garden. Walking buddy assigned: Maya.',
    requestedBy: 'Marcus Washington (Father)',
    requestedTime: 'Yesterday 4:50 PM',
    urgency: 'normal',
    status: 'sleeping'
  },
  {
    id: 'appr-5',
    childName: 'Noah Kim',
    childAge: '4.2 yrs',
    childRoom: 'Sunbeam Cubs (Room 2)',
    avatarPhotoUrl: 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=150&q=80',
    category: 'early_dismissal',
    title: 'Early Checkout for Pediatric Dentist',
    details: 'Father picking up Noah early at 2:00 PM for scheduled cleaning and sealants. Backpack and jacket packed ready at cubby #4.',
    requestedBy: 'David Kim (Father)',
    requestedTime: '9:00 AM today',
    urgency: 'time_sensitive',
    status: 'sleeping'
  }
];

export const INITIAL_TOOLS: AdaptiveTool[] = [
  {
    id: 'tool-attendance',
    name: 'Roll Call & Count',
    iconName: 'UserCheck',
    category: 'daily',
    lastUsedDaysAgo: 0,
    isResting: false,
    restingReason: '',
    description: 'Quick head-count tap tracker with visual cubby badges',
    usageCount: 42,
    flowerColor: 'bg-emerald-500',
    accentColor: 'text-emerald-700'
  },
  {
    id: 'tool-nap-sound',
    name: 'Nap Lullaby & Rain',
    iconName: 'Moon',
    category: 'care',
    lastUsedDaysAgo: 0,
    isResting: false,
    restingReason: '',
    description: 'Gentle white noise, soft rain hum, and twilight room timer',
    usageCount: 18,
    flowerColor: 'bg-sky-500',
    accentColor: 'text-sky-700'
  },
  {
    id: 'tool-snack',
    name: 'Snack & Water Log',
    iconName: 'Apple',
    category: 'care',
    lastUsedDaysAgo: 0,
    isResting: false,
    restingReason: '',
    description: 'Track sliced apples, graham crackers, water sips, and dietary notes',
    usageCount: 29,
    flowerColor: 'bg-amber-500',
    accentColor: 'text-amber-700'
  },
  {
    id: 'tool-diaper-potty',
    name: 'Potty & Wash Routine',
    iconName: 'Sparkles',
    category: 'care',
    lastUsedDaysAgo: 0,
    isResting: false,
    restingReason: '',
    description: 'Time-stamped bathroom checks, star rewards, and diaper changes',
    usageCount: 22,
    flowerColor: 'bg-teal-500',
    accentColor: 'text-teal-700'
  },
  {
    id: 'tool-parent-note',
    name: 'Parent Story & Snap',
    iconName: 'Camera',
    category: 'comms',
    lastUsedDaysAgo: 0,
    isResting: false,
    restingReason: '',
    description: 'Share a heartwarming quote or building block photo with parents',
    usageCount: 35,
    flowerColor: 'bg-rose-500',
    accentColor: 'text-rose-700'
  },
  {
    id: 'tool-ouchie',
    name: 'Ouchie & Boo-Boo Log',
    iconName: 'HeartHandshake',
    category: 'safety',
    lastUsedDaysAgo: 2,
    isResting: false,
    restingReason: '',
    description: 'Log playground scrape, cold pack application, and parental alert',
    usageCount: 7,
    flowerColor: 'bg-purple-500',
    accentColor: 'text-purple-700'
  },
  // Sleeping Flower Bed tools (Unused lately, gently resting):
  {
    id: 'tool-state-export',
    name: 'State Attendance Export',
    iconName: 'FileSpreadsheet',
    category: 'admin',
    lastUsedDaysAgo: 14,
    isResting: true,
    restingReason: 'You haven\'t exported state CSV reports in 14 days — resting in the cozy flower bed.',
    description: 'Formal regulatory attendance report for state licensing audit',
    usageCount: 2,
    flowerColor: 'bg-violet-400',
    accentColor: 'text-violet-700'
  },
  {
    id: 'tool-bulk-sms',
    name: 'Schoolwide Weather SMS',
    iconName: 'Megaphone',
    category: 'comms',
    lastUsedDaysAgo: 24,
    isResting: true,
    restingReason: 'No schoolwide alerts sent in 24 days — resting until stormy weather.',
    description: 'Emergency broadcast for snow days, severe rain, or power outage',
    usageCount: 1,
    flowerColor: 'bg-blue-400',
    accentColor: 'text-blue-700'
  },
  {
    id: 'tool-milestone',
    name: 'Development Milestone Rubric',
    iconName: 'Award',
    category: 'admin',
    lastUsedDaysAgo: 19,
    isResting: true,
    restingReason: 'Mid-semester assessments finished 19 days ago — snoozing until June evaluation.',
    description: 'Fine motor skills, letter recognition, and sharing rubrics',
    usageCount: 4,
    flowerColor: 'bg-pink-400',
    accentColor: 'text-pink-700'
  },
  {
    id: 'tool-pantry',
    name: 'Pantry & Milk Order',
    iconName: 'ShoppingBag',
    category: 'admin',
    lastUsedDaysAgo: 12,
    isResting: true,
    restingReason: 'Weekly supply reorder submitted 12 days ago — resting peacefully.',
    description: 'Restock whole milk, oat milk, wet wipes, and paper towels',
    usageCount: 3,
    flowerColor: 'bg-orange-400',
    accentColor: 'text-orange-700'
  },
  {
    id: 'tool-fire-drill',
    name: 'Monthly Drill Timer',
    iconName: 'BellRing',
    category: 'safety',
    lastUsedDaysAgo: 31,
    isResting: true,
    restingReason: 'Monthly drill completed 31 days ago — resting until next scheduled cycle.',
    description: 'Evacuation timer, muster count validation, and fire warden signoff',
    usageCount: 2,
    flowerColor: 'bg-red-400',
    accentColor: 'text-red-700'
  }
];

export const INITIAL_ROSTER: RosterKid[] = [
  { id: 'kid-1', name: 'Leo Miller', age: '4 yrs', status: 'present', cubbyNumber: 1, favoriteToy: 'Wooden train engine', allergyNotice: 'None', avatarPhotoUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-2', name: 'Maya Chen', age: '4.5 yrs', status: 'present', cubbyNumber: 2, favoriteToy: 'Rainbow silks', allergyNotice: 'Peanut & Walnut severe allergy', avatarPhotoUrl: 'https://images.unsplash.com/photo-1595454223600-91fbdd77e583?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-3', name: 'Oliver Patel', age: '3.8 yrs', status: 'resting', cubbyNumber: 3, favoriteToy: 'Plush fox', allergyNotice: 'Amoxicillin at 1:30 PM', avatarPhotoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-4', name: 'Zoe Washington', age: '5 yrs', status: 'present', cubbyNumber: 4, favoriteToy: 'Magnatiles rocket', allergyNotice: 'None', avatarPhotoUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-5', name: 'Noah Kim', age: '4.2 yrs', status: 'present', cubbyNumber: 5, favoriteToy: 'Clay snail', allergyNotice: 'Early dentist 2:00 PM', avatarPhotoUrl: 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-6', name: 'Emma Watson', age: '4 yrs', status: 'present', cubbyNumber: 6, favoriteToy: 'Picture book of whales', allergyNotice: 'Lactose intolerance', avatarPhotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-7', name: 'Liam O\'Connor', age: '4.6 yrs', status: 'present', cubbyNumber: 7, favoriteToy: 'Yellow dump truck', allergyNotice: 'None', avatarPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-8', name: 'Sofia Alvarez', age: '3.9 yrs', status: 'resting', cubbyNumber: 8, favoriteToy: 'Soft teddy bear', allergyNotice: 'Bee sting sensitive', avatarPhotoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-9', name: 'Lucas Rossi', age: '4.1 yrs', status: 'present', cubbyNumber: 9, favoriteToy: 'Cardboard kaleidoscope', allergyNotice: 'None', avatarPhotoUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-10', name: 'Aria Sharma', age: '4.4 yrs', status: 'present', cubbyNumber: 10, favoriteToy: 'Watercolor brush', allergyNotice: 'Sesame sensitive', avatarPhotoUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-11', name: 'Benjamin Reed', age: '4.3 yrs', status: 'absent', cubbyNumber: 11, favoriteToy: 'Stethoscope prop', allergyNotice: 'Home with sniffles', avatarPhotoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80' },
  { id: 'kid-12', name: 'Chloe Dubois', age: '4.8 yrs', status: 'present', cubbyNumber: 12, favoriteToy: 'Dinosaur figures', allergyNotice: 'None', avatarPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }
];

export const INITIAL_AUDIT_LOG: AuditLogEvent[] = [
  {
    id: 'log-prompt-1',
    timestamp: '10:32 AM today',
    type: 'bear_tucked_in',
    title: 'Approved: Late Pickup for Lily. (Bear tucked in)',
    description: 'Aunt Clara authorized for pickup. Staff held down the sleeping bear gate for 1.35 seconds to confirm deliberate signoff.',
    actor: 'Lead Teacher',
    spokenText: 'You tucked in the bear for Late Pickup for Lily. It\'s approved!',
    categoryLabel: 'Staff Signoff',
    childName: 'Lily'
  },
  {
    id: 'log-prompt-2',
    timestamp: '10:30 AM today',
    type: 'tool_rested',
    title: 'Faded: Bulk Message button, unused 14 days. (Moved to garden).',
    description: 'System automatically nestled Bulk Message button into the Sleeping Flower Bed due to 14 days of quiet inactivity.',
    actor: 'Adaptive Garden System',
    spokenText: 'The Bulk Message button is now resting in the garden.',
    categoryLabel: 'UI Adaptation'
  },
  {
    id: 'log-0',
    timestamp: '8:15 AM today',
    type: 'tool_rested',
    title: 'Faded: Monthly Drill Timer, unused 31 days. (Moved to garden).',
    description: 'System automatically moved Monthly Drill Timer to the Sleeping Flower Bed due to 31 days of inactivity.',
    actor: 'Adaptive Garden System',
    spokenText: 'The Monthly Drill Timer button is now resting in the garden.',
    categoryLabel: 'UI Adaptation'
  },
  {
    id: 'log-1',
    timestamp: '9:05 AM today',
    type: 'bear_tucked_in',
    title: 'Approved: Early Breakfast for Emma W. (Bear tucked in)',
    description: 'Staff held the approval gate for 1.3 seconds to authorize oatmeal breakfast serving with oat milk.',
    actor: 'Miss Sara (Lead)',
    spokenText: 'You tucked in the bear for Early Breakfast for Emma W. It\'s approved!',
    categoryLabel: 'Staff Signoff',
    childName: 'Emma Watson'
  },
  {
    id: 'log-2',
    timestamp: '9:30 AM today',
    type: 'tool_awakened',
    title: 'Awakened: Potty Routine from Flower Bed',
    description: 'Teacher assistant tapped the resting Potty Routine flower, waking it into the active garden toolbar.',
    actor: 'Teacher Jenny',
    spokenText: 'Potty Routine has awakened and returned to your active garden toolbar.',
    categoryLabel: 'UI Adaptation'
  }
];
