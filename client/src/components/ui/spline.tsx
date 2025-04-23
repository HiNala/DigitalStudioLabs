import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface SplineSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  scene: string;
}

// Create a type declaration for the custom element to avoid TS errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url?: string },
        HTMLElement
      >;
    }
  }
}

export function SplineScene({
  className,
  scene,
  ...props
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="splinetool/viewer"]')) {
      setIsLoaded(true);
      return;
    }

    // Load the Spline viewer script dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js";
    script.type = "module";
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setError("Failed to load Spline viewer");
    document.head.appendChild(script);

    // No need to remove script as it's needed globally
    return () => {};
  }, []);

  // Create a 3D scene placeholder visualization
  const renderPlaceholder = () => (
    <div className="absolute inset-0 flex items-center justify-center flex-col">
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00A0B0] to-[#4D4DFF] opacity-20 animate-pulse"></div>
      <div className="mt-4 text-sm text-neutral-400">
        {error ? error : "Loading 3D scene..."}
      </div>
    </div>
  );

  return (
    <div className={cn("relative overflow-visible", className)} ref={containerRef} {...props}>
      {!isLoaded && renderPlaceholder()}
      
      {/* The custom element will be defined once the script loads */}
      {isLoaded && (
        <spline-viewer 
          url={scene}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
            position: 'relative',
            zIndex: 5
          }}
        ></spline-viewer>
      )}
    </div>
  );
}