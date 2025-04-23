import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string;
  size?: number;
}

export function Spotlight({
  className,
  fill = "white",
  size = 600,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setOpacity(1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${fill}, transparent 80%)`,
        }}
      />
    </div>
  );
}