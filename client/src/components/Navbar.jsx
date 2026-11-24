import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, FolderArchive, HelpCircle, Code2, Layers, CheckCircle } from 'lucide-react';

export default function Navbar({ onOpenHistory, onReset, onQuickDemo }) {
  const [engineStatus, setEngineStatus] = useState({
    provider: 'Checking...',
    hasKey: false
  });

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setEngineStatus({
          provider: data.aiProvider || 'Built-in Engine',
          hasKey: data.hasKey || false
        });
      })
      .catch(() => {
        setEngineStatus({
          provider: 'Offline Engine Active',
          hasKey: false
        });
      });
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/25">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                CodeMind AI
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Autonomous Software Generation Engine</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onQuickDemo}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-500/30 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Try Demo:</span>
            <span>Cricket Platform</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <FolderArchive className="w-3.5 h-3.5 text-slate-400" />
            <span>Saved Projects</span>
          </button>

          {/* Dynamic AI Status Badge */}
          <div className="hidden md:flex items-center space-x-1.5 pl-3 border-l border-slate-800 text-xs">
            <span className={`w-2 h-2 rounded-full ${engineStatus.hasKey ? 'bg-indigo-400 ring-2 ring-indigo-400/30 animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></span>
            <span className={engineStatus.hasKey ? 'text-indigo-300 font-semibold' : 'text-slate-400 font-medium'}>
              {engineStatus.hasKey ? `✨ ${engineStatus.provider} Active` : 'Local Engine Active'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
