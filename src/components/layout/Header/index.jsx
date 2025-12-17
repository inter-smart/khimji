"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SearchBox from "@/components/common/SearchBox";
import HeaderSelect from "@/components/common/HeaderSelect";

export default function Header() {


  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="w-full bg-white max-sm:hidden">
        <div className="container">
          <div className="w-full flex flex-wrap items-center justify-between p-[25px_0] border-[rgba(0,0,0,0.1)] border-b">
            {/* logo */}
            <Link href="#!" className="flex items-center justify-center max-w-[125px] lg:max-w-[145px] xl:max-w-[175px] 2xl:max-w-[225px] 3xl:max-w-[275px] w-full">
              <Image src="/images/logo.png" width="275" height="75" alt="logo" />
            </Link>
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">

                {/* Search Box*/}
                <SearchBox />

                {/* Business Select */}

                <HeaderSelect />

                {/* country Dropdown */}

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
                    <DropdownMenuItem>India</DropdownMenuItem>
                    <DropdownMenuItem>USA</DropdownMenuItem>
                    <DropdownMenuItem>Saudi</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}




      <Sheet open={open} onOpenChange={setOpen}  >

        <div className="sm:hidden relative z-1
            before:content-[''] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-[150px] before:bg-gradient-to-b before:from-black 
            before:to-black/0">
          <div className="absolute top-0 left-0 w-full pt-[60px] ">
            <div className="container relative ">
              <div className="flex items-center justify-between w-full pb-[15px] ">
                <Link href="/" className="w-[130px] xs:w-[140px] sm:w-[170px] p-[10px_0]">
                  <Image src="/images/Logo-white-footer.png" width="200" height="115" className="object-contain" alt="logo" />
                </Link>
                <div className="flex items-center">
                  <div className="mr-[10px] sm:mr-[20px]">
                    <SearchBox />
                  </div>
                  <SheetTrigger className="w-[25px] h-[25px] flex items-center justify-center">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 8.29166H24" stroke="white" stroke-width="2.58333" stroke-linejoin="round" />
                      <path d="M0 16.2917H24" stroke="white" stroke-width="2.58333" stroke-linejoin="round" />
                      <path d="M0 1.29166H24" stroke="white" stroke-width="2.58333" stroke-linejoin="round" />
                    </svg>

                  </SheetTrigger>
                </div>
              </div>
              <div className="flex items-center gap-3 max-w-1/2">
                <div className="w-1/2">
                  <HeaderSelect />
                </div>
              </div>
            </div>
            <SheetContent side="right" className="h-[100vh] overflow-auto">
              <SheetHeader>
                <div className="flex items-center w-full border-b border-[#f4f4f4] pb-[10px] mb-[10px]">
                  <Link href="/" className="block max-w-[115px]  w-full h-full">
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      width={175}
                      height={100}
                      className="w-full h-full 3xl:max-w-[125px] 2xl:max-w-[100px] max-w-[90px] object-contain block hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <SheetDescription >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-b border-[#f4f4f4]">
                      <Link href="/" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                        <div className="flex items-center">
                          <span>Home</span>
                        </div>
                      </Link>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-[#f4f4f4]">
                      <Link href="/about" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                        <div className="flex items-center">
                          <span>About Us</span>
                        </div>
                      </Link>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-[#f4f4f4]">
                      <AccordionTrigger className="text-[12px] font-normal text-black py-[8px] w-full flex items-center  ">
                        <Link href="/service" className="flex items-center">
                          <span>Services</span>
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent className="text-[12px] bg-[#671448] p-[10px] ">

                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-[#f4f4f4]">
                      <Link href="/consultants" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center  ">
                        <div className="flex items-center">
                          <span>Consultants</span>
                        </div>
                      </Link>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border-b border-[#f4f4f4]">
                      <Link href="/news" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                        <div className="flex items-center">
                          <span>News & Insights </span>
                        </div>
                      </Link>
                    </AccordionItem>
                    <AccordionItem value="item-6" className="border-b border-[#f4f4f4]">
                      <Link href="/contact" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                        <div className="flex items-center">
                          <span>Contact</span>
                        </div>
                      </Link>
                    </AccordionItem>
                  </Accordion>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </div>
        </div>
      </Sheet>
    </header>
  );
}