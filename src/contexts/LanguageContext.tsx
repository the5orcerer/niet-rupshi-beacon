
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Simple translations
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.programs": "Programs",
    "nav.faculty": "Faculty",
    "nav.blog": "Blog",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.apply": "Apply Now",
    "hero.title": "Shaping Tomorrow's Leaders",
    "hero.subtitle": "National Institute of Engineering and Technology",
    "hero.cta": "Learn More",
    "hero.apply": "Apply Now",
    "about.title": "About NIET",
    "about.history": "Our History",
    "about.mission": "Our Mission",
    "about.values": "Our Values",
    "programs.title": "Our Programs",
    "faculty.title": "Our Faculty",
    "blog.title": "Latest Updates",
    "gallery.title": "Campus Gallery",
    "testimonials.title": "What Our Students Say",
    "contact.title": "Contact Us",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "footer.rights": "All Rights Reserved",
    "footer.newsletter": "Subscribe to Newsletter",
    "footer.links": "Quick Links",
  },
  bn: {
    "nav.home": "হোম",
    "nav.about": "সম্পর্কে",
    "nav.programs": "প্রোগ্রাম",
    "nav.faculty": "শিক্ষকমণ্ডলী",
    "nav.blog": "ব্লগ",
    "nav.gallery": "গ্যালারি",
    "nav.contact": "যোগাযোগ",
    "nav.apply": "আবেদন করুন",
    "hero.title": "আগামীকালের নেতৃত্ব গঠন",
    "hero.subtitle": "ন্যাশনাল ইনস্টিটিউট অফ ইঞ্জিনিয়ারিং অ্যান্ড টেকনোলজি",
    "hero.cta": "আরও জানুন",
    "hero.apply": "আবেদন করুন",
    "about.title": "NIET সম্পর্কে",
    "about.history": "আমাদের ইতিহাস",
    "about.mission": "আমাদের লক্ষ্য",
    "about.values": "আমাদের মূল্যবোধ",
    "programs.title": "আমাদের প্রোগ্রামসমূহ",
    "faculty.title": "আমাদের শিক্ষকমণ্ডলী",
    "blog.title": "সর্বশেষ আপডেট",
    "gallery.title": "ক্যাম্পাস গ্যালারি",
    "testimonials.title": "আমাদের শিক্ষার্থীদের মতামত",
    "contact.title": "যোগাযোগ করুন",
    "contact.address": "ঠিকানা",
    "contact.phone": "ফোন",
    "contact.email": "ইমেইল",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত",
    "footer.newsletter": "নিউজলেটার সাবস্ক্রাইব করুন",
    "footer.links": "দ্রুত লিংক",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem("language") as Language | null;
    return storedLanguage || "en";
  });

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    // If we need to handle RTL for Bangla in the future
    // document.documentElement.dir = lang === "bn" ? "rtl" : "ltr";
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
