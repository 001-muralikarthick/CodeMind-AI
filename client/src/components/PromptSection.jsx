import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

const PRESET_IDEAS = [
  {
    label: "🍔 Online Food Ordering Website",
    prompt: "I want to build an online food ordering website. Users should register, log in, browse restaurants, view menus, add food to cart, place orders and track orders. Admins should manage restaurants, menus and orders."
  },
  {
    label: "🏏 Cricket League & Match Management",
    prompt: "I want to build an cricket management website. Users should register, login, create team, add player to a team, create manual match, and store match records. Admins should manage team and players."
  },
  {
    label: "🛒 Online Shopping Website",
    prompt: "I want to build an online shopping website. Users should register, login, browse products, search products, add products to cart, place orders, and make payments. Admins should manage products and orders."
  },
  {
    label: "🏥 Clinic Appointment Portal",
    prompt: "I want to build a hospital appointment portal. Patients can register, browse doctors by specialty, schedule appointments, and view medical reports. Doctors can view consultations and prescribe medicines. Admins manage staff and billing."
  },
  {
    label: "💪 Gym Membership & Fitness Tracker",
    prompt: "I want to build a gym membership management website. Members should register, login, choose subscription plans, book slots with personal trainers, and log their daily workout attendance. Trainers should view their assigned clients and create workout routines. Admins should manage membership plans, track payment renewals, and oversee gym equipment."
  }
];

export default function PromptSection({ prompt, setPrompt, onAnalyze, isAnalyzing }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isAnalyzing) return;
    onAnalyze(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 pt-4 sm:pt-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Step 1 — Enter Project Requirements</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Create a Project.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Describe Your Idea & Requirements
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Tell CodeMind AI what you want to build in plain English. The AI understands the requirements, prepares the technology selection step, and drafts an implementation plan before writing any code.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-indigo-950/20 relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="I want to build an online food ordering website. Users should register, log in, browse restaurants, view menus, add food to cart, place orders and track orders. Admins should manage restaurants, menus and orders."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-[11px] text-slate-500 font-mono">
              {prompt.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="hover:text-red-400 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
              <span>{prompt.length} chars</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Step 1: AI understands requirements & proceeds to Tech Stack Selection</span>
            </div>

            <button
              type="submit"
              disabled={!prompt.trim() || isAnalyzing}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Understanding Requirements...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Technology Choice</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preset Concept Chips */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 font-medium mb-3">Or click an example idea:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_IDEAS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(item.prompt)}
                className="text-left p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-indigo-500/40 transition group"
              >
                <div className="font-semibold text-xs text-slate-200 group-hover:text-indigo-300">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {item.prompt}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
