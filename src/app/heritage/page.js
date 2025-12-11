import InnerHero from "@/components/common/InnerHero";

export default function page() {
  return (
    <>
      <InnerHero
        coverImage="/images/heritage_Inner_banner.jpg"
        coverImageMobile="/images/heritage_Inner_banner.jpg"
        alt="Heritage Banner"
        title="Oman’s Leading Business <br> Conglomerate"
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/heritage", label: "Heritage" } },
        ]}
      />
    </>
  );
}
