import DynamicMeta from "@/components/layout/DynamicMeta";
import { parseOtherMeta } from "@/lib/helper";
import { getData } from "@/lib/server/api";
import { DefaultOgImage } from "@/lib/server/constants";
import dynamic from "next/dynamic";
import NotFound from "../not-found";

const PrivacySection = dynamic(() => import("@/components/features/privacy/PrivacySection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const { data, error } = await getData("policy?slug=privacy-policy", lang);

  // Handle error or missing data
  if (error || !data) {
    return {
      title: "Policy Not Found",
      description: "The requested policy page could not be found.",
    };
  }

  const { meta_title, meta_description, other_meta_tags, meta_keywords, title } = data;
  const { other } = parseOtherMeta(other_meta_tags);

  return {
    title: meta_title || title || "Policy",
    description: meta_description || "View our policy details",
    keywords: meta_keywords || "",

    // Enhanced SEO fields
    openGraph: {
      title: meta_title || title || "Policy",
      description: meta_description || "View our policy details",
      images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/policies/privacy-policy`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/policies/privacy-policy`,
    },
  };
}

export default async function page({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const { data, error, structuredData, lineScripts } = await getData("policy?slug=privacy-policy", lang);

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <PrivacySection data={data} />
    </>
  );
}
