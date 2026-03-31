import DynamicMeta from "@/components/layout/DynamicMeta";
import { parseOtherMeta } from "@/lib/helper";
import { getData } from "@/lib/server/api";
import { DefaultOgImage } from "@/lib/server/constants";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const BlogDetailSection = dynamic(() => import("@/components/features/blog/BlogDetailSection"));
const RelatedBlogSection = dynamic(() => import("@/components/features/blog/RelatedBlogSection"));
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;
  const { data, error } = await getData(`blog-details?slug=${slug}&type=news`, lang);

  if (!data || error) {
    return {
      title: "News Not Found",
      description: "The requested news article could not be found.",
    };
  }

  const { meta_title, meta_description, meta_keywords, other_meta_tags, title, featured_image, image_alt_text, published_on } = data;

  // Use blog's own image or fallback
  const ogImage = featured_image || DefaultOgImage;
  const { other, scripts } = parseOtherMeta(other_meta_tags);

  return {
    title: meta_title || title || "News Post",
    description: meta_description || "Read our latest news post",
    keywords: meta_keywords || "",

    // Enhanced SEO fields
    openGraph: {
      title: meta_title || title || "News Post",
      description: meta_description || "Read our latest news post",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: image_alt_text || title || "News post image",
        },
      ],
      type: "article",
      publishedTime: published_on ? published_on : undefined,
      authors: undefined,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/news/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: meta_title || title || "News Post",
      description: meta_description || "Read our latest news post",
      images: [ogImage],
    },

    other: {
      ...other,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/news/${slug}`,
    },
  };
}

export default async function page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, lang } = resolvedParams;
  const { data, error, structuredData, lineScripts } = await getData(`blog-details?slug=${slug}&type=news`, lang);

  if (!data || error) {
    notFound();
  }

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <BlogDetailSection data={data} />
      {data?.related_blogs?.length > 0 && <RelatedBlogSection data={data?.related_blogs} />}
    </>
  );
}
