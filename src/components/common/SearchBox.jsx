"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBox({ lang, country, businessType }) {
  const isRTL = lang == "ar";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputContainerRef = useRef(null);
  const debounceRef = useRef(null);
  const resultRefs = useRef([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const fetchSearchResults = useCallback(
    async (keyword) => {
      const trimmed = keyword.trim();

      if (!trimmed) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/search?keyword=${encodeURIComponent(keyword)}`,
          {
            headers: {
              "Accept-Language": lang,
              "Location-Slug": country || "oman",
              "Business-Slug": businessType || "b2b",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          const results = data?.data?.suggestions || data?.suggestions || [];
          const safeResults = Array.isArray(results) ? results : [];
          setSearchResults(safeResults);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [lang, country, businessType],
  );

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchQuery.trim()) {
      setIsLoading(true);
      debounceRef.current = setTimeout(() => {
        fetchSearchResults(searchQuery);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, fetchSearchResults]);

  // Auto-select first result when results arrive
  useEffect(() => {
    if (searchResults.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [searchResults]);

  // Scroll highlighted result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex].scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Calculate dropdown position relative to input container
  useEffect(() => {
    const shouldShow = (showResults || (isLoading && searchQuery.trim())) && isSearchOpen;
    if (shouldShow && inputContainerRef.current) {
      const rect = inputContainerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    }
  }, [showResults, isLoading, searchQuery, isSearchOpen]);

  const handleKeyDown = (e) => {
    if (!showDropdown || isLoading) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const result = searchResults[selectedIndex];
      if (result) {
        router.push(`/${lang}/${result.type}/${result.url || result.slug}`);
        closeSearch();
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      setIsNavigating(true);
      closeSearch();
    }
  };

  const openSearch = (e) => {
    e.stopPropagation();
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
  };

  const handleResultClick = () => {
    closeSearch();
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const showDropdown = (showResults || (isLoading && searchQuery.trim())) && isSearchOpen;

  return (
    <div
      className={`relative flex items-center z-100 ${isRTL ? "flex-row-reverse" : ""}`}
      ref={searchRef}
    >
      {/* Search Icon Button */}
      <button
        type="button"
        aria-label="Search"
        onClick={openSearch}
        className={`
                        flex items-center justify-center
                        w-[40px] h-[40px] rounded-full
                        transition-all duration-500 z-10
                        ${isSearchOpen ? "bg-gradient-to-r from-[#0B436A] to-[#299B8A]" : "bg-transparent"}
                    `}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className={`
                        transition-colors duration-300 max-sm:hidden
                        ${isSearchOpen ? "text-white" : "text-white sm:text-gray-700"}
                        `}
        >
          <path
            d="M23.7732 22.6951L17.5765 16.5975C19.1992 14.8345 20.1963 12.5029 20.1963 9.93719C20.1955 4.44868 15.6748 0 10.0977 0C4.52072 0 0 4.44868 0 9.93719C0 15.4257 4.52072 19.8744 10.0977 19.8744C12.5074 19.8744 14.7175 19.0409 16.4535 17.6553L22.6742 23.7769C22.9773 24.0755 23.4694 24.0755 23.7725 23.7769C24.0763 23.4784 24.0763 22.9937 23.7732 22.6951ZM10.0977 18.3455C5.37898 18.3455 1.55368 14.581 1.55368 9.93719C1.55368 5.29341 5.37898 1.5289 10.0977 1.5289C14.8165 1.5289 18.6418 5.29341 18.6418 9.93719C18.6418 14.581 14.8165 18.3455 10.0977 18.3455Z"
            fill="currentColor"
          />
        </svg>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          className="sm:hidden"
        >
          <path
            d="M21.4739 21.474L17.036 17.036"
            stroke="white"
            strokeWidth="2.58333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.2482 19.4288C15.7662 19.4288 19.4288 15.7663 19.4288 11.2483C19.4288 6.73028 15.7662 3.06771 11.2482 3.06771C6.73022 3.06771 3.06766 6.73028 3.06766 11.2483C3.06766 15.7663 6.73022 19.4288 11.2482 19.4288Z"
            stroke="white"
            strokeWidth="2.58333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expandable Search Input */}
      <form
        onSubmit={handleSearch}
        className={`
                      absolute  ${isRTL ? "left-0" : "right-0"} flex items-center
                      transition-all duration-500 ease-out
                      ${isSearchOpen ? "w-[300px] sm:w-[280px] opacity-100 translate-x-0" : "w-0 opacity-0 pointer-events-none"}
                    `}
      >
        <div className="relative w-full" ref={inputContainerRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRTL ? "ابحث هنا..." : "Search here..."}
            className={`
                          w-full h-[40px] 3xl:h-[45px]  ${isRTL ? "pr-5 pl-12" : "pl-5 pr-12"}
                          bg-white border-2 border-gray-200
                          rounded-full
                          outline-none transition-all duration-300
                          focus:border-blue
                          text-gray-700 text-sm
                          placeholder:text-gray-400
                          ${isRTL ? "text-right" : "text-left"}
                        `}
            autoFocus={isSearchOpen}
            onKeyDown={handleKeyDown}
          />
          {/* Submit Button Inside Input */}
          <button
            type="submit"
            aria-label={isRTL ? "إرسال البحث" : "Submit search"}
            className={`
                          absolute end-1 top-1/2 -translate-y-1/2
                          flex items-center justify-center
                              ${isRTL ? "left-1" : "right-1"}
                          w-[28px] 2xl:w-[35px] 3xl:w-[45px] h-[28px] 2xl:h-[35px] 3xl:h-[45px]
                          bg-transparent
                          rounded-full
                          transition-all duration-200
                          hover:scale-105 active:scale-95
                        `}
          >
            {isLoading || isNavigating ? (
              <svg
                className="animate-spin"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M23.7732 22.6951L17.5765 16.5975C19.1992 14.8345 20.1963 12.5029 20.1963 9.93719C20.1955 4.44868 15.6748 0 10.0977 0C4.52072 0 0 4.44868 0 9.93719C0 15.4257 4.52072 19.8744 10.0977 19.8744C12.5074 19.8744 14.7175 19.0409 16.4535 17.6553L22.6742 23.7769C22.9773 24.0755 23.4694 24.0755 23.7725 23.7769C24.0763 23.4784 24.0763 22.9937 23.7732 22.6951ZM10.0977 18.3455C5.37898 18.3455 1.55368 14.581 1.55368 9.93719C1.55368 5.29341 5.37898 1.5289 10.0977 1.5289C14.8165 1.5289 18.6418 5.29341 18.6418 9.93719C18.6418 14.581 14.8165 18.3455 10.0977 18.3455Z"
                  fill="white"
                />
              </svg>
            )}
          </button>

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              aria-label={isRTL ? "مسح البحث" : "Clear search"}
              onClick={() => setSearchQuery("")}
              className={`
                            absolute end-12 top-1/2 -translate-y-1/2
                            flex items-center justify-center
                            w-[24px] h-[24px]
                            text-gray-400 hover:text-gray-600
                            transition-colors duration-200
                          `}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown — rendered via portal to escape header stacking context */}
      {showDropdown &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 9999,
            }}
            className={`
              bg-white rounded-lg shadow-lg
              border border-gray-200
              max-h-[300px] overflow-y-auto
              ${isRTL ? "text-right" : "text-left"}
            `}
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                {isRTL ? "جاري البحث..." : "Searching..."}
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="py-2">
                {searchResults.map((result, index) => (
                  <li key={result.id || index} ref={(el) => (resultRefs.current[index] = el)}>
                    <Link
                      href={`/${lang}/${result.type}/${result.url || result.slug}`}
                      onClick={handleResultClick}
                      className={`
                        px-4 py-3
                        transition-colors duration-150
                        border-b border-gray-100 last:border-b-0
                        flex items-center justify-between
                        ${selectedIndex === index ? "bg-gray-100" : "hover:bg-gray-50"}
                      `}
                    >
                      <p className="text-sm font-medium text-gray-800 line-clamp-1 hover:underline">
                        {result.name}
                      </p>
                      {result.type && (
                        <span className="inline-block mt-1 text-xspx-2 py-0.5 rounded">
                          {result.type}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : searchQuery.trim() ? (
              <div className="p-4 text-center text-gray-500">
                {isRTL ? "لا توجد نتائج" : "No results found"}
              </div>
            ) : null}
          </div>,
          document.body,
        )}
    </div>
  );
}
