import { NextResponse } from "next/server";

const DUMMY_BLOG = [
  {
    id: 1,
    title: "Leadership Excellence Program",
    slug: "leadership-excellence-program",
    published_on: "2026-01-02",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 2,
    title: "Driving Innovation Across Ventures",
    slug: "driving-innovation-across-ventures",
    published_on: "2026-01-01",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 3,
    title: "Promotions Coordinators",
    slug: "promotions-coordinators",
    published_on: "2026-01-02",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 4,
    title: "Sustainability in Modern Enterprises",
    slug: "sustainability-in-modern-enterprises",
    published_on: "2025-12-30",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 5,
    title: "Financial Growth Strategies 2026",
    slug: "financial-growth-strategies-2026",
    published_on: "2025-12-28",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 6,
    title: "Digital Transformation Roadmap",
    slug: "digital-transformation-roadmap",
    published_on: "2025-12-26",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 7,
    title: "Corporate Culture & Values",
    slug: "corporate-culture-and-values",
    published_on: "2025-12-24",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 8,
    title: "Women in Leadership",
    slug: "women-in-leadership",
    published_on: "2025-12-22",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 9,
    title: "Technology Trends Shaping 2026",
    slug: "technology-trends-shaping-2026",
    published_on: "2025-12-20",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 10,
    title: "Heritage & Legacy of Khimji Ramdas",
    slug: "heritage-and-legacy-of-khimji-ramdas",
    published_on: "2025-12-18",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 11,
    title: "Customer-Centric Business Models",
    slug: "customer-centric-business-models",
    published_on: "2025-12-16",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 12,
    title: "Building High-Performance Teams",
    slug: "building-high-performance-teams",
    published_on: "2025-12-14",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 13,
    title: "Future of Work Environments",
    slug: "future-of-work-environments",
    published_on: "2025-12-12",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 14,
    title: "Strategic Partnerships & Growth",
    slug: "strategic-partnerships-and-growth",
    published_on: "2025-12-10",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
  {
    id: 15,
    title: "Annual Business Highlights 2025",
    slug: "annual-business-highlights-2025",
    published_on: "2025-12-08",
    thumbnail_image: "https://www.khimji-ramdas.dev5.intersmarthosting.in/storage/117/venture-log1.webp",
    image_alt_text: "",
  },
];

export async function GET(perPage, page) {
  try {
    // Calculate pagination
    const total = DUMMY_BLOG.length;
    const lastPage = Math.ceil(total / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    // Get paginated archives
    const paginatedArchives = DUMMY_BLOG.slice(startIndex, endIndex);

    // Simulate API delay (optional - remove in production)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return response in the expected format
    return NextResponse.json({
      data: {
        blogs: paginatedArchives,
        pagination: {
          total: total,
          per_page: perPage,
          current_page: page,
          last_page: lastPage,
          has_more_pages: page < lastPage,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch archives",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
