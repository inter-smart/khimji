"use client";
import React from "react";
import dynamic from "next/dynamic";
import NewsSection from "../features/home/NewsSection";

const VentureSection = dynamic(() => import("@/components/features/home/VentureSection"));
const HeritageSection = dynamic(() => import("@/components/features/home/HeritageSection"));
const ICVSection = dynamic(() => import("@/components/features/home/ICVSection"));
const ParnerSectionMobile = dynamic(() => import("@/components/features/home/home-mobile/ParnerSectionMobile"));

const HomeClient = ({ data, lang }) => {
  const {
    home_cms,
    ventures,
    metrics,
    timelines,
    archives,
    initiatives,
    brands,
    news
  } = data;

  return (
    <>
      {ventures?.length > 0 && (
        <VentureSection
          title={home_cms?.section1_title}
          banner={home_cms?.section1_banner}
          banner_alt_text={home_cms?.section1_banner_alt_text}
          ventures={ventures}
          lang={lang}
        />
      )}
      <HeritageSection
        title={home_cms?.section2_title}
        description={home_cms?.section2_description}
        banner={home_cms?.section2_banner}
        banner_alt_text={home_cms?.section2_banner_alt_text}
        image={home_cms?.section2_image}
        image_alt={home_cms?.section2_image_alt_text}
        metrics={metrics?.metrics}
        timelines={timelines}
        lang={lang}
      />
    
      <NewsSection data={news} lang={lang} />

      {initiatives?.length > 0 && (
        <ICVSection
          title={home_cms?.section4_title}
          description={home_cms?.section4_description}
          banner={home_cms?.section4_banner}
          banner_alt_text={home_cms?.section4_banner_alt_text}
          initiatives={initiatives}
          lang={lang}
        />
      )}

      <ParnerSectionMobile brands={brands} />
    </>
  );
};

export default HomeClient;
