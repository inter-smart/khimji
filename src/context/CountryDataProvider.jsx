"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CountryProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    async function initCountry() {
      let countries = JSON.parse(localStorage.getItem("countries"));

      if (!countries) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-locations`);
        const json = await res.json();

        if (!json.status || !json.data?.length) {
          console.error("Country API failed");
          return;
        }

        countries = json.data;
        localStorage.setItem("countries", JSON.stringify(countries));
      }

      const cookieCountry = document.cookie
        .split("; ")
        .find((c) => c.startsWith("country="))
        ?.split("=")[1];

      const isValid = countries.some((c) => c.slug === cookieCountry);

      if (!isValid) {
        document.cookie = `country=${countries[0].slug}; path=/`;
        router.refresh();
      }
    }

    initCountry();
  }, []);

  return children;
}
