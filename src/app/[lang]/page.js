import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import BannerSection from "@/components/features/home/BannerSection";

const VentureSection = dynamic(() => import("@/components/features/home/VentureSection"));
const HeritageSection = dynamic(() => import("@/components/features/home/HeritageSection"));
const ArchiveSection = dynamic(() => import("@/components/features/home/ArchiveSection"));
const ICVSection = dynamic(() => import("@/components/features/home/ICVSection"));
const ParnerSectionMobile = dynamic(() => import("@/components/features/home/home-mobile/ParnerSectionMobile"));



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } =
    await getMetaData("home", lang);

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const { data, error } = await getData("home", lang);

  if (!data || error) {
    return <div>Error loading data</div>;
  }
  const {
    sliders,
    home_cms,
    ventures,
    metrics,
    timelines,
    archives,
    initiatives,
    brands,
  } = data;

  console.log("ventures : ", ventures)
  return (
    <>
      <BannerSection data={sliders} />

      {ventures?.length>0 && (
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
      <ArchiveSection
        title={home_cms?.section3_title}
        archives={archives}
        lang={lang}
      />
      <ICVSection
        title={home_cms?.section4_title}
        description={home_cms?.section4_description}
        banner={home_cms?.section4_banner}
        banner_alt_text={home_cms?.section4_banner_alt_text}
        initiatives={initiatives}
        lang={lang}
      />
      <ParnerSectionMobile brands={brands} />
    </>
  );
}
