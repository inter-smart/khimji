import DynamicMeta from "@/components/layout/DynamicMeta";
import { NoDataState, parseOtherMeta } from "@/lib/helper";
import { getData } from "@/lib/server/api";
import { DefaultOgImage } from "@/lib/server/constants";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

const PrivacySection = dynamic(
  () => import("@/components/features/privacy/PrivacySection"),
);

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  // If slug is not privacy-policy, return default metadata
  if (slug !== "privacy-policy") {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const { data, error } = await getData(`policy?slug=${slug}`, lang);

  if (!data || error) {
    return {
      title: "Content Not Found",
      description: "The content you are looking for could not be found.",
    };
  }

  const {
    meta_title,
    meta_description,
    other_meta_tags,
    meta_keywords,
    title,
  } = data;
  const { other } = parseOtherMeta(other_meta_tags);

  return {
    title: meta_title || title || "Policy",
    description: meta_description || "View our policy details",
    keywords: meta_keywords || "",

    openGraph: {
      title: meta_title || title || "Policy",
      description: meta_description || "View our policy details",
      images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: meta_title || title || "Policy",
      description: meta_description || "View our policy details",
      images: [DefaultOgImage],
    },

    other: {
      ...other,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${slug}`,
    },
  };
}

export default async function page({ params }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  const t = await getTranslations("common");

  // If slug is not privacy-policy, show Next.js 404 page
  if (slug !== "privacy-policy") {
    notFound();
  }

  const { data, error, structuredData, lineScripts } = await getData(
    `policy?slug=${slug}`,
    lang,
  );

  if (!data || data.length === 0) {
    return (
      <NoDataState title={t("noPolicyFound")} message={t("noPolicyAvailable")} />
    );
  }

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <PrivacySection data={data} />
    </>
  );
}
