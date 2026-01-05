import BlogBanner from "@/components/features/blog/BlogBanner";
import BlogList from "@/components/features/blog/BlogList";
import BlogListSkeleton from "@/components/layout/Skeletons/BlogListSkeleton";
import { getMetaData } from "@/lib/server/metaApi";
import { Suspense } from "react";

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
