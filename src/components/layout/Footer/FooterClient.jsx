"use client";

import BottomLine from "./BottomLine";
import Links from "./Links";
import { use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FooterMobile = dynamic(() => import("./FooterMobile"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gradient-to-r from-[#0B436A] to-[#299B8A]" />
  ),
});
const Brands = dynamic(() => import("./Brands"), {
  ssr: false,
  loading: () => <div className="min-h-[80px]" />,
});
const SocialLinks = dynamic(() => import("./SocialLinks"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" />,
});

export default function FooterClient({ siteSettingPromise, lang }) {
  const siteSettings = use(siteSettingPromise);
  const { brands, site_settings, social_links, locations, policies } =
    siteSettings?.data || {};

  const router = useRouter();

  function changeCountry(slug) {
    document.cookie = `country=${slug}; path=/`;
    // Dispatch custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("countryChanged", { detail: { country: slug } })
    );
    router.refresh();
  }

  return (
    <>
      <section className="w-full relative bg-gradient-to-r from-[#0B436A] to-[#299B8A] py-[30px] overflow-hidden max-sm:hidden  min-h-[420px] lg:min-h-[480px]">
        <div className="container">
          <div className="min-h-[80px]">
            <Brands brands={brands} lang={lang} />
          </div>
          <div className="flex flex-wrap pb-[80px]">
            <Links
              locations={locations}
              lang={lang}
              site_settings={site_settings}
              changeCountry={changeCountry}
              policies={policies}
            />
            <SocialLinks
              social_links={social_links}
              site_settings={site_settings}
              lang={lang}
            />
          </div>
          <BottomLine lang={lang} />
        </div>
      </section>

      <FooterMobile
        data={siteSettings?.data}
        changeCountry={changeCountry}
        lang={lang}
      />
    </>
  );
}
