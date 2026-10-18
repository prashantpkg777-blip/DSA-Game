import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
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
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
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
    </BrowserRouter>
  );
};

export default App;
