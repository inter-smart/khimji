"use client";

import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import VentureCard from "@/components/common/VentureCard";
import { useState, useEffect } from "react";
import { NoDataState, renderHtml } from "@/lib/helper";
import Image from "@/components/common/ContentImage";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function VentureListingSection({ data, title, context }) {
  const t = useTranslations("venture");
  const { country, business_type } = context;
  const [activeSlug, setActiveSlug] = useState(business_type);
  const [ventures, setVentures] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const perPage = 8;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

  const { lang } = useParams();

  const fetchVentures = async (slug, page) => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(
        `${API_BASE_URL}/api/venture-list?business_slug=${slug}&per_page=${perPage}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Accept-Language": lang,
            "Location-Slug": country,
            "Business-Slug": slug,
          },
        }
      );

      const res = await result.json();
      setVentures(res?.data?.ventures ?? []);
      setPaginationData(res?.data?.pagination ?? null);
    } catch (err) {
      setError(err.message);
      setVentures([]);
      setPaginationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!activeSlug) return;
    fetchVentures(activeSlug, currentPage);
  }, [activeSlug, currentPage, business_type, country, lang]);

  useEffect(() => {
    if (data?.length) {
      const target = business_type;
      const match = target && data.find((item) => item.business_slug === target);
      setActiveSlug(match ? match.business_slug : data[0].business_slug);
    }
  }, [data, business_type, country, lang]);

  const handleTabChange = (slug) => {
    setActiveSlug(slug);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (
      page !== currentPage &&
      page >= 1 &&
      paginationData &&
      page <= paginationData.last_page
    ) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePageNumbers = () => {
    if (!paginationData) return [];

    const { current_page, last_page } = paginationData;
    const pages = [];

    let startPage = Math.max(1, current_page - 2);
    let endPage = Math.min(last_page, current_page + 2);

    if (current_page <= 3) {
      endPage = Math.min(5, last_page);
    }

    if (current_page >= last_page - 2) {
      startPage = Math.max(1, last_page - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (!data || data.length === 0) {
    return <NoDataState title={t("noVenturesFound")} message={t("noVenturesAvailable")} />;
  }

  return (
    <section className="relative py-[40px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[140px]">
      {/* Animated Background Dot */}
      <div className="absolute top-0 bottom-0 left-[70px] 2xl:left-[100px] 3xl:left-[150px] m-auto w-[150px] 2xl:w-[200px] 3xl:w-[245px] h-[150px] 2xl:h-[200px] 3xl:h-[245px] blur-[165px] rounded-full bg-[#2FDDC3] animate-float" />

      <div className="container">
        <Tabs value={activeSlug} onValueChange={handleTabChange} className="w-full mb-[35px]">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-[20px] xl:mb-[30px] 2xl:mb-[50px] 3xl:mb-[70px]">
            <Heading as="h2" size="heading1" className="mb-[10px] sm:!mb-0">
              {title}
            </Heading>

            {/* Tabs Header */}
            <TabsList className="flex items-center  bg-transparent -m-[3px] max-sm:w-full">
              {data?.map((item, index) => (
                <div key={index} className="w-full px-[3px]">
                  <TabsTrigger
                    value={item?.business_slug}
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
            <TabsContent key={index} value={item?.business_slug}>
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
                    {ventures?.map((venture) => (
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

        {!isLoading &&
          !error &&
          ventures.length > 0 &&
          paginationData &&
          paginationData.last_page > 1 && (
            <CustomPagination
              paginationData={paginationData}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageNumbers={generatePageNumbers()}
            />
          )}
      </div>
    </section>
  );
}

function CustomPagination({
  paginationData,
  currentPage,
  onPageChange,
  pageNumbers,
}) {
  const t = useTranslations("venture");
  const { last_page, has_more_pages } = paginationData;

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (has_more_pages && currentPage < last_page) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (e, page) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent className="[--width:25px] 2xl:[--width:30px] 3xl:[--width:35px]">
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={handlePrevious}
            aria-label={t("previousAriaLabel")}
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${currentPage === 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:opacity-50 cursor-pointer"
              }`}
            aria-disabled={currentPage === 1}
          >
            <Image
              src="/images/previous_pagination.svg"
              alt={t("previousPaginationAlt")}
              title={t("previousPaginationAlt")}
              width={35}
              height={35}
              className="w-full h-full object-contain"
            />
          </PaginationLink>
        </PaginationItem>

        {pageNumbers?.map((page) => (
          <PaginationItem key={page} className="mx-[5px] 2xl:mx-[10px]">
            <PaginationLink
              href="#"
              onClick={(e) => handlePageClick(e, page)}
              className={`text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal tracking-[1px] px-[5px] sm:px-[10px] 2xl:px-[15px] transition-all duration-300 relative z-0 ${page === currentPage
                ? "font-semibold bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent before:content-[''] before:w-full before:h-[1px] before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:absolute before:z-1 before:left-0 before:bottom-0"
                : "text-[#919193] hover:text-[#2C8F87]"
                }`}
            >
              {String(page).padStart(2, "0")}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={handleNext}
            aria-label={t("nextAriaLabel")}
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${!has_more_pages || currentPage === last_page
              ? "opacity-30 cursor-not-allowed"
              : "hover:opacity-50 cursor-pointer"
              }`}
            aria-disabled={!has_more_pages || currentPage === last_page}
          >
            <Image
              src="/images/next_pagination.svg"
              alt={t("nextPaginationAlt")}
              title={t("nextPaginationAlt")}
              width={35}
              height={35}
              className="w-full h-full object-contain"
            />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function LoadingState() {
  const t = useTranslations("venture");
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">{t("loadingVentures")}</p>
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
          <svg className="w-[30px] h-[30px] text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-red-600 font-medium mb-2">{t("errorLoadingVentures")}</p>
        <p className="text-[14px] 2xl:text-[16px] text-[#666]">{message}</p>
      </div>
    </div>
  );
}
