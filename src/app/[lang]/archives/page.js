import InnerHero from "@/components/common/InnerHero";
import ArchiveListingSection from "@/components/features/archives/ArchiveListingSection";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";



export default async function Page({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const { country } = await getRequestContext();

  const { data, error } = await getData("archives", lang);

  if (error || !data) {
    // Fallback to local data in case of error
    return <div>Error loading data</div>;
  }

  const { banner, archive_categories } = data;

  return (
    <>
      <InnerHero
        coverImage={banner?.banner || "/images/archive_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/archive_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Archive Banner"}
        title={banner?.banner_title || "Archives"}
        breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/heritage", label: "Archives" } }]}
      />
      <ArchiveListingSection key={country} categories={archive_categories} lang={lang} country={country} />
    </>
  );
}
