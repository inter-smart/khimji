import BlogDetailSection from "@/components/features/blog/BlogDetailSection";
import RelatedBlogSection from "@/components/features/blog/RelatedBlogSection";
import { getData } from "@/lib/server/api";

export default async function page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, lang } = resolvedParams;
  const { data, error } = await getData(`blog-details?slug=${slug}`, lang);


  if (error || !data) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <BlogDetailSection data={data} />
      <RelatedBlogSection data={data?.related_blogs} />
    </>
  );
}
