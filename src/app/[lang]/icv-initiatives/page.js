import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const NationSection = dynamic(
  () => import("@/components/features/ICV-initiative/NationSection"),
);
const ProcurementSection = dynamic(
  () => import("@/components/features/ICV-initiative/ProcurementSection"),
  { ssr: true }
);
import QuestionSectionClient from "@/components/features/ICV-initiative/QuestionSectionClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = await getMetaData("icv-intiatives", lang, "icv-intiatives");

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

export default async function Page({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  setRequestLocale(lang);
  const t = await getTranslations("common");

  // Simple GET request
  const { data, error, structuredData, lineScripts } = await getData(
    "icv-intiatives",
    lang,
  );

  if (!data || error) {
    notFound();
  }
  const { banner, intiatives_cms, initiatives } = data;

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <InnerHero
        coverImage={banner?.banner}
        coverImageMobile={banner?.banner_mobile}
        alt={banner?.banner_alt_text}
        title={banner?.banner_title}
        breadCrumb_data={[
          { link: { href: `/${lang}`, label: t("home") } },
          { link: { href: "/icv-initiatives", label: t("icvInitiatives") } },
        ]}
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
      <QuestionSectionClient intiatives_cms={intiatives_cms} />
    </>
  );
}
