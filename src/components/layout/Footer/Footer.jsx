import { getAPI } from "@/lib/api";
import FooterClient from "./FooterClient";
import { getData } from "@/lib/server/api";

export default async function Footer({ lang }) {
  const { data: settings } = await getData("site-settings", lang);

  const { brands, site_settings, social_links, locations } = settings;

  return (
    <FooterClient
      lang={lang}
      brands={brands}
      site_settings={site_settings}
      social_links={social_links}
      locations={locations}
    />
  );
}
