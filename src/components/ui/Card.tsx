import React, { useRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'electric' | 'royal' | 'pink' | 'teal' | 'lime' | 'orange' | 'yellow' | 'none';
  interactive?: boolean;
  tilt?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  interactive = false,
  tilt = false,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = null;
    onMouseLeave?.(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    onMouseMove?.(e);
  };

  const glowClasses = {
    electric: 'border-[#304FFE] shadow-[5px_5px_0px_#304FFE] dark:shadow-[5px_5px_0px_#304FFE]',
    royal: 'border-[#B9A0FF] shadow-[5px_5px_0px_#B9A0FF] dark:shadow-[5px_5px_0px_#B9A0FF]',
    pink: 'border-[#FF2DAA] shadow-[5px_5px_0px_#FF2DAA] dark:shadow-[5px_5px_0px_#FF2DAA]',
    teal: 'border-[#C6FF00] shadow-[5px_5px_0px_#C6FF00] dark:shadow-[5px_5px_0px_#C6FF00]',
    cyan: 'border-[#C6FF00] shadow-[5px_5px_0px_#C6FF00] dark:shadow-[5px_5px_0px_#C6FF00]',
    lime: 'border-[#C6FF00] shadow-[5px_5px_0px_#C6FF00] dark:shadow-[5px_5px_0px_#C6FF00]',
    violet: 'border-[#B9A0FF] shadow-[5px_5px_0px_#B9A0FF] dark:shadow-[5px_5px_0px_#B9A0FF]',
    amber: 'border-[#FFF200] shadow-[5px_5px_0px_#FFF200] dark:shadow-[5px_5px_0px_#FFF200]',
    yellow: 'border-[#FFF200] shadow-[5px_5px_0px_#FFF200] dark:shadow-[5px_5px_0px_#FFF200]',
    orange: 'border-[#FF5C00] shadow-[5px_5px_0px_#FF5C00] dark:shadow-[5px_5px_0px_#FF5C00]',
    emerald: 'border-[#C6FF00] shadow-[5px_5px_0px_#C6FF00] dark:shadow-[5px_5px_0px_#C6FF00]',
    rose: 'border-[#FF2DAA] shadow-[5px_5px_0px_#FF2DAA] dark:shadow-[5px_5px_0px_#FF2DAA]',
    none: 'border-[#111111] dark:border-[#F5F0E8] shadow-[5px_5px_0px_#111111] dark:shadow-[5px_5px_0px_#F5F0E8]',
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        'p-5 bg-[#F5F0E8] dark:bg-[#181818] text-[#111111] dark:text-[#F5F0E8] border-2 md:border-3 rounded-xl transition-all duration-150',
        tilt && 'rotate-[-0.5deg] hover:rotate-0',
        glowClasses[glow],
        interactive && 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#C6FF00] dark:hover:shadow-[7px_7px_0px_#FF2DAA] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#111111]',
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
