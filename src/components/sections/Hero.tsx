
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Animation variants for the floating elements
const floatingElements = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: Math.random() * 20 + 10, // 10px to 30px
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
  duration: Math.random() * 8 + 10, // 10s to 18s
}));

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 dark:from-niet-dark dark:to-indigo-950/30 -z-10"></div>

        {/* Floating elements */}
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-niet-blue/10 dark:bg-niet-blue/20"
            style={{ width: el.size, height: el.size }}
            initial={{ x: `${el.x}%`, y: `${el.y}%` }}
            animate={{
              x: [`${el.x}%`, `${el.x + 10}%`, `${el.x - 5}%`, `${el.x}%`],
              y: [`${el.y}%`, `${el.y - 15}%`, `${el.y + 10}%`, `${el.y}%`],
            }}
            transition={{
              duration: el.duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay: el.delay,
            }}
          />
        ))}

        {/* Wave-like SVG */}
        <div className="absolute bottom-0 left-0 w-full">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.path
              fill="#38BDF8"
              fillOpacity="0.1"
              d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,250.7C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="dark:fill-niet-blue/20"
              animate={{
                d: [
                  "M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,250.7C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,288L48,256C96,224,192,160,288,149.3C384,139,480,181,576,186.7C672,192,768,160,864,165.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 20,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        </div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-2 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-niet-blue to-niet-cyan bg-clip-text text-transparent text-base md:text-lg font-medium font-poppins">
              National Institute of Engineering and Technology
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins text-niet-navy dark:text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Empowering students with quality education and innovative learning techniques to excel in the field of engineering and technology.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              className="bg-gradient-to-r from-niet-blue to-niet-cyan text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
              size="lg"
            >
              {t("hero.apply")}
            </Button>
            <Button
              variant="outline"
              className="dark:border-gray-700 dark:text-gray-300 px-8 py-3 rounded-full group"
              size="lg"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Notice Board Ticker */}
        <motion.div
          className="mt-16 sm:mt-24 max-w-4xl w-full mx-auto bg-white/80 dark:bg-niet-navy/50 backdrop-blur-sm rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center p-3">
            <div className="bg-niet-coral text-white text-xs font-bold px-2 py-1 rounded">
              NOTICE
            </div>
            <div className="overflow-hidden flex-1 ml-3">
              <div className="whitespace-nowrap animate-[slide-in_20s_linear_infinite] text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium">
                Admissions open for 2023-24 Academic Year • New Computer Lab inauguration on 15th July • Inter-college Tech Fest on 25th-27th August • Applications for Research Grant due by 30th July • Summer internships available for 3rd year students
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
