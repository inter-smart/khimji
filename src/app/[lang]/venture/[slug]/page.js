import VendordetailsSection from "@/components/features/venture/VendordetailsSection";
import { getData } from "@/lib/server/api";
import { DefaultOgImage } from "@/lib/server/constants";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;

  const { data, error } = await getData(`venture-details?slug=${slug}`, lang);

  if (!data || error) {
    return {
      title: "Venture Not Found",
      description: "The requested venture could not be found.",
    };
  }

  const {
    meta_title,
    meta_description,
    meta_keywords,
    title,
    published_on,
    banner_type,
    banner_video_thumbnail_image,
    banner_image,
    banner_alt_text,
    banner_mobile_alt_text,
  } = data;

  const featuredImage = banner_type === "video" ? banner_video_thumbnail_image : banner_image;

  const ogImage = featuredImage || DefaultOgImage;
  const imageAltText = banner_alt_text || banner_mobile_alt_text || title || "Venture image";

  return {
    title: meta_title || title || "Venture",
    description: meta_description || "Explore our venture details",
    keywords: meta_keywords || "",

    openGraph: {
      title: meta_title || title || "Venture",
      description: meta_description || "Explore our venture details",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAltText,
        },
      ],
      type: "article",
      publishedTime: published_on || undefined,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/venture/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: meta_title || title || "Venture",
      description: meta_description || "Explore our venture details",
      images: [ogImage],
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/venture/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;

  const { data } = await getData(`venture-details?slug=${slug}`, lang);

  if (!data) {
    return <div>Error loading data</div>;
  }
  return (
    <VendordetailsSection
      breadCrumb_data={[
        { href: "/", label: "Home" },
        { href: "/ventures", label: "Ventures" },
        {
          href: `/ventures/${slug}`,
          label: data?.title,
        },
      ]}
      pageData={data}
    />
  );
}
