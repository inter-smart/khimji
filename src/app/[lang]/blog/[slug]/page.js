import BlogDetailSection from "@/components/features/blog/BlogDetailSection";
import RelatedBlogSection from "@/components/features/blog/RelatedBlogSection";
import { getData } from "@/lib/server/api";
import { DefaultOgImage } from "@/lib/server/constants";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;
  const { data, error } = await getData(`blog-details?slug=${slug}`, lang);

  if (!data || error) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const { meta_title, meta_description, meta_keywords, title, featured_image, image_alt_text, published_on } = data;

  // Use blog's own image or fallback
  const ogImage = featured_image || DefaultOgImage;

  return {
    title: meta_title || title || "Blog Post",
    description: meta_description || "Read our latest blog post",
    keywords: meta_keywords || "",

    // Enhanced SEO fields
    openGraph: {
      title: meta_title || title || "Blog Post",
      description: meta_description || "Read our latest blog post",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: image_alt_text || title || "Blog post image",
        },
      ],
      type: "article",
      publishedTime: published_on ? published_on : undefined,
      authors: undefined,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/blog/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: meta_title || title || "Blog Post",
      description: meta_description || "Read our latest blog post",
      images: [ogImage],
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/blog/${slug}`,
    },
  };
}

export default async function page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, lang } = resolvedParams;
  const { data, error } = await getData(`blog-details?slug=${slug}`, lang);

   if (!data || error) {
    notFound();
  }

  return (
    <>
      <BlogDetailSection data={data} />
      <RelatedBlogSection data={data?.related_blogs} />
    </>
  );
}
