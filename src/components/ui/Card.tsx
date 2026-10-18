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
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-glass hover:shadow-glass-cyan',
    violet: 'border-violet-500/30 hover:border-violet-400/60 shadow-glass hover:shadow-glass-violet',
    amber: 'border-amber-500/30 hover:border-amber-400/60 shadow-glass hover:shadow-amber-500/20',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-glass hover:shadow-emerald-500/20',
    rose: 'border-rose-500/30 hover:border-rose-400/60 shadow-glass hover:shadow-rose-500/20',
    none: 'border-white/[0.12] hover:border-white/[0.22] shadow-glass',
  };

  return (
    <div
      className={cn(
        'relative bg-white/[0.05] backdrop-blur-xl rounded-2xl border p-5 transition-all duration-300 text-slate-100',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:opacity-60',
        glowClasses[glow],
        interactive && 'cursor-pointer hover:-translate-y-1 hover:bg-white/[0.08] active:translate-y-0 active:scale-[0.99] glass-card-hover',
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
