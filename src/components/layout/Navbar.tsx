import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  BookOpenCheck,
  Menu,
  X,
  Mic,
  MicOff
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { audioService } from '../../services/audioService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    profile, 
    soundEnabled, 
    voiceEnabled, 
    theme, 
    toggleSound, 
    toggleVoice, 
    toggleTheme 
  } = useUserStore();

  const navLinks = [
    { to: '/map', label: 'World Map', icon: <Map className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
    { to: '/playground', label: 'Playground', icon: <Code2 className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
    { to: '/notebook', label: 'Error Notebook', icon: <BookOpenCheck className="w-4 h-4 transition-transform duration-200 group-hover:scale-115" /> },
  ];

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  const handleNavClick = () => {
    audioService.playClick(soundEnabled);
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    audioService.playClick(true);
    toggleSound();
  };

  const handleVoiceToggle = () => {
    audioService.playClick(soundEnabled);
    toggleVoice();
  };

  const handleThemeToggle = () => {
    audioService.playClick(soundEnabled);
    toggleTheme();
  };

  return (
    <motion.header 
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/90 dark:border-white/[0.14] bg-white/85 dark:bg-[#080B18]/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" onClick={handleNavClick} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0080FF] via-[#8B00FF] to-[#FF1493] flex items-center justify-center shadow-glass-electric border border-white/30 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-glass-royal">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#20B2AA] via-[#0080FF] to-[#FF1493] bg-clip-text text-transparent">
              DSA Gamly
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0080FF] dark:text-[#20B2AA] -mt-1 font-semibold">
              Interactive RPG
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Animated Sliding Indicator */}
        <nav className="hidden md:flex items-center gap-1.5 relative p-1 bg-slate-100/80 dark:bg-white/[0.04] rounded-2xl border border-slate-200/80 dark:border-white/[0.1] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavClick}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors group z-10 ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-gradient-to-r dark:from-white/[0.16] dark:to-white/[0.1] border border-slate-200 dark:border-white/[0.25] shadow-sm dark:shadow-glass -z-10"
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-600 dark:text-amber-300 font-mono text-xs backdrop-blur-md shadow-sm">
            <Flame className="w-4 h-4 fill-amber-500 dark:fill-amber-400 animate-pulse text-amber-500 dark:text-amber-400" />
            <span className="font-bold">{profile.streakDays}d</span>
          </div>

          {/* Level & XP Mini Bar (Tablet & Desktop) */}
          <Link
            to="/dashboard"
            onClick={handleNavClick}
            className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-xl bg-slate-100/70 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.15] hover:border-slate-300 dark:hover:border-white/[0.25] backdrop-blur-md shadow-sm transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Badge variant="violet" size="sm">
                LVL {profile.level}
              </Badge>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200 hidden lg:inline">
                {profile.displayName}
              </span>
            </div>
            <div className="w-20 hidden md:block">
              <ProgressBar value={xpPercent} height="sm" barColor="cyan" />
            </div>
            <span className="text-[11px] font-mono text-[#0080FF] dark:text-cyan-300 font-medium">
              {profile.xp}/{profile.xpToNextLevel} XP
            </span>
          </Link>

          {/* Controls: Audio, Voice, & Theme */}
          <div className="flex items-center gap-1 border-l border-slate-200/80 dark:border-white/[0.12] pl-1.5 sm:pl-2">
            {/* Voice Narrator Quick Toggle */}
            <button
              onClick={handleVoiceToggle}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                voiceEnabled
                  ? 'text-[#0080FF] hover:bg-[#0080FF]/10'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
              }`}
              title={voiceEnabled ? 'Mute AI Voice Narrator' : 'Enable AI Voice Narrator'}
              aria-label="Toggle Voice"
            >
              {voiceEnabled ? <Mic className="w-4 h-4 text-[#0080FF]" /> : <MicOff className="w-4 h-4" />}
            </button>

            {/* Sound Effects Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                soundEnabled
                  ? 'text-[#20B2AA] hover:bg-[#20B2AA]/10'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
              }`}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] backdrop-blur-md transition-all active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors ml-1"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#080B18]/95 backdrop-blur-3xl px-4 py-4 overflow-hidden shadow-2xl"
          >
            {/* Player Mini Status */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/80 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{profile.avatar}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{profile.username}</span>
                    <Badge variant="violet" size="sm">LVL {profile.level}</Badge>
                  </div>
                  <span className="text-xs text-[#0080FF] dark:text-cyan-300 font-mono">
                    {profile.xp}/{profile.xpToNextLevel} XP ({xpPercent}%)
                  </span>
                </div>
              </div>
              <Link
                to="/dashboard"
                onClick={handleNavClick}
                className="text-xs font-semibold text-[#0080FF] hover:underline"
              >
                Profile →
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0080FF]/15 text-[#0080FF] dark:text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-[#0080FF]">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Controls in Drawer */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-mono">Theme & Voice</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceToggle}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 flex items-center gap-1"
                >
                  {voiceEnabled ? <Mic className="w-3.5 h-3.5 text-[#0080FF]" /> : <MicOff className="w-3.5 h-3.5" />}
                  <span>{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
                </button>
                <button
                  onClick={handleThemeToggle}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 flex items-center gap-1"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
