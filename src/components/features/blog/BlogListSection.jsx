"use client";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import BlogCard from "@/components/common/BlogCard";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function BlogListSection({ lang, country }) {
  const t = useTranslations("blog");
  const [paginationData, setPaginationData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const perPage = 12;

  const fetchBlogs = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog-list?per_page=${perPage}&page=${page}`,
        {
          headers: {
            "Accept-Language": lang,
            "Location-Slug": country,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch archive data");
      }

      const result = await response.json();

      if (result?.data) {
        setBlogs(result.data.blogs || []);
        setPaginationData(result.data.pagination || null);
      }
    } catch (err) {
      setError(err.message);
      setBlogs([]);
      setPaginationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePageNumbers = () => {
    if (!paginationData) return [];

    const { current_page, last_page } = paginationData;
    const pages = [];

    // Show max 5 pages
    let startPage = Math.max(1, current_page - 2);
    let endPage = Math.min(last_page, current_page + 2);

    // Adjust if at the start
    if (current_page <= 3) {
      endPage = Math.min(5, last_page);
    }

    // Adjust if at the end
    if (current_page >= last_page - 2) {
      startPage = Math.max(1, last_page - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
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

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, lang, country]);

  return (
    <section className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[60px_70px] 2xl:py-[70px_90px] 3xl:py-[90px_115px] overflow-hidden block relative z-0">
      <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] opacity-40 pointer-events-none absolute -z-1 inset-[5%_0_auto_auto]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] opacity-40 pointer-events-none absolute -z-1 inset-[15%_auto_auto_-10%]"></div>
      <div className="container">
        <div className="w-full h-auto mb-[40px] sm:mb-[60px] lg:mb-[80px] 2xl:mb-[110px] 3xl:mb-[140px]">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : blogs.length === 0 ? (
            <NoDataState />
          ) : (
            <div className="w-full mx-[-5px] sm:mx-[-7px] 2xl:mx-[-10px] flex flex-wrap">
              {blogs?.length > 0 ? (
                blogs?.map((item, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 lg:w-1/3 p-[5px] sm:p-[7px] 2xl:p-[10px]"
                  >
                    <BlogCard item={item} lang={lang} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-gray-500">{t("noBlogsFound")}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {!isLoading &&
          !error &&
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
  const t = useTranslations("blog");
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
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${
              currentPage === 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:opacity-50 cursor-pointer"
            }`}
            aria-disabled={currentPage === 1}
          >
            <Image
              src="/images/previous_pagination.svg"
              alt={t("previousPaginationAlt")}
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
              className={`text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal tracking-[1px] px-[5px] sm:px-[10px] 2xl:px-[15px] transition-all duration-300 relative z-0 ${
                page === currentPage
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
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${
              !has_more_pages || currentPage === last_page
                ? "opacity-30 cursor-not-allowed"
                : "hover:opacity-50 cursor-pointer"
            }`}
            aria-disabled={!has_more_pages || currentPage === last_page}
          >
            <Image
              src="/images/next_pagination.svg"
              alt={t("nextPaginationAlt")}
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
  const t = useTranslations("blog");
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">
          {t("loadingBlogs")}
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  const t = useTranslations("blog");
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
          {t("errorLoadingBlogs")}
        </p>
        <p className="text-[14px] 2xl:text-[16px] text-[#666]">{message}</p>
      </div>
    </div>
  );
}

function NoDataState() {
  const t = useTranslations("blog");
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
          {t("noBlogsFound")}
        </p>
        <p className="text-[14px] 2xl:text-[16px] text-[#999]">
          {t("noBlogsAvailable")}
        </p>
      </div>
    </div>
  );
}
