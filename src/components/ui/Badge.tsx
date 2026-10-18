import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate' | 'electric' | 'royal' | 'pink' | 'teal' | 'lime' | 'orange' | 'yellow' | 'lavender';
  size?: 'sm' | 'md' | 'lg';
  tilt?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'lime',
  size = 'md',
  tilt = false,
  ...props
}) => {
  const variants = {
    lime: 'bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    teal: 'bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    cyan: 'bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    pink: 'bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    rose: 'bg-[#FF2DAA] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    blue: 'bg-[#304FFE] text-[#F5F0E8] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    electric: 'bg-[#304FFE] text-[#F5F0E8] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    royal: 'bg-[#B9A0FF] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    violet: 'bg-[#B9A0FF] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    lavender: 'bg-[#B9A0FF] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    orange: 'bg-[#FF5C00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    amber: 'bg-[#FFF200] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    yellow: 'bg-[#FFF200] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    emerald: 'bg-[#C6FF00] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
    slate: 'bg-[#2c2c2c] text-[#F5F0E8] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-mono font-bold uppercase rounded-sm',
    md: 'text-xs px-2.5 py-1 font-display font-extrabold uppercase rounded-sm tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 font-display font-black uppercase rounded-sm tracking-wider',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-transform select-none',
        tilt && 'rotate-[-2deg] hover:rotate-0',
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
