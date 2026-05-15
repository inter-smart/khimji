import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const FaqSection = dynamic(() => import("@/components/features/faq/FaqSection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("faq", lang, "faq");

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
  const { lang } = resolvedParams;
  const { data, error, structuredData, lineScripts } = await getData("faq", lang);

  if (!data || error) {
     notFound();
   }
  const { banner, faq, faq_cms } = data;

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <InnerHero
        coverImage={banner?.banner || "/images/faq_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/faq_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Faq Banner"}
        title={banner?.banner_title || "FAQ"}
        breadCrumb_data={[{ link: { href: `/${lang}`, label: "Home" } }, { link: { href: "/heritage", label: "Faq" } }]}
      />
      <FaqSection cms={faq_cms} data={faq} />
    </>
  );
}
