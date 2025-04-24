import React from 'react';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';
import { cn } from "@/lib/utils";
import { TechLogos } from './TechLogos';
import { useTheme } from '@/providers/ThemeProvider';

interface InfiniteScrollBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
  gap?: number;
  className?: string;
  title?: string;
  description?: string;
}

export function InfiniteScrollBanner({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  gap = 24,
  className,
  title,
  description,
  ...props
}: InfiniteScrollBannerProps) {
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [key, setKey] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    let controls;
    const contentSize = width + gap;
    const from = direction === "left" ? 0 : -contentSize / 2;
    const to = direction === "left" ? -contentSize / 2 : 0;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentSpeed * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentSpeed,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentSpeed, width, gap, isTransitioning, direction]);

  const hoverProps = pauseOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed * 3); // Slow down on hover
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn("w-full py-12", className)} {...props}>
      {(title || description) && (
        <div className="container mx-auto mb-10 text-center">
          {title && <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">{title}</h2>}
          {description && <p className="text-lg dark:text-[#8B949E] light:text-gray-600 max-w-3xl mx-auto">{description}</p>}
        </div>
      )}
      
      <div 
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-xl overflow-hidden"
      >
        <div 
          className="absolute inset-0 dark:bg-gradient-to-r dark:from-[#0d1117]/80 dark:via-[#161B22]/60 dark:to-[#0d1117]/80 light:bg-gradient-to-r light:from-white/80 light:via-gray-100/60 light:to-white/80 backdrop-blur-md rounded-xl z-0 border dark:border-[#30363D]/50 light:border-gray-200/50 transition-colors duration-300"
          style={{ backdropFilter: 'blur(10px)' }}
        ></div>
        
        <div className="relative z-10 py-10">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex w-max"
              style={{
                x: translation,
                gap: `${gap}px`,
              }}
              ref={ref}
              {...hoverProps}
            >
              {children}
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechBanner() {
  const logos = [
    { name: "TypeScript", Logo: TechLogos.TypeScript },
    { name: "JavaScript", Logo: TechLogos.JavaScript },
    { name: "Python", Logo: TechLogos.Python },
    { name: "React", Logo: TechLogos.React },
    { name: "Node.js", Logo: TechLogos.Node },
    { name: "NextJs", Logo: TechLogos.NextJs },
    { name: "Tailwind", Logo: TechLogos.Tailwind },
    { name: "Docker", Logo: TechLogos.Docker },
    { name: "AI", Logo: TechLogos.AI },
    { name: "Cloud", Logo: TechLogos.Cloud },
    { name: "Database", Logo: TechLogos.Database },
    { name: "Frontend", Logo: TechLogos.Frontend },
    { name: "Backend", Logo: TechLogos.Backend },
    { name: "DevOps", Logo: TechLogos.DevOps },
  ];
  const { theme } = useTheme();

  return (
    <div className="bg-radial">
      <InfiniteScrollBanner 
        pauseOnHover={true}
        speed={100} 
        gap={32}
      >
        {logos.map(({ name, Logo }, index) => (
          <div
            key={index}
            className="relative h-full w-fit mx-8 flex flex-col items-center justify-center group"
          >
            <div className="w-16 h-16 flex items-center justify-center dark:bg-[#161B22]/80 light:bg-white/80 p-3 rounded-lg border dark:border-[#30363D]/50 light:border-gray-200/50 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[#00A0B0]/50">
              <Logo />
            </div>
            <span className="text-sm font-medium dark:text-[#E6EDF3] light:text-gray-700 mt-3 opacity-80 group-hover:opacity-100 transition-opacity">{name}</span>
          </div>
        ))}
      </InfiniteScrollBanner>
    </div>
  );
}

export default TechBanner; 