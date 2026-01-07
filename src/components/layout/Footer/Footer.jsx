import { getData } from "@/lib/server/api";
import FooterClient from "./FooterClient";


export default function Footer({ lang }) {
  const siteSettingPromise = getData("site-settings", lang);

  return <FooterClient siteSettingPromise={siteSettingPromise} lang={lang} />;
}