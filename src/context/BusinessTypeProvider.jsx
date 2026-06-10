"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BusinessTypeProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    async function initBusinessType() {
      let businessTypes = JSON.parse(localStorage.getItem("businessTypes"));

      if (!businessTypes) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-business-types`);
        const json = await res.json();

        if (!json.status || !json.data?.length) {
          console.error("Business Type API failed");
          return;
        }

        businessTypes = json.data;
        localStorage.setItem("businessTypes", JSON.stringify(businessTypes));
      }

      const cookieBusinessType = document.cookie
        .split("; ")
        .find((c) => c.startsWith("business_type="))
        ?.split("=")[1];

      const isValid = businessTypes.some((b) => b.slug === cookieBusinessType);

      if (!isValid) {
        document.cookie = `business_type=${businessTypes[0].slug}; path=/`;
        router.refresh();
      }
    }

    initBusinessType();
  }, []);

  return children;
}
