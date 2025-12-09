"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const openSearch = (e) => {
    e.stopPropagation();
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
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

  return (
    <header>
      <div className="w-full bg-white">
        <div className="container">
          <div className="w-full flex flex-wrap items-center justify-between p-[25px_0] border-[rgba(0,0,0,0.1)] border-b">
            {/* logo */}
            <Link href="#!" className="flex items-center justify-center max-w-[125px] lg:max-w-[145px] xl:max-w-[175px] 2xl:max-w-[225px] 3xl:max-w-[275px] w-full">
              <Image src="/images/logo.png" width="275" height="75" alt="logo" />
            </Link>
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">

                {/* Search Bar with Expandable Input */}
                <div className="relative flex items-center" ref={searchRef}>
                  {/* Search Icon Button */}
                  <button
                    type="button"
                    onClick={openSearch}
                    className={`
                      flex items-center justify-center 
                      w-[40px] h-[40px] rounded-full
                      transition-all duration-500 z-10
                      ${isSearchOpen
                        ? ' bg-gradient-to-r from-[#0B436A] to-[#299B8A]  '
                        : 'bg-transparent  '
                      }
                    `}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M23.7732 22.6951L17.5765 16.5975C19.1992 14.8345 20.1963 12.5029 20.1963 9.93719C20.1955 4.44868 15.6748 0 10.0977 0C4.52072 0 0 4.44868 0 9.93719C0 15.4257 4.52072 19.8744 10.0977 19.8744C12.5074 19.8744 14.7175 19.0409 16.4535 17.6553L22.6742 23.7769C22.9773 24.0755 23.4694 24.0755 23.7725 23.7769C24.0763 23.4784 24.0763 22.9937 23.7732 22.6951ZM10.0977 18.3455C5.37898 18.3455 1.55368 14.581 1.55368 9.93719C1.55368 5.29341 5.37898 1.5289 10.0977 1.5289C14.8165 1.5289 18.6418 5.29341 18.6418 9.93719C18.6418 14.581 14.8165 18.3455 10.0977 18.3455Z" fill={isSearchOpen ? "white" : "#374151"} />
                    </svg>
                  </button>

                  {/* Expandable Search Input */}
                  <form
                    onSubmit={handleSearch}
                    className={`
                      absolute right-0 flex items-center
                      transition-all duration-500 ease-out
                      ${isSearchOpen ? 'w-[280px] opacity-100 translate-x-0' : 'w-0 opacity-0 pointer-events-none'}
                    `}
                  >
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search here..."
                        className="
                          w-full  h-[35px] 3xl:h-[45px] pl-5 pr-12
                          bg-white border-2 border-gray-200
                          rounded-full
                          outline-none transition-all duration-300
                          focus:border-blue 
                          text-gray-700 text-sm
                          placeholder:text-gray-400
                        "
                        autoFocus={isSearchOpen}
                      />
                      {/* Submit Button Inside Input */}
                      <button
                        type="submit"
                        className="
                          absolute right-1 top-1/2 -translate-y-1/2
                          flex items-center justify-center 
                          w-[30px] 2xl:w-[35px] 3xl:w-[45px]  h-[30px] 2xl:h-[35px] 3xl:h-[45px] 
                          bg-transparent
                          rounded-full
                          transition-all duration-200
                          hover:scale-105 active:scale-95
                          shadow-md
                        "
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M23.7732 22.6951L17.5765 16.5975C19.1992 14.8345 20.1963 12.5029 20.1963 9.93719C20.1955 4.44868 15.6748 0 10.0977 0C4.52072 0 0 4.44868 0 9.93719C0 15.4257 4.52072 19.8744 10.0977 19.8744C12.5074 19.8744 14.7175 19.0409 16.4535 17.6553L22.6742 23.7769C22.9773 24.0755 23.4694 24.0755 23.7725 23.7769C24.0763 23.4784 24.0763 22.9937 23.7732 22.6951ZM10.0977 18.3455C5.37898 18.3455 1.55368 14.581 1.55368 9.93719C1.55368 5.29341 5.37898 1.5289 10.0977 1.5289C14.8165 1.5289 18.6418 5.29341 18.6418 9.93719C18.6418 14.581 14.8165 18.3455 10.0977 18.3455Z" fill="white" />
                        </svg>
                      </button>

                      {/* Clear Button */}
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="
                            absolute right-12 top-1/2 -translate-y-1/2
                            flex items-center justify-center
                            w-[24px] h-[24px]
                            text-gray-400 hover:text-gray-600
                            transition-colors duration-200
                          "
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Business Select */}
                <Select>
                  <SelectTrigger
                    className="
                          relative
                          text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-black font-medium max-w-full min-h-[30px] 2xl:min-h-[35px] 3xl:min-h-[45px] px-2 
                          border border-black min-w-[115px] lg:min-w-[125px] rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none
                          data-[state=open]:border-[#00095b]
                          data-[placeholder]:text-black [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px] after:bg-[url('/images/arrow.svg')] after:bg-no-repeat after:bg-center
                        "
                  >
                    <SelectValue placeholder="Business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location Select */}
                <Select>
                  <SelectTrigger
                    className="
                          relative
                          text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-black font-medium max-w-full min-h-[30px] 2xl:min-h-[35px] 3xl:min-h-[45px] px-2 
                          border border-black min-w-[115px] lg:min-w-[125px] rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none
                          data-[state=open]:border-[#00095b]
                          data-[placeholder]:text-black [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px] after:bg-[url('/images/arrow.svg')] after:bg-no-repeat after:bg-center
                        "
                  >
                    <SelectValue placeholder="Business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                {/* Language Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-2 cursor-pointer">
                    <Image
                      src="/images/en.png"
                      alt="Flag"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <span className="font-medium text-[16px]">EN</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>Arabic</DropdownMenuItem>
                    <DropdownMenuItem>French</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}