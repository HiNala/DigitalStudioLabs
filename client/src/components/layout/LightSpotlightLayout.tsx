import React, { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

interface LightSpotlightLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  withMultipleSpotlights?: boolean;
}

export function LightSpotlightLayout({
  children,
  className,
  spotlightColor = "rgba(0, 160, 176, 0.10)",
  spotlightSize = 800,
  withMultipleSpotlights = true,
  ...props
}: LightSpotlightLayoutProps) {
  // Add state to track mouse position for spotlight positioning
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-white",
        className
      )}
      {...props}
    >
      {/* Primary spotlight with fixed position that follows mouse */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Spotlight 
          className="fixed"
          fill={spotlightColor}
          size={spotlightSize}
          springOptions={{ stiffness: 100, damping: 15 }}
        />

        {/* Optional secondary spotlights for layered effect */}
        {withMultipleSpotlights && (
          <>
            <Spotlight
              className="fixed"
              fill="rgba(77, 77, 255, 0.08)"
              size={spotlightSize * 1.2}
              springOptions={{ stiffness: 80, damping: 20 }}
            />
            <Spotlight
              className="fixed"
              fill="rgba(0, 160, 176, 0.05)"
              size={spotlightSize * 0.8}
              springOptions={{ stiffness: 120, damping: 12 }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 