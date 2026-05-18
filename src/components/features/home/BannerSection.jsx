import dynamic from "next/dynamic";
import BannerMobile from "./BannerMobile";

const BannerDesktop = dynamic(() => import("./BannerClient"), {
  ssr: true,
});

export default function BannerSection({ data }) {
  return (
    <div>
      <BannerMobile data={data} />
      <BannerDesktop data={data} />
    </div>
  );
}