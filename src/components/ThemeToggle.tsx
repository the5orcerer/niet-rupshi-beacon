
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-niet-navy transition-all" />
        ) : (
          <Moon className="h-5 w-5 text-white transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </motion.div>
    </Button>
  );
}
