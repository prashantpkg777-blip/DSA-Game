import React from 'react';
import { Gamepad2, Heart, Code2, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.1] bg-[#060a16]/80 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8 mt-auto shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 backdrop-blur-md shadow-glass-cyan">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-wide bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
              DSA Gamly
            </div>
            <div className="text-xs text-slate-400">
              Stop Memorizing DSA. Start Playing It.
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <Link to="/map" className="hover:text-cyan-300 transition-colors">Algorithm Map</Link>
          <Link to="/dashboard" className="hover:text-cyan-300 transition-colors">Player Stats</Link>
          <Link to="/playground" className="hover:text-cyan-300 transition-colors">Coding Playground</Link>
          <Link to="/notebook" className="hover:text-cyan-300 transition-colors">Error Notebook</Link>
        </div>

        {/* Tech Stack badges */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>React 18 • TypeScript • Tailwind CSS • Monaco • Supabase</span>
        </div>
      </div>
    </footer>
  );
};
