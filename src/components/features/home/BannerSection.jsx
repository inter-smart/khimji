import BannerClient from "./BannerClient";

export default function BannerSection({ data }) {
  return (
    <div>
      <BannerClient data={data} />
    </div>
  );
}
