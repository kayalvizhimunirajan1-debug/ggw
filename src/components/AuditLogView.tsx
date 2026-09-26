import React, { useState } from 'react';
import { AuditLogEvent } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  Search, 
  Download, 
  UserCheck, 
  AlertTriangle,
  History,
  FileCheck,
  ScrollText,
  RotateCcw,
  Moon,
  Sun,
  Flower2
} from 'lucide-react';
import { speakNarration } from '../utils/audio';

interface AuditLogViewProps {
  logs: AuditLogEvent[];
  voiceEnabled: boolean;
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs, voiceEnabled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'bear' | 'garden'>('all');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.childName && log.childName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'bear') {
      return log.type === 'bear_tucked_in' || log.type === 'bear_woken_up';
    }
    if (filterType === 'garden') {
      return log.type === 'tool_rested' || log.type === 'tool_awakened';
    }
    return true;
  });

  const handleExport = () => {
    const exportText = logs.map(l => `[${l.timestamp}] [${l.categoryLabel}] ${l.title} - By: ${l.actor}\nDetails: ${l.description}\nSpoken: "${l.spokenText}"\n`).join('\n---\n\n');
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Little_Sprouts_Audit_Log_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header & Mission */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-emerald-50 p-6 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-amber-800" />
            </div>
            <h2 className="font-swanky text-xl sm:text-2xl text-amber-950">
              The Activity Log (Audit Trail)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            A running log that reinforces the "announce every change" principle. Every sleeping bear decision and every flower bed adaptation is recorded with exact timestamps and voice narration text.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-950 bg-emerald-200/90 hover:bg-emerald-300 border border-emerald-300 shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-emerald-800" />
          <span>Export Handover Record</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by child, staff name, or action..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-amber-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow"
          />
        </div>

        {/* Filter Segmented Controls (interactive buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-100/70 rounded-2xl border border-amber-200">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Events ({logs.length})
          </button>
          <button
            onClick={() => setFilterType('bear')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'bear'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
            <span>Bear Approvals</span>
          </button>
          <button
            onClick={() => setFilterType('garden')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'garden'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>UI Adaptations</span>
          </button>
        </div>
      </div>

      {/* Log Feed */}
      <div className="space-y-3.5">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-white/80 border border-amber-200/80 p-6">
            <FileCheck className="w-10 h-10 text-stone-400 mx-auto" />
            <p className="text-sm font-semibold text-stone-600 mt-2">
              No audit records matched your filter.
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isBearTuck = log.type === 'bear_tucked_in';
            const isBearWake = log.type === 'bear_woken_up';
            const isToolRested = log.type === 'tool_rested';
            const isToolAwake = log.type === 'tool_awakened';

            return (
              <div
                key={log.id}
                className="rounded-2xl p-4 bg-white border border-amber-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5 border ${
                      isBearTuck
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : isBearWake
                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                        : isToolRested
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-sky-50 border-sky-300 text-sky-700'
                    }`}
                  >
                    {isBearTuck ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    ) : isBearWake ? (
                      <RotateCcw className="w-5 h-5 text-rose-600" />
                    ) : isToolRested ? (
                      <Moon className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-sky-600" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-lg border border-amber-200/70">
                        {log.categoryLabel}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        {log.timestamp}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        · Signed by: {log.actor}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 mt-1 leading-snug">
                      {log.title}
                    </h4>

                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      {log.description}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-500 italic bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200/60">
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">"{log.spokenText}"</span>
                    </div>
                  </div>
                </div>

                {/* Replay Narration Audio */}
                <button
                  onClick={() => speakNarration(log.spokenText, true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 transition-colors cursor-pointer whitespace-nowrap self-end sm:self-center"
                  title="Listen to Miss Sara announce this record"
                >
                  <Volume2 className="w-3 h-3 text-amber-700" />
                  <span>Hear Aloud</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
