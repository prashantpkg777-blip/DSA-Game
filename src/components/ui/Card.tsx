import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  interactive = false,
  ...props
}) => {
  const glowClasses = {
    cyan: 'border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-glow-cyan',
    violet: 'border-violet-500/30 hover:border-violet-500/60 hover:shadow-glow-violet',
    amber: 'border-amber-500/30 hover:border-amber-500/60 hover:shadow-glow-amber',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-glow-emerald',
    rose: 'border-rose-500/30 hover:border-rose-500/60 shadow-lg shadow-rose-950/30',
    none: 'border-slate-800 hover:border-slate-700',
  };

  return (
    <div
      className={cn(
        'bg-slate-900/80 backdrop-blur-md rounded-2xl border p-5 transition-all duration-300 text-slate-100',
        glowClasses[glow],
        interactive && 'cursor-pointer hover:-translate-y-1 hover:bg-slate-800/90 active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
