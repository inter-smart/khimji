"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
 
const BannerSection = dynamic(
  () => import("@/components/features/home/BannerSection"),
  { ssr: true },
);
 
const VentureSection = dynamic(
  () => import("@/components/features/home/VentureSection"),
  { ssr: true },
);
const HeritageSection = dynamic(
  () => import("@/components/features/home/HeritageSection"),
  { ssr: true },
);
const NewsSection = dynamic(
  () => import("@/components/features/home/NewsSection"),
  { ssr: true },
);
 
const ICVSection = dynamic(
  () => import("@/components/features/home/ICVSection"),
  { ssr: true },
);
const ParnerSectionMobile = dynamic(
  () => import("@/components/features/home/home-mobile/ParnerSectionMobile"),
  { ssr: true },
);

// Helper component to lazy load offscreen sections
const LazySection = ({ children, height = "500px" }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px", // Preload when section is within 250px of the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isInView ? "auto" : height }}>
      {isInView ? children : null}
    </div>
  );
};
 
const HomeClient = ({ data,  lang, country }) => {
  const {
    home_cms,
    ventures,
    metrics,
    timelines,
    initiatives,
    brands,
    news
  } = data;
 
  return (
    <>
 
      <BannerSection data={data?.sliders} key={country} country={country} />
 
      {ventures?.length > 0 && (
        <LazySection height="600px">
          <VentureSection
            title={home_cms?.section1_title}
            banner={home_cms?.section1_banner}
            banner_alt_text={home_cms?.section1_banner_alt_text}
            ventures={ventures}
            lang={lang}
          />
        </LazySection>
      )}

      <LazySection height="550px">
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
      </LazySection>
 
      <LazySection height="450px">
        <NewsSection data={news} lang={lang}/>
      </LazySection>
 
      {initiatives?.length > 0 && (
        <LazySection height="500px">
          <ICVSection
            title={home_cms?.section4_title}
            description={home_cms?.section4_description}
            banner={home_cms?.section4_banner}
            banner_alt_text={home_cms?.section4_banner_alt_text}
            initiatives={initiatives}
            lang={lang}
          />
        </LazySection>
      )}
      
      <LazySection height="100px">
        <ParnerSectionMobile brands={brands} />
      </LazySection>
    </>
  );
};
 
export default HomeClient;
