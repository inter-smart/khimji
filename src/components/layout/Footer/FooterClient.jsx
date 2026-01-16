"use client";

import BottomLine from "./BottomLine";
import Links from "./Links";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";

// CRITICAL: Change ssr to false for below-fold components
const FooterMobile = dynamic(() => import("./FooterMobile"), {
  ssr: false, // Mobile footer doesn't need SSR
  loading: () => <div className="sm:hidden min-h-[400px]" />, // Reserve space
});

const Brands = dynamic(() => import("./Brands"), {
  ssr: true, // Keep SSR for brands (above fold in footer)
  loading: () => <div className="min-h-[80px] w-full" />, // Prevent layout shift
});

const SocialLinks = dynamic(() => import("./SocialLinks"), {
  ssr: true,
  loading: () => <div className="w-3/12 min-h-[200px]" />, // Reserve space
});

// Move outside component to prevent recreation
const otherLinks = [
  { label: "Blogs", link: "blog" },
  { label: "Faq", link: "faq" },
  { label: "Heritage", link: "heritage" },
  { label: "Ventures", link: "venture" },
  { label: "Archives", link: "archives" },
  { label: "ICV Initiatives", link: "icv-initiatives" },
  { label: "Career", link: "career" },
  { label: "Contact", link: "contact" },
];

export default function FooterClient({ siteSettingPromise, lang }) {
  const { brands, site_settings, social_links, locations, policies } = 
    siteSettingPromise?.data || {};

  const router = useRouter();

  // Memoize callback to prevent recreation
  const changeCountry = useCallback((slug) => {
    document.cookie = `country=${slug}; path=/`;
    window.dispatchEvent(
      new CustomEvent("countryChanged", { detail: { country: slug } })
    );
    router.refresh();
  }, [router]);

  // Memoize data to prevent unnecessary re-renders
  const footerData = useMemo(() => ({
    brands,
    site_settings,
    social_links,
    locations,
    policies,
  }), [brands, site_settings, social_links, locations, policies]);

  return (
    <>
      <section 
        className="w-full relative bg-gradient-to-r from-[#0B436A] to-[#299B8A] py-[30px] overflow-hidden max-sm:hidden min-h-[520px] lg:min-h-[580px]"
        style={{
          // CSS containment for better performance
          contain: 'layout style paint',
          // Prevent unnecessary repaints
          willChange: 'auto',
          // Reserve intrinsic size
          containIntrinsicSize: 'auto 580px',
        }}
      >
        <div className="container">
          {/* Fixed minimum height prevents layout shift */}
          <div className="min-h-[80px]" style={{ contain: 'layout' }}>
            <Brands brands={footerData.brands} lang={lang} />
          </div>
          
          <div 
            className="flex flex-wrap pb-[80px]"
            style={{ contain: 'layout' }}
          >
            <Links
              locations={footerData.locations}
              lang={lang}
              site_settings={footerData.site_settings}
              changeCountry={changeCountry}
              policies={footerData.policies}
              otherLinks={otherLinks}
            />
            <SocialLinks 
              social_links={footerData.social_links} 
              site_settings={footerData.site_settings} 
              lang={lang} 
            />
          </div>
          
          <BottomLine lang={lang} />
        </div>
      </section>

      <FooterMobile 
        data={siteSettingPromise?.data} 
        changeCountry={changeCountry} 
        lang={lang} 
        otherLinks={otherLinks} 
      />
    </>
  );
}