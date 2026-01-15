import ArchivesClient from "@/components/clientWrappers/ArchivesClient";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";
import { getMetaData } from "@/lib/server/metaApi";
import Script from "next/script";

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

  const { data, error, structuredData } = await getData("archives", lang, country);

  if (error || !data) {
    // Fallback to local data in case of error
    return <div>Error loading data</div>;
  }

  return (
    <>
      {structuredData &&
        structuredData.map((schema, index) => (
          <Script
            id={`schema-${index}`}
            key={index}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <ArchivesClient data={data} lang={lang} country={country} key={country} />
    </>
  );
}
