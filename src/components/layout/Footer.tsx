import React from 'react';
import { Gamepad2, Heart, Code2, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-white/[0.1] bg-white/85 dark:bg-[#060a16]/80 backdrop-blur-xl py-8 sm:py-10 px-4 sm:px-6 lg:px-8 mt-auto shadow-sm dark:shadow-[0_-8px_32px_rgba(0,0,0,0.3)] transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0080FF] via-[#8B00FF] to-[#FF1493] flex items-center justify-center text-white shadow-sm">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-wide bg-gradient-to-r from-[#20B2AA] via-[#0080FF] to-[#FF1493] bg-clip-text text-transparent">
              DSA Gamly
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Stop Memorizing DSA. Start Playing It.
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
          <Link to="/map" className="hover:text-[#0080FF] dark:hover:text-cyan-300 transition-colors">Algorithm Map</Link>
          <Link to="/dashboard" className="hover:text-[#0080FF] dark:hover:text-cyan-300 transition-colors">Player Stats</Link>
          <Link to="/playground" className="hover:text-[#0080FF] dark:hover:text-cyan-300 transition-colors">Coding Playground</Link>
          <Link to="/notebook" className="hover:text-[#0080FF] dark:hover:text-cyan-300 transition-colors">Error Notebook</Link>
        </div>

        {/* Tech Stack badges */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
          <span>React 18 • TypeScript • Tailwind CSS • Web Audio • Web Speech</span>
        </div>
      </div>
    </footer>
  );
};
