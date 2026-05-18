// app/layout.jsx
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";

import localFont from "next/font/local";
import { PolicySlugProvider } from "@/context/PolicySlugContext";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/layout/CookieConsent";

const Nobel = localFont({
  src: [
    {
      path: "../../../public/fonts/Nobel-Book.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-Nobel",
  preload: true,
  display: "swap",
});

const Bukra = localFont({
  src: [
    {
      path: "../../../public/fonts/bukra-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-Bukra",
  preload: true,
  display: "swap",
});

const Brown = localFont({
  src: [
    {
      path: "../../../public/fonts/brown-light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-Brown",
  preload: true,
  display: "swap",
});

export const metadata = {
  title: "Khimji Ramdas",
  description: "Khimji Ramdas is a Ramdas company",
};

export default async function RootLayout({ children, params }) {
  const paramsResolved = await params;
  const { lang } = paramsResolved || { lang: "en" };

  return (
    <html
      lang={lang}
      dir={lang == "ar" ? "rtl" : "ltr"}
      className={`${Nobel.variable} ${Bukra.variable} ${Brown.variable}`}
    >
      <body className="font-base1">
        <PolicySlugProvider>
          <Header lang={lang} />
          <main className="grow">{children}</main>
          <Footer lang={lang} />
          <CookieConsent />
          <Toaster />
        </PolicySlugProvider>
      </body>
    </html>
  );
}
