import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface SplineSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  scene: string;
  hideAttribution?: boolean;
  followCursor?: boolean;
  followSpeed?: number;
  followDistance?: number;
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

// Global cursor position that can be accessed by multiple components
export const globalCursorPosition = {
  x: 0,
  y: 0,
  isActive: true
};

// Set up global cursor tracking (will only be initialized once)
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    globalCursorPosition.x = e.clientX;
    globalCursorPosition.y = e.clientY;
    
    // Dispatch a global event that Spline components can listen for
    window.dispatchEvent(new CustomEvent('global-cursor-move', { 
      detail: globalCursorPosition 
    }));
  }, { passive: true });
}

export function SplineScene({
  className,
  scene,
  hideAttribution = true,
  followCursor = false,
  followSpeed = 0.05,
  followDistance = 0.5,
  ...props
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splineReady, setSplineReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLElement | null>(null);
  const splineAppRef = useRef<any>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastCursorPosition = useRef({ x: 0, y: 0 });

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
  
  // Get access to Spline API once it's loaded
  useEffect(() => {
    if (isLoaded && splineRef.current) {
      // Try to get spline app instance when the viewer is loaded
      const checkSplineApp = () => {
        try {
          if (splineRef.current) {
            // @ts-ignore - accessing internal Spline API
            const app = splineRef.current.app;
            if (app) {
              splineAppRef.current = app;
              setSplineReady(true);
              console.log("Spline app is ready for cursor following");
            }
          }
        } catch (e) {
          // Spline app not ready yet
        }
      };
      
      // Listen for the spline load event
      splineRef.current.addEventListener('load', () => {
        // Give Spline a moment to initialize its internal API
        setTimeout(checkSplineApp, 500);
      });
      
      // Also poll periodically if the event listener doesn't fire
      const interval = setInterval(checkSplineApp, 500);
      const timeout = setTimeout(() => clearInterval(interval), 5000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLoaded]);
  
  // Handle cursor following functionality
  useEffect(() => {
    if (!splineReady || !followCursor || !splineAppRef.current) return;
    
    // Update cursor position from global tracking
    const handleCursorMove = (event: CustomEvent) => {
      // Store cursor position for use in animation frame
      lastCursorPosition.current = { 
        x: event.detail.x, 
        y: event.detail.y 
      };
    };
    
    // Set up the animation loop for smooth character movement
    const animateSplineObject = () => {
      if (!splineAppRef.current) return;
      
      try {
        // Find objects in the scene to animate
        const objects = splineAppRef.current.findObjectsByType('Object3D');
        
        // Try to find main character by common naming patterns
        const mainCharacter = objects.find((obj: any) => 
          obj.name.includes('Character') || 
          obj.name.includes('Robot') ||
          obj.name.includes('Avatar') ||
          obj.name.includes('Person') ||
          obj.name.includes('Model')
        );
        
        if (mainCharacter) {
          // Get container bounds for relative positioning
          const containerBounds = containerRef.current?.getBoundingClientRect();
          if (!containerBounds) return;
          
          // Calculate normalized position within viewport
          const normalizedX = (lastCursorPosition.current.x / window.innerWidth) - 0.5;
          const normalizedY = (lastCursorPosition.current.y / window.innerHeight) - 0.5;
          
          // Apply smooth movement with easing
          // The actual position values may need adjustment based on your specific Spline scene
          const targetX = normalizedX * followDistance;
          // Invert Y for 3D space (positive Y is up in 3D)
          const targetY = -normalizedY * followDistance;
          
          // Apply movement with smooth easing
          mainCharacter.position.x += (targetX - mainCharacter.position.x) * followSpeed;
          mainCharacter.position.y += (targetY - mainCharacter.position.y) * followSpeed;
          
          // Optional: rotate character to face cursor direction
          const rotationSpeed = followSpeed * 0.5;
          mainCharacter.rotation.y += (normalizedX * Math.PI * 0.25 - mainCharacter.rotation.y) * rotationSpeed;
        } else {
          // If we can't find a character, try to use the camera as fallback
          try {
            if (splineAppRef.current.camera) {
              const camera = splineAppRef.current.camera;
              const lookX = globalCursorPosition.x / window.innerWidth;
              const lookY = globalCursorPosition.y / window.innerHeight;
              
              // Make camera look in cursor direction
              camera.lookAt(
                camera.position.x + (lookX - 0.5) * followDistance,
                camera.position.y + (0.5 - lookY) * followDistance,
                0
              );
            }
          } catch (e) {
            // Camera manipulation failed
          }
        }
      } catch (error) {
        console.error("Error animating Spline:", error);
      }
      
      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animateSplineObject);
    };
    
    // Start listening to cursor events
    window.addEventListener('global-cursor-move', handleCursorMove as EventListener);
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateSplineObject);
    
    return () => {
      window.removeEventListener('global-cursor-move', handleCursorMove as EventListener);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [splineReady, followCursor, followSpeed, followDistance]);

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