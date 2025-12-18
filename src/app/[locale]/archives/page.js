import InnerHero from "@/components/common/InnerHero";
import ArchiveListingSection from "@/components/features/archives/ArchiveListingSection";

export default function page() {
  return (
    <>
      <InnerHero
        coverImage="/images/archive_innerbanner.jpg"
        coverImageMobile="/images/archive_innerbanner.jpg"
        alt="Archive Banner"
        title="Archives"
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/heritage", label: "Archives" } },
        ]}
      />
      <ArchiveListingSection />
    </>
  );
}
