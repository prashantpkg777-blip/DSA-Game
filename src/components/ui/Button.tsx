import React from 'react';
import { cn } from '../../utils/cn';
import { audioService } from '../../services/audioService';
import { useUserStore } from '../../stores/userStore';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neon' | 'ghost' | 'danger' | 'amber' | 'lime' | 'pink' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  tilt?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  tilt = false,
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
    primary: 'bg-[#C6FF00] hover:bg-[#b2e600] text-[#111111] border-2 border-[#111111] dark:border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#C6FF00]',
    lime: 'bg-[#C6FF00] hover:bg-[#b2e600] text-[#111111] border-2 border-[#111111] dark:border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#C6FF00]',
    pink: 'bg-[#FF2DAA] hover:bg-[#e02695] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#FF2DAA]',
    blue: 'bg-[#304FFE] hover:bg-[#2843d8] text-[#F5F0E8] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#304FFE]',
    secondary: 'bg-[#F5F0E8] hover:bg-[#eae3d5] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#F5F0E8]',
    neon: 'bg-[#FF5C00] hover:bg-[#e65300] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#FF5C00]',
    amber: 'bg-[#FFF200] hover:bg-[#e6da00] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#FFF200]',
    ghost: 'bg-transparent hover:bg-white/10 text-inherit border-2 border-transparent hover:border-[#111111] dark:hover:border-[#F5F0E8]',
    danger: 'bg-[#FF2DAA] hover:bg-rose-600 text-white border-2 border-[#111111] shadow-[3px_3px_0px_#111111]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5 font-bold',
    md: 'px-4 py-2 text-sm rounded-lg gap-2 font-black tracking-wide',
    lg: 'px-6 py-3 text-base rounded-xl gap-2.5 font-black uppercase tracking-wider',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-display transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5',
        tilt && 'hover:rotate-1',
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
