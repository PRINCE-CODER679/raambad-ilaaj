import React, { useState, useEffect } from 'react';
import { experimentsData } from './data/experimentsData';
import CodeBlock from './components/CodeBlock';
import TerminalOutput from './components/TerminalOutput';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ListOrdered,
  Binary,
  Layers,
  Download,
  Wifi,
  WifiOff
} from 'lucide-react';

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Sync with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#exp-', '');
      const num = parseInt(hash, 10);
      if (num >= 1 && num <= 9) {
        setSelectedId(num);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Monitor network status & install prompt
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const currentExp = experimentsData.find((exp) => exp.id === selectedId) || experimentsData[0];

  const handleSelect = (id) => {
    setSelectedId(id);
    window.location.hash = `#exp-${id}`;
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (selectedId > 1) {
      handleSelect(selectedId - 1);
    }
  };

  const handleNext = () => {
    if (selectedId < 9) {
      handleSelect(selectedId + 1);
    }
  };

  return (
    <div className="min-h-screen studio-grid text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Studious Academic Top Bar */}
      <header className="sticky top-0 z-40 bg-[#080d19]/95 backdrop-blur-md border-b border-slate-800/90 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400 shadow-md">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight leading-tight m-0 font-mono">
                    DSA PRACTICAL WORKBENCH
                  </h1>
                  <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    ACADEMIC REF
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block m-0">
                  Data Structures &amp; Algorithms • 9 Prescribed Lab Experiments
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono">
            {/* Install App button if prompt available */}
            {deferredPrompt && (
              <button
                onClick={handleInstallApp}
                className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm transition-all cursor-pointer active:scale-95"
                title="Install as offline app on your device"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            )}

            {/* Offline Status Badge */}
            <span
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                isOnline
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                  : 'bg-amber-950/80 text-amber-300 border-amber-600 animate-pulse'
              }`}
              title={
                isOnline
                  ? 'Cached & 100% accessible offline'
                  : 'Currently offline — using locally cached data'
              }
            >
              {isOnline ? (
                <Wifi className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <WifiOff className="w-3 h-3 text-amber-400 shrink-0" />
              )}
              <span className="hidden sm:inline">
                {isOnline ? 'Offline Ready' : 'Working Offline'}
              </span>
            </span>

            <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-cyan-300 border border-slate-700/80">
              <span className="text-slate-500 mr-1.5">INDEX:</span>
              <span className="font-bold">{currentExp.number}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span className="text-slate-400">09</span>
            </span>

            {/* Mobile / Tablet select */}
            <select
              value={selectedId}
              onChange={(e) => handleSelect(Number(e.target.value))}
              className="lg:hidden bg-slate-900 text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              {experimentsData.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  Exp {exp.number}: {exp.title.split('—')[1]?.trim() || exp.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 w-full flex-1 flex gap-8">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 rounded-2xl bg-[#090f1e]/90 border border-slate-800 p-3.5 shadow-xl studious-border">
            <div className="px-3 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/90 mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>LAB EXPERIMENTS</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400">
                1–9
              </span>
            </div>
            <nav className="space-y-1">
              {experimentsData.map((exp) => {
                const isActive = exp.id === selectedId;
                const shortTitle = exp.title.replace(/^Experiment \d+ — /, '');
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleSelect(exp.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-start space-x-2.5 cursor-pointer group ${
                      isActive
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded shrink-0 transition-colors ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                      }`}
                    >
                      {exp.number}
                    </span>
                    <span className="text-xs font-medium leading-snug break-words">
                      {shortTitle}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#090f1e] border-r border-slate-800 p-4 shadow-2xl flex flex-col z-10">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center space-x-2">
                  <ListOrdered className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono font-semibold text-sm text-slate-200">
                    LAB ASSIGNMENTS
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-1 flex-1 pr-1">
                {experimentsData.map((exp) => {
                  const isActive = exp.id === selectedId;
                  const shortTitle = exp.title.replace(/^Experiment \d+ — /, '');
                  return (
                    <button
                      key={exp.id}
                      onClick={() => handleSelect(exp.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-start space-x-2.5 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 shrink-0">
                        {exp.number}
                      </span>
                      <span>{shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Experiment Content View */}
        <main className="flex-1 min-w-0 max-w-full">
          {/* Studious Assignment Title Card */}
          <div className="mb-6 p-4 sm:p-6 rounded-2xl bg-[#090f1e]/90 border border-slate-800 shadow-xl studious-border">
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                PRACTICAL ASSIGNMENT // {currentExp.number}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                SEMESTER I • 2026–27
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight m-0">
              {currentExp.title}
            </h2>
          </div>

          {/* Section 1: Experiment Question */}
          <section className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#090f1e]/90 border border-slate-800 shadow-xl studious-border">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800/90 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                §1
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 m-0 font-mono">
                  1. Experiment Question
                </h3>
                <p className="text-xs text-slate-400 m-0 font-mono">
                  Exact manual topic and implementation requirements
                </p>
              </div>
            </div>

            {/* Manual Topic */}
            <div className="mb-4 bg-[#050812] p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
                MANUAL TOPIC SPECIFICATION
              </span>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed m-0">
                {currentExp.topic}
              </p>
            </div>

            {/* What to implement */}
            <div className="mb-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                WHAT TO IMPLEMENT:
              </span>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {currentExp.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 mr-2.5 shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Completion Check */}
            <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-start space-x-2.5 text-xs sm:text-sm text-slate-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-slate-300">Completion check: </span>
                <span>{currentExp.completionCheck}</span>
              </div>
            </div>
          </section>

          {/* Section 2: Complete C Program */}
          <section className="mb-8">
            <div className="flex items-center space-x-2.5 mb-2 px-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
                §2
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 m-0 font-mono">
                  2. Complete C Program
                </h3>
                <p className="text-xs text-slate-400 m-0 font-mono">
                  Full, correct, compilable ISO C99 source implementation
                </p>
              </div>
            </div>

            <CodeBlock code={currentExp.cCode} fileName={currentExp.fileName} />
          </section>

          {/* Section 3: Output */}
          <section className="mb-10">
            <div className="flex items-center space-x-2.5 mb-2 px-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                §3
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 m-0 font-mono">
                  3. Output
                </h3>
                <p className="text-xs text-slate-400 m-0 font-mono">
                  Verified sample execution and console interaction log
                </p>
              </div>
            </div>

            <TerminalOutput output={currentExp.output} />
          </section>

          {/* Bottom Previous / Next Experiment Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 gap-3 font-mono">
            <button
              onClick={handlePrev}
              disabled={selectedId === 1}
              className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                selectedId === 1
                  ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600 border border-slate-800'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Experiment</span>
            </button>

            {/* Direct quick experiment pills */}
            <div className="hidden sm:flex items-center space-x-1.5">
              {experimentsData.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(exp.id)}
                  className={`w-7 h-7 rounded-lg transition-colors cursor-pointer text-xs ${
                    exp.id === selectedId
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                  title={exp.title}
                >
                  {exp.id}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedId === 9}
              className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                selectedId === 9
                  ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600 border border-slate-800'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-900/30 border border-cyan-500 active:scale-95'
              }`}
            >
              <span>Next Experiment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Studious Academic Footer with "Made by Asrar" */}
          <footer className="mt-14 pt-8 pb-12 border-t border-slate-800/80 text-center font-mono">
            <div className="flex flex-col items-center justify-center space-y-2.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>DSA Practical Examination Compendium • 2026–27</span>
              </div>
              
              <div className="text-sm font-semibold tracking-wide text-slate-200">
                Made by <span className="text-cyan-400 font-bold underline decoration-cyan-500/50 underline-offset-4">Asrar</span>
              </div>

              <div className="text-[11px] text-slate-500 tracking-wider">
                ISO C99 PROGRAMS • VERIFIED INPUT/OUTPUT • ALL 9 LAB EXPERIMENTS
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
