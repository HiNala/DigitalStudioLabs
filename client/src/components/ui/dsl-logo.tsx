import { useTheme } from "@/providers/ThemeProvider";

interface DSLLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DSLLogo({ className = "", size = 'md' }: DSLLogoProps) {
  const { theme } = useTheme();
  
  // Size mapping
  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 }
  };
  
  const { width, height } = sizeMap[size];
  
  return (
    <div className={`relative ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 60 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A0B0" />
            <stop offset="100%" stopColor="#4D4DFF" />
          </linearGradient>
        </defs>
        
        {/* D letter */}
        <path 
          d="M3 5L3 25H8C13 25 16 22 16 15C16 8 13 5 8 5H3Z" 
          stroke="url(#logoGradient)" 
          strokeWidth="2.5" 
          fill="none"
        />
        
        {/* S letter */}
        <path 
          d="M24 25C28 25 32 23 32 20C32 15 20 17 20 11C20 8 24 6 28 6" 
          stroke="url(#logoGradient)" 
          strokeWidth="2.5" 
          fill="none"
        />
        
        {/* L letter */}
        <path 
          d="M40 5L40 25H56" 
          stroke="url(#logoGradient)" 
          strokeWidth="2.5" 
          fill="none"
        />
      </svg>
      
      {/* Text label under the logo */}
      <span className="sr-only">Digital Studio Labs</span>
    </div>
  );
}

// Animated version with subtle hover effects
export function AnimatedDSLLogo({ className = "", size = 'md' }: DSLLogoProps) {
  const { theme } = useTheme();
  
  // Size mapping
  const sizeMap = {
    sm: { width: 32, height: 20 },
    md: { width: 40, height: 24 },
    lg: { width: 50, height: 30 }
  };
  
  const { width, height } = sizeMap[size];
  
  return (
    <div className={`relative group ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 60 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="logoGradientAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A0B0">
              <animate 
                attributeName="stop-color" 
                values="#00A0B0; #4D4DFF; #8247E5; #00A0B0" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="#4D4DFF">
              <animate 
                attributeName="stop-color" 
                values="#4D4DFF; #8247E5; #00A0B0; #4D4DFF" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
        </defs>
        
        {/* D letter */}
        <path 
          d="M3 5L3 25H8C13 25 16 22 16 15C16 8 13 5 8 5H3Z" 
          stroke="url(#logoGradientAnimated)" 
          strokeWidth="2.5" 
          fill="none"
        />
        
        {/* S letter */}
        <path 
          d="M24 25C28 25 32 23 32 20C32 15 20 17 20 11C20 8 24 6 28 6" 
          stroke="url(#logoGradientAnimated)" 
          strokeWidth="2.5" 
          fill="none"
        />
        
        {/* L letter */}
        <path 
          d="M40 5L40 25H56" 
          stroke="url(#logoGradientAnimated)" 
          strokeWidth="2.5" 
          fill="none"
        />
      </svg>
      
      {/* Text label under the logo */}
      <span className="sr-only">Digital Studio Labs</span>
    </div>
  );
} 