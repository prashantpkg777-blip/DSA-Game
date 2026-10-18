import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate';
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
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-400/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]',
    slate: 'bg-white/[0.08] text-slate-300 border-white/[0.16] shadow-sm',
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
