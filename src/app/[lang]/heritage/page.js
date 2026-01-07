import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const DrivenSection = dynamic(() => import("@/components/features/heritage/DrivenSection"));
const HeritageSection = dynamic(() => import("@/components/features/heritage/HeritageSection"));
const BoardDirectorSection = dynamic(()=> import("@/components/features/heritage/BoardDirectorSection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("heritage", lang);

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
  };
}

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
          breadCrumb_data={[{ link: { href: `/${lang}`, label: "Home" } }, { link: { href: "/heritage", label: "Heritage" } }]}
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
          title={about_cms?.section3_title}
          directors={directors}
        />
      </div>
    </>
  );
}
