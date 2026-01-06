import InnerHero from "@/components/common/InnerHero";
import FaqSection from "@/components/features/faq/FaqSection";
import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("faq", lang);

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
  const { lang } = resolvedParams;
  const { data, error } = await getData("faq", lang);

  if (error || !data) {
    return <div>Error loading data</div>;
  }

  const { banner, faq, faq_cms } = data;

  return (
    <>
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
