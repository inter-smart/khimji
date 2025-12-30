import ArchiveSection from "@/components/features/home/ArchiveSection";
import BannerSection from "@/components/features/home/BannerSection";
import HeritageSection from "@/components/features/home/HeritageSection";
import ParnerSectionMobile from "@/components/features/home/home-mobile/ParnerSectionMobile";
import ICVSection from "@/components/features/home/ICVSection";
import VentureSection from "@/components/features/home/VentureSection";
import { fetchFromAPI, getAPI } from "@/lib/api";

export default async function Page() {
  // Simple GET request
  const result = await getAPI("home");
  const data = result.data;

  if (!data) {
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
    brands
  } = data;

  return (
    <>
      <BannerSection data={sliders} />
      <VentureSection
        title={home_cms?.section1_title}
        banner={home_cms?.section1_banner}
        banner_alt_text={home_cms?.section1_banner_alt_text}
        ventures={ventures}
      />
      <HeritageSection
        title={home_cms?.section2_title}
        description={home_cms?.section2_description}
        banner={home_cms?.section2_banner}
        banner_alt_text={home_cms?.section2_banner_alt_text}
        image={home_cms?.section2_image}
        image_alt={home_cms?.section2_image_alt_text}
        metrics={metrics}
        timelines={timelines}
      />
      <ArchiveSection title={home_cms?.section3_title} archives={archives} />
      <ICVSection 
        title={home_cms?.section4_title}
        description={home_cms?.section4_description}
        banner={home_cms?.section4_banner}
        banner_alt_text={home_cms?.section4_banner_alt_text}
        initiatives={initiatives}
      />
      <ParnerSectionMobile brands={brands} />
    </>
  );
}
