import BlogBanner from "@/components/features/blog/BlogBanner";
import BlogList from "@/components/features/blog/BlogList";
import { Suspense } from "react";


export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resollvedSearchParams = await searchParams;
  const { lang } = resolvedParams;

  return (
    <>
      <BlogBanner lang={lang} />
      <Suspense fallback={<LoadingState />}>
        <BlogList lang={lang} searchParams={resollvedSearchParams} />
      </Suspense>
    </>
  );
}

function LoadingState() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">Loading blogs...</p>
      </div>
    </div>
  );
}