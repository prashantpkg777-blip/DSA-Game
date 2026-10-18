import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Map, 
  Code2, 
  LayoutDashboard, 
  BookOpenCheck,
  Menu,
  X,
  Mic,
  MicOff,
  Zap
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { Badge } from '../ui/Badge';
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
    { to: '/map', label: 'WORLD MAP', icon: <Map className="w-4 h-4" /> },
    { to: '/dashboard', label: 'DASHBOARD', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/playground', label: 'CHAOS CODE', icon: <Code2 className="w-4 h-4" /> },
    { to: '/notebook', label: 'ERROR NOTEBOOK', icon: <BookOpenCheck className="w-4 h-4" /> },
  ];

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
    <header className="sticky top-0 z-50 w-full border-b-3 border-[#111111] dark:border-[#F5F0E8] bg-[#F5F0E8] dark:bg-[#111111] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand: DSA CHAOS */}
        <Link 
          to="/" 
          onClick={handleNavClick} 
          className="flex items-center gap-3 group select-none"
        >
          <div className="px-3 py-1.5 bg-[#C6FF00] text-[#111111] border-2 md:border-3 border-[#111111] shadow-[3px_3px_0px_#111111] -rotate-2 group-hover:rotate-0 transition-transform font-display font-black text-lg md:text-xl tracking-tighter flex items-center gap-1.5">
            <Zap className="w-5 h-5 fill-[#FF2DAA] text-[#111111]" />
            <span>DSA CHAOS</span>
          </div>
          <span className="hidden xl:inline-block text-[11px] font-mono uppercase font-black text-[#FF2DAA] dark:text-[#C6FF00] tracking-widest border border-dashed border-[#FF2DAA] dark:border-[#C6FF00] px-2 py-0.5 rounded-sm">
            BREAK THE CODE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavClick}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 font-display text-xs font-black tracking-wide border-2 transition-all ${
                  isActive
                    ? 'bg-[#FFF200] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] -translate-y-0.5'
                    : 'bg-transparent text-inherit border-transparent hover:border-[#111111] dark:hover:border-[#F5F0E8] hover:bg-[#F5F0E8] dark:hover:bg-[#1f1f1f]'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Player Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator sticker */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5C00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] font-mono text-xs font-black -rotate-1">
            <Flame className="w-4 h-4 fill-[#FFF200] text-[#111111]" />
            <span>{profile.streakDays}D STREAK</span>
          </div>

          {/* Level Badge */}
          <Link
            to="/dashboard"
            onClick={handleNavClick}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] font-display text-xs font-black rotate-1 hover:rotate-0 transition-transform"
          >
            <span>LVL {profile.level}</span>
            <span className="font-mono text-[11px] opacity-80">({profile.xp} XP)</span>
          </Link>

          {/* Start Quest CTA button */}
          <Link
            to="/map"
            onClick={handleNavClick}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C6FF00] hover:bg-[#b2e600] text-[#111111] border-2 md:border-3 border-[#111111] shadow-[3px_3px_0px_#111111] font-display font-black text-xs uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
          >
            <span>START QUEST ↗</span>
          </Link>

          {/* Audio, Voice, & Theme Buttons */}
          <div className="flex items-center gap-1 pl-1 border-l-2 border-[#111111] dark:border-[#333333]">
            {/* Voice Narrator */}
            <button
              onClick={handleVoiceToggle}
              className={`p-1.5 rounded-md border-2 border-[#111111] transition-all ${
                voiceEnabled ? 'bg-[#304FFE] text-[#F5F0E8] shadow-[2px_2px_0px_#111111]' : 'bg-transparent text-inherit opacity-60'
              }`}
              title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
              aria-label="Toggle Voice"
            >
              {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>

            {/* Sound FX */}
            <button
              onClick={handleSoundToggle}
              className={`p-1.5 rounded-md border-2 border-[#111111] transition-all ${
                soundEnabled ? 'bg-[#C6FF00] text-[#111111] shadow-[2px_2px_0px_#111111]' : 'bg-transparent text-inherit opacity-60'
              }`}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-1.5 rounded-md border-2 border-[#111111] bg-[#FFF200] text-[#111111] shadow-[2px_2px_0px_#111111] transition-all active:translate-y-0.5"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md border-2 border-[#111111] bg-[#F5F0E8] text-[#111111] shadow-[2px_2px_0px_#111111] ml-1"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t-3 border-[#111111] dark:border-[#F5F0E8] bg-[#F5F0E8] dark:bg-[#111111] px-4 py-4 overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border-2 border-[#111111] bg-[#C6FF00] text-[#111111] shadow-[3px_3px_0px_#111111] mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{profile.avatar}</span>
                <div>
                  <div className="font-display font-black text-sm uppercase">{profile.username}</div>
                  <div className="font-mono text-xs font-bold">LVL {profile.level} • {profile.xp} XP</div>
                </div>
              </div>
              <Link to="/map" onClick={handleNavClick} className="font-display font-black text-xs uppercase px-2 py-1 bg-[#111111] text-[#C6FF00]">
                QUEST ↗
              </Link>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick}
                  className={`flex items-center gap-2 p-2.5 font-display text-sm font-black border-2 border-[#111111] ${
                    location.pathname === link.to ? 'bg-[#FFF200] text-[#111111] shadow-[3px_3px_0px_#111111]' : 'bg-white dark:bg-[#1e1e1e] text-inherit'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
