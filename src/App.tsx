/**
 * Little Sprouts Staff Board
 * A kindergarten care & safety dashboard featuring:
 * - "Hold by default" Sleeping-Bear Approval Gate
 * - "Resting Garden" Adaptive Flower Bed
 * - Real-time spoken and visual announcements for universal accessibility
 */

import React, { useState, useEffect } from 'react';
import { 
  ApprovalItem, 
  AdaptiveTool, 
  AuditLogEvent, 
  RosterKid,
  ApprovalCategory,
  RoutinePhaseId 
} from './types';
import { 
  INITIAL_APPROVALS, 
  INITIAL_TOOLS, 
  INITIAL_ROSTER, 
  INITIAL_AUDIT_LOG 
} from './data/initialData';
import { WhimsicalBackground } from './components/WhimsicalBackground';
import { Header } from './components/Header';
import { NarrationBanner } from './components/NarrationBanner';
import { RoutineAdaptationBar } from './components/RoutineAdaptationBar';
import { CompanionBear } from './components/CompanionBear';
import { SleepingBearCard } from './components/SleepingBearCard';
import { SleepingFlowerBed } from './components/SleepingFlowerBed';
import { ActiveGardenTools } from './components/ActiveGardenTools';
import { AuditLogView } from './components/AuditLogView';
import { ClassroomRosterBar } from './components/ClassroomRosterBar';
import { NewApprovalModal } from './components/NewApprovalModal';
import { getCurrentRoutinePhase, ROUTINE_PHASES } from './utils/routine';
import { 
  playLullabyChime, 
  playMorningChirp, 
  playFlowerBloomChime, 
  playFlowerRestChime, 
  speakNarration 
} from './utils/audio';
import { 
  ShieldCheck, 
  Sparkles, 
  Moon, 
  Sun, 
  BedDouble, 
  RotateCcw, 
  Info,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function App() {
  // Navigation tab
  const [currentTab, setCurrentTab] = useState<'gate' | 'garden' | 'audit'>('gate');

  // Core Data States
  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => {
    const saved = localStorage.getItem('sprouts_approvals');
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  const [tools, setTools] = useState<AdaptiveTool[]>(() => {
    const saved = localStorage.getItem('sprouts_tools');
    return saved ? JSON.parse(saved) : INITIAL_TOOLS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>(() => {
    const saved = localStorage.getItem('sprouts_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOG;
  });

  const [kids] = useState<RosterKid[]>(INITIAL_ROSTER);

  // Audio & Voice Narration State
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<string>(
    'Welcome to Little Sprouts Staff Board. 5 pending care actions are currently asleep and paused by default.'
  );
  const [recentTimestamp, setRecentTimestamp] = useState('8:00 AM');

  // Filters
  const [selectedKidFilter, setSelectedKidFilter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ApprovalCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sleeping' | 'decided'>('all');

  // Modals
  const [isNewGateOpen, setIsNewGateOpen] = useState(false);

  // Daily Kindergarten Routine Adaptation State
  const [currentRoutine, setCurrentRoutine] = useState<RoutinePhaseId>(() => getCurrentRoutinePhase());
  const [isAutoSyncRoutine, setIsAutoSyncRoutine] = useState(true);

  // Eye-Soothing Soft Mode State
  const [isEyeSoothing, setIsEyeSoothing] = useState(false);

  // Auto-sync routine with real-time clock every 60s
  useEffect(() => {
    if (!isAutoSyncRoutine) return;
    const updateRoutine = () => {
      const calc = getCurrentRoutinePhase();
      setCurrentRoutine(calc);
    };
    updateRoutine();
    const interval = setInterval(updateRoutine, 60000);
    return () => clearInterval(interval);
  }, [isAutoSyncRoutine]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sprouts_approvals', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('sprouts_tools', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('sprouts_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Derived counts
  const pendingSleepingCount = approvals.filter(a => a.status === 'sleeping').length;
  const restingTools = tools.filter(t => t.isResting);
  const activeTools = tools.filter(t => !t.isResting);

  // Helper to trigger announcement + voice + audit
  const dispatchAnnouncement = (
    text: string, 
    logEvent?: Omit<AuditLogEvent, 'id' | 'timestamp' | 'spokenText'>
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRecentTimestamp(timeStr);
    setCurrentAnnouncement(text);
    speakNarration(text, voiceEnabled);

    if (logEvent) {
      const newLog: AuditLogEvent = {
        id: `log-${Date.now()}`,
        timestamp: `${timeStr} today`,
        spokenText: text,
        ...logEvent,
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  // --- Sleeping Bear Handlers ---
  const handleTuckIn = (item: ApprovalItem, holdTimeMs: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    playLullabyChime();

    setApprovals(prev => prev.map(a => {
      if (a.id === item.id) {
        return {
          ...a,
          status: 'tucked_in',
          decidedAt: timeStr,
          decidedBy: 'Miss Sara',
          holdDurationMs: holdTimeMs,
        };
      }
      return a;
    }));

    const text = `You tucked in the bear for ${item.title} (${item.childName}). It's approved!`;
    dispatchAnnouncement(text, {
      type: 'bear_tucked_in',
      title: `Approved: ${item.title} for ${item.childName}. (Bear tucked in)`,
      description: `Staff held down the approval gate for ${(holdTimeMs / 1000).toFixed(2)} seconds. Action authorized.`,
      actor: 'Staff Member',
      categoryLabel: 'Gate Signoff',
      childName: item.childName,
    });
  };

  const handleWakeUp = (item: ApprovalItem, holdTimeMs: number, reason: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    playMorningChirp();

    setApprovals(prev => prev.map(a => {
      if (a.id === item.id) {
        return {
          ...a,
          status: 'woken_up',
          decidedAt: timeStr,
          decidedBy: 'Staff Member',
          decisionNote: reason,
          holdDurationMs: holdTimeMs,
        };
      }
      return a;
    }));

    const text = `The bear rolled over and declined ${item.title} for ${item.childName}. It's not approved.`;
    dispatchAnnouncement(text, {
      type: 'bear_woken_up',
      title: `Declined: ${item.title} for ${item.childName}. (Bear rolled over)`,
      description: `Action halted. Staff note: "${reason}". Hold duration: ${(holdTimeMs / 1000).toFixed(2)}s.`,
      actor: 'Staff Member',
      categoryLabel: 'Gate Query',
      childName: item.childName,
    });
  };

  const handleResetToSleep = (item: ApprovalItem) => {
    setApprovals(prev => prev.map(a => {
      if (a.id === item.id) {
        return {
          ...a,
          status: 'sleeping',
          decidedAt: undefined,
          decidedBy: undefined,
          decisionNote: undefined,
        };
      }
      return a;
    }));

    const text = `${item.childName}'s approval was returned to sleep for further observation.`;
    dispatchAnnouncement(text);
  };

  const handleCreateNewGate = (newItemData: Omit<ApprovalItem, 'id' | 'status'>) => {
    const newItem: ApprovalItem = {
      ...newItemData,
      id: `appr-${Date.now()}`,
      status: 'sleeping',
    };

    setApprovals(prev => [newItem, ...prev]);

    const text = `A new sleeping bear gate has been tucked in for ${newItem.childName}. It is asleep by default.`;
    dispatchAnnouncement(text, {
      type: 'request_created',
      title: `New Gate: ${newItem.childName}`,
      description: `Created: "${newItem.title}". Requester: ${newItem.requestedBy}. Asleep by default.`,
      actor: 'Staff Member',
      categoryLabel: 'New Gate',
      childName: newItem.childName,
    });
  };

  // --- Adaptive Garden Handlers ---
  const handleRestTool = (tool: AdaptiveTool, reason: string) => {
    playFlowerRestChime();

    setTools(prev => prev.map(t => {
      if (t.id === tool.id) {
        return {
          ...t,
          isResting: true,
          restingReason: reason,
        };
      }
      return t;
    }));

    const text = `The ${tool.name} button is now resting in the garden.`;
    dispatchAnnouncement(text, {
      type: 'tool_rested',
      title: `Faded: ${tool.name} button, unused ${tool.lastUsedDaysAgo || 14} days. (Moved to garden).`,
      description: `System moved ${tool.name} into the sleeping flower bed. Caption: "${reason}".`,
      actor: 'Miss Sara Adaptive Layout',
      categoryLabel: 'UI Adaptation',
    });
  };

  const handleAwakenTool = (tool: AdaptiveTool) => {
    playFlowerBloomChime();

    setTools(prev => prev.map(t => {
      if (t.id === tool.id) {
        return {
          ...t,
          isResting: false,
          lastUsedDaysAgo: 0,
          usageCount: t.usageCount + 1,
        };
      }
      return t;
    }));

    const text = `${tool.name} has bloomed and awakened back into your active toolbar!`;
    dispatchAnnouncement(text, {
      type: 'tool_awakened',
      title: `Awakened: ${tool.name}`,
      description: `Staff member tapped sleeping flower. ${tool.name} returned to the active layout.`,
      actor: 'Miss Sara (Staff)',
      categoryLabel: 'UI Adaptation',
    });
  };

  const handleWakeAllFlowers = () => {
    playFlowerBloomChime();

    setTools(prev => prev.map(t => ({
      ...t,
      isResting: false,
      lastUsedDaysAgo: 0,
    })));

    const text = `All sleeping flowers have awakened and returned to your active kindergarten toolbar!`;
    dispatchAnnouncement(text, {
      type: 'tool_awakened',
      title: `All Resting Tools Awakened`,
      description: `Staff requested full toolbar wake. All resting flowers restored.`,
      actor: 'Miss Sara',
      categoryLabel: 'UI Adaptation',
    });
  };

  const handleSimulateInactivity = () => {
    // Find active tool with lowest usage
    const candidate = [...activeTools].sort((a, b) => a.usageCount - b.usageCount)[0];
    if (candidate) {
      handleRestTool(
        candidate,
        `You haven't used ${candidate.name} in 14 days — it's resting here in the soft moss.`
      );
    }
  };

  // Filtered approvals
  const filteredApprovals = approvals.filter(item => {
    if (selectedKidFilter && item.childName !== selectedKidFilter) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (statusFilter === 'sleeping' && item.status !== 'sleeping') return false;
    if (statusFilter === 'decided' && item.status === 'sleeping') return false;
    return true;
  });

  return (
    <div className={`min-h-screen flex flex-col relative selection:bg-amber-200 selection:text-amber-950 ${isEyeSoothing ? 'eye-soothing-active' : ''}`}>
      {/* Animated Whimsical Background with Rolling Hills, Floating Clouds & Routine Adaptation */}
      <WhimsicalBackground routineId={currentRoutine} />

      {/* Main Top Bar with Correct Alignment & Quick Routine Switcher */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
        onOpenNewGateModal={() => setIsNewGateOpen(true)}
        pendingCount={pendingSleepingCount}
        restingCount={restingTools.length}
        currentRoutine={currentRoutine}
        onSelectRoutine={(phase) => {
          setIsAutoSyncRoutine(false);
          setCurrentRoutine(phase);
          const text = `Routine adapted to ${ROUTINE_PHASES[phase].name}.`;
          dispatchAnnouncement(text);
        }}
        isEyeSoothing={isEyeSoothing}
        onToggleEyeSoothing={() => setIsEyeSoothing(!isEyeSoothing)}
      />

      {/* Spoken & Screen-Reader Live Narration Banner */}
      <NarrationBanner
        currentAnnouncement={currentAnnouncement}
        recentTimestamp={recentTimestamp}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
      />

      {/* Routine Adaptation Bar (Adapts whole website to user's daily routine) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-2 w-full">
        <RoutineAdaptationBar
          currentRoutine={currentRoutine}
          onSelectRoutine={(phase) => {
            setIsAutoSyncRoutine(false);
            setCurrentRoutine(phase);
            const text = `Daily schedule shifted to ${ROUTINE_PHASES[phase].name}.`;
            dispatchAnnouncement(text);
          }}
          isAutoSync={isAutoSyncRoutine}
          onToggleAutoSync={() => {
            const next = !isAutoSyncRoutine;
            setIsAutoSyncRoutine(next);
            if (next) {
              const calc = getCurrentRoutinePhase();
              setCurrentRoutine(calc);
              dispatchAnnouncement('Auto-sync active: Layout is following real-time kindergarten schedule.');
            }
          }}
        />
      </div>

      {/* Main Page Stage */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-4 w-full">
        {/* TAB 1: Care Room & Sleeping-Bear Gate */}
        {currentTab === 'gate' && (
          <div className="space-y-6">
            {/* Whimsical Mascot Welcome Banner adapted to Routine */}
            <div className={`relative rounded-[2rem] p-6 sm:p-8 bg-gradient-to-r ${ROUTINE_PHASES[currentRoutine].bannerBg} border border-amber-300/70 shadow-[0_4px_24px_rgba(245,158,11,0.06)] overflow-hidden transition-all duration-700`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-amber-200 text-xs font-bold text-amber-950 mb-2.5 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Routine: {ROUTINE_PHASES[currentRoutine].name}</span>
                  </div>
                  <h1 className="font-swanky text-2xl sm:text-3xl lg:text-4xl text-[#78350F] tracking-tight leading-tight">
                    The Sleeping-Bear Approval Gate
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed">
                    {ROUTINE_PHASES[currentRoutine].description} Sensitive actions stay curled asleep by default. Staff must perform an intentional <strong>1.2-second tap-and-hold</strong> to tuck in or wake up each decision.
                  </p>
                </div>

                {/* Whimsical Storybook Mascot Illustration */}
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-sm bg-white">
                    <img
                      src="/src/assets/images/sprout_bear_mascot_1790409116042.jpg"
                      alt="Storybook sleepy bear cub wearing an acorn nightcap"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-1 text-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        {ROUTINE_PHASES[currentRoutine].shortName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sunbeam Classroom Live Roster Bar */}
            <ClassroomRosterBar
              kids={kids}
              selectedKidId={selectedKidFilter}
              onSelectKid={setSelectedKidFilter}
            />

            {/* Approvals Control Bar & Filter Segments (Soothing, Non-Flashcard Style) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/85 p-3.5 sm:p-4 rounded-2xl border border-amber-200/60 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="font-swanky text-base sm:text-lg text-amber-950">
                  Things to Tuck In ({filteredApprovals.length}):
                </span>
                {pendingSleepingCount > 0 ? (
                  <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300/80">
                    {pendingSleepingCount} bears asleep
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300/80">
                    All tucked in!
                  </span>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-amber-100 text-amber-950 border border-amber-200 shadow-2xs'
                      : 'text-stone-600 hover:bg-amber-50'
                  }`}
                >
                  All Statuses
                </button>
                <button
                  onClick={() => setStatusFilter('sleeping')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    statusFilter === 'sleeping'
                      ? 'bg-amber-100 text-amber-950 border border-amber-200 shadow-2xs'
                      : 'text-stone-600 hover:bg-amber-50'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-amber-800" />
                  <span>Only Asleep ({pendingSleepingCount})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('decided')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    statusFilter === 'decided'
                      ? 'bg-amber-100 text-amber-950 border border-amber-200 shadow-2xs'
                      : 'text-stone-600 hover:bg-amber-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Decided ({approvals.length - pendingSleepingCount})</span>
                </button>
              </div>
            </div>

            {/* List of Sleeping Bear Sanctuary Pods with Scroll-Through Fade Effect */}
            {filteredApprovals.length === 0 ? (
              <div className="text-center py-16 rounded-[2rem] bg-white/70 border-2 border-dashed border-amber-200 p-8">
                <div className="w-16 h-16 mx-auto rounded-3xl overflow-hidden border-2 border-amber-300 shadow-2xs mb-3 bg-amber-50">
                  <img 
                    src="/src/assets/images/bear_mascot_avatar_1790413515209.jpg" 
                    alt="Sleeping Bear Mascot" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="font-swanky text-xl text-amber-900 mt-1">
                  No Pending Actions Asleep
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1">
                  All requests have been addressed or no actions match your filter. Tap "New Approval Gate" above to spawn a new sleeping bear cub.
                </p>
                <button
                  onClick={() => setIsNewGateOpen(true)}
                  className="mt-4 px-4 py-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                >
                  + Add New Care Request
                </button>
              </div>
            ) : (
              <div className="space-y-4 scroll-fade-mask py-1">
                {filteredApprovals.map((item) => (
                  <SleepingBearCard
                    key={item.id}
                    item={item}
                    onTuckIn={handleTuckIn}
                    onWakeUp={handleWakeUp}
                    onResetToSleep={handleResetToSleep}
                  />
                ))}
              </div>
            )}

            {/* The Sleeping Flower Bed section inside The Den (Dashboard bottom) */}
            <SleepingFlowerBed
              restingTools={restingTools}
              onAwakenTool={handleAwakenTool}
              onWakeAll={handleWakeAllFlowers}
            />
          </div>
        )}

        {/* TAB 2: The Adaptive Garden & Sleeping Flower Bed */}
        {currentTab === 'garden' && (
          <div className="space-y-6">
            {/* Garden Panorama Hero Banner */}
            <div className="relative rounded-[2rem] overflow-hidden border border-amber-200 shadow-sm">
              <div className="h-44 sm:h-52 w-full relative">
                <img
                  src="/src/assets/images/kindergarten_garden_banner_1790409127430.jpg"
                  alt="Sunny whimsical kindergarten garden with sunflowers and rolling green hills"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h1 className="font-swanky text-2xl sm:text-3xl text-yellow-200">
                    The Adaptive Kindergarten Garden
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-100 max-w-2xl mt-1 leading-snug">
                    A visible "growing garden" instead of silent deletions. Frequently used tools bloom in the bright sunshine, while quiet tools rest in the flower bed below with spoken explanations.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Tools Section */}
            <ActiveGardenTools
              activeTools={activeTools}
              onRestTool={handleRestTool}
              onSimulateInactivity={handleSimulateInactivity}
            />

            {/* The Sleeping Flower Bed Section (Resting Garden) */}
            <SleepingFlowerBed
              restingTools={restingTools}
              onAwakenTool={handleAwakenTool}
              onWakeAll={handleWakeAllFlowers}
            />
          </div>
        )}

        {/* TAB 3: Miss Sara's Storybook Safety Audit */}
        {currentTab === 'audit' && (
          <AuditLogView
            logs={auditLogs}
            voiceEnabled={voiceEnabled}
          />
        )}
      </main>

      {/* Small Companion Bear sitting on desk to accompany user on their tasks */}
      <CompanionBear
        routineId={currentRoutine}
        pendingApprovalsCount={pendingSleepingCount}
        voiceEnabled={voiceEnabled}
        onAnnounceMessage={(msg) => dispatchAnnouncement(msg)}
      />

      {/* New Approval Gate Modal */}
      <NewApprovalModal
        isOpen={isNewGateOpen}
        onClose={() => setIsNewGateOpen(false)}
        onSubmit={handleCreateNewGate}
      />

      {/* Whimsical Kindergarten Storybook Footer */}
      <footer className="mt-12 bg-[#FFFDF7]/95 border-t border-amber-200/80 py-8 px-4 sm:px-8 text-center text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl overflow-hidden border border-amber-300 shadow-2xs flex-shrink-0 bg-amber-50">
              <img 
                src="/src/assets/images/bear_mascot_avatar_1790413515209.jpg" 
                alt="Little Sprouts Bear Mascot" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="font-swanky text-base text-amber-900">
              Little Sprouts Kindergarten Staff Board
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-500">Hold-by-Default & Universal Narration</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-amber-900/80">
            <span>Room #2: Sunbeam Cubs</span>
            <span className="text-stone-300">·</span>
            <span>Miss Sara's Safety Gate Active</span>
            <span className="text-stone-300">·</span>
            <span className="text-emerald-700 font-bold">● System All Nominal</span>
          </div>
        </div>
        <p className="text-[11px] text-stone-400 mt-4 italic">
          "Nothing executes by accident. Every decision is a deliberate touch; every sprout is safe."
        </p>
      </footer>
    </div>
  );
}
