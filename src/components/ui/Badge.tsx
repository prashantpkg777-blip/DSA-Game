import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate' | 'electric' | 'royal' | 'pink' | 'teal';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'cyan',
  size = 'md',
  ...props
}) => {
  const variants = {
    electric: 'bg-[#0080FF]/15 text-[#0060DF] dark:text-[#60A5FA] border-[#0080FF]/40 shadow-[0_0_14px_rgba(0,128,255,0.25)]',
    royal: 'bg-[#8B00FF]/15 text-[#7000DF] dark:text-[#C084FC] border-[#8B00FF]/40 shadow-[0_0_14px_rgba(139,0,255,0.25)]',
    pink: 'bg-[#FF1493]/15 text-[#DF0078] dark:text-[#F472B6] border-[#FF1493]/40 shadow-[0_0_14px_rgba(255,20,147,0.25)]',
    teal: 'bg-[#20B2AA]/15 text-teal-700 dark:text-[#2DD4BF] border-[#20B2AA]/40 shadow-[0_0_14px_rgba(32,178,170,0.25)]',
    cyan: 'bg-[#20B2AA]/15 text-teal-700 dark:text-[#2DD4BF] border-[#20B2AA]/40 shadow-[0_0_14px_rgba(32,178,170,0.25)]',
    violet: 'bg-[#8B00FF]/15 text-[#7000DF] dark:text-[#C084FC] border-[#8B00FF]/40 shadow-[0_0_14px_rgba(139,0,255,0.25)]',
    emerald: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-400/40 shadow-[0_0_14px_rgba(16,185,129,0.2)]',
    amber: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-400/40 shadow-[0_0_14px_rgba(245,158,11,0.2)]',
    rose: 'bg-[#FF1493]/15 text-[#DF0078] dark:text-[#F472B6] border-[#FF1493]/40 shadow-[0_0_14px_rgba(255,20,147,0.25)]',
    slate: 'bg-slate-200/80 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-white/[0.18] shadow-sm',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-full font-mono tracking-wide',
    md: 'text-xs px-3 py-1 rounded-full font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border uppercase tracking-wider backdrop-blur-md glass-badge',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
