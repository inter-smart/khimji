import InnerHero from "@/components/common/InnerHero";
import BoardDirectorSection from "@/components/features/heritage/BoardDirectorSection";
import DrivenSection from "@/components/features/heritage/DrivenSection";
import HeritageSection from "@/components/features/heritage/HeritageSection";

const local_data = {
  driven_section_data: {
    title: "Built on Legacy. <br> Driven by What’s Next.",
    description:
      "With a legacy spanning over 150 years, we continue to evolve with the agility. What began as a father-son trading duo in 1870 has grown into one of Oman’s most trusted and diverse business groups. But for us, it’s not just about how far we’ve come, it’s about where we’re going. That’s why we’re not only rooted in Oman but also spreading our wings across the region with a growing presence in the UAE, Saudi Arabia, and India. It’s this mix of deep roots and global reach that keeps us moving forward with the curiosity of a young enterprise.",
    media: {
      type: "image",
      path: "/images/driven_section.jpg",
      alt: "Driven Section",
    },
    counterList: [
      {
        value: 400,
        symbol: "+",
        label: "BRANDS",
      },
      {
        value: 5,
        symbol: "K+",
        label: "EMPLOYEES",
      },
      {
        value: 40,
        symbol: "+",
        label: "VERTICALS",
      },
      {
        value: 150,
        symbol: "+",
        label: "YEARS",
      },
    ],
  },
  heritage_Section_data: {
    timelineList: [
      {
        year: "1870",
        title: "Founded in Muscat trading house",
        description: "Oman’s earliest trusted business",
      },
      {
        year: "1895",
        title: "Expanded trade to India & Africa",
        description: "Recognized for fair trade",
      },
      {
        year: "1920",
        title: "Expanded into construction & essential",
        description: "Trusted supplier to Oman.",
      },
      {
        year: "1945",
        title: "Post-war expansion",
        description: "Growing regional presence",
      },
      {
        year: "1970",
        title: "Modern era begins",
        description: "Diversification & growth",
      },
    ],
  },
  board_directors_section_data: {
    board_directors: [
      {
        directors_list: [
          {
            name: "Ajay Mathradas",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-1.png",
              alt: "Image",
            },
          },
          {
            name: "Ajay Mathradas",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-2.png",
              alt: "Image",
            },
          },
          {
            name: "Pankaj Kanaksi",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-3.png",
              alt: "Image",
            },
          },
          {
            name: "Nailesh Kanaksi",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-4.png",
              alt: "Image",
            },
          },
          {
            name: "Ajay Mathradas",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-2.png",
              alt: "Image",
            },
          },
        ],
      },
      {
        directors_list: [
          {
            name: "Kanan Anil",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-5.png",
              alt: "Image",
            },
          },
          {
            name: "Hritik Ajay",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-6.png",
              alt: "Image",
            },
          },
          {
            name: "Mihir Ajay",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-7.png",
              alt: "Image",
            },
          },
          {
            name: "Malvika Pankaj",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-8.png",
              alt: "Image",
            },
          },
          {
            name: "Hritik Ajay",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-6.png",
              alt: "Image",
            },
          },
        ],
      },
      {
        directors_list: [
          {
            name: "Kairavi Pankaj",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-9.png",
              alt: "Image",
            },
          },
          {
            name: "Chirayu Nailesh",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-10.png",
              alt: "Image",
            },
          },
          {
            name: "Varun Pankaj",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-11.png",
              alt: "Image",
            },
          },
          {
            name: "Saumya Nailesh",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-12.png",
              alt: "Image",
            },
          },
          {
            name: "Hritik Ajay",
            designation: "Khimji",
            media: {
              type: "image",
              path: "/images/director-6.png",
              alt: "Image",
            },
          },
        ],
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <div className="overflow-hidden">
        <InnerHero
          coverImage="/images/heritage_Inner_banner.webp"
          coverImageMobile="/images/heritage_Inner_banner.webp"
          alt="Heritage Banner"
          title="Oman’s Leading Business <br> Conglomerate"
          breadCrumb_data={[
            { link: { href: "/", label: "Home" } },
            { link: { href: "/heritage", label: "Heritage" } },
          ]}
        />
        <DrivenSection data={local_data?.driven_section_data} />
        <HeritageSection data={local_data?.heritage_Section_data} />
        <BoardDirectorSection data={local_data?.board_directors_section_data} />
      </div>
    </>
  ); 
}
