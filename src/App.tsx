import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { AudioVoiceController } from './components/audio/AudioVoiceController';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorldMapPage } from './pages/WorldMapPage';
import { LessonPage } from './pages/LessonPage';
import { CodingPlaygroundPage } from './pages/CodingPlaygroundPage';
import { ErrorNotebookPage } from './pages/ErrorNotebookPage';
import { useUserStore } from './stores/userStore';

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
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/map" element={<WorldMapPage />} />
              <Route path="/lesson/:topicId" element={<LessonPage />} />
              <Route path="/playground" element={<CodingPlaygroundPage />} />
              <Route path="/notebook" element={<ErrorNotebookPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
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
