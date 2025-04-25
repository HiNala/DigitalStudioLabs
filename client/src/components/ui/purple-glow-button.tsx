'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

interface PurpleGlowButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function PurpleGlowButton({ 
  children, 
  className, 
  href,
  onClick 
}: PurpleGlowButtonProps) {
  const buttonClasses = cn(
    "relative inline-flex items-center justify-center",
    "px-8 py-4 border-[0.25em] border-[#D9B0FF]",
    "text-[#D9B0FF] bg-[#643D88] rounded-[1em] font-bold",
    "shadow-[0_0_1em_0.25em_#D9B0FF,0_0_4em_1em_rgba(191,123,255,0.781),inset_0_0_0.75em_0.25em_#D9B0FF]",
    "text-shadow-glow",
    "transition-all duration-300 will-change-transform",
    "hover:text-[#643D88] hover:bg-[#D9B0FF]",
    "hover:shadow-[0_0_1em_0.25em_#D9B0FF,0_0_4em_2em_rgba(191,123,255,0.781),inset_0_0_0.75em_0.25em_#D9B0FF]",
    "active:shadow-[0_0_0.6em_0.25em_#D9B0FF,0_0_2.5em_2em_rgba(191,123,255,0.781),inset_0_0_0.5em_0.25em_#D9B0FF]",
    className
  );

  if (href) {
    return (
      <div className="relative">
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
        <div className="absolute top-[120%] left-0 w-full h-full bg-[rgba(191,123,255,0.781)] opacity-70 blur-[2em] -z-10" 
             style={{ transform: 'perspective(1.5em) rotateX(35deg) scale(1, 0.6)' }}></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button className={buttonClasses} onClick={onClick}>
        {children}
      </button>
      <div className="absolute top-[120%] left-0 w-full h-full bg-[rgba(191,123,255,0.781)] opacity-70 blur-[2em] -z-10" 
           style={{ transform: 'perspective(1.5em) rotateX(35deg) scale(1, 0.6)' }}></div>
    </div>
  );
}