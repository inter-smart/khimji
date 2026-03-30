import ArchivesClient from "@/components/clientWrappers/ArchivesClient";
import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";
import { getMetaData } from "@/lib/server/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("archives", lang, "archives");

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

  const { data, error, structuredData, lineScripts } = await getData("archives", lang, country);

  if (error || !data) {
    // Fallback to local data in case of error
    return <div>Error loading data</div>;
  }

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <ArchivesClient data={data} lang={lang} country={country} key={country} />
    </>
  );
}
