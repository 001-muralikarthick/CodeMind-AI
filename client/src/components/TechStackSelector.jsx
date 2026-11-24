import React, { useState, useEffect } from 'react';
import {
  Layers,
  ArrowLeft,
  ArrowRight,
  Server,
  Database,
  Monitor,
  Cpu,
  Lock,
  CreditCard,
  Check,
  Sparkles,
  HelpCircle,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { apiService } from '../services/api';

const LOCAL_TECH_ADVICE = {
  // Frontend
  "React": {
    category: "Frontend",
    advantages: [
      "Vast ecosystem, largest community support, and extensive npm library packages",
      "Component-based virtual DOM ensures high-speed rendering performance",
      "Huge talent pool and seamless integration with state managers like Zustand or Redux"
    ],
    disadvantages: [
      "Requires picking external routing and state libraries (unopinionated)",
      "JSX syntax and frequent ecosystem changes have a slight initial learning curve"
    ],
    bestFor: "Dynamic web apps, SaaS dashboards, and consumer-facing applications"
  },
  "Angular": {
    category: "Frontend",
    advantages: [
      "Full-featured batteries-included enterprise framework by Google",
      "Built-in TypeScript, Dependency Injection, routing, forms, and HTTP client",
      "Enforces strict architectural consistency across large engineering teams"
    ],
    disadvantages: [
      "Steeper learning curve with RxJS observables and complex decorators",
      "Heavier bundle size compared to lightweight alternatives"
    ],
    bestFor: "Large-scale enterprise internal portals and financial institutions"
  },
  "Vue": {
    category: "Frontend",
    advantages: [
      "Gentle learning curve with clean single-file component (.vue) architecture",
      "Exceptional official documentation and built-in reactive state system",
      "Fast rendering speed and smaller bundle size than Angular"
    ],
    disadvantages: [
      "Smaller third-party plugin ecosystem compared to React",
      "Fewer off-the-shelf enterprise component libraries"
    ],
    bestFor: "Rapid prototyping, medium-sized web applications, and interactive portals"
  },
  "HTML, CSS, JavaScript": {
    category: "Frontend",
    advantages: [
      "Zero build step, zero bundling dependencies, and instant browser execution",
      "Universal compatibility across all browsers and minimal resource consumption",
      "Ultimate control over raw DOM and CSS layouts"
    ],
    disadvantages: [
      "Manual DOM manipulation becomes messy on complex applications",
      "No built-in state reactivity or component lifecycle management"
    ],
    bestFor: "Simple landing pages, static documentation, and lightweight widgets"
  },

  // Backend
  "Node.js + Express": {
    category: "Backend",
    advantages: [
      "Unified JavaScript/TypeScript across frontend and backend",
      "Non-blocking asynchronous event loop delivers exceptional I/O throughput",
      "Access to npm - the world's largest package ecosystem"
    ],
    disadvantages: [
      "Single-threaded CPU performance requires clustering for heavy computation",
      "Callback/promise nesting requires disciplined error management"
    ],
    bestFor: "Real-time web applications, REST APIs, microservices, and rapid delivery"
  },
  "Python + FastAPI": {
    category: "Backend",
    advantages: [
      "Blazing fast async performance comparable to NodeJS and Go (via Starlette)",
      "Automatic interactive OpenAPI (Swagger) documentation generation",
      "Seamless integration with Python AI/ML libraries (NumPy, PyTorch, Gemini SDK)"
    ],
    disadvantages: [
      "Relatively younger ecosystem compared to Django or Flask",
      "Requires strict Pydantic type annotation discipline"
    ],
    bestFor: "AI/ML backends, high-performance async microservices, and modern REST APIs"
  },
  "Java + Spring Boot": {
    category: "Backend",
    advantages: [
      "Industry standard for high-throughput enterprise banking and mission-critical systems",
      "Comprehensive ecosystem: Spring Security, Spring Data JPA, and Spring Cloud",
      "Robust static typing and enterprise transaction management"
    ],
    disadvantages: [
      "Higher memory consumption (JVM warmup) and verbose boilerplate",
      "Slower cold starts compared to Node or Go"
    ],
    bestFor: "Large-scale enterprise systems, banking, and high-concurrency monoliths"
  },
  "Django": {
    category: "Backend",
    advantages: [
      "Batteries-included framework: built-in admin dashboard, ORM, and auth engine",
      "Built-in protection against SQL injection, CSRF, and XSS attacks",
      "Accelerates time-to-market dramatically with ready-to-use boilerplate"
    ],
    disadvantages: [
      "Monolithic design can feel heavy for lightweight microservices",
      "Synchronous legacy roots make high-concurrency WebSockets more complex"
    ],
    bestFor: "Content management systems, data-driven backends, and rapid MVPs"
  },

  // Database
  "MongoDB": {
    category: "Database",
    advantages: [
      "Flexible schema-less JSON document model perfect for rapid iterations",
      "Horizontal scalability via native sharding and replica sets",
      "Native compatibility with JavaScript objects and Mongoose ODM"
    ],
    disadvantages: [
      "Complex multi-document ACID transactions require careful indexing",
      "Higher memory usage due to uncompressed document overhead"
    ],
    bestFor: "Content management, rapid prototyping, e-commerce catalogs, and dynamic schemas"
  },
  "PostgreSQL": {
    category: "Database",
    advantages: [
      "Gold standard open-source relational database with ACID compliance",
      "First-class JSONB querying, vector search (pgvector), and spatial data (PostGIS)",
      "Unmatched extensibility, concurrent write performance, and reliability"
    ],
    disadvantages: [
      "Requires schema migrations and DBA maintenance for heavy high-traffic clusters",
      "Slightly higher configuration complexity than MySQL for beginners"
    ],
    bestFor: "Fintech, analytics, multi-tenant SaaS, and mission-critical relational data"
  },
  "MySQL": {
    category: "Database",
    advantages: [
      "Proven reliability powering massive global internet platforms",
      "Widespread hosting availability and familiar SQL dialect",
      "Excellent read performance with optimized InnoDB indexing"
    ],
    disadvantages: [
      "Less feature-rich JSON querying capabilities compared to PostgreSQL",
      "More rigid dialect and limited custom data types"
    ],
    bestFor: "Standard web portals, CMS platforms, and traditional relational databases"
  },
  "SQLite": {
    category: "Database",
    advantages: [
      "Zero-configuration, serverless single-file database that runs directly in process",
      "Fastest local reads with zero network overhead and zero cloud hosting costs",
      "Extremely portable and ideal for desktop apps, testing, and embedded devices"
    ],
    disadvantages: [
      "File-level write lock limits high concurrent write throughput",
      "Not designed for multi-server distributed production clusters"
    ],
    bestFor: "Local development, desktop applications, testing, and low-write services"
  }
};

export default function TechStackSelector({ analysis, onGeneratePlan, onBack, isPlanning }) {
  const [frontend, setFrontend] = useState('React');
  const [backend, setBackend] = useState('Node.js + Express');
  const [database, setDatabase] = useState('MongoDB');
  const [aiModel, setAiModel] = useState('Gemini');
  const [scope, setScope] = useState('Full-stack application');
  const [withAuth, setWithAuth] = useState(true);
  const [withPayment, setWithPayment] = useState(true);

  // Standout Feature: Technology Advisor Active View
  const [focusedTech, setFocusedTech] = useState('React');
  const [showAdvisor, setShowAdvisor] = useState(true);
  const [showClarifications, setShowClarifications] = useState(true);

  const currentAdvice = LOCAL_TECH_ADVICE[focusedTech] || LOCAL_TECH_ADVICE[frontend] || {
    category: 'Technology',
    advantages: ['High performance and broad open-source community support'],
    disadvantages: ['Standard configuration and environment setup required'],
    bestFor: 'Modern full-stack web applications'
  };

  const handleTechSelect = (type, value) => {
    if (type === 'frontend') setFrontend(value);
    if (type === 'backend') setBackend(value);
    if (type === 'database') setDatabase(value);
    setFocusedTech(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGeneratePlan({
      frontend,
      backend,
      database,
      aiModel,
      scope,
      withAuth,
      withPayment
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Requirements</span>
        </button>

        <div className="flex items-center space-x-1.5 text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 2 — Choose Technologies & Architecture</span>
        </div>
      </div>

      {/* Requirement Understanding & Standout Feature: Requirement Analyzer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI Requirement Analyzer:</span>
              <span className="text-emerald-400">{analysis?.detectedDomain || 'Custom Project'}</span>
            </h2>
            <button
              type="button"
              onClick={() => setShowClarifications(!showClarifications)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>{showClarifications ? 'Collapse Analysis' : 'Expand Analysis'}</span>
              {showClarifications ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-xs text-slate-300 italic">"{analysis?.prompt}"</p>
        </div>

        {/* Detected Key Modules */}
        <div className="flex flex-wrap gap-2">
          {analysis?.detectedFeatures?.map((f, i) => (
            <span
              key={i}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center space-x-1"
            >
              <Check className="w-3 h-3 text-emerald-400" />
              <span>{f.name}</span>
            </span>
          ))}
        </div>

        {/* Standout Feature: Clarification Questions / Missing Requirements Check */}
        {showClarifications && analysis?.clarificationQuestions && analysis.clarificationQuestions.length > 0 && (
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Requirement Analyzer — Unclear Requirements & Questions Resolved:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {analysis.clarificationQuestions.map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-200 leading-snug">
                    {q.question}
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3 h-3 shrink-0" />
                    <span>{q.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Standout Feature: Technology Advisor Card (Pros & Cons) */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-indigo-400">
                Technology Advisor
              </div>
              <div className="text-sm font-bold text-white">
                Pros & Cons for: <span className="text-indigo-300 underline underline-offset-2">{focusedTech}</span> ({currentAdvice.category})
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvisor(!showAdvisor)}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
          >
            <span>{showAdvisor ? 'Hide' : 'Show Advisor'}</span>
            {showAdvisor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showAdvisor && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            {/* Advantages */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Advantages</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {currentAdvice.advantages?.map((adv, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-2">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Disadvantages & Trade-offs</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {currentAdvice.disadvantages?.map((dis, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best For */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/20 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center space-x-1.5 text-indigo-400 font-bold mb-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Best For</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {currentAdvice.bestFor}
                </p>
              </div>
              <div className="text-[10px] text-slate-500 italic border-t border-slate-800/80 pt-1.5">
                Click any technology below to inspect its pros and cons in real time.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Technology Selection Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Choose Your Technology Stack</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            The AI does not decide your stack without your consent. Select your preferred options below:
          </p>
        </div>

        {/* 4 Main Categories: Frontend, Backend, Database, AI Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Frontend */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-indigo-400" />
                <span>Frontend</span>
              </label>
              <span className="text-[10px] text-indigo-400 font-mono">Selected: {frontend}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['React', 'Angular', 'Vue', 'HTML, CSS, JavaScript'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleTechSelect('frontend', opt)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border ${
                    frontend === opt
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/40 font-bold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {frontend === opt && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span>Backend</span>
              </label>
              <span className="text-[10px] text-purple-400 font-mono">Selected: {backend}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Node.js + Express', 'Python + FastAPI', 'Java + Spring Boot', 'Django'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleTechSelect('backend', opt)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border ${
                    backend === opt
                      ? 'bg-purple-600/20 border-purple-500 text-purple-300 ring-1 ring-purple-500/40 font-bold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {backend === opt && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Database */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <Database className="w-4 h-4 text-teal-400" />
                <span>Database</span>
              </label>
              <span className="text-[10px] text-teal-400 font-mono">Selected: {database}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleTechSelect('database', opt)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border ${
                    database === opt
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300 ring-1 ring-teal-500/40 font-bold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {database === opt && <Check className="w-3.5 h-3.5 text-teal-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Model */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>AI Model</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Gemini (Google AI Connected & Verified)', val: 'Gemini', badge: 'Active' },
                { label: 'OpenAI (GPT-4o Engine)', val: 'OpenAI', badge: 'Supported' },
                { label: 'Built-in Engine (Offline Architecture)', val: 'Built-in Engine', badge: 'Fast' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setAiModel(opt.val)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border flex items-center justify-between ${
                    aiModel === opt.val
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/40 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <span>{opt.label}</span>
                    {opt.val === 'OpenAI' && aiModel === 'OpenAI' && (
                      <span className="text-[10px] text-slate-400 block font-normal mt-0.5">
                        Reads OPENAI_API_KEY from server/.env
                      </span>
                    )}
                  </div>
                  {aiModel === opt.val && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Scope, Auth & Payment Options */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Project Scope & Feature Customization:
          </h4>

          {/* Scope Selector */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Application Scope</label>
            <div className="grid grid-cols-3 gap-2">
              {['Full-stack application', 'Frontend only', 'Backend only'].map((sc) => (
                <button
                  type="button"
                  key={sc}
                  onClick={() => setScope(sc)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-center transition border ${
                    scope === sc
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Auth Toggle */}
            <div
              onClick={() => setWithAuth(!withAuth)}
              className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between transition ${
                withAuth
                  ? 'bg-slate-950 border-emerald-500/40 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Lock className={`w-4 h-4 ${withAuth ? 'text-emerald-400' : 'text-slate-600'}`} />
                <div>
                  <div className="text-xs font-bold">User Authentication</div>
                  <div className="text-[11px] text-slate-400">
                    {withAuth ? 'Included (Register, Login, JWT)' : 'Without authentication'}
                  </div>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${withAuth ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'}`}>
                {withAuth && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            {/* Payment Toggle */}
            <div
              onClick={() => setWithPayment(!withPayment)}
              className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between transition ${
                withPayment
                  ? 'bg-slate-950 border-emerald-500/40 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <CreditCard className={`w-4 h-4 ${withPayment ? 'text-emerald-400' : 'text-slate-600'}`} />
                <div>
                  <div className="text-xs font-bold">Payment Integration</div>
                  <div className="text-[11px] text-slate-400">
                    {withPayment ? 'Included (Card / Stripe simulation)' : 'Without payment integration'}
                  </div>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${withPayment ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'}`}>
                {withPayment && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Stack: <span className="text-white font-bold">{frontend}</span> + <span className="text-white font-bold">{backend}</span> + <span className="text-white font-bold">{database}</span> ({scope})
          </div>

          <button
            type="submit"
            disabled={isPlanning}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition text-sm disabled:opacity-50"
          >
            {isPlanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Formulating Project Plan...</span>
              </>
            ) : (
              <>
                <span>Generate Project Plan (Step 3)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
