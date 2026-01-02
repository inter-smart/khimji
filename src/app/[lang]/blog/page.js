import InnerHero from "@/components/common/InnerHero";
import BlogListSection from "@/components/features/blog/BlogListSection";
import { getData } from "@/lib/server/api";
import { getRequestContext } from "@/lib/server/getCookieData";

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
        title:
          "KR’s Eshraqa Foundation signs six social development agreements for Al Buraimi governorate",
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
        title:
          "Khimji Ramdas Launches KRHL, Redefining Heavy Lift Logistics in Oman and Beyond",
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
        title:
          "SPAR Oman opens in Al Amerat- Special launch offers available until 6th September",
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
        title:
          "SPAR Oman concludes successful ‘SPAR 24 Karat Ramadan: Win Everyday’ campaign",
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
        title:
          "Khimji Ramdas Special Projects delivers world-class Indoor Shooting Range ‘Action Point’",
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
        title:
          "SPAR Oman opens in Al Amerat- Special launch offers available until 6th September",
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
        title:
          "KR Shipping successfully manages Costa Smeralda’s maiden season",
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
        title:
          "KR-Nikon in partnership with Youth Centre concludes annual visual storytelling contest",
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
        title:
          "Khimji Ramdas Announces the sale of Pizza Hut Oman Franchise to Americana Restaurants",
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
        title:
          "Helping Hands catering secures agreement with Mövenpick Hotels and Apartments Ghala Muscat",
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
        title:
          "KR Eshraqa’s ‘Tasees Program’ and SMEDA conclude sixth pre-incubation program for startups",
        button: {
          link: "/",
          target: true,
        },
      },
    ],
  },
};

export default async function page({params}) {

  const resolvedParams = await params;
  const {lang} = resolvedParams;


  const { country } = await getRequestContext();
  

  const {data:cms} = await getData("blogs", lang);

  const bannerData = cms?.banner;

  return (
    <>
      <InnerHero
        coverImage={bannerData?.banner}
        coverImageMobile={bannerData?.banner_mobile}
        alt={bannerData?.banner_alt_text}
        title={bannerData?.banner_title}
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/blog", label: "Blogs" } },
        ]}
      />
      <BlogListSection lang={lang} country={country}  />
    </>
  );
}
