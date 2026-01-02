import VendordetailsSection from "@/components/features/venture/VendordetailsSection";
import { getData } from "@/lib/server/api";

const logisticsDetailData = {
  title: "Logistics & Shipping",

  breadcrumb: [
    { link: { href: "/", label: "Home" } },
    { link: { href: "/ventures", label: "Ventures" } },
    {
      link: {
        href: "/ventures/logistics-shipping",
        label: "Logistics & Shipping",
      },
    },
  ],

  hero: {
    type: "video",
    src: "/videos/ventureDetail-1.mp4",
  },
  tagline: "We move the world for you.",

  description:
    "Whether it’s one box or a whole operation, we move it with care, clarity, and a whole lot of coordination. For us, it’s never just freight, it’s your plans, your progress, your promise. With a global network and partnerships with top local and international logistics players, we make sure those promises travel smoothly.",

  services: [
    {
      id: 1,
      image: "/images/venture-detl-1.jpg",
      title: "Freight Solutions",
      subtitle: "We Handle Freight Like It’s Our Own.",
      content:
        "From port to port and door to door, our freight solutions cover sea, air, and land with precision, reliability, and complete transparency.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 2,
      image: "/images/venture-detl-2.jpg",
      title: "Project & Event Logistics",
      subtitle: "Behind Every Great Event Is Seamless Logistics.",
      content:
        "Whether it’s exhibitions, concerts, or large-scale corporate events, we manage complex logistics so everything arrives on time and in perfect condition.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 3,
      image: "/images/venture-detl-3.jpg",
      title: "Husbandry Services",
      subtitle: "Total Care for Crew & Vessels.",
      content:
        "We provide comprehensive husbandry services ensuring vessels, crew, and operations are supported efficiently while in port.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 4,
      image: "/images/venture-detl-4.jpg",
      title: "Project Cargo",
      subtitle: "Complex Cargo, Handled with Confidence.",
      content:
        "Oversized and heavy cargo movements require expertise. Our team plans and executes each stage with precision and safety at the core.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 5,
      image: "/images/venture-detl-5.jpg",
      title: "KRL",
      subtitle: "Moving with Precision.",
      content:
        "Specialized transportation solutions designed for critical and high-value cargo, delivered with unmatched reliability.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 6,
      image: "/images/venture-detl-6.jpg",
      title: "Inland Logistics",
      subtitle: "Because the Last Mile Matters.",
      content:
        "From ports to final destinations, our inland logistics services ensure smooth, efficient, and timely cargo movement.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 7,
      image: "/images/venture-detl-7.jpg",
      title: "Air Cargo",
      subtitle: "For When Speed Is Non-Negotiable.",
      content:
        "Fast, secure, and reliable air cargo solutions for time-sensitive shipments across global destinations.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 8,
      image: "/images/venture-detl-8.jpg",
      title: "Vessel Services",
      subtitle: "Supporting Ships Beyond the Shore.",
      content:
        "Complete vessel support services ensuring smooth port calls, operational efficiency, and regulatory compliance.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
    {
      id: 9,
      image: "/images/venture-detl-9.jpg",
      title: "Relocation Services",
      subtitle: "From One Home to the Next, Smoothly.",
      content:
        "Professional relocation solutions designed to make moving personal or corporate assets simple, safe, and stress-free.",
      logo: "/images/venture-log1.png",
      link: "#",
    },
  ],
};

export default async function Page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, lang } = resolvedParams;

  const { data } = await getData(`venture-details?slug=${slug}`, lang);

    if (!data) {
     return <div>Error loading data</div>;
   }
  return (
    <VendordetailsSection
      breadCrumb_data={[
        { href: "/", label: "Home" },
        { href: "/ventures", label: "Ventures" },
        {
          href: `/ventures/${slug}`,
          label: data?.title,
        },
      ]}
      pageData={data}
    />
  );
}
