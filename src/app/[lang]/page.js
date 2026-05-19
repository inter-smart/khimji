import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import HomeClient from "@/components/clientWrappers/HomeClient";
import DynamicMeta from "@/components/layout/DynamicMeta";
import { getRequestContext } from "@/lib/server/getCookieData";
import { notFound } from "next/navigation";

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


  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <HomeClient data={data} country={country} lang={lang} />
    </>
  );
}
