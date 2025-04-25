import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

export function LightPullThemeSwitcher() {
    const { toggleTheme } = useTheme();

    return (
      <div className="relative flex flex-col items-center">
        <div className="py-2 overflow-visible">
          <motion.div
            drag="y"
            dragDirectionLock
            onDragEnd={(event, info) => {
              if (info.offset.y > 0) {
                toggleTheme();
              }
            }}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
            dragElastic={0.075}
            whileDrag={{ cursor: "grabbing" }}
            className="relative bottom-0 w-6 h-6 rounded-full 
                 bg-[radial-gradient(circle_at_center,_#facc15,_#fcd34d,_#fef9c3)] 
                 dark:bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#000)] 
                 shadow-[0_0_15px_5px_rgba(250,204,21,0.5)] 
                 dark:shadow-[0_0_15px_4px_rgba(31,41,55,0.7)]
                 cursor-grab"
          >
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-neutral-200 dark:bg-neutral-700"></div>
          </motion.div>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0 opacity-70">pull me</span>
      </div>
    );
}