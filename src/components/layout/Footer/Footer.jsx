import { getData } from "@/lib/server/api";
import FooterClient from "./FooterClient";



export default async function Footer({ lang }) {
  const siteSettingPromise = await getData("site-settings", lang);

  console.log("siteSettingPromise", siteSettingPromise)
  return <FooterClient siteSettingPromise={siteSettingPromise} lang={lang} />;
}