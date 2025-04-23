import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

interface SpotlightLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  withMultipleSpotlights?: boolean;
}

export function SpotlightLayout({
  children,
  className,
  spotlightColor = "rgba(0, 160, 176, 0.15)",
  spotlightSize = 800,
  withMultipleSpotlights = true,
  ...props
}: SpotlightLayoutProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-[#0D1117]",
        className
      )}
      {...props}
    >
      {/* Primary spotlight */}
      <Spotlight 
        fill={spotlightColor}
        size={spotlightSize}
        springOptions={{ stiffness: 100, damping: 15 }}
      />

      {/* Optional secondary spotlights for layered effect */}
      {withMultipleSpotlights && (
        <>
          <Spotlight
            fill="rgba(77, 77, 255, 0.1)"
            size={spotlightSize * 1.2}
            springOptions={{ stiffness: 80, damping: 20 }}
          />
          <Spotlight
            fill="rgba(255, 255, 255, 0.05)"
            size={spotlightSize * 0.8}
            springOptions={{ stiffness: 120, damping: 12 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}