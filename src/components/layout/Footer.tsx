import React from 'react';
import { Gamepad2, Heart, Code2, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-slate-200">
              DSA QUEST
            </div>
            <div className="text-xs text-slate-500">
              Stop Memorizing DSA. Start Playing It.
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <Link to="/map" className="hover:text-cyan-400 transition-colors">Algorithm Map</Link>
          <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Player Stats</Link>
          <Link to="/playground" className="hover:text-cyan-400 transition-colors">Coding Playground</Link>
          <Link to="/notebook" className="hover:text-cyan-400 transition-colors">Error Notebook</Link>
        </div>

        {/* Tech Stack badges */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Built with React 18, Vite 6, Tailwind CSS, Monaco & Supabase</span>
        </div>
      </div>
    </footer>
  );
};
