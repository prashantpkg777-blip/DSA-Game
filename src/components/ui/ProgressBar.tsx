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
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-glow-cyan',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-glow-amber',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-glow-emerald',
    violet: 'bg-gradient-to-r from-violet-600 to-purple-500 shadow-glow-violet',
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60', heights[height])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out relative', colors[barColor])}
          style={{ width: `${clampedValue}%` }}
        >
          {/* Subtle shine pulse */}
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse-subtle" />
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
