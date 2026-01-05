import BlogBanner from "@/components/features/blog/BlogBanner";
import BlogList from "@/components/features/blog/BlogList";
import { Suspense } from "react";

const local_data = {
  blogdata: {
    blogList: [
      {
        media: {
          type: "image",
          path: "/images/blog-1.webp",
          alt: "Blog",
        },
        date: "October 13, 2025",
        title: "KR’s Eshraqa Foundation signs six social development agreements for Al Buraimi governorate",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-2.webp",
          alt: "Blog",
        },
        date: "September 16, 2025",
        title: "Khimji Ramdas Launches KRHL, Redefining Heavy Lift Logistics in Oman and Beyond",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-3.webp",
          alt: "Blog",
        },
        date: "September 6, 2025",
        title: "SPAR Oman opens in Al Amerat- Special launch offers available until 6th September",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-4.webp",
          alt: "Blog",
        },
        date: "April 9, 2025",
        title: "SPAR Oman concludes successful ‘SPAR 24 Karat Ramadan: Win Everyday’ campaign",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-5.webp",
          alt: "Blog",
        },
        date: "June 2, 2025",
        title: "Khimji Ramdas Special Projects delivers world-class Indoor Shooting Range ‘Action Point’",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-6.webp",
          alt: "Blog",
        },
        date: "May 5, 2025",
        title: "SPAR Oman opens in Al Amerat- Special launch offers available until 6th September",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-7.webp",
          alt: "Blog",
        },
        date: "March 10 , 2025",
        title: "KR Shipping successfully manages Costa Smeralda’s maiden season",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-8.webp",
          alt: "Blog",
        },
        date: "March 4, 2025",
        title: "KR-Nikon in partnership with Youth Centre concludes annual visual storytelling contest",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-9.webp",
          alt: "Blog",
        },
        date: "January 24, 2025",
        title: "Khimji Ramdas Announces the sale of Pizza Hut Oman Franchise to Americana Restaurants",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-10.webp",
          alt: "Blog",
        },
        date: "October 20, 2024",
        title: "Helping Hands catering secures agreement with Mövenpick Hotels and Apartments Ghala Muscat",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-11.webp",
          alt: "Blog",
        },
        date: "October 8, 2024",
        title:
          "Khimji Ramdas’ Special Projects Division partners with Port of Duqm to enhance maritime safety with state-of-the-art Vessel Traffic System",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-12.webp",
          alt: "Blog",
        },
        date: "June 5, 2024",
        title: "KR Eshraqa’s ‘Tasees Program’ and SMEDA conclude sixth pre-incubation program for startups",
        button: {
          link: "/",
          target: true,
        },
      },
    ],
  },
};

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resollvedSearchParams = await searchParams;
  const { lang } = resolvedParams;

  return (
    <>
      <BlogBanner lang={lang} />
      <Suspense fallback={<LoadingState />}>
        <BlogList lang={lang} searchParams={resollvedSearchParams} />
      </Suspense>
    </>
  );
}

function LoadingState() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">Loading blogs...</p>
      </div>
    </div>
  );
}