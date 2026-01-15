import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import Script from "next/script";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const CareerSection = dynamic(() => import("@/components/features/career/CareerSection"));

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

  const { data, error, structuredData } = await getData("careers", lang);

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
      {structuredData &&
        structuredData.map((schema, index) => (
          <Script
            id={`schema-${index}`}
            key={index}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <InnerHero
        coverImage={banner?.banner}
        coverImageMobile={banner?.banner_mobile}
        alt={banner?.banner_alt_text}
        title={banner?.banner_title}
        breadCrumb_data={[{ link: { href: `/${lang}`, label: "Home" } }, { link: { href: "/career", label: "Careers" } }]}
      />
      <CareerSection data={career_section_data} />
    </>
  );
}
