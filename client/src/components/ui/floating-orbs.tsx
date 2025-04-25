import React, { useRef, useEffect } from 'react';

interface FloatingOrb {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface FloatingOrbsProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minOpacity?: number;
  maxOpacity?: number;
  className?: string;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  count = 8,
  colors = ['#4D4DFF', '#00A0B0'],
  minSize = 50,
  maxSize = 300,
  minSpeed = 0.2,
  maxSpeed = 0.5,
  minOpacity = 0.05,
  maxOpacity = 0.15,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<FloatingOrb[]>([]);
  const animationRef = useRef<number>(0);

  // Initialize orbs with random positions, sizes, and speeds
  useEffect(() => {
    const initOrbs = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const orbs: FloatingOrb[] = [];
      
      for (let i = 0; i < count; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        const speedX = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1);
        const speedY = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
        
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX,
          speedY,
          color,
          opacity
        });
      }
      
      orbsRef.current = orbs;
    };
    
    initOrbs();
    
    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      initOrbs();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed, minOpacity, maxOpacity]);
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      orbsRef.current.forEach(orb => {
        // Update position
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        
        // Bounce off edges
        if (orb.x <= 0 || orb.x >= canvas.width) {
          orb.speedX *= -1;
        }
        
        if (orb.y <= 0 || orb.y >= canvas.height) {
          orb.speedY *= -1;
        }
        
        // Draw orb
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size
        );
        gradient.addColorStop(0, `${orb.color}${Math.round(orb.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${orb.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};