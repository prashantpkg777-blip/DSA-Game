import React from 'react';
import { cn } from '../../utils/cn';
import { audioService } from '../../services/audioService';
import { useUserStore } from '../../stores/userStore';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neon' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  shimmer?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  shimmer,
  onClick,
  disabled,
  ...props
}) => {
  const soundEnabled = useUserStore((s) => s.soundEnabled);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    audioService.playClick(soundEnabled);
    onClick?.(e);
  };

  const variants = {
    primary: 'bg-gradient-to-r from-[#0080FF] via-[#0099FF] to-[#20B2AA] text-white font-semibold shadow-glass-electric hover:brightness-110 active:brightness-95 border border-white/30',
    secondary: 'bg-slate-900/10 dark:bg-white/[0.08] hover:bg-slate-900/15 dark:hover:bg-white/[0.15] text-slate-800 dark:text-slate-100 border border-slate-300/80 dark:border-white/[0.2] backdrop-blur-md shadow-sm dark:shadow-glass hover:border-slate-400 dark:hover:border-white/[0.35]',
    neon: 'bg-gradient-to-r from-[#0080FF] via-[#8B00FF] to-[#FF1493] text-white font-bold shadow-glass-royal hover:brightness-115 active:scale-[0.97] border border-white/40',
    amber: 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-semibold shadow-glow-amber hover:brightness-110 border-t border-amber-200/50',
    ghost: 'bg-transparent hover:bg-slate-900/10 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-white/[0.18]',
    danger: 'bg-gradient-to-r from-[#FF1493] to-rose-600 text-white font-semibold border border-rose-400/40 shadow-glass-pink hover:brightness-110',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  };

  const hasShimmer = shimmer ?? (variant === 'primary' || variant === 'neon');

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0080FF]/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] hover:-translate-y-0.5 glass-btn',
        hasShimmer && 'btn-light-sweep',
        variants[variant],
        sizes[size],
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </button>
  );
};
