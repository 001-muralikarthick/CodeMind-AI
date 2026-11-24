import React, { useEffect, useRef } from 'react';
import {
  FolderTree,
  Monitor,
  Server,
  Database,
  CheckCircle2,
  Clock,
  Loader2,
  ShieldCheck,
  Terminal,
  Cpu
} from 'lucide-react';

const BUILD_STAGES = [
  { stepNumber: 1, name: "Creating folder structure", desc: "frontend/, backend/, database/", icon: FolderTree },
  { stepNumber: 2, name: "Generating frontend", desc: "Pages, components, styling and navigation", icon: Monitor },
  { stepNumber: 3, name: "Generating backend", desc: "APIs, authentication and business logic", icon: Server },
  { stepNumber: 4, name: "Creating database", desc: "Collections, schemas and relationships", icon: Database },
  { stepNumber: 5, name: "Testing and fixing errors", desc: "Run safe automated checks and fix detected issues", icon: ShieldCheck }
];

export default function StepProgressTracker({ currentStep, steps, logs, error }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const activeSteps = (steps && steps.length === 5) ? steps : BUILD_STAGES.map(s => ({
    ...s,
    status: currentStep > s.stepNumber ? 'completed' : currentStep === s.stepNumber ? 'in-progress' : 'pending'
  }));

  const completedCount = activeSteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.min(100, Math.round((completedCount / 5) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Step Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
              <h2 className="text-xl sm:text-2xl font-black text-white">Step 4 — AI Project Generation</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Building your approved architecture across the 5 structured engineering stages.
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-mono">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-400 block">{completedCount} of 5 Stages Complete</span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg shadow-indigo-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 5 Stages Display */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Generation Pipeline Stages:
        </h3>

        <div className="space-y-3">
          {BUILD_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const currentItem = activeSteps[idx] || {};
            const isCompleted = currentItem.status === 'completed';
            const isInProgress = currentItem.status === 'in-progress';
            const isPending = !isCompleted && !isInProgress;

            return (
              <div
                key={stage.stepNumber}
                className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                  isCompleted
                    ? 'bg-slate-950/70 border-emerald-500/30 shadow-md'
                    : isInProgress
                    ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/40 shadow-lg'
                    : 'bg-slate-950/30 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isInProgress
                        ? 'bg-indigo-600 text-white animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-indigo-400 font-bold">
                        {stage.stepNumber}.
                      </span>
                      <h4 className="text-sm font-bold text-white">{stage.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{stage.desc}</p>
                  </div>
                </div>

                <div>
                  {isCompleted && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                  {isInProgress && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1 animate-pulse">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating...</span>
                    </span>
                  )}
                  {isPending && <Clock className="w-4 h-4 text-slate-600 mr-2" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Feed */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono text-slate-400">generation-agent.log</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Live Execution Feed</span>
        </div>

        <div className="p-4 font-mono text-xs text-slate-300 h-40 overflow-y-auto space-y-1.5 leading-relaxed bg-slate-950">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-slate-600 select-none">&gt;</span>
              <span className="text-indigo-400">[{log.time}]</span>
              <span className={log.message?.includes('Completed') || log.message?.includes('✓') ? 'text-emerald-300 font-semibold' : 'text-slate-300'}>
                {log.message}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
