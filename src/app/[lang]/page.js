import { getData } from "@/lib/server/api";
import dynamic from "next/dynamic";
import { getMetaData } from "@/lib/server/metaApi";
import HomeClient from "@/components/clientWrappers/HomeClient";
const BannerSection = dynamic(() => import("@/components/features/home/BannerSection"), { ssr: true });

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

  const { sliders, ...rest } = data;

  return (
    <>
      <BannerSection data={sliders} />
      <HomeClient data={rest} lang={lang} />
    </>
  );
}
