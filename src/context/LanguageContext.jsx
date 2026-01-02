"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const LANGUAGES = {
  en: {
    code: "en",
    name: "EN",
    fullName: "English",
    flag: "https://flagcdn.com/w40/gb.png",
    isRTL: false,
  },
  ar: {
    code: "ar",
    name: "AR",
    fullName: "Arabic",
    flag: "https://flagcdn.com/w40/sa.png",
    isRTL: true,
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children, initialLanguage }) {
  const router = useRouter();

  // Initialize from initialLanguage (from cookies on server) or localStorage or default to English
  const [language, setLanguageState] = useState(() => {
    // First priority: server-side initial language (from cookies)
    if (initialLanguage && LANGUAGES[initialLanguage]) {
      return initialLanguage;
    }

    // Second priority: client-side localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("selectedLanguage");
      return savedLanguage && LANGUAGES[savedLanguage] ? savedLanguage : "en";
    }

    return "en";
  });

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const languageData = LANGUAGES[language];
      document.documentElement.lang = language;
      document.documentElement.dir = languageData.isRTL ? "rtl" : "ltr";
    }
  }, [language]);

  const setLanguage = (newLanguage) => {
    if (LANGUAGES[newLanguage]) {
      setLanguageState(newLanguage);

      if (typeof window !== "undefined") {
        // Save to localStorage
        localStorage.setItem("selectedLanguage", newLanguage);

        // Save to cookie for server-side access
        document.cookie = `lang=${newLanguage}; path=/; max-age=31536000; SameSite=Lax`;

        // Refresh the page to get new server-side data
        router.refresh();
      }
    }
  };

  const languageData = LANGUAGES[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        languageData,
        setLanguage,
        languages: Object.values(LANGUAGES),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
