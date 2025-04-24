import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-md bg-transparent hover:bg-slate-800/30 dark:hover:bg-slate-800/30 light:hover:bg-slate-200/50 transition-colors group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-8 h-8 overflow-hidden flex items-center justify-center rounded-full">
        {/* Sun Icon */}
        <motion.div
          initial={{ y: theme === 'dark' ? 0 : 30 }}
          animate={{ y: theme === 'dark' ? 30 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute text-yellow-400"
        >
          <Sun size={18} strokeWidth={2} className="fill-yellow-400/20" />
        </motion.div>
        
        {/* Moon Icon */}
        <motion.div
          initial={{ y: theme === 'dark' ? -30 : 0 }}
          animate={{ y: theme === 'dark' ? 0 : -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute text-slate-300"
        >
          <Moon size={18} strokeWidth={2} className="fill-slate-400/20" />
        </motion.div>
      </div>
      
      {/* Effect ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(0,160,176,0.08) 0%, rgba(77,77,255,0.03) 70%, rgba(0,0,0,0) 100%)' 
            : 'radial-gradient(circle, rgba(255,226,122,0.08) 0%, rgba(251,182,64,0.03) 70%, rgba(0,0,0,0) 100%)'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-md z-0"
      />
      
      {/* Tooltip */}
      <span className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-zinc-800 dark:bg-zinc-700 light:bg-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
} 