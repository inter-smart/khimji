// app/layout.jsx
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/layout/CookieConsent";
import { PolicySlugProvider } from "@/context/PolicySlugContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

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


export const metadata = {
  title: "Khimji Ramdas",
  description: "Khimji Ramdas is a Ramdas company",
};


export default async function RootLayout({ children, params }) {
  const paramsResolved = await params;
  const { lang } = paramsResolved || { lang: "en" };
  setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <html lang={lang} dir={lang == "ar" ? "rtl" : "ltr"} className={`${Nobel.variable}`}>
      <body className="font-base1">
        <NextIntlClientProvider locale={lang} messages={messages}>
          <PolicySlugProvider>
            <Header lang={lang} />
            <main className="grow">{children}</main>
            <Footer lang={lang} />
            <CookieConsent />
            <Toaster />
          </PolicySlugProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
