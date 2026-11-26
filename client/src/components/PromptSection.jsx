import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  UploadCloud,
  Image as ImageIcon,
  X,
  Camera,
  Layers,
  Wand2,
  FileCheck,
  Palette
} from 'lucide-react';
import { apiService } from '../services/api';

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

// High-fidelity sample UI mockups ready for instant 1-click test
const SAMPLE_MOCKUPS = [
  {
    id: 'fitness',
    name: 'Fitness & Gym Portal UI',
    tag: 'Dashboard + KPI Cards',
    prompt: 'Build a gym membership and fitness tracking portal matching this dashboard layout with active members, daily attendance, personal trainers, and class schedules.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <rect width="800" height="500" fill="#020617"/>
      <!-- Header -->
      <rect x="0" y="0" width="800" height="60" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <circle cx="40" cy="30" r="14" fill="#6366f1"/>
      <text x="70" y="36" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16">IronPulse Fitness</text>
      <rect x="520" y="16" width="200" height="28" rx="14" fill="#1e293b"/>
      <circle cx="750" cy="30" r="14" fill="#38bdf8"/>
      <!-- Sidebar -->
      <rect x="0" y="60" width="180" height="440" fill="#0b1120" stroke="#1e293b" stroke-width="1"/>
      <rect x="15" y="85" width="150" height="32" rx="8" fill="#6366f1"/>
      <text x="35" y="106" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold">Overview</text>
      <text x="35" y="145" fill="#94a3b8" font-family="sans-serif" font-size="12">Members (284)</text>
      <text x="35" y="180" fill="#94a3b8" font-family="sans-serif" font-size="12">Trainers (12)</text>
      <text x="35" y="215" fill="#94a3b8" font-family="sans-serif" font-size="12">Workouts</text>
      <text x="35" y="250" fill="#94a3b8" font-family="sans-serif" font-size="12">Equipment</text>
      <!-- KPI Cards -->
      <rect x="205" y="85" width="130" height="75" rx="12" fill="#0f172a" stroke="#1e293b"/>
      <text x="220" y="108" fill="#94a3b8" font-family="sans-serif" font-size="10">Active Members</text>
      <text x="220" y="136" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="20">284</text>
      <text x="220" y="152" fill="#10b981" font-family="sans-serif" font-size="9">↑ +14% this month</text>
      <rect x="350" y="85" width="130" height="75" rx="12" fill="#0f172a" stroke="#1e293b"/>
      <text x="365" y="108" fill="#94a3b8" font-family="sans-serif" font-size="10">Today Check-ins</text>
      <text x="365" y="136" fill="#818cf8" font-family="sans-serif" font-weight="bold" font-size="20">89</text>
      <text x="365" y="152" fill="#94a3b8" font-family="sans-serif" font-size="9">Peak: 6:00 PM</text>
      <rect x="495" y="85" width="130" height="75" rx="12" fill="#0f172a" stroke="#1e293b"/>
      <text x="510" y="108" fill="#94a3b8" font-family="sans-serif" font-size="10">Trainers on Duty</text>
      <text x="510" y="136" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="20">12</text>
      <text x="510" y="152" fill="#10b981" font-family="sans-serif" font-size="9">8 slots booked</text>
      <rect x="640" y="85" width="135" height="75" rx="12" fill="#0f172a" stroke="#1e293b"/>
      <text x="655" y="108" fill="#94a3b8" font-family="sans-serif" font-size="10">Revenue (MRR)</text>
      <text x="655" y="136" fill="#34d399" font-family="sans-serif" font-weight="bold" font-size="20">$14,250</text>
      <text x="655" y="152" fill="#94a3b8" font-family="sans-serif" font-size="9">100% on track</text>
      <!-- Data Table Area -->
      <rect x="205" y="180" width="570" height="295" rx="14" fill="#0f172a" stroke="#1e293b"/>
      <text x="225" y="210" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">Recent Member Registrations</text>
      <line x1="225" y1="225" x2="755" y2="225" stroke="#1e293b" stroke-width="1"/>
      <text x="225" y="250" fill="#cbd5e1" font-family="sans-serif" font-size="11">Alex Turner • Platinum Tier • Trainer: Mike Ross</text>
      <text x="680" y="250" fill="#10b981" font-family="sans-serif" font-size="11">Active</text>
      <text x="225" y="280" fill="#cbd5e1" font-family="sans-serif" font-size="11">Sarah Jenkins • Gold Tier • Trainer: Emma Watson</text>
      <text x="680" y="280" fill="#10b981" font-family="sans-serif" font-size="11">Active</text>
      <text x="225" y="310" fill="#cbd5e1" font-family="sans-serif" font-size="11">David Miller • Standard Tier • Self-guided</text>
      <text x="680" y="310" fill="#38bdf8" font-family="sans-serif" font-size="11">Renewal Soon</text>
      <rect x="225" y="340" width="160" height="110" rx="10" fill="#1e293b" stroke="#334155"/>
      <text x="240" y="370" fill="#818cf8" font-family="sans-serif" font-weight="bold" font-size="12">Locker Availability</text>
      <text x="240" y="400" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="22">42 / 60</text>
    </svg>`
  },
  {
    id: 'food',
    name: 'Food Ordering Menu UI',
    tag: 'Restaurant Grid + Cart',
    prompt: 'Build an online food ordering platform matching this UI design with cuisine filters, dishes grid, real-time cart sidebar, and multi-stage order tracking.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <rect width="800" height="500" fill="#030712"/>
      <rect x="0" y="0" width="800" height="60" fill="#111827" stroke="#1f2937" stroke-width="1"/>
      <circle cx="40" cy="30" r="14" fill="#f59e0b"/>
      <text x="70" y="36" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16">TasteDash Food</text>
      <!-- Search -->
      <rect x="240" y="16" width="320" height="28" rx="14" fill="#1f2937"/>
      <text x="260" y="35" fill="#9ca3af" font-family="sans-serif" font-size="11">Search dishes, restaurants...</text>
      <!-- Cart Icon -->
      <circle cx="750" cy="30" r="14" fill="#ef4444"/>
      <!-- Content -->
      <text x="40" y="100" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="18">Popular Dishes Near You</text>
      <!-- Cards -->
      <rect x="40" y="125" width="220" height="150" rx="14" fill="#111827" stroke="#1f2937"/>
      <rect x="40" y="125" width="220" height="85" rx="14" fill="#374151"/>
      <text x="55" y="235" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Artisan Truffle Pizza</text>
      <text x="55" y="258" fill="#f59e0b" font-family="sans-serif" font-weight="bold" font-size="14">$18.50</text>
      <rect x="280" y="125" width="220" height="150" rx="14" fill="#111827" stroke="#1f2937"/>
      <rect x="280" y="125" width="220" height="85" rx="14" fill="#374151"/>
      <text x="295" y="235" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Smoked Angus Burger</text>
      <text x="295" y="258" fill="#f59e0b" font-family="sans-serif" font-weight="bold" font-size="14">$14.00</text>
      <rect x="520" y="125" width="240" height="345" rx="14" fill="#111827" stroke="#1f2937"/>
      <text x="540" y="160" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">Order Summary (2 items)</text>
      <line x1="540" y1="180" x2="740" y2="180" stroke="#1f2937"/>
      <text x="540" y="210" fill="#d1d5db" font-family="sans-serif" font-size="12">1x Artisan Truffle Pizza - $18.50</text>
      <text x="540" y="235" fill="#d1d5db" font-family="sans-serif" font-size="12">1x Smoked Angus Burger - $14.00</text>
      <rect x="540" y="415" width="200" height="38" rx="10" fill="#f59e0b"/>
      <text x="590" y="439" fill="#111827" font-family="sans-serif" font-weight="bold" font-size="13">Checkout • $32.50</text>
    </svg>`
  },
  {
    id: 'cricket',
    name: 'Cricket Match Scorecard UI',
    tag: 'Live Scoring + Team Fixtures',
    prompt: 'Build a cricket tournament management website matching this layout with live ball-by-ball scorekeeper keypad, teams management, and tournament points table.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <rect width="800" height="500" fill="#022c22"/>
      <rect x="0" y="0" width="800" height="60" fill="#064e3b" stroke="#047857" stroke-width="1"/>
      <circle cx="40" cy="30" r="14" fill="#10b981"/>
      <text x="70" y="36" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16">CricPulse Tournament Hub</text>
      <!-- Scorecard Header -->
      <rect x="40" y="85" width="720" height="120" rx="16" fill="#064e3b" stroke="#10b981"/>
      <text x="70" y="125" fill="#a7f3d0" font-family="sans-serif" font-size="12" font-weight="bold">T20 LEAGUE FINAL • OVER 16.4</text>
      <text x="70" y="165" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="28">TITANS 164/3</text>
      <text x="420" y="165" fill="#6ee7b7" font-family="sans-serif" font-size="16">vs WARRIORS (Target: 182)</text>
      <!-- Pitch Keypad Area -->
      <rect x="40" y="230" width="440" height="230" rx="14" fill="#064e3b" stroke="#047857"/>
      <text x="65" y="265" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">Digital Scorekeeper Keypad</text>
      <!-- Runs buttons -->
      <circle cx="95" cy="320" r="22" fill="#047857"/><text x="90" y="326" fill="#fff" font-weight="bold">0</text>
      <circle cx="155" cy="320" r="22" fill="#047857"/><text x="150" y="326" fill="#fff" font-weight="bold">1</text>
      <circle cx="215" cy="320" r="22" fill="#047857"/><text x="210" y="326" fill="#fff" font-weight="bold">2</text>
      <circle cx="275" cy="320" r="22" fill="#10b981"/><text x="270" y="326" fill="#fff" font-weight="bold">4</text>
      <circle cx="335" cy="320" r="22" fill="#059669"/><text x="330" y="326" fill="#fff" font-weight="bold">6</text>
      <circle cx="395" cy="320" r="22" fill="#ef4444"/><text x="385" y="326" fill="#fff" font-weight="bold">W</text>
    </svg>`
  }
];

export default function PromptSection({
  prompt,
  setPrompt,
  screenshot,
  setScreenshot,
  onAnalyze,
  isAnalyzing
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [screenshotName, setScreenshotName] = useState(null);
  const [isVisionScanning, setIsVisionScanning] = useState(false);
  const [visionMeta, setVisionMeta] = useState(null);
  const fileInputRef = useRef(null);

  // Clipboard paste listener: Allows users to press Ctrl + V with an image copied
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file, `pasted-ui-${Date.now()}.png`);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processImageFile = (file, customName = null) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setScreenshot(dataUrl);
      setScreenshotName(customName || file.name);
      setVisionMeta(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSampleMockup = (sample) => {
    const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(sample.svg)}`;
    setScreenshot(encoded);
    setScreenshotName(sample.name);
    setPrompt(sample.prompt);
    setVisionMeta({
      title: sample.name,
      tag: sample.tag
    });
  };

  const handleAutoExtractVision = async () => {
    if (!screenshot || isVisionScanning) return;
    setIsVisionScanning(true);
    try {
      const visionResult = await apiService.analyzeScreenshot(screenshot, prompt);
      if (visionResult.suggestedPrompt) {
        setPrompt(visionResult.suggestedPrompt);
      }
      setVisionMeta(visionResult);
    } catch (err) {
      console.warn('Vision scan error:', err);
    } finally {
      setIsVisionScanning(false);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    setScreenshotName(null);
    setVisionMeta(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!prompt.trim() && !screenshot) || isAnalyzing) return;
    onAnalyze(prompt, screenshot);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 pt-4 sm:pt-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Step 1 — Enter Requirements or Attach UI Screenshot</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Create a Project.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Describe Your Idea or Drop a Screenshot
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Tell CodeMind AI what to build in plain English, or provide a UI screenshot mockup. The AI extracts layout, colors, and components to generate the full-stack app.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-indigo-950/20 relative space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Natural Language Prompt Area */}
          <div className="relative">
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your project (e.g. 'I want an online food ordering platform with menus, cart, and live order tracking...') or upload a screenshot below to auto-generate from design."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-[11px] text-slate-500 font-mono">
              {prompt.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="hover:text-red-400 flex items-center space-x-1 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
              <span>{prompt.length} chars</span>
            </div>
          </div>

          {/* Screenshot Upload & Paste Zone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center space-x-2">
                <Camera className="w-4 h-4 text-indigo-400" />
                <span>UI Screenshot / Design Mockup (AI Vision)</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                Supports Drag & Drop, File Browse, or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-300 font-mono text-[10px]">Ctrl + V</kbd> paste
              </span>
            </div>

            {/* If NO Screenshot is attached */}
            {!screenshot ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-800 bg-slate-950/40 hover:border-indigo-500/50 hover:bg-slate-950/70'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && processImageFile(e.target.files[0])}
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    Drop your UI screenshot here or <span className="text-indigo-400 underline decoration-indigo-400/40">browse file</span>
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-sm">
                    Upload a Figma export, Dribbble mockup, or app screenshot. The AI will match the frontend layout, colors, and components.
                  </p>
                </div>
              </div>
            ) : (
              /* If Screenshot IS attached */
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-950/30">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <div className="w-20 h-16 rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-950 shrink-0 relative group">
                    <img
                      src={screenshot}
                      alt="UI Screenshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                        {screenshotName || 'Attached UI Screenshot'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>AI Vision Ready</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-indigo-300">
                      Frontend design and layout will be matched to this screenshot.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleAutoExtractVision}
                    disabled={isVisionScanning}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-600/25 transition disabled:opacity-50"
                  >
                    <Wand2 className={`w-3.5 h-3.5 ${isVisionScanning ? 'animate-spin' : ''}`} />
                    <span>{isVisionScanning ? 'Scanning...' : 'Auto-Extract Prompt'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveScreenshot}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 border border-slate-700 transition"
                    title="Remove Screenshot"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick 1-Click Sample Mockup Presets */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span>Or test with a sample UI mockup:</span>
                <span className="text-slate-500">1-click preview test</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_MOCKUPS.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSampleMockup(sample)}
                    className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-950/60 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/40 transition text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition">
                      {sample.id === 'fitness' ? '🏋️‍♂️' : sample.id === 'food' ? '🍔' : '🏏'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                        {sample.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {sample.tag}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                {screenshot
                  ? 'Screenshot attached: AI Vision will replicate this layout & theme'
                  : 'Step 1: AI analyzes requirements & proceeds to Tech Stack'}
              </span>
            </div>

            <button
              type="submit"
              disabled={(!prompt.trim() && !screenshot) || isAnalyzing}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{screenshot ? 'Analyzing UI Screenshot & Requirements...' : 'Understanding Requirements...'}</span>
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
        <div className="pt-4 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 font-medium mb-3">Or choose an example requirement:</p>
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
