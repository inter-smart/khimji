import { getData } from "@/lib/server/api";
import ContactTabs from "./ContactTabs";

export default async function ContactDetail({ sectors, lang }) {
  const sectorResults = await Promise.all(
    sectors?.map(async (sector) => {
      const res = await getData(`contact-list?sector_id=${sector.id}`, lang);

      return {
        sectorId: sector.id,
        categories: res?.data?.categories || [],
      };
    })
  );

  const initialContactData = sectorResults.reduce((acc, item) => {
    acc[item.sectorId] = item.categories;
    return acc;
  }, {});

  return <ContactTabs sectors={sectors} contactData={initialContactData} />;
}
