import InnerHero from "@/components/common/InnerHero";

export default async function BlogBanner({ bannerData }) {
  return (
    <InnerHero
      coverImage={bannerData?.banner}
      coverImageMobile={bannerData?.banner_mobile}
      alt={bannerData?.banner_alt_text}
      title={bannerData?.banner_title}
      breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/blog", label: "Blog" } }]}
    />
  );
}
