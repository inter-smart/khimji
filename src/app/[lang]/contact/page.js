import DynamicMeta from "@/components/layout/DynamicMeta";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";
import { getMetaData } from "@/lib/server/metaApi";
import dynamic from "next/dynamic";
import Script from "next/script";

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
  const { data, error, structuredData } = await getData("contact", lang);

  console.log("DATT", structuredData);

  if (!data || error) {
    return <div>Error loading data</div>;
  }
  const { banner, contact_cms, contact_sectors } = data;

  return (
    <>
      {structuredData &&
        structuredData.map((schema, index) => (
          <Script
            id={`schema-${index}`}
            key={index}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <InnerHero
        coverImage={banner?.banner || "/images/contact_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/contact_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Contact Banner"}
        title={banner?.banner_title || "CONTACT"}
        breadCrumb_data={[
          { link: { href: `/${lang}`, label: lang === "en" ? "Home" : "بيت" } },
          { link: { href: "/Contact", label: lang === "en" ? "Contact" : "اتصال" } },
        ]}
      />
      <ContactSection sectors={contact_sectors} cms={contact_cms} lang={lang} key={country} />
    </>
  );
}
