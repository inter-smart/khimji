import { getData } from "@/lib/server/api";
import dynamic from "next/dynamic";
import { getMetaData } from "@/lib/server/metaApi";
import HomeClient from "@/components/clientWrappers/HomeClient";
import DynamicMeta from "@/components/layout/DynamicMeta";
import { getRequestContext } from "@/lib/server/getCookieData";
import { notFound } from "next/navigation";
const BannerSection = dynamic(
  () => import("@/components/features/home/BannerSection"),
  { ssr: true },
);

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
  } = await getMetaData("home", lang);

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
  const { country } = await getRequestContext();

  const { data, error, structuredData, lineScripts } = await getData(
    "home",
    lang,
    country,
  );

  if (!data || error) {
    notFound();
  }

  const { sliders, ...rest } = data;

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <BannerSection data={sliders} key={country} />
      <HomeClient data={rest} lang={lang} />
    </>
  );
}
