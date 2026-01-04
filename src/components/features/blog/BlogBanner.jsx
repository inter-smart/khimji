import InnerHero from "@/components/common/InnerHero";
import { getData } from "@/lib/server/api";

export default async function BlogBanner({ lang }) {
  const { data: cms } = await getData("blogs", lang);

  const bannerData = cms?.banner;

  return (
    <InnerHero
      coverImage={bannerData?.banner}
      coverImageMobile={bannerData?.banner_mobile}
      alt={bannerData?.banner_alt_text}
      title={bannerData?.banner_title}
      breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/blog", label: "Blogs" } }]}
    />
  );
}
