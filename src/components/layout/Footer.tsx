import React from 'react';
import { Zap, Terminal, Sparkles, Flame, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-3 border-[#111111] dark:border-[#F5F0E8] bg-[#F5F0E8] dark:bg-[#111111] text-[#111111] dark:text-[#F5F0E8] mt-auto select-none">
      {/* Gen-Z Chaos Infinite Marquee Banner */}
      <div className="bg-[#C6FF00] text-[#111111] border-b-3 border-[#111111] overflow-hidden py-2 font-display font-black text-sm uppercase tracking-wider">
        <div className="flex w-max animate-marquee space-x-8">
          <span>ARRAYS ✳ RECURSION ✳ TREES ✳ GRAPHS ✳ DYNAMIC PROGRAMMING ✳ BREAK THE CODE ✳ MASTER THE CHAOS ✳ LESS THEORY ✳ MORE ALGORITHM MAYHEM ✳</span>
          <span>ARRAYS ✳ RECURSION ✳ TREES ✳ GRAPHS ✳ DYNAMIC PROGRAMMING ✳ BREAK THE CODE ✳ MASTER THE CHAOS ✳ LESS THEORY ✳ MORE ALGORITHM MAYHEM ✳</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] font-display font-black text-lg -rotate-2">
            DSA CHAOS
          </div>
          <div>
            <div className="font-display font-black text-sm uppercase tracking-tight">
              BREAK THE CODE. MASTER THE CHAOS.
            </div>
            <div className="font-mono text-xs text-[#FF5C00] dark:text-[#C6FF00] font-bold">
              LeetCode meets Arcade Mayhem.
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-display text-xs font-black uppercase">
          <Link to="/map" className="px-2.5 py-1 bg-[#FFF200] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:-translate-y-0.5 transition-transform">
            World Map
          </Link>
          <Link to="/dashboard" className="px-2.5 py-1 bg-[#B9A0FF] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:-translate-y-0.5 transition-transform">
            Dashboard
          </Link>
          <Link to="/playground" className="px-2.5 py-1 bg-[#304FFE] text-[#F5F0E8] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:-translate-y-0.5 transition-transform">
            Chaos Code
          </Link>
          <Link to="/notebook" className="px-2.5 py-1 bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:-translate-y-0.5 transition-transform">
            Error Notebook
          </Link>
        </div>

        {/* Streetwear Barcode / Technical Spec */}
        <div className="font-mono text-[11px] font-bold tracking-widest text-center md:text-right opacity-80">
          <div>CHAOS-ENGINE v3.0 // ARCHIVE</div>
          <div className="text-[#FF2DAA] dark:text-[#C6FF00]">REACT • MONACO • WEB AUDIO • CANVAS</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
