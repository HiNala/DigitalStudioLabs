import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface SplineSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  scene: string;
}

export function SplineScene({
  className,
  scene,
  ...props
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the Spline viewer script dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@0.9.414/build/spline-viewer.js";
    script.type = "module";
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setError("Failed to load Spline viewer");
    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center", className)} {...props}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} {...props}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A0B0]"></div>
        </div>
      )}

      {/* The custom element will be defined once the script loads */}
      <spline-viewer url={scene}></spline-viewer>
    </div>
  );
}