import React, { useState, useMemo } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  ExternalLink,
  Shield,
  Eye,
  CheckCircle2,
  Users,
  Calendar,
  Dumbbell,
  BarChart3,
  Search,
  Plus,
  Activity,
  Layers,
  Sparkles,
  Maximize2,
  Camera,
  Columns
} from 'lucide-react';

export default function LiveAppPreview({ project }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [activeRole, setActiveRole] = useState('user'); // 'user' | 'admin'
  const [reloadKey, setReloadKey] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [viewMode, setViewMode] = useState('app'); // 'app' | 'split' | 'screenshot'

  const title = project?.visualDesign?.detectedTitle || project?.title || 'Generated Application';
  const domain = (
    (project?.visualDesign?.detectedTitle || '') + ' ' +
    (project?.visualDesign?.domain || '') + ' ' +
    (project?.title || '') + ' ' +
    (project?.requirementsAnalysis?.overview || '') + ' ' +
    (project?.prompt || '')
  ).toLowerCase();

  // Detect domain
  const isGym = domain.includes('gym') || domain.includes('fitness') || domain.includes('workout') || domain.includes('trainer');
  const isCricket = domain.includes('cricket') || domain.includes('match') || domain.includes('player') || domain.includes('wicket');
  const isFood = domain.includes('food') || domain.includes('restaurant') || domain.includes('menu') || domain.includes('dish') || domain.includes('tastedash') || domain.includes('pizza') || domain.includes('burger') || domain.includes('eat');
  const isHospital = domain.includes('hospital') || domain.includes('patient') || domain.includes('doctor') || domain.includes('clinic');

  // Extract entities from schema design if available
  const entities = useMemo(() => {
    return project?.schemaDesign?.collections || [
      { name: "Resource", fields: [{ name: "name", type: "String" }, { name: "status", type: "String" }] },
      { name: "Activity", fields: [{ name: "title", type: "String" }, { name: "date", type: "Date" }] }
    ];
  }, [project]);

  // Generate interactive standalone HTML/CSS/JS document
  const previewHtml = useMemo(() => {
    const visual = project?.visualDesign?.designSystem;
    const primaryColor = visual?.primaryColor || (isGym ? '#6366f1' : isCricket ? '#10b981' : isFood ? '#f59e0b' : '#3b82f6');
    const accentColor = visual?.secondaryColor || (isGym ? '#8b5cf6' : isCricket ? '#059669' : isFood ? '#ef4444' : '#6366f1');

    let specificContent = '';

    if (isGym) {
      specificContent = `
        <!-- KPI Metrics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400 font-medium">Active Members</div>
            <div class="text-2xl font-bold text-white mt-1">284</div>
            <div class="text-[11px] text-emerald-400 mt-1 flex items-center">↑ +14% this month</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400 font-medium">Today's Check-ins</div>
            <div class="text-2xl font-bold text-indigo-400 mt-1" id="checkinCount">89</div>
            <div class="text-[11px] text-slate-400 mt-1">Peak: 6:00 PM - 8:00 PM</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400 font-medium">Personal Trainers</div>
            <div class="text-2xl font-bold text-white mt-1">12</div>
            <div class="text-[11px] text-emerald-400 mt-1">8 slots booked today</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400 font-medium">Monthly Revenue</div>
            <div class="text-2xl font-bold text-emerald-400 mt-1">$14,250</div>
            <div class="text-[11px] text-slate-400 mt-1">Renewals on track</div>
          </div>
        </div>

        <!-- Tabbed Modules -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div class="flex items-center space-x-2">
              <button onclick="switchView('members')" id="tab-members" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white">Members Directory</button>
              <button onclick="switchView('trainers')" id="tab-trainers" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white">Trainer Slots</button>
              <button onclick="switchView('routines')" id="tab-routines" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white">Workout Routines</button>
              <button onclick="switchView('equipment')" id="tab-equipment" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white">Equipment Status</button>
            </div>
            <button onclick="openModal()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center space-x-1 shadow-md hover:opacity-90">
              <span>+ Add Member</span>
            </button>
          </div>

          <!-- Members View -->
          <div id="view-members" class="pt-4 block">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-300">
                <thead class="text-slate-400 uppercase text-[10px] border-b border-slate-800 bg-slate-950/40">
                  <tr>
                    <th class="py-3 px-4">Member Name</th>
                    <th class="py-3 px-4">Membership Tier</th>
                    <th class="py-3 px-4">Assigned Trainer</th>
                    <th class="py-3 px-4">Renewal Date</th>
                    <th class="py-3 px-4">Status</th>
                    <th class="py-3 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody id="memberTableBody" class="divide-y divide-slate-800/60">
                  <tr>
                    <td class="py-3 px-4 font-semibold text-white flex items-center space-x-2">
                      <div class="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">JD</div>
                      <span>John Doe</span>
                    </td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">Annual VIP</span></td>
                    <td class="py-3 px-4">Marcus Hayes</td>
                    <td class="py-3 px-4 text-slate-400">Dec 15, 2026</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span></td>
                    <td class="py-3 px-4 text-right">
                      <button onclick="logAttendance('John Doe')" class="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-medium">Log Check-in</button>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-semibold text-white flex items-center space-x-2">
                      <div class="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center">SC</div>
                      <span>Sarah Connor</span>
                    </td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold">Monthly Pro</span></td>
                    <td class="py-3 px-4">Elena Rostova</td>
                    <td class="py-3 px-4 text-slate-400">Nov 30, 2026</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span></td>
                    <td class="py-3 px-4 text-right">
                      <button onclick="logAttendance('Sarah Connor')" class="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-medium">Log Check-in</button>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-semibold text-white flex items-center space-x-2">
                      <div class="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center">MK</div>
                      <span>Michael Kim</span>
                    </td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">Standard Pass</span></td>
                    <td class="py-3 px-4">Unassigned</td>
                    <td class="py-3 px-4 text-slate-400">Nov 28, 2026</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold">Expiring Soon</span></td>
                    <td class="py-3 px-4 text-right">
                      <button onclick="logAttendance('Michael Kim')" class="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-medium">Log Check-in</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Trainer Slots View -->
          <div id="view-trainers" class="pt-4 hidden">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-sm">MH</div>
                  <div>
                    <div class="font-bold text-white text-sm">Marcus Hayes</div>
                    <div class="text-[11px] text-slate-400">Strength & Conditioning</div>
                  </div>
                </div>
                <div class="space-y-2 text-xs">
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>9:00 AM - 10:00 AM</span>
                    <button onclick="bookSlot('Marcus Hayes', '9:00 AM')" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">Book Slot</button>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>11:30 AM - 12:30 PM</span>
                    <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px]">Reserved</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>4:00 PM - 5:00 PM</span>
                    <button onclick="bookSlot('Marcus Hayes', '4:00 PM')" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">Book Slot</button>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center text-sm">ER</div>
                  <div>
                    <div class="font-bold text-white text-sm">Elena Rostova</div>
                    <div class="text-[11px] text-slate-400">HIIT & Calisthenics</div>
                  </div>
                </div>
                <div class="space-y-2 text-xs">
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>10:00 AM - 11:00 AM</span>
                    <button onclick="bookSlot('Elena Rostova', '10:00 AM')" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">Book Slot</button>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>2:00 PM - 3:00 PM</span>
                    <button onclick="bookSlot('Elena Rostova', '2:00 PM')" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">Book Slot</button>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>5:30 PM - 6:30 PM</span>
                    <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px]">Reserved</span>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-sm">DJ</div>
                  <div>
                    <div class="font-bold text-white text-sm">David Jenkins</div>
                    <div class="text-[11px] text-slate-400">Cardio & Rehabilitation</div>
                  </div>
                </div>
                <div class="space-y-2 text-xs">
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>8:00 AM - 9:00 AM</span>
                    <button onclick="bookSlot('David Jenkins', '8:00 AM')" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">Book Slot</button>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span>1:00 PM - 2:00 PM</span>
                    <button onclick="bookSlot('David Jenkins', '1:00 PM')" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">Book Slot</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Workout Routines View -->
          <div id="view-routines" class="pt-4 hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-white text-sm">Hypertrophy Chest & Triceps</h4>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">Intermediate</span>
                </div>
                <div class="space-y-1.5 text-xs text-slate-300">
                  <div class="flex justify-between py-1 border-b border-slate-800/60"><span>Barbell Bench Press</span><span class="text-slate-400 font-mono">4 sets x 8-10 reps</span></div>
                  <div class="flex justify-between py-1 border-b border-slate-800/60"><span>Incline Dumbbell Press</span><span class="text-slate-400 font-mono">3 sets x 12 reps</span></div>
                  <div class="flex justify-between py-1 border-b border-slate-800/60"><span>Cable Chest Flyes</span><span class="text-slate-400 font-mono">3 sets x 15 reps</span></div>
                  <div class="flex justify-between py-1"><span>Tricep Rope Pushdowns</span><span class="text-slate-400 font-mono">4 sets x 12 reps</span></div>
                </div>
                <button onclick="showToast('Workout plan assigned to active routine!')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition">Assign to My Workout</button>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-white text-sm">Deadlift & Back Strength</h4>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold">Advanced</span>
                </div>
                <div class="space-y-1.5 text-xs text-slate-300">
                  <div class="flex justify-between py-1 border-b border-slate-800/60"><span>Conventional Deadlift</span><span class="text-slate-400 font-mono">5 sets x 5 reps</span></div>
                  <div class="flex justify-between py-1 border-b border-slate-800/60"><span>Weighted Pull-ups</span><span class="text-slate-400 font-mono">3 sets x 8 reps</span></div>
                  <div class="flex justify-between py-1 border-b border-slate-800/60"><span>Chest Supported Row</span><span class="text-slate-400 font-mono">3 sets x 10 reps</span></div>
                  <div class="flex justify-between py-1"><span>Face Pulls</span><span class="text-slate-400 font-mono">4 sets x 15 reps</span></div>
                </div>
                <button onclick="showToast('Workout plan assigned to active routine!')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition">Assign to My Workout</button>
              </div>
            </div>
          </div>

          <!-- Equipment View -->
          <div id="view-equipment" class="pt-4 hidden">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="font-bold text-white text-xs">Smith Machine #1</div>
                  <div class="text-[10px] text-slate-400">Power Zone A</div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Operational</span>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="font-bold text-white text-xs">Treadmill Pro-X4</div>
                  <div class="text-[10px] text-slate-400">Cardio Deck</div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold">Scheduled Maint.</span>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="font-bold text-white text-xs">Cable Crossover Station</div>
                  <div class="text-[10px] text-slate-400">Free Weights Area</div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Operational</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (isCricket) {
      specificContent = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400">Live Matches</div>
            <div class="text-2xl font-bold text-emerald-400 mt-1">2 Ongoing</div>
            <div class="text-[10px] text-slate-400 mt-1">Pitch-side scoring active</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400">League Teams</div>
            <div class="text-2xl font-bold text-white mt-1">16 Clubs</div>
            <div class="text-[10px] text-emerald-400 mt-1">Tournament round 4</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400">Registered Players</div>
            <div class="text-2xl font-bold text-indigo-400 mt-1">240</div>
            <div class="text-[10px] text-slate-400 mt-1">Stats & career records</div>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div class="text-xs text-slate-400">Total Overs Bowled</div>
            <div class="text-2xl font-bold text-amber-400 mt-1">684.2</div>
            <div class="text-[10px] text-slate-400 mt-1">Avg run rate: 8.42</div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-wider text-white">Live Match Center • Over 14.3</span>
            </div>
            <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">Target: 178</span>
          </div>

          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 font-extrabold flex items-center justify-center text-lg">RC</div>
              <div>
                <div class="text-lg font-bold text-white">Royal Challengers</div>
                <div class="text-xs text-slate-400">Batting • CRR: 8.27 • RRR: 7.45</div>
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-white font-mono">120 / 3</div>
              <div class="text-xs text-slate-400">14.3 Overs</div>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="addBall(1)" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">+1</button>
              <button onclick="addBall(4)" class="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">4</button>
              <button onclick="addBall(6)" class="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">6</button>
              <button onclick="addWicket()" class="px-3 h-9 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 font-bold text-xs hover:bg-red-600 hover:text-white">Wicket</button>
            </div>
          </div>
        </div>
      `;
    } else if (isFood) {
      specificContent = `
        <!-- Food Platform Banner -->
        <div class="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 rounded-2xl p-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
              🍕
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-base font-bold text-white">Bella Gourmet Trattoria</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">★ 4.9 (1.2k+ reviews)</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">20-30 min delivery</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Wood-fired artisan pizzas, handcrafted pasta, and gourmet burgers</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="toggleFoodTab('menu')" id="btn-food-menu" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 transition">Browse Menu</button>
            <button onclick="toggleFoodTab('tracking')" id="btn-food-tracking" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition">Live Tracking</button>
            <button onclick="toggleFoodTab('kitchen')" id="btn-food-kitchen" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition">Kitchen Admin</button>
          </div>
        </div>

        <!-- Section 1: Customer Menu & Cart View -->
        <div id="food-view-menu" class="grid grid-cols-1 lg:grid-cols-12 gap-6 block">
          <!-- Left: Menu Dishes -->
          <div class="lg:col-span-8 space-y-4">
            <!-- Category Filter Pills -->
            <div class="flex items-center space-x-2 overflow-x-auto pb-1">
              <button onclick="filterCategory('all', this)" class="cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shrink-0">All Items</button>
              <button onclick="filterCategory('pizza', this)" class="cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 shrink-0">🍕 Pizza</button>
              <button onclick="filterCategory('burger', this)" class="cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 shrink-0">🍔 Burgers</button>
              <button onclick="filterCategory('asian', this)" class="cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 shrink-0">🍣 Asian & Rolls</button>
              <button onclick="filterCategory('dessert', this)" class="cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 shrink-0">🍰 Desserts</button>
            </div>

            <!-- Dishes Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Dish 1 -->
              <div class="dish-card bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition group flex flex-col justify-between" data-cat="pizza">
                <div>
                  <div class="flex items-start justify-between">
                    <span class="text-3xl">🍕</span>
                    <span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Best Seller</span>
                  </div>
                  <h4 class="font-bold text-sm text-white mt-2 group-hover:text-amber-300">Artisan Truffle Pizza</h4>
                  <p class="text-xs text-slate-400 mt-1 line-clamp-2">Wild mushrooms, black truffle oil, fresh buffalo mozzarella, and aromatic basil.</p>
                </div>
                <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                  <span class="text-base font-extrabold text-amber-400 font-mono">$18.50</span>
                  <button onclick="addToCart('Artisan Truffle Pizza', 18.50)" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition">+ Add to Cart</button>
                </div>
              </div>

              <!-- Dish 2 -->
              <div class="dish-card bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition group flex flex-col justify-between" data-cat="burger">
                <div>
                  <div class="flex items-start justify-between">
                    <span class="text-3xl">🍔</span>
                    <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Chef Special</span>
                  </div>
                  <h4 class="font-bold text-sm text-white mt-2 group-hover:text-amber-300">Smoked Angus Burger</h4>
                  <p class="text-xs text-slate-400 mt-1 line-clamp-2">Double smoked beef patty, aged cheddar, caramelized onions, chipotle aioli on brioche.</p>
                </div>
                <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                  <span class="text-base font-extrabold text-amber-400 font-mono">$14.00</span>
                  <button onclick="addToCart('Smoked Angus Burger', 14.00)" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition">+ Add to Cart</button>
                </div>
              </div>

              <!-- Dish 3 -->
              <div class="dish-card bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition group flex flex-col justify-between" data-cat="asian">
                <div>
                  <div class="flex items-start justify-between">
                    <span class="text-3xl">🍣</span>
                    <span class="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Fresh</span>
                  </div>
                  <h4 class="font-bold text-sm text-white mt-2 group-hover:text-amber-300">Spicy Salmon Dragon Roll</h4>
                  <p class="text-xs text-slate-400 mt-1 line-clamp-2">Atlantic salmon, avocado, spicy mayo, toasted sesame, and sweet unagi drizzle.</p>
                </div>
                <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                  <span class="text-base font-extrabold text-amber-400 font-mono">$16.20</span>
                  <button onclick="addToCart('Spicy Salmon Dragon Roll', 16.20)" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition">+ Add to Cart</button>
                </div>
              </div>

              <!-- Dish 4 -->
              <div class="dish-card bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition group flex flex-col justify-between" data-cat="dessert">
                <div>
                  <div class="flex items-start justify-between">
                    <span class="text-3xl">🍰</span>
                    <span class="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">Sweet</span>
                  </div>
                  <h4 class="font-bold text-sm text-white mt-2 group-hover:text-amber-300">Classic Italian Tiramisu</h4>
                  <p class="text-xs text-slate-400 mt-1 line-clamp-2">Espresso-soaked ladyfingers, velvety mascarpone cream, and dark cocoa dusting.</p>
                </div>
                <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                  <span class="text-base font-extrabold text-amber-400 font-mono">$7.50</span>
                  <button onclick="addToCart('Classic Italian Tiramisu', 7.50)" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition">+ Add to Cart</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Interactive Order Cart Drawer -->
          <div class="lg:col-span-4">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 sticky top-20 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <div class="flex items-center space-x-2">
                  <span class="text-base">🛒</span>
                  <h4 class="font-bold text-sm text-white">Your Food Cart</h4>
                </div>
                <span id="cart-count-badge" class="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold">2 items</span>
              </div>

              <!-- Cart Items List -->
              <div id="cart-items-container" class="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                <div class="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div>
                    <div class="font-semibold text-white">Artisan Truffle Pizza</div>
                    <div class="text-[10px] text-amber-400 font-mono">$18.50</div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button onclick="changeQty('Artisan Truffle Pizza', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">-</button>
                    <span class="font-mono font-bold text-white">1</span>
                    <button onclick="changeQty('Artisan Truffle Pizza', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">+</button>
                  </div>
                </div>

                <div class="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div>
                    <div class="font-semibold text-white">Smoked Angus Burger</div>
                    <div class="text-[10px] text-amber-400 font-mono">$14.00</div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button onclick="changeQty('Smoked Angus Burger', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">-</button>
                    <span class="font-mono font-bold text-white">1</span>
                    <button onclick="changeQty('Smoked Angus Burger', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>

              <!-- Order Calculations -->
              <div class="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span id="cart-subtotal" class="font-mono text-white">$32.50</span>
                </div>
                <div class="flex justify-between">
                  <span>Delivery Fee</span>
                  <span class="font-mono text-emerald-400">FREE</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-slate-800 font-bold text-sm text-white">
                  <span>Total Amount</span>
                  <span id="cart-total" class="font-mono text-amber-400">$32.50</span>
                </div>
              </div>

              <button onclick="placeOrder()" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition">
                Proceed to Checkout • Place Order
              </button>
            </div>
          </div>
        </div>

        <!-- Section 2: Live Order Tracking View -->
        <div id="food-view-tracking" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 class="text-sm font-bold text-white uppercase tracking-wider">Live Order Status: #ORD-9842</h3>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Estimated delivery: 22 minutes (Courier on route via Main St)</p>
            </div>
            <button onclick="advanceOrderStatus()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition">
              Simulate Next Status ➔
            </button>
          </div>

          <!-- 4-Stage Progress Timeline -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div id="step-track-1" class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div class="text-[10px] font-bold text-emerald-400">STAGE 1</div>
              <div class="text-xs font-bold text-white mt-1">✓ Order Placed</div>
              <div class="text-[10px] text-slate-400 mt-0.5">Payment confirmed</div>
            </div>
            <div id="step-track-2" class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div id="step-track-2-badge" class="text-[10px] font-bold text-amber-400 animate-pulse">STAGE 2 (CURRENT)</div>
              <div class="text-xs font-bold text-white mt-1">🍳 Kitchen Preparing</div>
              <div class="text-[10px] text-slate-400 mt-0.5">Chef assembling dishes</div>
            </div>
            <div id="step-track-3" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div id="step-track-3-badge" class="text-[10px] font-bold text-slate-500">STAGE 3</div>
              <div class="text-xs font-bold text-slate-300 mt-1">🛵 Out for Delivery</div>
              <div class="text-[10px] text-slate-500 mt-0.5">Courier assigned</div>
            </div>
            <div id="step-track-4" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div id="step-track-4-badge" class="text-[10px] font-bold text-slate-500">STAGE 4</div>
              <div class="text-xs font-bold text-slate-300 mt-1">📦 Delivered</div>
              <div class="text-[10px] text-slate-500 mt-0.5">Drop at doorstep</div>
            </div>
          </div>
        </div>

        <!-- Section 3: Kitchen Admin View -->
        <div id="food-view-kitchen" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 class="text-sm font-bold text-white">Kitchen Order Queue & Display System (KDS)</h3>
              <p class="text-xs text-slate-400">Incoming tickets for Bella Gourmet Trattoria</p>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Kitchen Online</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-xs">#ORD-9842 • Dine Delivery</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">In Prep</span>
              </div>
              <div class="text-xs text-slate-300 space-y-1">
                <div>• 1x Artisan Truffle Pizza (Extra basil)</div>
                <div>• 1x Smoked Angus Burger (No pickles)</div>
              </div>
              <div class="pt-2 flex items-center justify-end space-x-2">
                <button onclick="showToast('Ticket marked ready for delivery!')" class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">Mark Food Ready</button>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-xs">#ORD-9843 • Pick-Up</span>
                <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">New Order</span>
              </div>
              <div class="text-xs text-slate-300 space-y-1">
                <div>• 2x Spicy Salmon Dragon Roll</div>
                <div>• 1x Classic Italian Tiramisu</div>
              </div>
              <div class="pt-2 flex items-center justify-end space-x-2">
                <button onclick="showToast('Ticket accepted by Kitchen!')" class="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold">Accept Ticket</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Custom Domain Dynamic Builder
      specificContent = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          ${entities.slice(0, 4).map((e, idx) => `
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div class="text-xs text-slate-400 font-medium">${e.name} Records</div>
              <div class="text-2xl font-bold text-white mt-1">${(idx + 1) * 24}</div>
              <div class="text-[11px] text-emerald-400 mt-1 flex items-center">↑ Operational</div>
            </div>
          `).join('')}
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 class="text-sm font-bold text-white">${entities[0]?.name || 'Domain'} Management Console</h3>
              <p class="text-[11px] text-slate-400">Autonomous CRUD view generated by CodeMind AI</p>
            </div>
            <button onclick="openModal()" class="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 shadow-sm">
              + New ${entities[0]?.name || 'Entry'}
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-300">
              <thead class="text-slate-400 uppercase text-[10px] border-b border-slate-800 bg-slate-950/40">
                <tr>
                  <th class="py-3 px-4">Identifier / Title</th>
                  <th class="py-3 px-4">Category</th>
                  <th class="py-3 px-4">Created Date</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                <tr>
                  <td class="py-3 px-4 font-semibold text-white">#001 - Primary Record</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[10px]">Tier 1</span></td>
                  <td class="py-3 px-4 text-slate-400">Nov 24, 2026</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span></td>
                  <td class="py-3 px-4 text-right"><button onclick="showToast('Record verified successfully!')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]">Inspect</button></td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-semibold text-white">#002 - Secondary Asset</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono text-[10px]">Tier 2</span></td>
                  <td class="py-3 px-4 text-slate-400">Nov 23, 2026</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span></td>
                  <td class="py-3 px-4 text-right"><button onclick="showToast('Record verified successfully!')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]">Inspect</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - Live Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          /* Custom scrollbar */
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: #0f172a; }
          ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        </style>
      </head>
      <body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <!-- Live App Navigation Bar -->
        <header class="sticky top-0 z-30 bg-slate-900/90 backdrop-blur border-b border-slate-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                ${title.slice(0, 2).toUpperCase()}
              </div>
              <span class="font-extrabold text-sm sm:text-base text-white tracking-tight">${title}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">LIVE UI PREVIEW</span>
            </div>

            <div class="flex items-center space-x-3">
              <div class="relative hidden sm:block">
                <input type="text" placeholder="Search ${isGym ? 'members, workouts...' : 'records...'}" class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44">
              </div>
              <button onclick="showToast('Signed in as Administrator')" class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-white font-bold hover:bg-slate-700">
                A
              </button>
            </div>
          </div>
        </header>

        <!-- Main Live Workspace -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          ${specificContent}
        </main>

        <!-- Toast Notification Container -->
        <div id="toast" class="fixed bottom-4 right-4 bg-slate-900 border border-indigo-500/40 text-white text-xs px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 flex items-center space-x-2 z-50">
          <span class="text-emerald-400">✓</span>
          <span id="toast-message">Action completed successfully!</span>
        </div>

        <!-- Add Modal Form -->
        <div id="modal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 class="font-bold text-white text-sm">Add New ${isGym ? 'Member' : 'Record'}</h3>
              <button onclick="closeModal()" class="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            <div class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-300 mb-1 font-medium">Name / Title</label>
                <input id="inputName" type="text" placeholder="e.g. Alex Morgan" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500">
              </div>
              <div>
                <label class="block text-slate-300 mb-1 font-medium">Category / Plan</label>
                <select id="inputPlan" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500">
                  <option>Monthly Standard</option>
                  <option>Annual VIP</option>
                  <option>Platinum Unlimited</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end space-x-2 pt-2">
              <button onclick="closeModal()" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs">Cancel</button>
              <button onclick="saveNewEntry()" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">Save Entry</button>
            </div>
          </div>
        </div>

        <script>
          function showToast(msg) {
            const t = document.getElementById('toast');
            const m = document.getElementById('toast-message');
            m.innerText = msg;
            t.classList.remove('translate-y-20', 'opacity-0');
            t.classList.add('translate-y-0', 'opacity-100');
            setTimeout(() => {
              t.classList.remove('translate-y-0', 'opacity-100');
              t.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
          }

          function logAttendance(name) {
            const c = document.getElementById('checkinCount');
            if (c) c.innerText = parseInt(c.innerText || '89') + 1;
            showToast('✓ Attendance logged for ' + name + '! Visit recorded.');
          }

          function bookSlot(trainer, time) {
            showToast('✓ Personal coaching slot booked with ' + trainer + ' at ' + time + '!');
          }

          function switchView(viewId) {
            document.querySelectorAll('.tab-btn').forEach(b => {
              b.classList.remove('bg-indigo-600', 'text-white');
              b.classList.add('bg-slate-800', 'text-slate-300');
            });
            const activeBtn = document.getElementById('tab-' + viewId);
            if (activeBtn) {
              activeBtn.classList.remove('bg-slate-800', 'text-slate-300');
              activeBtn.classList.add('bg-indigo-600', 'text-white');
            }
            ['members', 'trainers', 'routines', 'equipment'].forEach(v => {
              const el = document.getElementById('view-' + v);
              if (el) el.classList.add('hidden');
            });
            const target = document.getElementById('view-' + viewId);
            if (target) target.classList.remove('hidden');
          }

          function openModal() {
            document.getElementById('modal').classList.remove('hidden');
          }
          function closeModal() {
            document.getElementById('modal').classList.add('hidden');
          }

          function saveNewEntry() {
            const name = document.getElementById('inputName').value || 'New Entry';
            const plan = document.getElementById('inputPlan').value;
            const table = document.getElementById('memberTableBody');
            if (table) {
              const tr = document.createElement('tr');
              tr.innerHTML = \`
                <td class="py-3 px-4 font-semibold text-white flex items-center space-x-2">
                  <div class="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">\${name.slice(0, 2).toUpperCase()}</div>
                  <span>\${name}</span>
                </td>
                <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold">\${plan}</span></td>
                <td class="py-3 px-4">Assigned</td>
                <td class="py-3 px-4 text-slate-400">Dec 31, 2026</td>
                <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Active</span></td>
                <td class="py-3 px-4 text-right">
                  <button onclick="logAttendance('\${name}')" class="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-medium">Log Check-in</button>
                </td>
              \`;
              table.prepend(tr);
            }
            closeModal();
            showToast('✓ Successfully added: ' + name);
          }

          function addBall(runs) {
            showToast('Ball logged: +' + runs + ' runs recorded!');
          }
          function addWicket() {
            showToast('WICKET! Pitch-side records updated.');
          }

          // Food Ordering App Controller
          const foodCart = {
            'Artisan Truffle Pizza': { price: 18.50, qty: 1 },
            'Smoked Angus Burger': { price: 14.00, qty: 1 }
          };

          function renderFoodCart() {
            const container = document.getElementById('cart-items-container');
            const countBadge = document.getElementById('cart-count-badge');
            const subtotalEl = document.getElementById('cart-subtotal');
            const totalEl = document.getElementById('cart-total');
            if (!container) return;

            let total = 0;
            let count = 0;
            container.innerHTML = '';

            for (const [name, item] of Object.entries(foodCart)) {
              if (item.qty <= 0) continue;
              count += item.qty;
              total += item.price * item.qty;
              const row = document.createElement('div');
              row.className = 'flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs';
              row.innerHTML = \`
                <div>
                  <div class="font-semibold text-white">\${name}</div>
                  <div class="text-[10px] text-amber-400 font-mono">$\${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div class="flex items-center space-x-2">
                  <button onclick="changeQty('\${name}', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">-</button>
                  <span class="font-mono font-bold text-white">\${item.qty}</span>
                  <button onclick="changeQty('\${name}', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">+</button>
                </div>
              \`;
              container.appendChild(row);
            }

            if (count === 0) {
              container.innerHTML = '<div class="text-xs text-slate-500 py-3 text-center">Your cart is empty. Add dishes to get started!</div>';
            }

            if (countBadge) countBadge.textContent = count + ' items';
            if (subtotalEl) subtotalEl.textContent = '$' + total.toFixed(2);
            if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
          }

          function addToCart(name, price) {
            if (!foodCart[name]) {
              foodCart[name] = { price, qty: 0 };
            }
            foodCart[name].qty += 1;
            renderFoodCart();
            showToast('✓ Added to cart: ' + name);
          }

          function changeQty(name, delta) {
            if (foodCart[name]) {
              foodCart[name].qty += delta;
              if (foodCart[name].qty < 0) foodCart[name].qty = 0;
              renderFoodCart();
            }
          }

          function placeOrder() {
            let total = 0;
            for (const item of Object.values(foodCart)) total += item.price * item.qty;
            if (total <= 0) {
              showToast('Please add items to your cart before checkout.');
              return;
            }
            showToast('🎉 Order placed successfully! Transferring to live tracking...');
            setTimeout(() => {
              toggleFoodTab('tracking');
            }, 800);
          }

          function toggleFoodTab(tabId) {
            ['menu', 'tracking', 'kitchen'].forEach(t => {
              const el = document.getElementById('food-view-' + t);
              const btn = document.getElementById('btn-food-' + t);
              if (el) el.classList.add('hidden');
              if (btn) {
                btn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition';
              }
            });
            const activeEl = document.getElementById('food-view-' + tabId);
            const activeBtn = document.getElementById('btn-food-' + tabId);
            if (activeEl) activeEl.classList.remove('hidden');
            if (activeBtn) {
              activeBtn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 transition';
            }
          }

          function filterCategory(cat, btn) {
            document.querySelectorAll('.cat-pill').forEach(b => {
              b.className = 'cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-white border border-slate-800 shrink-0';
            });
            if (btn) btn.className = 'cat-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shrink-0';
            document.querySelectorAll('.dish-card').forEach(c => {
              if (cat === 'all' || c.getAttribute('data-cat') === cat) {
                c.style.display = 'flex';
              } else {
                c.style.display = 'none';
              }
            });
          }

          let currentOrderStep = 2;
          function advanceOrderStatus() {
            currentOrderStep++;
            if (currentOrderStep > 4) currentOrderStep = 1;
            for (let i = 1; i <= 4; i++) {
              const stepEl = document.getElementById('step-track-' + i);
              const badgeEl = document.getElementById('step-track-' + i + '-badge');
              if (!stepEl) continue;
              if (i < currentOrderStep) {
                stepEl.className = 'p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30';
                if (badgeEl) {
                  badgeEl.textContent = 'STAGE ' + i + ' (DONE)';
                  badgeEl.className = 'text-[10px] font-bold text-emerald-400';
                }
              } else if (i === currentOrderStep) {
                stepEl.className = 'p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30';
                if (badgeEl) {
                  badgeEl.textContent = 'STAGE ' + i + ' (CURRENT)';
                  badgeEl.className = 'text-[10px] font-bold text-amber-400 animate-pulse';
                }
              } else {
                stepEl.className = 'p-3.5 rounded-xl bg-slate-950 border border-slate-800';
                if (badgeEl) {
                  badgeEl.textContent = 'STAGE ' + i;
                  badgeEl.className = 'text-[10px] font-bold text-slate-500';
                }
              }
            }
            showToast('Order status advanced to Stage ' + currentOrderStep);
          }
        </script>
      </body>
      </html>
    `;
  }, [title, isGym, isCricket, isFood, isHospital, entities]);

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 ${isFullScreen ? 'fixed inset-4 z-50 overflow-y-auto bg-slate-950 border-indigo-500' : ''}`}>
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>Interactive Live App Preview</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Sandbox
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Interact with your generated web application before downloading the ZIP archive.
              </p>
            </div>
          </div>
        </div>

        {/* Device Switcher & Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Screenshot comparison toggles if screenshot exists */}
          {project?.screenshot && (
            <div className="p-1 rounded-xl bg-slate-950 border border-indigo-500/30 flex items-center space-x-1">
              <button
                onClick={() => setViewMode('app')}
                title="Interactive App View"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                  viewMode === 'app' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>App</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                title="Side-by-Side Comparison"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                  viewMode === 'split' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
              <button
                onClick={() => setViewMode('screenshot')}
                title="View Original Screenshot"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                  viewMode === 'screenshot' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Screenshot</span>
              </button>
            </div>
          )}

          {/* Device buttons */}
          <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-1">
            <button
              onClick={() => setDevice('desktop')}
              title="Desktop View (100%)"
              className={`p-2 rounded-lg text-xs font-semibold transition ${
                device === 'desktop'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              title="Tablet View (768px)"
              className={`p-2 rounded-lg text-xs font-semibold transition ${
                device === 'tablet'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              title="Mobile View (390px)"
              className={`p-2 rounded-lg text-xs font-semibold transition ${
                device === 'mobile'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Reload button */}
          <button
            onClick={() => setReloadKey(prev => prev + 1)}
            title="Reload Sandbox"
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Preview"}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulated Browser Frame */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Browser Top Header */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          {/* Mock URL Address Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-slate-400 text-[11px] font-mono flex items-center justify-between">
              <div className="flex items-center space-x-1.5 truncate">
                <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-slate-200 truncate">http://localhost:5173/</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-bold shrink-0">
                200 OK
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="text-[11px] font-mono capitalize">{device} View</span>
          </div>
        </div>

        {/* Interactive Sandbox iFrame & Screenshot Comparison */}
        <div className="bg-slate-950/80 p-2 sm:p-4 flex items-center justify-center min-h-[560px] overflow-hidden">
          {viewMode === 'screenshot' && project?.screenshot ? (
            <div className="w-full max-w-4xl p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center">
              <div className="text-xs font-bold text-slate-300 mb-3 flex items-center space-x-2">
                <Camera className="w-4 h-4 text-indigo-400" />
                <span>Original Uploaded UI Design Mockup</span>
              </div>
              <img
                src={project.screenshot}
                alt="Original UI Design"
                className="max-h-[600px] w-auto rounded-xl border border-slate-800 object-contain shadow-2xl"
              />
            </div>
          ) : viewMode === 'split' && project?.screenshot ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-[640px]">
              {/* Left Column: Original Screenshot */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col overflow-hidden">
                <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <Camera className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Original Screenshot Mockup</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Reference</span>
                </div>
                <div className="flex-1 flex items-center justify-center overflow-auto bg-slate-950 rounded-lg p-2">
                  <img
                    src={project.screenshot}
                    alt="Original UI Reference"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                </div>
              </div>

              {/* Right Column: Live App Sandbox */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col overflow-hidden">
                <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AI Replicated Interactive App</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Live Sandbox</span>
                </div>
                <div className="flex-1 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                  <iframe
                    key={reloadKey}
                    title="CodeMind Live App Sandbox Comparison"
                    srcDoc={previewHtml}
                    sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
                    className="w-full h-full bg-slate-950 border-0"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-slate-800 ${
                device === 'mobile'
                  ? 'w-[390px] h-[640px]'
                  : device === 'tablet'
                  ? 'w-[768px] h-[640px]'
                  : 'w-full h-[640px]'
              }`}
            >
              <iframe
                key={reloadKey}
                title="CodeMind Live App Sandbox"
                srcDoc={previewHtml}
                sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
                className="w-full h-full bg-slate-950 border-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
