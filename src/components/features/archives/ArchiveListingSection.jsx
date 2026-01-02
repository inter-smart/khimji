"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export default function ArchiveListingSection({ categories, lang, country }) {
  const [activeCategory, setActiveCategory] = useState(categories?.[0]?.id || null);
  const [archiveData, setArchiveData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const perPage = 2;

  // Fetch archive data
  const fetchArchiveData = async (categoryId, page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/archive-list?category_id=${categoryId}&per_page=${perPage}&page=${page}`,
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
        setArchiveData(result.data.archives || []);
        setPaginationData(result.data.pagination || null);
      }
    } catch (err) {
      setError(err.message);
      setArchiveData([]);
      setPaginationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when category or page changes
  useEffect(() => {
    if (activeCategory) {
      fetchArchiveData(activeCategory, currentPage);
    }
  }, [activeCategory, currentPage]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
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

  return (
    <section className="w-full h-auto py-[40px] sm:py-[60px] lg:py-[90px] 2xl:py-[110px] 3xl:py-[140px] overflow-hidden block relative z-0">
      <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
      <div className="w-[75px] 3xl:w-[110px] h-auto aspect-square bg-[#2FDDC3] mx-auto rounded-full blur-[50px] sm:blur-[60px] 2xl:blur-[80px] pointer-events-none absolute -z-1 inset-[8%_0_auto_0]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[150px] opacity-40 pointer-events-none absolute -z-1 inset-[27%_-5%_auto_auto]"></div>
      <div className="container">
        <div className="w-full h-auto mb-[30px] sm:mb-[50px] lg:mb-[80px] 2xl:mb-[110px] 3xl:mb-[140px]">
          <Tabs value={String(activeCategory)} onValueChange={(value) => handleCategoryChange(Number(value))}>
            <TabsList className="w-full h-auto bg-transparent gap-[5px] 2xl:gap-[10px] mb-[25px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] flex flex-wrap sm:justify-start">
              {categories?.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={String(category.id)}
                  className="text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal uppercase text-white w-auto h-auto flex-0 p-[10px_20px] 2xl:p-[15px_25px] 3xl:p-[15px_30px] border-[#2E8B8B] rounded-none data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0B436A] data-[state=active]:to-[#299B8A] data-[state=active]:text-white data-[state=inactive]:text-[#000000] cursor-pointer"
                >
                  {category?.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories?.map((category) => (
              <TabsContent key={category.id} value={String(category.id)}>
                {isLoading ? (
                  <LoadingState />
                ) : error ? (
                  <ErrorState message={error} />
                ) : archiveData.length === 0 ? (
                  <NoDataState />
                ) : (
                  <div className="w-full h-auto lg:mx-[-20px] 2xl:mx-[-25px] 3xl:mx-[-30px] flex flex-wrap">
                    {archiveData.map((item) => (
                      <div key={item.id} className="w-full xl:w-1/2 p-[5px_0] sm:p-[10px_0] lg:p-[15px_20px] 2xl:p-[15px_25px] 3xl:p-[20px_30px]">
                        <ArchiveCard item={item} category={category} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {!isLoading && !error && archiveData.length > 0 && paginationData && paginationData.last_page > 1 && (
          <div>
            <CustomPagination
              paginationData={paginationData}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageNumbers={generatePageNumbers()}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function ArchiveCard({ item, category }) {
  return (
    <div className="group [--image-size:100%] sm:[--image-size:210px] 2xl:[--image-size:310px] 3xl:[--image-size:385px] w-full h-full p-[10px_10px_15px_10px] sm:p-[15px_15px_20px_15px] 2xl:p-[20px_20px_30px_20px] rounded-[5px] 2xl:rounded-[8px] border border-white backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] flex flex-wrap">
      <div className="w-[var(--image-size)] h-[210px] sm:h-auto aspect-[385/360] max-sm:mb-[20px] rounded-[5px] 2xl:rounded-[8px] overflow-hidden block">
        <Image
          src={item?.image || "/images/placeholder.png"}
          alt={item?.image_alt_text || "Archive"}
          width={385}
          height={360}
          className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-500"
        />
      </div>
      <div className="w-[var(--image-size)] sm:w-[calc(100%-var(--image-size))] pl-[15px] sm:pl-[20px] lg:pl-[25px] 2xl:pl-[30px] 3xl:pl-[40px]">
        <div className="text-[15px] sm:text-[16px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.2] font-normal text-black mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]">
          {category?.title || "N/A"}
        </div>
        <div className="[--icon-size:30px] 2xl:[--icon-size:35px] 3xl:[--icon-size:40px] [--text-size:13px] sm:[--text-size:14px] 2xl:[--text-size:16px] 3xl:[--text-size:20px] w-full h-auto [&>*]:mb-[10px] sm:[&>*]:mb-[15px] 2xl:[&>*]:mb-[25px] 3xl:[&>*]:mb-[35px] [&>*]:last:mb-0 block">
          <div className="w-full h-auto flex items-center">
            <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
              <Image src="/images/archive_date_icon.svg" alt="Date" width={15} height={15} className="w-full h-full object-contain" />
            </div>
            <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px]">
              {item?.event_date || "N/A"}
            </div>
          </div>
          <div className="w-full h-auto flex items-center">
            <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
              <Image src="/images/archive_location_icon.svg" alt="Location" width={15} height={15} className="w-full h-full object-contain" />
            </div>
            <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px]">
              {item?.location || "N/A"}
            </div>
          </div>
          <div className="w-full h-auto flex items-center">
            <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
              <Image src="/images/archive_award_icon.svg" alt="Awards" width={15} height={15} className="w-full h-full object-contain" />
            </div>
            <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px]">
              {item?.title || "N/A"}
            </div>
          </div>
          {item?.link && (
            <Link href={item.link} target="_blank" rel="noopener noreferrer" className="w-full h-auto flex items-center">
              <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
                <Image src="/images/archive_link_icon.svg" alt="Link" width={15} height={15} className="w-full h-full object-contain" />
              </div>
              <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px] hover:text-[#299A8B] transition-colors duration-300">
                {item?.link || "View More"}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[50px] h-[50px] border-4 border-[#299B8A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666]">Loading archives...</p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[60px] h-[60px] bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-[30px] h-[30px] text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-red-600 font-medium mb-2">Error Loading Archives</p>
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
          <svg className="w-[30px] h-[30px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666] font-medium mb-2">No Archives Found</p>
        <p className="text-[14px] 2xl:text-[16px] text-[#999]">There are no archives available for this category.</p>
      </div>
    </div>
  );
}

function CustomPagination({ paginationData, currentPage, onPageChange, pageNumbers }) {
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
            aria-label="Previous"
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${
              currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:opacity-50 cursor-pointer"
            }`}
            aria-disabled={currentPage === 1}
          >
            <Image src="/images/previous_pagination.svg" alt="previous pagination" width={35} height={35} className="w-full h-full object-contain" />
          </PaginationLink>
        </PaginationItem>

        {pageNumbers.map((page) => (
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
            aria-label="Next"
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${
              !has_more_pages || currentPage === last_page ? "opacity-30 cursor-not-allowed" : "hover:opacity-50 cursor-pointer"
            }`}
            aria-disabled={!has_more_pages || currentPage === last_page}
          >
            <Image src="/images/next_pagination.svg" alt="next pagination" width={35} height={35} className="w-full h-full object-contain" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
