import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

const InnerHero = dynamic(() => import("@/components/common/InnerHero"));
const ContactSection = dynamic(() => import("@/components/features/contact/ContactSection"));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("contact", lang, "contact");

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { country } = await getRequestContext();
  const lang = resolvedParams.lang;
  setRequestLocale(lang);
  const { data, error, structuredData, lineScripts } = await getData("contact", lang);
  const t = await getTranslations("common");

  if (!data || error) {
    notFound();
  }
  const { banner, contact_cms, contact_sectors } = data;

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      <InnerHero
        coverImage={banner?.banner || "/images/contact_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/contact_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Contact Banner"}
        title={banner?.banner_title || "CONTACT"}
        breadCrumb_data={[
          { link: { href: `/${lang}`, label: t("home") } },
          { link: { href: "/Contact", label: t("contact") } },
        ]}
      />
      <ContactSection sectors={contact_sectors} cms={contact_cms} lang={lang} key={country} />
    </>
  );
}
