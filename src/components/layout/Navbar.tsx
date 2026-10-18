import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    { to: '/map', label: 'World Map', icon: <Map className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
    { to: '/playground', label: 'Playground', icon: <Code2 className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
    { to: '/notebook', label: 'Error Notebook', icon: <BookOpenCheck className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
  ];

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  return (
    <motion.header 
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-white/[0.14] bg-[#080B18]/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0080FF] via-[#8B00FF] to-[#FF1493] flex items-center justify-center shadow-glass-electric border border-white/30 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-glass-royal">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#20B2AA] via-[#0080FF] to-[#FF1493] bg-clip-text text-transparent">
              DSA Gamly
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#20B2AA] -mt-1 font-semibold">
              Interactive RPG
            </span>
          </div>
        </Link>

        {/* Navigation Links with Animated Sliding Indicator */}
        <nav className="hidden md:flex items-center gap-1.5 relative p-1 bg-white/[0.04] rounded-2xl border border-white/[0.1] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors group z-10 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/[0.16] to-white/[0.1] border border-white/[0.25] shadow-glass -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="text-[#0080FF] group-hover:text-[#20B2AA] transition-colors">{link.icon}</span>
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
    </motion.header>
  );
};
