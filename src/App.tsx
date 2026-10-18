import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { AudioVoiceController } from './components/audio/AudioVoiceController';
import { useUserStore } from './stores/userStore';

// Code-split route pages for maximum performance
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
    <div className="p-4 bg-[#C6FF00] text-[#111111] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] -rotate-2 animate-bounce">
      <div className="font-display font-black text-sm uppercase tracking-wider flex items-center gap-2">
        <span className="animate-spin text-lg">✳</span>
        <span>LOADING MAYHEM...</span>
      </div>
    </div>
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
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#F5F0E8] dark:bg-[#111111] text-[#111111] dark:text-[#F5F0E8] font-sans selection:bg-[#C6FF00] selection:text-[#111111] flex flex-col transition-colors duration-200 pb-16 md:pb-0">
        {/* Halftone Dot Pattern Atmosphere */}
        <div className="chaos-halftone-bg" aria-hidden="true" />

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
