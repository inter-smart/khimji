"use client";

import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VentureCard from "@/components/common/VentureCard";
import { useState, useEffect } from "react";
import { renderHtml } from "@/lib/helper";
import { useParams } from "next/navigation";

// Ventures data array
// const corporateVentures = [
//   {
//     id: 1,
//     video: "/videos/venture-1.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Logistics & Shipping",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 2,
//     video: "/videos/venture-2.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Construction & Building Solutions",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 3,
//     video: "/videos/venture-1.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Engineering & Energy Solutions",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 4,
//     video: "/videos/venture-2.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Marine Services & Equipment",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 5,
//     video: "/videos/venture-1.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Special Projects",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 6,
//     video: "/videos/venture-2.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Hospitality",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 7,
//     video: "/videos/venture-1.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Information Technology",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
//   {
//     id: 8,
//     video: "/videos/venture-2.mp4",
//     mobileImage: "/images/vetureCard-1.jpg",
//     title: "Warehousing & Distribution",
//     description:
//       "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
//     logos: [
//       "/images/ship-1.png",
//       "/images/ship-2.png",
//       "/images/ship-3.png",
//       "/images/ship-4.png",
//     ],
//   },
// ];

// const consumerVentures = [
//   // Add consumer ventures data here if needed
// ];

export default function VentureListingSection({ data, title, context }) {
  const [activeSlug, setActiveSlug] = useState(data?.[0]?.slug);
  const [ventures, setVentures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
  const { country, business_type } = context;

  const { lang } = useParams();

  const fetchVentures = async (slug) => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(
        `${API_BASE_URL}/api/venture-list?category_slug=${slug}&per_page=8&page=1`,
        {
          method: "GET",
          headers: {
            "Accept-Language": lang,
            country: country,
            business_type: business_type,
          },
        }
      );

      // if (result?.status && result.data) {
      const data = await result.json();
      setVentures(data?.data || []);

      // }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVentures(activeSlug);
  }, [activeSlug]);

  return (
    <section className="relative py-[40px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[140px]">
      {/* Animated Background Dot */}
      <div className="absolute top-0 bottom-0 left-[70px] 2xl:left-[100px] 3xl:left-[150px] m-auto w-[150px] 2xl:w-[200px] 3xl:w-[245px] h-[150px] 2xl:h-[200px] 3xl:h-[245px] blur-[165px] rounded-full bg-[#2FDDC3] animate-float" />

      <div className="container">
        <Tabs
          defaultValue={data[0]?.slug}
          onValueChange={(value) => setActiveSlug(value)}
          className="w-full mb-[35px ]"
        >
          <div className="flex flex-wrap justify-between items-center gap-2 mb-[20px] xl:mb-[30px] 2xl:mb-[50px] 3xl:mb-[70px]">
            <Heading as="h2" size="heading1" className="mb-[10px] sm:!mb-0">
              {title}
            </Heading>

            {/* Tabs Header */}
            <TabsList className="flex items-center  bg-transparent -m-[3px] max-sm:w-full">
              {data?.map((item, index) => (
                <div key={index} className="w-1/2 px-[3px]">
                  <TabsTrigger
                    value={item?.slug}
                    onClick={() => setActiveSlug(item.slug)}
                    className=" w-full
                  text-[11px] xs:text-[16px]
                  border border-[#2E8B8B]
                  cursor-pointer
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-[#0B436A]
                  data-[state=active]:to-[#299B8A]
                  data-[state=active]:text-white
                  data-[state=inactive]:text-[#000000]
                  rounded-none py-2 px-3 font-medium"
                  >
                    {item?.title}
                  </TabsTrigger>
                </div>
              ))}

              {/* 
              <div className="w-1/2 px-[3px]">
                <TabsTrigger
                  value="consumer"
                  className="w-full
                  text-[11px] xs:text-[16px]
                  border border-[#2E8B8B]
                  cursor-pointer
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-[#0B436A]
                  data-[state=active]:to-[#299B8A]
                  data-[state=active]:text-white
                  data-[state=inactive]:text-[#000000]
                  rounded-none py-2 px-3  font-medium "  >
                  CONSUMER ORIENTED
                </TabsTrigger>
              </div> */}
            </TabsList>
          </div>

          {data?.map((item, index) => (
            <TabsContent key={index} value={item?.slug}>
              {isLoading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={error} />
              ) : ventures.length === 0 ? (
                <NoDataState />
              ) : (
                <div>
                  <div className="mb-[20px] 2xl:mb-[40px] 3xl:mb-[60px]">
                    <div
                      className="text-[16px] md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-medium bg-gradient-to-r from-[#0B436A]
                to-[#299B8A] from-[30%] to-[100%] bg-clip-text text-transparent
                uppercase tracking-wide !mb-[10px] 2xl:!mb-[10px] 3xl:!mb-[15px] w-fit"
                    >
                      {item?.title}
                    </div>
                    <div>{renderHtml(item?.description)}</div>
                  </div>
                  <div className="flex flex-wrap -m-[5px] lg:-m-[10px] 3xl:-m-[15px]">
                    {ventures?.ventures?.map((venture) => (
                      <Link
                        href={`/${lang}/venture/${venture?.slug}`}
                        key={venture?.id}
                        className="w-full sm:w-1/2 p-[5px]  lg:p-[10px] 3xl:p-[15px]"
                      >
                        <VentureCard item={venture} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}

          {/* 
          <TabsContent value="consumer" >
            <div className="mb-[20px] 2xl:mb-[40px] 3xl:mb-[60px]">
              <div className="text-[16px] md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-medium bg-gradient-to-r from-[#0B436A]
                to-[#299B8A] from-[30%] to-[100%] bg-clip-text text-transparent
                uppercase tracking-wide !mb-[10px] 2xl:!mb-[10px] 3xl:!mb-[15px]">
                Corporate Oriented
              </div>
              <p>Khimji Ramdas drives growth across Retail, Infrastructure, Logistics, Lifestyle, and Travel. Through strong joint ventures and international presence, we connect markets and enrich communities</p>
            </div>
            <div className="flex flex-wrap -m-[5px] lg:-m-[10px] 3xl:-m-[15px]">
              {consumerVentures.map((venture) => (
                <div key={venture.id} className="w-full sm:w-1/2 p-[5px]  lg:p-[10px] 3xl:p-[15px]">
                  <VentureCard item={venture} />
                </div>
              ))}
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">
          Loading ventures...
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[60px] h-[60px] bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-[30px] h-[30px] text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-red-600 font-medium mb-2">
          Error Loading Ventures
        </p>
        <p className="text-[14px] 2xl:text-[16px] text-[#666]">{message}</p>
      </div>
    </div>
  );
}

function NoDataState() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[60px] h-[60px] bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-[30px] h-[30px] text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666] font-medium mb-2">
          No Ventures Found
        </p>
        <p className="text-[14px] 2xl:text-[16px] text-[#999]">
          There are no ventures available for this category.
        </p>
      </div>
    </div>
  );
}
