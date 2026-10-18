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
    { to: '/map', label: 'MAP', icon: Map },
    { to: '/dashboard', label: 'COOK', icon: LayoutDashboard },
    { to: '/playground', label: 'CODE', icon: Code2 },
    { to: '/notebook', label: 'NOTES', icon: BookOpenCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F5F0E8] dark:bg-[#111111] border-t-3 border-[#111111] dark:border-[#F5F0E8] px-2 py-1.5 flex items-center justify-around select-none">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.to;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.to}
            to={tab.to}
            onClick={() => audioService.playClick(soundEnabled)}
            className={`relative flex flex-col items-center justify-center min-w-[64px] py-1 px-2 border-2 transition-all font-display ${
              isActive
                ? 'bg-[#C6FF00] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] -translate-y-0.5'
                : 'border-transparent text-inherit opacity-70 hover:opacity-100'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
