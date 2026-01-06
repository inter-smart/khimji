import InnerHero from "@/components/common/InnerHero";
import CareerSection from "@/components/features/career/CareerSection";
import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("careers", lang, "career");

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
  const { lang } = resolvedParams;

  const { data, error } = await getData("careers", lang);

  if (error || !data) {
    // Fallback to local data in case of error
    return <div>Error loading data</div>;
  }

  const { banner, career_cms, careers } = data;

  const career_section_data = {
    ...career_cms,
    careerList: careers,
  };

  return (
    <>
      <InnerHero
        coverImage={banner?.banner}
        coverImageMobile={banner?.banner_mobile}
        alt={banner?.banner_alt_text}
        title={banner?.banner_title}
        breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/career", label: "Careers" } }]}
      />
      <CareerSection data={career_section_data} />
    </>
  );
}
