import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle animation after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <button
        className="relative flex items-center justify-center w-10 h-10 rounded-md bg-transparent hover:bg-slate-800/30 dark:hover:bg-slate-800/30 light:hover:bg-slate-200/50 transition-colors"
        aria-label="Theme toggle"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full opacity-0">
          {/* Placeholder to maintain layout */}
        </div>
      </button>
    );
  }
  
  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-md bg-transparent hover:bg-slate-800/30 dark:hover:bg-slate-800/30 light:hover:bg-slate-200/50 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-8 h-8 overflow-hidden flex items-center justify-center rounded-full">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-yellow-400"
            >
              <Sun size={18} strokeWidth={2} className="fill-yellow-400/20" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-slate-300"
            >
              <Moon size={18} strokeWidth={2} className="fill-slate-400/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Effect ring */}
      <motion.div
        animate={{ 
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(0,160,176,0.08) 0%, rgba(77,77,255,0.03) 70%, rgba(0,0,0,0) 100%)' 
            : 'radial-gradient(circle, rgba(255,226,122,0.08) 0%, rgba(251,182,64,0.03) 70%, rgba(0,0,0,0) 100%)'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-md z-0"
      />
    </button>
  );
} 