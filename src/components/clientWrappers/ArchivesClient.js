"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"), { ssr: true });
const ArchiveListingSection = dynamic(() => import("@/components/features/archives/ArchiveListingSection"), { ssr: false });

const ArchivesClient = ({ lang, country, data, key }) => {
  const t = useTranslations("common");
  const { banner, archive_categories } = data;

  return (
    <>
      <InnerHero
        coverImage={banner?.banner || "/images/archive_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/archive_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Archive Banner"}
        title={banner?.banner_title || "Archives"}
        breadCrumb_data={[{ link: { href: `/${lang}`, label: t("home") } }, { link: { href: "/heritage", label: t("archives") } }]}
      />
      <ArchiveListingSection key={key} categories={archive_categories} lang={lang} country={country} />
    </>
  );
};

export default ArchivesClient;
