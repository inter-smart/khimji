import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const CareerSection = dynamic(() => import("@/components/features/career/CareerSection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("careers", lang, "career");

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

export default async function page({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  setRequestLocale(lang);
  const t = await getTranslations("common");

  const { data, error, structuredData, lineScripts } = await getData("careers", lang);

  if (!data || error) {
    notFound();
  }

  const { banner, career_cms, careers } = data;

  const career_section_data = {
    ...career_cms,
    careerList: careers,
  };

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <InnerHero
        coverImage={banner?.banner}
        coverImageMobile={banner?.banner_mobile}
        alt={banner?.banner_alt_text}
        title={banner?.banner_title}
        breadCrumb_data={[{ link: { href: `/${lang}`, label: t("home") } }, { link: { href: "/career", label: t("careers") } }]}
      />
      <CareerSection data={career_section_data} />
    </>
  );
}
