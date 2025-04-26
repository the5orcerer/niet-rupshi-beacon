import { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Logout failed', { description: error.message });
      } else {
        toast.success('Logged out successfully');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Updated navigation links
  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.programs"), href: "/#programs" },
    { name: t("nav.faculty"), href: "/faculty" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.notice"), href: "/announcements" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md dark:bg-niet-dark/90`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 font-poppins">
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-niet-navy dark:text-white">
                NIET
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              link.href.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-niet-blue dark:text-gray-200 dark:hover:text-niet-blue rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-niet-blue dark:text-gray-200 dark:hover:text-niet-blue rounded-md transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right side items (always visible) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {user ? (
              <>
                <Link to="/admissions" className="hidden md:flex bg-gradient-to-r from-niet-blue to-niet-cyan text-white hover:opacity-90 transition-opacity px-4 py-2 rounded-lg">
                  Apply Now
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden md:flex"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="hidden md:flex bg-gradient-to-r from-niet-blue to-niet-cyan text-white hover:opacity-90 transition-opacity px-4 py-2 rounded-lg"
                >
                  Sign in
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-niet-dark shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              {user ? (
                <>
                  <div className="mt-4 px-3">
                    <Link 
                      to="/admissions" 
                      className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-niet-blue to-niet-cyan text-white hover:opacity-90 transition-opacity"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Apply Now
                    </Link>
                  </div>
                  <div className="mt-2 px-3">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleLogout} 
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mt-4 px-3">
                  <Link 
                    to="/auth" 
                    className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-niet-blue to-niet-cyan text-white hover:opacity-90 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
