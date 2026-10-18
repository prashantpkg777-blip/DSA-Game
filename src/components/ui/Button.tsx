import React from 'react';
import { cn } from '../../utils/cn';
import { useUserStore } from '../../stores/userStore';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neon' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled,
  ...props
}) => {
  const soundEnabled = useUserStore((s) => s.soundEnabled);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (soundEnabled) {
      // Gentle synthetic audio click using Web Audio API
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(variant === 'neon' ? 880 : 540, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch {
        // AudioContext not allowed or not supported
      }
    }
    onClick?.(e);
  };

  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-glow-cyan hover:shadow-cyan-500/50',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600',
    neon: 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow-violet hover:brightness-110 active:scale-95',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-glow-amber',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-900/40',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
