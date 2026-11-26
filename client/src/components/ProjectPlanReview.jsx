import React, { useState } from 'react';
import {
  FileText,
  FolderTree,
  Database,
  Globe,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Code2,
  Camera
} from 'lucide-react';

export default function ProjectPlanReview({ plan, onApprove, onBack, isStarting }) {
  const [activePlanTab, setActivePlanTab] = useState('overview'); // 'overview' | 'structure' | 'database' | 'api' | 'steps'

  if (!plan) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Technologies</span>
        </button>

        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Step 3 — Review Generated Project Plan</span>
        </div>
      </div>

      {/* Main Review Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
              Project Specification Blueprint
            </span>
            <h2 className="text-2xl font-black text-white mt-1">{plan.title}</h2>
            {plan.visualDesign && (
              <div className="inline-flex items-center space-x-1.5 mt-2 px-2.5 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <Camera className="w-3.5 h-3.5 text-indigo-400" />
                <span>Visual Layout Matched from Screenshot ({plan.visualDesign.detectedTitle || plan.visualDesign.domain})</span>
              </div>
            )}
            <p className="text-xs text-slate-300 mt-2 italic max-w-2xl">"{plan.prompt}"</p>
          </div>

          <button
            onClick={onApprove}
            disabled={isStarting}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl shadow-lg shadow-emerald-600/30 transition text-sm shrink-0 disabled:opacity-50"
          >
            {isStarting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Initializing Build...</span>
              </>
            ) : (
              <>
                <span>Approve & Generate Project</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Selected Tech Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
            Frontend: <strong className="text-white">{plan.selectedTechnologies?.frontend}</strong>
          </span>
          <span className="text-xs px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
            Backend: <strong className="text-white">{plan.selectedTechnologies?.backend}</strong>
          </span>
          <span className="text-xs px-3 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium">
            Database: <strong className="text-white">{plan.selectedTechnologies?.database}</strong>
          </span>
          <span className="text-xs px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
            AI Engine: <strong className="text-white">{plan.selectedTechnologies?.aiModel}</strong>
          </span>
          <span className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
            Scope: <strong className="text-white">{plan.selectedTechnologies?.scope}</strong>
          </span>
        </div>

        {/* Plan Section Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto border-b border-slate-800 pb-2">
          {[
            { id: 'overview', label: '1. Overview & Modules', icon: FileText },
            { id: 'structure', label: '2. Folder Structure', icon: FolderTree },
            { id: 'database', label: '3. Database Design', icon: Database },
            { id: 'api', label: '4. API Design', icon: Globe },
            { id: 'steps', label: '5. Implementation Steps', icon: Calendar }
          ].map((t) => {
            const Icon = t.icon;
            const isSel = activePlanTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActivePlanTab(t.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Features */}
        {activePlanTab === 'overview' && (
          <div className="space-y-5">
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{plan.overview}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Features & Modules</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.featuresAndModules?.map((mod, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1.5">
                    <h5 className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span>{mod.name}</span>
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {mod.features?.map((f, fi) => (
                        <li key={fi} className="flex items-center space-x-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Folder Structure Preview */}
        {activePlanTab === 'structure' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Scaffolded Folder & File Tree Preview
            </h4>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 max-h-[350px] overflow-y-auto">
              {plan.folderStructure?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-300 hover:bg-slate-900/60 p-1 rounded">
                  <div className="flex items-center space-x-2">
                    <span className={item.type === 'folder' ? 'text-indigo-400 font-bold' : 'text-slate-400'}>
                      {item.type === 'folder' ? '📁' : '📄'} {item.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-sans">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Database Design */}
        {activePlanTab === 'database' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Database Design (Entities, Attributes & Types)
            </h4>
            <div className="space-y-3">
              {plan.databaseDesign?.collections?.map((col) => (
                <div key={col.name} className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-teal-400">{col.name} Collection</span>
                    <span className="text-[11px] text-slate-400 font-mono">{col.fields?.length} Fields</span>
                  </div>
                  <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                    {col.fields?.map((f) => (
                      <div key={f.name} className="bg-slate-900/40 p-2 rounded-xl border border-slate-800/80">
                        <span className="text-slate-200 font-semibold block">{f.name}</span>
                        <span className="text-[11px] text-purple-400">{f.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: API Design */}
        {activePlanTab === 'api' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              RESTful API Routing Specifications
            </h4>
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {plan.apiDesign?.map((api, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2.5">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      api.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                      api.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' :
                      api.method === 'PUT' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {api.method}
                    </span>
                    <span className="text-white font-bold">{api.path}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-sans">{api.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Implementation Steps */}
        {activePlanTab === 'steps' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Implementation Milestones
            </h4>
            <div className="space-y-3">
              {plan.implementationSteps?.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{st.phase}</span>
                    <span className="text-[11px] font-mono text-indigo-400 px-2 py-0.5 rounded bg-slate-900">{st.duration}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {st.tasks?.map((t, ti) => (
                      <li key={ti} className="flex items-center space-x-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approve & Generate CTA */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Review completed. Click to initiate the 5 autonomous generation stages.
          </p>

          <button
            onClick={onApprove}
            disabled={isStarting}
            className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl shadow-xl shadow-emerald-600/30 transition text-sm disabled:opacity-50"
          >
            {isStarting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Building Project...</span>
              </>
            ) : (
              <>
                <span>Approve & Generate Project</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
