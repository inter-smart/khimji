import { getAPI } from "@/lib/api";
import HeaderClient from "./HeaderClient";
import { getData } from "@/lib/server/api";

export default async function Header({ lang }) {
  const { data: businessType } = await getData("get-businesses");
  const { data: countries } = await getData("get-locations", lang);


  return (
    <HeaderClient
      businessType={businessType}
      lang={lang}
      countries={countries}
    />
  );
}
