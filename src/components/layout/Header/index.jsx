import HeaderClient from "./HeaderClient";
import { getData } from "@/lib/server/api";

export default function Header({ lang }) {
  const businessTypePromise = getData("get-businesses");
  const locationsPromise = getData("get-locations");

  return <HeaderClient businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} lang={lang} />;
}
