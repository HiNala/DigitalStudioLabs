import React, { useState, useEffect } from 'react';

interface SpliteProps {
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
  initialPosition?: number;
  minPosition?: number;
  maxPosition?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  gapSize?: number;
}

const sizeClasses = {
  sm: "h-32 md:h-40 lg:h-44",
  md: "h-36 md:h-48 lg:h-56",
  lg: "h-44 md:h-64 lg:h-80",
  xl: "h-52 md:h-80 lg:h-96",
  "2xl": "h-64 md:h-96 lg:h-[32rem]",
  "3xl": "h-72 md:h-[28rem] lg:h-[36rem]",
  "4xl": "h-80 md:h-[32rem] lg:h-[40rem]",
  "5xl": "h-96 md:h-[36rem] lg:h-[48rem]",
  "6xl": "h-[28rem] md:h-[40rem] lg:h-[56rem]",
  full: "h-screen",
};

export function Splite({
  leftSide,
  rightSide,
  initialPosition = 50,
  minPosition = 20,
  maxPosition = 80,
  className = '',
  size = 'lg',
  gapSize = 0,
}: SpliteProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle mouse events for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = ((e.clientX - rect.left) / rect.width) * 100;
      
      // Clamp position between minPosition and maxPosition
      newPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));
      
      setPosition(newPosition);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minPosition, maxPosition]);

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      
      // Clamp position between minPosition and maxPosition
      newPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));
      
      setPosition(newPosition);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, minPosition, maxPosition]);

  const startDragging = () => {
    setIsDragging(true);
  };

  const baseClasses = "relative flex w-full overflow-hidden rounded-md";
  const sizeClass = sizeClasses[size];

  return (
    <div 
      ref={containerRef}
      className={`${baseClasses} ${sizeClass} ${className}`}
    >
      {/* Left side */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ width: `${position}%` }}
      >
        {leftSide}
      </div>
      
      {/* Divider handle */}
      <div
        className={`absolute top-0 bottom-0 z-10 flex -translate-x-1/2 cursor-col-resize touch-none items-center justify-center ${
          isDragging ? "pointer-events-none" : ""
        }`}
        style={{ left: `${position}%` }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        <div className={`relative h-full w-0.5 bg-primary ${gapSize > 0 ? "bg-transparent" : ""}`}>
          {gapSize > 0 && (
            <div className="absolute top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#30363D] bg-[#161B22]/80 p-1 backdrop-blur">
              <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
                <div className="h-1 w-1 rounded-full bg-[#00A0B0]" />
                <div className="h-1 w-1 rounded-full bg-[#00A0B0]" />
                <div className="h-1 w-1 rounded-full bg-[#00A0B0]" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side */}
      <div 
        className="absolute inset-0 left-1/2 overflow-hidden" 
        style={{ width: `${100 - position}%` }}
      >
        {rightSide}
      </div>
    </div>
  );
}