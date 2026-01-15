"use client";

import { createContext, useContext, useState } from "react";

const HeaderContext = createContext(null);

export function HeaderProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("united-arab-emirates");
  const [business, setBusiness] = useState("b2b");

  return (
    <HeaderContext.Provider
      value={{
        language,
        country,
        business,
        setLanguage,
        setCountry,
        setBusiness,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error("useHeaderContext must be used inside HeaderProvider");
  return ctx;
};
