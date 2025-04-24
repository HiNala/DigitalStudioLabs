import { ReactNode } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

export function ThemedCard({ 
  children, 
  className, 
  variant = 'default' 
}: ThemedCardProps) {
  const { theme } = useTheme();
  
  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-colors duration-300",
        variant === 'default' && "dark:bg-[#161B22] light:bg-white",
        variant === 'bordered' && "dark:bg-[#161B22] light:bg-white border dark:border-[#30363D] light:border-gray-200",
        variant === 'elevated' && "dark:bg-[#161B22] light:bg-white border dark:border-[#30363D] light:border-gray-200 light:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ThemedTable({ 
  children, 
  className 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "dark:bg-[#0D1117]/60 light:bg-gray-50/60 rounded-xl border dark:border-[#30363D] light:border-gray-200 p-6 overflow-hidden transition-colors duration-300",
      className
    )}>
      {children}
    </div>
  );
}

export function ThemedTableHead({ 
  children, 
  className 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("dark:bg-[#161B22] light:bg-gray-100 transition-colors duration-300", className)}>
      {children}
    </tr>
  );
}

export function ThemedTableRow({ 
  children, 
  className 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn(
      "dark:border-b dark:border-[#30363D] light:border-b light:border-gray-200 dark:bg-[#161B22]/50 light:bg-white/50 transition-colors duration-300",
      className
    )}>
      {children}
    </tr>
  );
}

export function ThemedTestimonial({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "dark:bg-[#161B22] light:bg-white p-6 border dark:border-[#30363D] light:border-gray-200 h-full transition-colors duration-300",
      className
    )}>
      {children}
    </div>
  );
}

export function ThemedCTA({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "dark:bg-[#161B22] light:bg-gray-50 rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden transition-colors duration-300",
      className
    )}>
      {children}
    </div>
  );
} 