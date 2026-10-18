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
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-mono tracking-wide',
    md: 'text-xs px-2.5 py-1 rounded-lg font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border uppercase tracking-wider',
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
