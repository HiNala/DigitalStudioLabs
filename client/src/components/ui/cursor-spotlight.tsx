"use client";

import React, { useEffect, useRef, memo } from "react";
import { useTheme } from "@/providers/ThemeProvider";

interface CursorSpotlightProps {
  size?: number;
  color?: string;
  opacity?: number;
  blurSize?: number;
}

export const CursorSpotlight = memo(({
  size = 300,
  color = "rgba(0, 160, 176, 0.15)",
  opacity = 1,
  blurSize = 80
}: CursorSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const primarySpotRef = useRef<HTMLDivElement>(null);
  const secondarySpotRef = useRef<HTMLDivElement>(null);
  const tertiarySpotRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const currentSectionRef = useRef<string>("default");
  const positionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const sectionCheckIntervalRef = useRef<number>(0);
  const { theme } = useTheme();
  
  // Different colors for different sections based on theme
  const darkModeColors = {
    services: "rgba(0, 160, 176, 0.2)",
    hero: "rgba(0, 160, 176, 0.3)",
    portfolio: "rgba(77, 77, 255, 0.2)",
    process: "rgba(130, 71, 229, 0.2)",
    pricing: "rgba(77, 77, 255, 0.2)",
    contact: "rgba(0, 160, 176, 0.2)",
    default: "rgba(0, 160, 176, 0.15)",
  };
  
  const lightModeColors = {
    services: "rgba(255, 105, 180, 0.05)", // Pink
    hero: "rgba(111, 66, 193, 0.05)", // Purple
    portfolio: "rgba(0, 191, 255, 0.05)", // Sky blue
    process: "rgba(255, 64, 129, 0.05)", // Hot pink
    pricing: "rgba(102, 126, 234, 0.05)", // Indigo
    contact: "rgba(236, 72, 153, 0.05)", // Bright pink
    default: "rgba(147, 51, 234, 0.04)", // Purple
  };
  
  // Apply style updates directly to DOM elements for better performance
  const updateSpotlightStyles = () => {
    if (!primarySpotRef.current || !secondarySpotRef.current || !tertiarySpotRef.current) return;
    
    const { x, y } = positionRef.current;
    
    // Update primary spotlight with CSS transform for better performance
    primarySpotRef.current.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
    
    // Get current color based on section and theme
    const sectionColors = theme === 'dark' ? darkModeColors : lightModeColors;
    const currentColor = sectionColors[currentSectionRef.current as keyof typeof sectionColors] || 
                        (theme === 'dark' ? color : "rgba(147, 51, 234, 0.04)");
    
    primarySpotRef.current.style.background = currentColor;
    
    // Update secondary spotlight with theme-specific color
    secondarySpotRef.current.style.transform = `translate3d(${x - size * 0.6 / 2}px, ${y - size * 0.6 / 2}px, 0)`;
    secondarySpotRef.current.style.background = theme === 'dark' 
      ? "rgba(130, 71, 229, 0.15)" 
      : "rgba(236, 72, 153, 0.04)"; // Pink for light mode
    
    // Update tertiary spotlight
    tertiarySpotRef.current.style.transform = `translate3d(${x - size * 0.3 / 2}px, ${y - size * 0.3 / 2}px, 0)`;
    tertiarySpotRef.current.style.background = theme === 'dark' 
      ? "rgba(255, 255, 255, 0.1)" 
      : "rgba(79, 70, 229, 0.03)"; // Indigo for light mode
  };
  
  useEffect(() => {
    // Set a small delay before showing the spotlight to avoid initial flash
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        isVisibleRef.current = true;
      }
    }, 100);

    // More efficient mouse move handler that doesn't cause re-renders
    const updatePosition = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle section detection to every 10 mouse moves
      sectionCheckIntervalRef.current++;
      
      animationFrameRef.current = requestAnimationFrame(() => {
        updateSpotlightStyles();
        
        // Only check for section changes periodically to improve performance
        if (sectionCheckIntervalRef.current > 10) {
          sectionCheckIntervalRef.current = 0;
          checkCurrentSection(e.clientX, e.clientY);
        }
      });
    };
    
    // Check which section the cursor is in
    const checkCurrentSection = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      if (!element) return;
      
      // Find closest section parent
      let currentEl: HTMLElement | null = element as HTMLElement;
      let sectionFound = false;
      
      while (currentEl && !sectionFound) {
        const sectionId = currentEl.id;
        if (sectionId && darkModeColors.hasOwnProperty(sectionId)) {
          currentSectionRef.current = sectionId;
          sectionFound = true;
        } else if (currentEl.tagName.toLowerCase() === 'section') {
          // Handle sections without specific IDs
          currentSectionRef.current = 'default';
          sectionFound = true;
        } else {
          currentEl = currentEl.parentElement;
        }
      }
      
      if (!sectionFound) {
        currentSectionRef.current = 'default';
      }
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    
    // Initialize positions
    if (typeof window !== "undefined") {
      positionRef.current = { 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2 
      };
      updateSpotlightStyles();
    }
    
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size, color, theme]);

  // Don't render on server
  if (typeof window === "undefined") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        opacity: 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {/* Main spotlight */}
      <div
        ref={primarySpotRef}
        className="fixed rounded-full pointer-events-none will-change-transform"
        style={{
          width: size,
          height: size,
          background: theme === 'dark' ? color : "rgba(147, 51, 234, 0.04)",
          opacity: theme === 'dark' ? opacity : 0.7,
          filter: `blur(${blurSize}px)`,
          backfaceVisibility: "hidden",
          transition: "background 0.5s ease",
        }}
      />
      
      {/* Secondary spotlight (smaller, different color) */}
      <div
        ref={secondarySpotRef}
        className="fixed rounded-full pointer-events-none will-change-transform"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          background: theme === 'dark' 
            ? "rgba(130, 71, 229, 0.15)" 
            : "rgba(236, 72, 153, 0.04)",
          opacity: theme === 'dark' ? opacity * 0.7 : 0.6,
          filter: `blur(${blurSize * 0.7}px)`,
          backfaceVisibility: "hidden",
          transition: "background 0.5s ease",
        }}
      />
      
      {/* Tertiary spotlight (smallest, different color) */}
      <div
        ref={tertiarySpotRef}
        className="fixed rounded-full pointer-events-none will-change-transform"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: theme === 'dark' 
            ? "rgba(255, 255, 255, 0.1)" 
            : "rgba(79, 70, 229, 0.03)",
          opacity: theme === 'dark' ? opacity * 0.5 : 0.5,
          filter: `blur(${blurSize * 0.4}px)`,
          backfaceVisibility: "hidden",
          transition: "background 0.5s ease",
        }}
      />
    </div>
  );
});