"use client";

import React, { useEffect, useState, useRef } from "react";

interface CursorSpotlightProps {
  size?: number;
  color?: string;
  opacity?: number;
  blurSize?: number;
}

export function CursorSpotlight({
  size = 300,
  color = "rgba(0, 160, 176, 0.15)",
  opacity = 1,
  blurSize = 80
}: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Different colors for different sections
  const sectionColors = {
    services: "rgba(0, 160, 176, 0.2)",
    hero: "rgba(0, 160, 176, 0.3)",
    portfolio: "rgba(77, 77, 255, 0.2)",
    process: "rgba(130, 71, 229, 0.2)",
    pricing: "rgba(77, 77, 255, 0.2)",
    contact: "rgba(0, 160, 176, 0.2)",
    default: "rgba(0, 160, 176, 0.15)",
  };
  
  useEffect(() => {
    // Set a small delay before showing the spotlight to avoid initial flash
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const updatePosition = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Check which section the cursor is in
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
          // Find closest section parent
          let currentEl: HTMLElement | null = element as HTMLElement;
          let sectionFound = false;
          
          while (currentEl && !sectionFound) {
            const sectionId = currentEl.id;
            if (sectionId && sectionColors.hasOwnProperty(sectionId)) {
              setCurrentSection(sectionId);
              sectionFound = true;
            } else if (currentEl.tagName.toLowerCase() === 'section') {
              // Handle sections without specific IDs
              setCurrentSection('default');
              sectionFound = true;
            } else {
              currentEl = currentEl.parentElement;
            }
          }
          
          if (!sectionFound) {
            setCurrentSection('default');
          }
        }
      });
    };

    window.addEventListener("mousemove", updatePosition);
    
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Get the current color based on section
  const getCurrentColor = () => {
    if (!currentSection) return color;
    return sectionColors[currentSection as keyof typeof sectionColors] || color;
  };

  // Don't render on server or before we know position
  if (typeof window === "undefined") return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {/* Main spotlight */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          background: getCurrentColor(),
          opacity: opacity,
          filter: `blur(${blurSize}px)`,
          transform: "translateZ(0)",
          transition: "left 0.05s ease-out, top 0.05s ease-out, background 0.5s ease",
        }}
      />
      
      {/* Secondary spotlight (smaller, different color) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: position.x - size * 0.6 / 2,
          top: position.y - size * 0.6 / 2,
          width: size * 0.6,
          height: size * 0.6,
          background: "rgba(130, 71, 229, 0.15)",
          opacity: opacity * 0.7,
          filter: `blur(${blurSize * 0.7}px)`,
          transform: "translateZ(0)",
          transition: "left 0.08s ease-out, top 0.08s ease-out",
        }}
      />
      
      {/* Tertiary spotlight (smallest, different color) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: position.x - size * 0.3 / 2,
          top: position.y - size * 0.3 / 2,
          width: size * 0.3,
          height: size * 0.3,
          background: "rgba(255, 255, 255, 0.1)",
          opacity: opacity * 0.5,
          filter: `blur(${blurSize * 0.4}px)`,
          transform: "translateZ(0)",
          transition: "left 0.12s ease-out, top 0.12s ease-out",
        }}
      />
    </div>
  );
}