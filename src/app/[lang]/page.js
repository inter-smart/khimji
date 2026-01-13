import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import HomeClient from "@/components/clientWrappers/HomeClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("home", lang);

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

  const { data, error } = await getData("home", lang);

  if (!data || error) {
    return <div>Error loading data</div>;
  }

  return <HomeClient data={data} lang={lang} />;
}
