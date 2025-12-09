import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import WidgetSection from "@/components/common/WidgetSection"; 

// Function to fetch banner status
 

const NobelTRIAL = localFont({
  src: [
    {
      path: "../../public/fonts/NobelTRIAL-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/NobelTRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NobelTRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NobelTRIAL-Book.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NobelTRIAL-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NobelTRIAL-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-NobelTRIAL",
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
       <body className={`${NobelTRIAL.className}`}>
        {/* <LoadingProvider>
          <LoadingWrapper> */}
            <Header />
            <main className="flex-grow">{children}</main>
            <WidgetSection />
            <Footer /> 
          {/* </LoadingWrapper>
        </LoadingProvider> */}
      </body>
    </html>
  );
}
