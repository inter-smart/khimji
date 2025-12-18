import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import WidgetSection from "@/components/common/WidgetSection";

// Function to fetch banner status

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

// const barlow = Barlow({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
//   variable: "--font-barlow",
// });

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Nobel.className}`}>
        {/* <LoadingProvider>
          <LoadingWrapper> */}
<<<<<<< HEAD:src/app/[locale]/layout.js
            <Header />
            <main className="flex-grow">{children}</main>
            {/* <WidgetSection /> */}
            <Footer /> 
          {/* </LoadingWrapper>
=======
        <Header />
        <main className="flex-grow">{children}</main>
        <WidgetSection />
        <Footer />
        {/* </LoadingWrapper>
>>>>>>> 3bad92e0d81a97dc774f6afac39f14f79539033c:src/app/layout.js
        </LoadingProvider> */}
      </body>
    </html>
  );
}
