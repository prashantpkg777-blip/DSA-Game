import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'electric' | 'royal' | 'pink' | 'teal' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  interactive = false,
  onMouseMove,
  ...props
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Efficiently set CSS variables for mouse-following light without triggering React re-renders
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    onMouseMove?.(e);
  };

  const glowClasses = {
    electric: 'border-[#0080FF]/35 hover:border-[#0080FF]/70 hover:shadow-glass-electric',
    royal: 'border-[#8B00FF]/35 hover:border-[#8B00FF]/70 hover:shadow-glass-royal',
    pink: 'border-[#FF1493]/35 hover:border-[#FF1493]/70 hover:shadow-glass-pink',
    teal: 'border-[#20B2AA]/35 hover:border-[#20B2AA]/70 hover:shadow-glass-teal',
    cyan: 'border-[#20B2AA]/35 hover:border-[#20B2AA]/70 hover:shadow-glass-teal',
    violet: 'border-[#8B00FF]/35 hover:border-[#8B00FF]/70 hover:shadow-glass-royal',
    amber: 'border-amber-400/35 hover:border-amber-400/70 hover:shadow-glass-amber',
    emerald: 'border-emerald-400/35 hover:border-emerald-400/70 hover:shadow-glass-emerald',
    rose: 'border-[#FF1493]/35 hover:border-[#FF1493]/70 hover:shadow-glass-pink',
    none: 'border-white/[0.18] hover:border-white/[0.3]',
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'glass-card p-5 text-slate-100',
        glowClasses[glow],
        interactive && 'cursor-pointer glass-card-hover active:scale-[0.99] active:translate-y-0',
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
