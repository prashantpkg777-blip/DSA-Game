import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, LayoutDashboard, Code2, BookOpenCheck } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { useUserStore } from '../../stores/userStore';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const soundEnabled = useUserStore((s) => s.soundEnabled);

  const tabs = [
    { to: '/map', label: 'World Map', icon: Map },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/playground', label: 'Playground', icon: Code2 },
    { to: '/notebook', label: 'Notebook', icon: BookOpenCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#080B18]/90 backdrop-blur-2xl border-t border-slate-200/90 dark:border-white/15 px-3 py-2 flex items-center justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.to;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.to}
            to={tab.to}
            onClick={() => audioService.playClick(soundEnabled)}
            className={`relative flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-xl text-xs transition-colors duration-200 ${
              isActive
                ? 'text-[#0080FF] dark:text-[#20B2AA] font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-active"
                className="absolute inset-0 rounded-xl bg-[#0080FF]/10 dark:bg-white/[0.08] border border-[#0080FF]/25 dark:border-white/20 shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
