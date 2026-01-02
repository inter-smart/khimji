import { getAPI } from "@/lib/api";
import HeaderClient from "./HeaderClient";

export default function Header({ lang }) {
  const businessTypePromise = getAPI("get-businesses");
  const locationsPromise = getAPI("get-locations");

  return <HeaderClient businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} lang={lang} />;
}
