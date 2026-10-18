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
    primary: 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 font-semibold shadow-glass-cyan hover:brightness-110 active:brightness-95 border-t border-cyan-200/50',
    secondary: 'bg-white/[0.07] hover:bg-white/[0.13] text-slate-200 border border-white/[0.18] backdrop-blur-md shadow-glass hover:border-white/[0.28]',
    neon: 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-600 text-white font-bold shadow-glass-violet hover:brightness-115 active:scale-95 border-t border-white/40',
    amber: 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-semibold shadow-glow-amber hover:brightness-110 border-t border-amber-200/50',
    ghost: 'bg-transparent hover:bg-white/[0.08] text-slate-300 hover:text-white border border-transparent hover:border-white/[0.12]',
    danger: 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold border border-rose-400/30 shadow-lg shadow-rose-950/40',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] glass-btn',
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
