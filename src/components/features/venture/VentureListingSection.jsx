"use client";

import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VentureCard from "@/components/common/VentureCard";
import { useState, useEffect } from "react";
import { NoDataState, renderHtml } from "@/lib/helper";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function VentureListingSection({ data, title, context }) {
  const t = useTranslations("venture");
  const [activeSlug, setActiveSlug] = useState();
  const [ventures, setVentures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
  const { country, business_type } = context;

  const { lang } = useParams();

  const BUSINESS_SLUG_MAP = { b2b: "corporate-oriented", b2c: "consumer-oriented" };

  const SLUG_TO_BUSINESS = { "corporate-oriented": "b2b", "consumer-oriented": "b2c" };

  const fetchVentures = async (slug) => {
    if (!slug) return;

    const businessType = SLUG_TO_BUSINESS[slug] ?? business_type;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(
        `${API_BASE_URL}/api/venture-list?category_slug=${slug}&per_page=66&page=1`,
        {
          method: "GET",
          headers: {
            "Accept-Language": lang,
            "Location-Slug": country,
            "Business-Slug": businessType,
          },
        }
      );

      const data = await result.json();
      setVentures(data?.data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!activeSlug) return;
    fetchVentures(activeSlug);
  }, [activeSlug, business_type, country, lang]);


  useEffect(() => {
    if (data?.length) {
      const target = BUSINESS_SLUG_MAP[business_type];
      const match = target && data.find((item) => item.slug === target);
      setActiveSlug(match ? match.slug : data[0].slug);
    }
  }, [data, business_type, country, lang]);


  if (!data || data.length === 0) {
    return <NoDataState title={t("noVenturesFound")} message={t("noVenturesAvailable")} />;
  }

  return (
    <section className="relative py-[40px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[140px]">
      {/* Animated Background Dot */}
      <div className="absolute top-0 bottom-0 left-[70px] 2xl:left-[100px] 3xl:left-[150px] m-auto w-[150px] 2xl:w-[200px] 3xl:w-[245px] h-[150px] 2xl:h-[200px] 3xl:h-[245px] blur-[165px] rounded-full bg-[#2FDDC3] animate-float" />

      <div className="container">
        <Tabs
          value={activeSlug}
          onValueChange={setActiveSlug}
          className="w-full mb-[35px ]"
        >
          <div className="flex flex-wrap justify-between items-center gap-2 mb-[20px] xl:mb-[30px] 2xl:mb-[50px] 3xl:mb-[70px]">
            <Heading as="h2" size="heading1" className="mb-[10px] sm:!mb-0">
              {title}
            </Heading>

            {/* Tabs Header */}
            <TabsList className="flex items-center  bg-transparent -m-[3px] max-sm:w-full">
              {data?.map((item, index) => (
                <div key={index} className="w-full px-[3px]">
                  <TabsTrigger
                    value={item?.slug}
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

            </TabsList>
          </div>

          {data?.map((item, index) => (
            <TabsContent key={index} value={item?.slug}>
              {isLoading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={error} />
              ) : ventures.length === 0 ? (
                <NoDataState title={t("noVenturesFound")} message={t("noVenturesForCategory")} />
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
                    {renderHtml(item?.description)}
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
        </Tabs>
      </div>
    </section>
  );
}

function LoadingState() {
  const t = useTranslations("venture");
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">
          {t("loadingVentures")}
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  const t = useTranslations("venture");
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
          {t("errorLoadingVentures")}
        </p>
        <p className="text-[14px] 2xl:text-[16px] text-[#666]">{message}</p>
      </div>
    </div>
  );
}


