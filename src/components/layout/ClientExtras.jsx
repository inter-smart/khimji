"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(() => import("@/components/layout/CookieConsent"), { ssr: false });
const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
  { ssr: false }
);

export default function ClientExtras() {
  return (
    <>
      <CookieConsent />
      <Toaster />
    </>
  );
}
