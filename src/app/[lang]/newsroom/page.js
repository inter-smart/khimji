import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BlogBanner = dynamic(() => import("@/components/features/blog/BlogBanner"));
const BlogList = dynamic(() => import("@/components/features/blog/BlogList"));
const BlogListSkeleton = dynamic(() => import("@/components/layout/Skeletons/BlogListSkeleton"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("blogs?page=news", lang, "blog");

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

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resollvedSearchParams = await searchParams;
  const { lang } = resolvedParams;

  const { data: cms, error, structuredData, lineScripts } = await getData("blogs?page=news", lang);

  if (error || !cms) {
    return <div>Error loading data</div>;
  }

  const bannerData = cms?.banner;

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <BlogBanner bannerData={bannerData} variant="news" />
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList variant="news" lang={lang} searchParams={resollvedSearchParams} />
      </Suspense>
    </>
  );
}
