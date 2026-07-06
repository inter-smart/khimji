import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const VentureListingSection = dynamic(() => import("@/components/features/venture/VentureListingSection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("ventures", lang, "venture");

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

  const context = await getRequestContext();
  const { country } = context;
  // Simple GET request
  const { data, error, structuredData, lineScripts } = await getData("ventures", lang, country);

  if (!data || error) {
    notFound();
  }
  const { banner, venture_cms, venture_categories } = data;



  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <div className="overflow-hidden">
        <InnerHero
          coverImage={banner?.banner}
          coverImageMobile={banner?.banner_mobile}
          alt={banner?.banner_alt_text}
          title={banner?.banner_title}
          breadCrumb_data={[{ link: { href: `/${lang}`, label: t("home") } }, { link: { href: "/venture", label: t("ventures") } }]}
        />
        <Suspense fallback={null}>
          <VentureListingSection data={venture_categories} title={venture_cms?.title} context={context} />
        </Suspense>
      </div>
    </>
  );
}
