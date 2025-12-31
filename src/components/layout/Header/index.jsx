import { getAPI } from "@/lib/api";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const { data: businessType } = await getAPI("get-businesses");
  const { data: locations } = await getAPI("get-locations");
  const { data: languages } = await getAPI("get-locales");

  return <HeaderClient businessType={businessType} countries={locations} languages={languages} />;
}
