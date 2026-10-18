import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { AudioVoiceController } from './components/audio/AudioVoiceController';
import { useUserStore } from './stores/userStore';

// Code-split route pages for high performance and low initial bundle size
const LandingPage = React.lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const DashboardPage = React.lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const WorldMapPage = React.lazy(() =>
  import('./pages/WorldMapPage').then((m) => ({ default: m.WorldMapPage }))
);
const LessonPage = React.lazy(() =>
  import('./pages/LessonPage').then((m) => ({ default: m.LessonPage }))
);
const CodingPlaygroundPage = React.lazy(() =>
  import('./pages/CodingPlaygroundPage').then((m) => ({ default: m.CodingPlaygroundPage }))
);
const ErrorNotebookPage = React.lazy(() =>
  import('./pages/ErrorNotebookPage').then((m) => ({ default: m.ErrorNotebookPage }))
);

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8" aria-busy="true" aria-label="Loading page">
    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse mb-4 shadow-[0_0_24px_rgba(32,178,170,0.3)]">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
    </div>
    <p className="text-sm font-medium tracking-wide text-cyan-400 animate-pulse">Loading Quest...</p>
  </div>
);

export const App: React.FC = () => {
  const theme = useUserStore((s) => s.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#F1F5F9] dark:bg-[#080B18] text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col transition-colors duration-300 pb-16 md:pb-0">
        {/* Global Glassmorphic Bokeh Atmosphere */}
        <div className="glass-bokeh-bg" aria-hidden="true">
          <div className="bokeh-orb-1" />
          <div className="bokeh-orb-2" />
          <div className="bokeh-orb-3" />
          <div className="bokeh-orb-4" />
          <div className="bokeh-particles-container">
            <div className="bokeh-particle bokeh-p1" />
            <div className="bokeh-particle bokeh-p2" />
            <div className="bokeh-particle bokeh-p3" />
            <div className="bokeh-particle bokeh-p4" />
            <div className="bokeh-particle bokeh-p5" />
          </div>
        </div>
        <div className="glass-grid-overlay" aria-hidden="true" />

        {/* Interactive App Shell */}
        <div className="relative z-10 flex flex-col flex-1">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/map" element={<WorldMapPage />} />
                <Route path="/lesson/:topicId" element={<LessonPage />} />
                <Route path="/playground" element={<CodingPlaygroundPage />} />
                <Route path="/notebook" element={<ErrorNotebookPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>

        {/* Floating Voice & Audio Controller */}
        <AudioVoiceController />

        {/* Mobile & Tablet Bottom Navigation Bar */}
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
