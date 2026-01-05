import PrivacySection from "@/components/features/privacy/PrivacySection";
import { getData } from "@/lib/server/api";


export default async function page({params}) {

  const resolvedParams = await params;
  const {lang} = resolvedParams;

  const {data, error} = await getData("policy?slug=privacy-policy", lang);

  if (error) {
    return <div>Error loading data</div>;
  }

  return <PrivacySection data={data} />;
}
