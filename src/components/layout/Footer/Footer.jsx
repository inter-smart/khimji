import { getAPI } from "@/lib/api";
import FooterClient from "./FooterClient";
import { getData } from "@/lib/server/api";

export default function Footer({ lang }) {
  const siteSettingPromise = getData("site-settings", lang);

  return <FooterClient siteSettingPromise={siteSettingPromise} lang={lang} />;
}
