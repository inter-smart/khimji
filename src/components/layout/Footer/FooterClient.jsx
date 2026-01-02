"use client";

import FooterMobile from "./FooterMobile";
import BottomLine from "./BottomLine";
import SocialLinks from "./SocialLinks";
import Links from "./Links";
import Brands from "./Brands";
import { use } from "react";

const brands = [
  "/images/brand-1.png",
  "/images/brand-2.png",
  "/images/brand-3.png",
  "/images/brand-4.png",
  "/images/brand-1.png",
  "/images/brand-5.png",
  "/images/brand-6.png",
  "/images/brand-7.png",
  "/images/brand-8.png",
  "/images/brand-9.png",
];

export default function FooterClient({ siteSettingPromise, lang }) {
  const siteSettings = use(siteSettingPromise);
  const { brands, site_settings, social_links, locations } = siteSettings?.data || {};

  return (
    <>
      <section className="w-full relative bg-gradient-to-r from-[#0B436A] to-[#299B8A] py-[30px] overflow-hidden max-sm:hidden">
        <div className="container">
          <Brands brands={brands} lang={lang} />

          <div className="flex flex-wrap pb-[80px]">
            <Links locations={locations} lang={lang} site_settings={site_settings} />
            <SocialLinks social_links={social_links} site_settings={site_settings} lang={lang} />
          </div>
          <BottomLine lang={lang} />
        </div>
      </section>

      <FooterMobile />
    </>
  );
}
