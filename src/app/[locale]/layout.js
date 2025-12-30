// app/layout.jsx
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";
import { CountryProvider } from "@/context/CountryContext";
// import WidgetSection from "@/components/common/WidgetSection";
import PageLoader from "@/components/common/PageLoader";

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

import { isRTLLocale } from "@/lib/countries";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const direction = isRTLLocale(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={`${Nobel.className}`}>
        <CountryProvider>
          <PageLoader />
          <Header />
          <main className="flex-grow">{children}</main>
          {/* <WidgetSection /> */}
          <Footer />
        </CountryProvider>
      </body>
    </html>
  );
}
