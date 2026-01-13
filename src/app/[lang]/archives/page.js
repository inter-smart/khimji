import ArchivesClient from "@/components/clientWrappers/ArchivesClient";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";
import { getMetaData } from "@/lib/server/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("archives", lang);

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
  const lang = resolvedParams.lang;

  const { country } = await getRequestContext();

  const { data, error } = await getData("archives", lang, country);

  if (error || !data) {
    // Fallback to local data in case of error
    return <div>Error loading data</div>;
  }

  return <ArchivesClient data={data} lang={lang} country={country} key={country} />;
}
