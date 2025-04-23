
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 rounded-full bg-muted/50 p-1">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 text-xs font-medium ${
          language === "en"
            ? "bg-white text-niet-navy shadow-sm dark:bg-niet-blue dark:text-niet-dark"
            : ""
        }`}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          EN
        </motion.span>
      </Button>
      <Button
        variant={language === "bn" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("bn")}
        className={`rounded-full px-3 text-xs font-medium ${
          language === "bn"
            ? "bg-white text-niet-navy shadow-sm dark:bg-niet-blue dark:text-niet-dark"
            : ""
        }`}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          বাং
        </motion.span>
      </Button>
    </div>
  );
}
