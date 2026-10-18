import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  barColor?: 'cyan' | 'amber' | 'emerald' | 'violet';
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
  barColor = 'cyan',
  showLabel = false,
  height = 'md',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const colors = {
    cyan: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-glass-cyan',
    amber: 'bg-gradient-to-r from-amber-400 to-yellow-300 shadow-glow-amber',
    emerald: 'bg-gradient-to-r from-emerald-400 to-teal-300 shadow-glow-emerald',
    violet: 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-glass-violet',
  };

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-white/[0.06] backdrop-blur-md rounded-full overflow-hidden p-0.5 border border-white/[0.14] shadow-inner', heights[height])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out relative', colors[barColor])}
          style={{ width: `${clampedValue}%` }}
        >
          {/* Subtle specular reflection pulse */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full animate-pulse-subtle" />
        </div>
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mt-1 font-mono">
          <span>Progress</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
    </div>
  );
};
