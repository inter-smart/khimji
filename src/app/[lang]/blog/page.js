import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { Suspense } from "react";


const BlogBanner = dynamic(() => import("@/components/features/blog/BlogBanner"));
const BlogList = dynamic(() => import("@/components/features/blog/BlogList"));
const BlogListSkeleton = dynamic(() => import("@/components/layout/Skeletons/BlogListSkeleton"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates } = await getMetaData("blogs", lang, "blog");

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
  };
}

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resollvedSearchParams = await searchParams;
  const { lang } = resolvedParams;

  return (
    <>
      <BlogBanner lang={lang} />
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList lang={lang} searchParams={resollvedSearchParams} />
      </Suspense>
    </>
  );
}
