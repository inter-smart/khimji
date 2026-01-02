"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { COUNTRIES, DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from "@/lib/countries";

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlLocale = params.locale;

  // Initialize from URL if valid, otherwise from localStorage, otherwise default
  const [country, setCountryState] = useState(() => {
    if (urlLocale && SUPPORTED_COUNTRIES.includes(urlLocale)) {
      return urlLocale;
    }
    return DEFAULT_COUNTRY;
  });

  // Update state if URL locale changes
  useEffect(() => {
    if (urlLocale && SUPPORTED_COUNTRIES.includes(urlLocale) && urlLocale !== country) {
      setCountryState(urlLocale);
    }
  }, [urlLocale, country]);

  const setCountry = (newCountry) => {
    if (COUNTRIES[newCountry]) {
      setCountryState(newCountry);
      localStorage.setItem("selectedCountry", newCountry);

      // Navigate to the new country URL while preserving the rest of the path
      const pathParts = pathname.split("/").filter(Boolean);
      if (pathParts[0] === urlLocale) {
        pathParts[0] = newCountry;
      } else {
        pathParts.unshift(newCountry);
      }
      router.push("/" + pathParts.join("/"));
    }
  };

  const countryData = COUNTRIES[country];

  return <CountryContext.Provider value={{ country, countryData, setCountry }}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
