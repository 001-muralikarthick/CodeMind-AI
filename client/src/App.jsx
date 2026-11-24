import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import PromptSection from './components/PromptSection';
import TechStackSelector from './components/TechStackSelector';
import ProjectPlanReview from './components/ProjectPlanReview';
import StepProgressTracker from './components/StepProgressTracker';
import ProjectResultsView from './components/ProjectResultsView';
import HistoryModal from './components/HistoryModal';
import { apiService } from './services/api';

const DEFAULT_PROMPT = "I want to build an online food ordering website. Users should register, log in, browse restaurants, view menus, add food to cart, place orders and track orders. Admins should manage restaurants, menus and orders.";

const BUILD_STAGES = [
  { stepNumber: 1, name: "Creating folder structure", desc: "frontend/, backend/, database/", status: "pending" },
  { stepNumber: 2, name: "Generating frontend", desc: "Pages, components, styling and navigation", status: "pending" },
  { stepNumber: 3, name: "Generating backend", desc: "APIs, authentication and business logic", status: "pending" },
  { stepNumber: 4, name: "Creating database", desc: "Collections, schemas and relationships", status: "pending" },
  { stepNumber: 5, name: "Testing and fixing errors", desc: "Run safe automated checks and fix detected issues", status: "pending" }
];

export default function App() {
  // 5 Stages: 'prompt' (Step 1) | 'tech_selection' (Step 2) | 'plan_review' (Step 3) | 'building' (Step 4) | 'export' (Step 5)
  const [currentStage, setCurrentStage] = useState('prompt');
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);

  // Loading states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // Data states
  const [analysis, setAnalysis] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Stage 4 live execution state
  const [projectId, setProjectId] = useState(null);
  const [buildStepNumber, setBuildStepNumber] = useState(0);
  const [buildSteps, setBuildSteps] = useState(BUILD_STAGES);
  const [logs, setLogs] = useState([]);
  const [completedProject, setCompletedProject] = useState(null);
  const [error, setError] = useState(null);

  // Saved history modal
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Step 1 -> Step 2: Analyze user prompt
  const handleAnalyzePrompt = async (textPrompt) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await apiService.analyzeRequirements(textPrompt);
      setAnalysis(data);
      setCurrentStage('tech_selection');
    } catch (err) {
      setError(err.message || 'Failed to analyze requirements. Please verify backend server is running on port 5005.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 2 -> Step 3: User chooses technologies -> AI generates Project Plan
  const handleGeneratePlan = async (techChoices) => {
    setIsPlanning(true);
    setError(null);
    setSelectedTech(techChoices);
    try {
      const plan = await apiService.generateProjectPlan(prompt, techChoices);
      setGeneratedPlan(plan);
      setCurrentStage('plan_review');
    } catch (err) {
      setError(err.message || 'Failed to formulate project plan. Please verify backend server is running on port 5005.');
    } finally {
      setIsPlanning(false);
    }
  };

  // Step 3 -> Step 4: User clicks "Approve & Generate Project" -> AI builds the project
  const handleApprovePlan = async () => {
    setIsStarting(true);
    setError(null);
    try {
      const initRes = await apiService.startGeneration(prompt, selectedTech, generatedPlan);
      const newProjectId = initRes.projectId;
      setProjectId(newProjectId);
      setCurrentStage('building');
      setBuildStepNumber(0);
      setBuildSteps(BUILD_STAGES);
      setLogs([{ time: new Date().toLocaleTimeString(), message: 'Project plan approved. Initializing AI build stages...' }]);

      // Connect to SSE live progress stream
      apiService.listenToPipeline(
        newProjectId,
        (progress) => {
          if (progress.step) {
            setBuildStepNumber(progress.step);
            setBuildSteps((prev) =>
              prev.map((s) => {
                if (s.stepNumber < progress.step) return { ...s, status: 'completed' };
                if (s.stepNumber === progress.step) {
                  return {
                    ...s,
                    status: progress.status === 'completed' ? 'completed' : 'in-progress'
                  };
                }
                return s;
              })
            );
          }

          if (progress.message) {
            setLogs((prev) => [
              ...prev,
              { time: new Date().toLocaleTimeString(), message: progress.message }
            ]);
          }
        },
        (finalProject) => {
          setCompletedProject(finalProject);
          setBuildSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
          setLogs((prev) => [
            ...prev,
            { time: new Date().toLocaleTimeString(), message: '✓ All 5 Build Stages Complete! Ready for export.' }
          ]);

          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch (e) {}

          setTimeout(() => {
            setCurrentStage('export');
          }, 800);
        },
        (errMsg) => {
          setError(errMsg);
          setLogs((prev) => [
            ...prev,
            { time: new Date().toLocaleTimeString(), message: `Build Error: ${errMsg}` }
          ]);
        }
      );
    } catch (err) {
      setError(err.message || 'Failed to start project build. Please check backend server on port 5005.');
    } finally {
      setIsStarting(false);
    }
  };

  const handleReset = () => {
    setCurrentStage('prompt');
    setCompletedProject(null);
    setAnalysis(null);
    setGeneratedPlan(null);
  };

  const handleQuickDemo = () => {
    setPrompt(DEFAULT_PROMPT);
    handleAnalyzePrompt(DEFAULT_PROMPT);
  };

  const handleSelectHistoryProject = (selected) => {
    setCompletedProject(selected);
    setCurrentStage('export');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        onQuickDemo={handleQuickDemo}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection / Operation Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 flex items-start justify-between gap-4 shadow-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-red-300">Backend Connection or Processing Notice</h4>
                <p className="text-xs text-red-200/90 leading-relaxed">{error}</p>
                <div className="pt-1.5 flex items-center space-x-2 text-[11px] text-slate-300 font-mono">
                  <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">Command: npm run dev</span>
                  <span className="text-slate-400">Run in project root to start server & client</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 shrink-0 transition"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step 1: User enters requirements */}
        {currentStage === 'prompt' && (
          <PromptSection
            prompt={prompt}
            setPrompt={setPrompt}
            onAnalyze={handleAnalyzePrompt}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* Step 2: AI asks user to choose technologies */}
        {currentStage === 'tech_selection' && (
          <TechStackSelector
            analysis={analysis}
            onGeneratePlan={handleGeneratePlan}
            onBack={() => setCurrentStage('prompt')}
            isPlanning={isPlanning}
          />
        )}

        {/* Step 3: AI generates a project plan for user review & approval */}
        {currentStage === 'plan_review' && (
          <ProjectPlanReview
            plan={generatedPlan}
            onApprove={handleApprovePlan}
            onBack={() => setCurrentStage('tech_selection')}
            isStarting={isStarting}
          />
        )}

        {/* Step 4: AI builds the project */}
        {currentStage === 'building' && (
          <StepProgressTracker
            currentStep={buildStepNumber}
            steps={buildSteps}
            logs={logs}
            error={error}
          />
        )}

        {/* Step 5: User chooses output format & downloads */}
        {currentStage === 'export' && completedProject && (
          <ProjectResultsView
            project={completedProject}
            onStartNew={handleReset}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        CodeMind AI • 5-Step Autonomous Full-Stack Software Generation Platform
      </footer>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectProject={handleSelectHistoryProject}
      />
    </div>
  );
}
