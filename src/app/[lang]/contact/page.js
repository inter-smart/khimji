import InnerHero from "@/components/common/InnerHero";
import ContactSection from "@/components/features/contact/ContactSection";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";


export default async function Page({ params }) {
  const resolvedParams = await params;
  const { country } = await getRequestContext();
  const lang = resolvedParams.lang;
  const { data, error } = await getData("contact", lang);

  if (!data || error) {
    return <div>Error loading data</div>;
  }
  const { banner, contact_cms, contact_sectors } = data;

  console.log("Contact Data:", data);

  return (
    <>
      <InnerHero
        coverImage={banner?.banner || "/images/contact_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/contact_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Contact Banner"}
        title={banner?.banner_title || "CONTACT"}
        breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/Contact", label: "Contact" } }]}
      />
      <ContactSection sectors={contact_sectors} cms={contact_cms} lang={lang} key={country} />
    </>
  );
}
