import InnerHero from "@/components/common/InnerHero";
import ArchiveListingSection from "@/components/features/archives/ArchiveListingSection";

const local_data = {
  archive_listing_section_data: {
    archiveList: [
      {
        id: 1,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_1.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 2,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_2.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 3,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_3.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 4,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_4.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 5,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_5.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 6,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_6.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 7,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_7.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 8,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_8.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 9,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_6.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 10,
        category: "corporate",
        media: {
          type: "image",
          path: "/images/archive_5.jpg",
          alt: "Image",
        },
        title: "CORPORATE",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 11,
        category: "brand",
        media: {
          type: "image",
          path: "/images/archive_3.jpg",
          alt: "Image",
        },
        title: "BRAND",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 12,
        category: "brand",
        media: {
          type: "image",
          path: "/images/archive_4.jpg",
          alt: "Image",
        },
        title: "BRAND",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 13,
        category: "logistics",
        media: {
          type: "image",
          path: "/images/archive_8.jpg",
          alt: "Image",
        },
        title: "LOGISTICS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 14,
        category: "logistics",
        media: {
          type: "image",
          path: "/images/archive_1.jpg",
          alt: "Image",
        },
        title: "LOGISTICS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 15,
        category: "logistics",
        media: {
          type: "image",
          path: "/images/archive_7.jpg",
          alt: "Image",
        },
        title: "LOGISTICS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 16,
        category: "logistics",
        media: {
          type: "image",
          path: "/images/archive_3.jpg",
          alt: "Image",
        },
        title: "LOGISTICS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 17,
        category: "partnership",
        media: {
          type: "image",
          path: "/images/archive_5.jpg",
          alt: "Image",
        },
        title: "PARTNERSHIP",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 18,
        category: "partnership",
        media: {
          type: "image",
          path: "/images/archive_4.jpg",
          alt: "Image",
        },
        title: "PARTNERSHIP",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 19,
        category: "partnership",
        media: {
          type: "image",
          path: "/images/archive_7.jpg",
          alt: "Image",
        },
        title: "PARTNERSHIP",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 20,
        category: "csrCommunity",
        media: {
          type: "image",
          path: "/images/archive_7.jpg",
          alt: "Image",
        },
        title: "CSR & COMMUNITY",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 21,
        category: "csrCommunity",
        media: {
          type: "image",
          path: "/images/archive_6.jpg",
          alt: "Image",
        },
        title: "CSR & COMMUNITY",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 22,
        category: "csrCommunity",
        media: {
          type: "image",
          path: "/images/archive_3.jpg",
          alt: "Image",
        },
        title: "CSR & COMMUNITY",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 23,
        category: "awards",
        media: {
          type: "image",
          path: "/images/archive_2.jpg",
          alt: "Image",
        },
        title: "AWARDS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 24,
        category: "awards",
        media: {
          type: "image",
          path: "/images/archive_8.jpg",
          alt: "Image",
        },
        title: "AWARDS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 25,
        category: "awards",
        media: {
          type: "image",
          path: "/images/archive_5.jpg",
          alt: "Image",
        },
        title: "AWARDS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 26,
        category: "publicEvent",
        media: {
          type: "image",
          path: "/images/archive_2.jpg",
          alt: "Image",
        },
        title: "PUBLIC & EVENTS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 27,
        category: "publicEvent",
        media: {
          type: "image",
          path: "/images/archive_4.jpg",
          alt: "Image",
        },
        title: "PUBLIC & EVENTS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
      {
        id: 28,
        category: "publicEvent",
        media: {
          type: "image",
          path: "/images/archive_4.jpg",
          alt: "Image",
        },
        title: "PUBLIC & EVENTS",
        date: "20 July 2025",
        location: "Muscat, Oman",
        year: "20 Years Service Awards",
        button: {
          link: "https://youtu.be/GTAe3KgLEuU",
          target: true,
          label: "https://youtu.be/GTAe3KgLEuU",
        },
      },
    ],
    paginationList: {
      pages: [1, 2, 3],
      active: 1,
    },
  },
};

export default function page() {
  return (
    <>
      <InnerHero
        coverImage="/images/archive_innerbanner.jpg"
        coverImageMobile="/images/archive_innerbanner.jpg"
        alt="Archive Banner"
        title="Archives"
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/heritage", label: "Archives" } },
        ]}
      />
      <ArchiveListingSection data={local_data?.archive_listing_section_data} />
    </>
  );
}
