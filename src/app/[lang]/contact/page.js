import InnerHero from "@/components/common/InnerHero";
import ContactSection from "@/components/features/contact/ContactSection";
import { fetchFromAPIII, getAPI } from "@/lib/api";
import { getData } from "@/lib/server/api";
import { cookies } from "next/headers";

const local_data = {
  contact_section_data: {
    contact_Info: {
      title: "CORPORATE OFFICE",
      address: "PO Box 19, Muscat 100 <br> Sultanate of Oman",
      telephone_number: "(+968) 24765500",
      fax_number: "(+968) 24795988",
      button: {
        link: "/",
        target: false,
        label: "View location on map",
      },
    },
    contact_detail: {
      title: "CONTACT DETAILS",
      contact_detail_tabs: [
        {
          id: 1,
          key: "Consumer Products & Retail",
          label: "Consumer Products & Retail ",
          contact_list: [
            {
              id: 1,
              title: "CONSTRUCTION SOLUTIONS",
              items_list: [
                {
                  id: 1,
                  title: "Building Materials",
                  address: "PO Box 19, Muscat 100 Sultanate <br> of Oman",
                  telephone_number: "(+968) 24765500",
                  fax_number: "(+968) 24795988",
                  email: "bmd@kr.om",
                },
                {
                  id: 2,
                  title: "Electrical",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Construction",
                  address: "KR Infra Office, Ghala",
                  telephone_number: " (+968) 22336288",
                  fax_number: "(+968) 22336566",
                  email: "s.sharma@kr.om",
                },
              ],
            },
            {
              id: 2,
              title: "HEAT TRANSFER SOLUTIONS",
              items_list: [
                {
                  id: 1,
                  title: "Air Conditioning, Refrigeration & Appliances",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "acd.sales@kr.om",
                },
                {
                  id: 2,
                  title: "Building Management System",
                  address: "KR Infra Office, Ghala",
                  telephone_number: " (+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Chillers-& Cooling Tower/AHU",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336288",
                  fax_number: " (+968) 22336566",
                  email: "s.sharma@kr.om",
                },
                {
                  id: 4,
                  title: "Boilers",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336288",
                  fax_number: " (+968) 22336566",
                  email: "s.sharma@kr.om",
                },
                {
                  id: 5,
                  title: "Solar",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "acd.sales@kr.om",
                },
                {
                  id: 6,
                  title: "Energy Audits",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
              ],
            },
            {
              id: 3,
              title: "ENVIRONMENTAL SERVICES",
              items_list: [
                {
                  id: 1,
                  title: "Al Ahlia Environmental Services",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "acd.sales@kr.om",
                },
                {
                  id: 2,
                  title: "Water Treatment",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Effluent Treatment Plant",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336288",
                  fax_number: " (+968) 22336566",
                  email: "s.sharma@kr.om",
                },
              ],
            },
            {
              id: 4,
              title: "GENERAL INDUSTRIAL",
              items_list: [
                {
                  id: 1,
                  title: "Industrial Workshops",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "acd.sales@kr.om",
                },
                {
                  id: 2,
                  title: "Oil & Gas",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Mining",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336288",
                  fax_number: " (+968) 22336566",
                  email: "s.sharma@kr.om",
                },
              ],
            },
            {
              id: 5,
              title: "MARINE SOLUTIONS",
              items_list: [
                {
                  id: 1,
                  title: "Marine Infrastructure Unit",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
                {
                  id: 2,
                  title: "Ship Repair Unit",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "s.taly@kr.om",
                },
              ],
            },
            {
              id: 6,
              title: "ICT SOLUTIONS",
              items_list: [
                {
                  id: 1,
                  title: "Information & Communication Technology",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
              ],
            },
            {
              id: 7,
              title: "HOSPITALITY INFRASTRUCTURE",
              items_list: [
                {
                  id: 1,
                  title: "Interior fit-outs & Furniture",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
                {
                  id: 2,
                  title: "Kitchen & Laundry",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
                {
                  id: 3,
                  title: "Sports & Fitness",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
              ],
            },
            {
              id: 8,
              title: "TRANSPORT SOLUTIONS",
              items_list: [
                {
                  id: 1,
                  title: "Interior fit-outs & Furniture",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
                {
                  id: 2,
                  title: "Kitchen & Laundry",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
                {
                  id: 3,
                  title: "Sports & Fitness",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336060",
                  fax_number: "(+968) 22336006 / 24115707",
                  email: "bs.kannan@kr.om",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          key: " Infrastructure",
          label: " Infrastructure",
          contact_list: [
            {
              id: 1,
              title: "HEAT TRANSFER SOLUTIONS (INFRA)",
              items_list: [
                {
                  id: 1,
                  title: "Building Materials",
                  address: "PO Box 19, Muscat 100 Sultanate <br> of Oman",
                  telephone_number: "(+968) 24765500",
                  fax_number: "(+968) 24795988",
                  email: "bmd@kr.om",
                },
                {
                  id: 2,
                  title: "Electrical",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Construction",
                  address: "KR Infra Office, Ghala",
                  telephone_number: " (+968) 22336288",
                  fax_number: "(+968) 22336566",
                  email: "s.sharma@kr.om",
                },
              ],
            },
          ],
        },
        {
          key: "Lifestyle",
          label: "Lifestyle",
          contact_list: [
            {
              id: 1,
              title: "HEAT TRANSFER SOLUTIONS (LIFESTYLE)",
              items_list: [
                {
                  id: 1,
                  title: "Building Materials",
                  address: "PO Box 19, Muscat 100 Sultanate <br> of Oman",
                  telephone_number: "(+968) 24765500",
                  fax_number: "(+968) 24795988",
                  email: "bmd@kr.om",
                },
                {
                  id: 2,
                  title: "Electrical",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Construction",
                  address: "KR Infra Office, Ghala",
                  telephone_number: " (+968) 22336288",
                  fax_number: "(+968) 22336566",
                  email: "s.sharma@kr.om",
                },
              ],
            },
          ],
        },
        {
          key: " Projects & Logistics ",
          label: " Projects & Logistics ",
          contact_list: [
            {
              id: 1,
              title: "HEAT TRANSFER SOLUTIONS (LOGISTICS)",
              items_list: [
                {
                  id: 1,
                  title: "Building Materials",
                  address: "PO Box 19, Muscat 100 Sultanate <br> of Oman",
                  telephone_number: "(+968) 24765500",
                  fax_number: "(+968) 24795988",
                  email: "bmd@kr.om",
                },
                {
                  id: 2,
                  title: "Electrical",
                  address: "KR Infra Office, Ghala",
                  telephone_number: "(+968) 22336251",
                  fax_number: "(+968) 22336299",
                  email: "nk1.alsiyabi@kr.om",
                },
                {
                  id: 3,
                  title: "Construction",
                  address: "KR Infra Office, Ghala",
                  telephone_number: " (+968) 22336288",
                  fax_number: "(+968) 22336566",
                  email: "s.sharma@kr.om",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const { data, error } = await getData("contact", lang);

  if (!data || error) {
    return <div>Error loading data</div>;
  }
  const { banner, contact_cms, contact_sectors } = data;

  console.log("Contact Data:", data);

  return (
    <>
      <InnerHero
        coverImage={banner?.banner || "/images/contact_innerbanner.jpg"}
        coverImageMobile={banner?.banner_mobile || "/images/contact_innerbanner.jpg"}
        alt={banner?.banner_alt_text || "Contact Banner"}
        title={banner?.banner_title || "CONTACT"}
        breadCrumb_data={[{ link: { href: "/", label: "Home" } }, { link: { href: "/Contact", label: "Contact" } }]}
      />
      <ContactSection sectors={contact_sectors} cms={contact_cms} />
    </>
  );
}
