import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Gamepad2, 
  Map, 
  Code2, 
  LayoutDashboard, 
  Flame, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sparkles,
  BookOpenCheck
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { profile, soundEnabled, theme, toggleSound, toggleTheme } = useUserStore();

  const navLinks = [
    { to: '/map', label: 'World Map', icon: <Map className="w-4 h-4" /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/playground', label: 'Playground', icon: <Code2 className="w-4 h-4" /> },
    { to: '/notebook', label: 'Error Notebook', icon: <BookOpenCheck className="w-4 h-4" /> },
  ];

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.12] bg-[#070c1a]/75 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/90 via-sky-500/90 to-violet-600/90 flex items-center justify-center shadow-glass-cyan border border-white/30 backdrop-blur-md transition-transform group-hover:scale-105">
            <Gamepad2 className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              DSA Gamly
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300/80 -mt-1">
              Interactive RPG
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/[0.12] text-cyan-300 border border-cyan-400/40 shadow-glass-cyan backdrop-blur-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1]'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Player Stats & Controls */}
        <div className="flex items-center gap-3">
          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 font-mono text-xs backdrop-blur-md shadow-glass">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse text-amber-400" />
            <span className="font-bold">{profile.streakDays}d</span>
          </div>

          {/* Level & XP Mini Bar */}
          <Link
            to="/dashboard"
            className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-xl bg-white/[0.06] border border-white/[0.15] hover:border-white/[0.25] backdrop-blur-md shadow-glass transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Badge variant="violet" size="sm">
                LVL {profile.level}
              </Badge>
              <span className="text-xs font-medium text-slate-200 hidden lg:inline">
                {profile.displayName}
              </span>
            </div>
            <div className="w-20 hidden md:block">
              <ProgressBar value={xpPercent} height="sm" barColor="cyan" />
            </div>
            <span className="text-[11px] font-mono text-cyan-300 font-medium">
              {profile.xp}/{profile.xpToNextLevel} XP
            </span>
          </Link>

          {/* Controls: Sound & Theme */}
          <div className="flex items-center gap-1 border-l border-white/[0.12] pl-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] backdrop-blur-md transition-colors"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] backdrop-blur-md transition-colors"
              title="Toggle theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
