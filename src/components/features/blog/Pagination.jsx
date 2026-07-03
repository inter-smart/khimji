"use client";

import Link from "next/link";
import Image from '@/components/common/ContentImage';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export default function BlogPagination({ paginationData }) {
  if (!paginationData) return null;

  const { current_page, last_page, has_more_pages } = paginationData;

  const generatePageNumbers = () => {
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

  const pageNumbers = generatePageNumbers();

  const getPageHref = (page) => `?page=${page}`;

  return (
    <Pagination>
      <PaginationContent className="[--width:25px] 2xl:[--width:30px] 3xl:[--width:35px]">
        {/* Previous */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-disabled={current_page === 1}
            className={`w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent transition-opacity duration-300 ${
              current_page === 1 ? "opacity-30 pointer-events-none cursor-not-allowed" : "hover:opacity-50 cursor-pointer"
            }`}
          >
            <a href={getPageHref(current_page - 1)}>
              <Image
                src="/images/previous_pagination.svg"
                alt="previous pagination"
                width={35}
                height={35}
                className="w-full h-full object-contain"
              />
            </a>
          </PaginationLink>
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page} className="mx-[5px] 2xl:mx-[10px]">
            <PaginationLink
              asChild
              //   isActive={page === current_page}
              className={`text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal tracking-[1px] px-[5px] sm:px-[10px] 2xl:px-[15px] transition-all duration-300 relative z-0 ${
                page === current_page
                  ? "font-semibold bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent before:content-[''] before:w-full before:h-[1px] before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:absolute before:z-1 before:left-0 before:bottom-0"
                  : "text-[#919193] hover:text-[#2C8F87]"
              }`}
            >
              <a href={getPageHref(page)}>{String(page).padStart(2, "0")}</a>
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationLink
            asChild
            aria-disabled={!has_more_pages || current_page === last_page}
            className={`w-[var(--width)] aspect-square p-0 flex items-center justify-center transition-opacity ${
              !has_more_pages || current_page === last_page ? "opacity-30 pointer-events-none" : "hover:opacity-50"
            }`}
          >
            <a href={getPageHref(current_page + 1)}>
              <Image src="/images/next_pagination.svg" alt="next pagination" width={35} height={35} className="w-full h-full object-contain" />
            </a>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
