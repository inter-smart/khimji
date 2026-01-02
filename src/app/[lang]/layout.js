// app/layout.jsx
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import localFont from "next/font/local";
import CountryProvider from "@/context/CountryDataProvider";

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
  
  return (
    <html lang={lang} dir={lang == "ar" ? "rtl" : "ltr"}>
      <body className={`${Nobel.className}`}>
        <CountryProvider>
          <Header lang={lang} />
          <main className="grow">{children}</main>
          <Footer lang={lang} />
        </CountryProvider>
      </body>
    </html>
  );
}
