import DynamicMeta from "@/components/layout/DynamicMeta";
import { parseOtherMeta } from "@/lib/helper";
import { getData } from "@/lib/server/api";
import { DefaultOgImage } from "@/lib/server/constants";
import { getRequestContext } from "@/lib/server/getCookieData";
import dynamic from "next/dynamic";
import NotFound from "../../not-found";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

const VendordetailsSection = dynamic(() => import("@/components/features/venture/VendordetailsSection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;

  const { business_type } = await getRequestContext();
  const categorySlug = business_type === "b2c" ? "consumer-oriented" : "corporate-oriented";
  const { data, error } = await getData(`venture-details?slug=${slug}&category_slug=${categorySlug}`, lang);

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
    other_meta_tags,
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
  const { other } = parseOtherMeta(other_meta_tags);
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

    other: {
      ...other,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/venture/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;
  setRequestLocale(lang);
  const t = await getTranslations("common");

  const { business_type } = await getRequestContext();
  const categorySlug = business_type === "b2c" ? "consumer-oriented" : "corporate-oriented";
  const { data, error, structuredData, lineScripts } = await getData(`venture-details?slug=${slug}&category_slug=${categorySlug}`, lang);


   if (!data || error) {
     notFound();
   }
  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <VendordetailsSection
        breadCrumb_data={[
          { href: `/${lang}`, label: t("home") },
          { href: `/${lang}/venture`, label: t("venture") },
          {
            href: `/venture/${slug}`,
            label: data?.title,
          },
        ]}
        pageData={data}
      />
    </>
  );
}
