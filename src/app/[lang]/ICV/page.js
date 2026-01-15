import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";


const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const NationSection = dynamic(() => import("@/components/features/ICV-initiative/NationSection"));
const ProcurementSection = dynamic(() => import("@/components/features/ICV-initiative/ProcurementSection"));
const QuestionSectionClient = dynamic(() => import("@/components/features/ICV-initiative/QuestionSectionClient"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("icv-intiatives", lang, "icv");

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

  // Simple GET request
  const { data, error } = await getData("icv-intiatives", lang);

  if (!data || error) {
    return <div>Error loading data</div>;
  }
  const { banner, intiatives_cms, initiatives } = data;

  return (
    <>
      <InnerHero
        coverImage={banner?.banner}
        coverImageMobile={banner?.banner_mobile}
        alt={banner?.banner_alt_text}
        title={banner?.banner_title}
        breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/ICV", label: "ICV Initiatives" } }]}
      />

      {intiatives_cms && (
        <NationSection
        title={intiatives_cms?.section1_title}
        description={intiatives_cms?.section1_description}
        image={intiatives_cms?.section1_image}
        image_alt_text={intiatives_cms?.section1_image_alt_text}
      />
      )}
      {initiatives?.length > 0 && (
        <ProcurementSection initiatives={initiatives} />
      )}
      <QuestionSectionClient
        intiatives_cms={intiatives_cms}
      />
    </>
  );
}
