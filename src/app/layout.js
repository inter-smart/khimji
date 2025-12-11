import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import WidgetSection from "@/components/common/WidgetSection"; 

// Function to fetch banner status
 

const Nobel = localFont({
  src: [
     
    {
      path: "../../public/fonts/Nobel-Book.woff2",
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
