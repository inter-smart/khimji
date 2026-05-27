import dynamic from "next/dynamic";
import BannerMobile from "./BannerMobile";

const BannerDesktop = dynamic(() => import("./BannerClient"), {
  ssr: true,
});

export default function BannerSection({ data, country }) {
  return (
    <div>
      <BannerMobile data={data} />
      <BannerDesktop data={data} country={country} />
    </div>
  );
}