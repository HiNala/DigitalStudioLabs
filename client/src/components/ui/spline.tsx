import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface SplineSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  scene: string;
  hideAttribution?: boolean;
  globalInteraction?: boolean; // Whether to respond to global mouse position instead of just within container
}

// Create a type declaration for the custom element to avoid TS errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 
          url?: string;
          'event-target'?: 'global' | 'local';
        },
        HTMLElement
      >;
    }
  }
}

export function SplineScene({
  className,
  scene,
  hideAttribution = true,
  globalInteraction = false,
  ...props
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLElement | null>(null);

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

  // Hide the attribution "Built with Spline" button
  useEffect(() => {
    if (isLoaded && hideAttribution) {
      // Need to wait for the spline viewer to fully load
      const removeAttribution = () => {
        // Check if the splineRef is set and then find attribution link within it
        if (splineRef.current) {
          const attributionLinks = splineRef.current.shadowRoot?.querySelectorAll('a');
          
          if (attributionLinks) {
            attributionLinks.forEach(link => {
              // Find the "Built with Spline" link and hide it
              if (link.textContent?.includes('Spline')) {
                link.style.display = 'none';
              }
            });
          }
        }
      };

      // Try multiple times as the viewer might take time to initialize
      const interval = setInterval(removeAttribution, 500);
      setTimeout(() => clearInterval(interval), 3000); // Stop trying after 3 seconds

      return () => clearInterval(interval);
    }
  }, [isLoaded, hideAttribution]);

  // Additional CSS to hide attribution using a different approach
  useEffect(() => {
    if (isLoaded && hideAttribution) {
      // Add a style tag to hide attribution through CSS
      const style = document.createElement('style');
      style.textContent = `
        spline-viewer::part(logo),
        spline-viewer::part(attribution) {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isLoaded, hideAttribution]);
  
  // Setup global mouse position tracking for Spline if globalInteraction is enabled
  useEffect(() => {
    if (!isLoaded || !globalInteraction || !splineRef.current) return;
    
    // Function to forward mouse events to the spline viewer
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // The spline viewer needs mouse coordinates to update the scene
      if (splineRef.current) {
        // Create and dispatch a new mouse event to the spline-viewer
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true
        });
        
        // Try to dispatch to the viewer or its shadow root
        if (splineRef.current.shadowRoot) {
          splineRef.current.shadowRoot.dispatchEvent(mouseEvent);
        } else {
          splineRef.current.dispatchEvent(mouseEvent);
        }
      }
    };
    
    // Only add listener if globalInteraction is true
    if (globalInteraction) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
      };
    }
  }, [isLoaded, globalInteraction]);

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
    <div className={cn("relative", className)} ref={containerRef} {...props}>
      {!isLoaded && renderPlaceholder()}
      
      {/* The custom element will be defined once the script loads */}
      {isLoaded && (
        <spline-viewer 
          ref={(el: HTMLElement | null) => { splineRef.current = el; }}
          url={scene}
          event-target={globalInteraction ? 'global' : 'local'}
          style={{
            width: '100%',
            height: '100%',
          }}
        ></spline-viewer>
      )}
      
      {/* Overlay div to block the attribution if other methods fail */}
      {hideAttribution && (
        <div 
          className="absolute bottom-0 right-0 w-32 h-10 bg-transparent z-10" 
          style={{ pointerEvents: 'none' }}
        />
      )}
    </div>
  );
}