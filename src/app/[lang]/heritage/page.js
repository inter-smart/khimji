import InnerHero from "@/components/common/InnerHero";
import BoardDirectorSection from "@/components/features/heritage/BoardDirectorSection";
import DrivenSection from "@/components/features/heritage/DrivenSection";
import HeritageSection from "@/components/features/heritage/HeritageSection";
import { getData } from "@/lib/server/api";


export default async function page({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // Simple GET request
  const { data } = await getData("heritage", lang);
  if (!data) {
    return <div>Error loading data</div>;
  }
  const { banner, about_cms, metrics, timelines, directors } = data;

  return (
    <>
      <div className="overflow-hidden">
        <InnerHero
          coverImage={banner?.banner}
          coverImageMobile={banner?.banner_mobile}
          alt={banner?.banner_alt_text}
          title={banner?.banner_title}
          breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/heritage", label: "Heritage" } }]}
        />
        <DrivenSection
          title={about_cms?.section1_title}
          description={about_cms?.section1_description}
          image={about_cms?.section1_image}
          image_alt_text={about_cms?.section1_image_alt_text}
          metrics={metrics}
        />
        <HeritageSection title={about_cms?.section2_title} timelines={timelines} lang={lang} />
        <BoardDirectorSection
          title={about_cms?.section4_title}
          directors={directors}
        />
      </div>
    </>
  );
}
