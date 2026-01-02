import { getAPI } from "@/lib/api";
import HeaderClient from "./HeaderClient";

export default async function Header({ lang }) {
  const { data: businessType } = await getAPI("get-businesses");

  return <HeaderClient businessType={businessType} lang={lang} />;
}
