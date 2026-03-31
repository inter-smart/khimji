"use client";

import BottomLine from "./BottomLine";
import Links from "./Links";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FooterMobile = dynamic(() => import("./FooterMobile"), {
  ssr: false,
});
const Brands = dynamic(() => import("./Brands"), {
  ssr: true,
});
const SocialLinks = dynamic(() => import("./SocialLinks"), {
  ssr: true,
});

const otherLinks = [
  {
    label: "Blogs",
    link: "blog",
  },
  {
    label: "Faq",
    link: "faq",
  },
  {
    label: "Heritage",
    link: "heritage",
  },
  {
    label: "Ventures",
    link: "venture",
  },
  {
    label: "Archives",
    link: "archives",
  },
  {
    label: "ICV Initiatives",
    link: "icv-initiatives",
  },
  {
    label: "Career",
    link: "career",
  },
  {
    label: "Contact",
    link: "contact",
  },
];
export default function FooterClient({ siteSettingPromise, lang }) {
  siteSettingPromise;
  const { brands, site_settings, social_links, locations, policies } = siteSettingPromise?.data || {};


  const router = useRouter();

  function changeCountry(slug) {
    document.cookie = `country=${slug}; path=/`;
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("countryChanged", { detail: { country: slug } }));
    router.refresh();
  }

  return (
    <>
      <section className="w-full relative bg-gradient-to-r from-[#0B436A] to-[#299B8A] py-[30px] overflow-hidden max-sm:hidden  min-h-[520px] lg:min-h-[580px]">
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
              otherLinks={otherLinks}
            />
            <SocialLinks social_links={social_links} site_settings={site_settings} lang={lang} />
          </div>
          <BottomLine lang={lang} />
        </div>
      </section>

      <FooterMobile data={siteSettingPromise?.data} changeCountry={changeCountry} lang={lang} otherLinks={otherLinks} />
    </>
  );
}
