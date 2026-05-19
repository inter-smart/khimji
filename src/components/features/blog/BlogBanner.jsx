import InnerHero from "@/components/common/InnerHero";
import { getTranslations } from "next-intl/server";

export default async function BlogBanner({ bannerData, variant="blog" }) {
  const t = await getTranslations("common");
  return (
    <InnerHero
      coverImage={bannerData?.banner}
      coverImageMobile={bannerData?.banner_mobile}
      alt={bannerData?.banner_alt_text}
      title={bannerData?.banner_title}
      breadCrumb_data={[{ link: { href: "/", label: t("home") } }, { link: { href: `${variant}`, label: t(variant) } }]}
    />
  );
}
