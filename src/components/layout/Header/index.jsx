"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SearchBox from "@/components/common/SearchBox";
import HeaderSelect from "@/components/common/HeaderSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BorderBeam } from "@/components/ui/border-beam"

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
          <div className="absolute top-0 left-0 w-full pt-[60px]  ">
            <div className="container relative ">
              <div className="flex items-center justify-between w-full pb-[15px] relative after:absolute after:bottom-0 after:content-[''] after:left-0 after:w-full after:h-[1px] after:bg-white/20 ">
                <Link href="/" className="w-[130px] xs:w-[140px] sm:w-[170px] p-[10px_0]">
                  <Image src="/images/Logo-white-footer.png" width="200" height="115" className="object-contain" alt="logo" />
                </Link>
                <div className="flex items-center">
                  <div className="mr-[5px] sm:mr-[20px]">
                    <div className="relative inline-flex rounded-full">
                      <Select defaultValue="uae">
                        <SelectTrigger
                          className="
                            h-[27px]
                            w-auto
                            px-2
                            border-white/5
                            rounded-full
                            text-white 
                            focus:ring-0
                            focus:outline-none
                            flex items-center  
      "
                        >
                          {/* Globe Icon */}
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7693 12.2969C15.4896 11.1234 15.87 9.77292 15.8681 8.39596V8.3957C15.87 7.01872 15.4896 5.66825 14.7693 4.49471L14.7652 4.4883C14.0969 3.39909 13.1604 2.49945 12.0453 1.87535C10.9302 1.25125 9.67369 0.923543 8.39581 0.923538C7.11793 0.923533 5.8614 1.25123 4.74628 1.87532C3.63116 2.49942 2.69472 3.39905 2.02643 4.48825L2.02228 4.49474C1.30374 5.66909 0.923498 7.01907 0.923492 8.3958C0.923487 9.77254 1.30372 11.1225 2.02225 12.2969L2.02647 12.3035C2.69476 13.3926 3.6312 14.2923 4.74631 14.9163C5.86142 15.5404 7.11794 15.8681 8.39581 15.8681C9.67368 15.8681 10.9302 15.5404 12.0453 14.9163C13.1604 14.2922 14.0968 13.3926 14.7651 12.3034L14.7693 12.2969ZM9.35091 14.5875C9.20852 14.7248 9.04464 14.838 8.86573 14.9226C8.71889 14.9923 8.55835 15.0285 8.39578 15.0285C8.2332 15.0285 8.07267 14.9923 7.92582 14.9226C7.58537 14.7487 7.29394 14.4922 7.07817 14.1766C6.63749 13.5398 6.31092 12.8313 6.11304 12.0826C6.87319 12.0358 7.6341 12.012 8.39578 12.0111C9.15715 12.0111 9.9181 12.0349 10.6786 12.0826C10.5691 12.4675 10.4323 12.8442 10.2693 13.2097C10.0546 13.7237 9.74275 14.1915 9.35091 14.5875ZM1.77768 8.81562H4.79162C4.81124 9.65662 4.9024 10.4944 5.06411 11.32C4.24021 11.3925 3.41843 11.492 2.59874 11.6187C2.11875 10.7575 1.83817 9.79964 1.77768 8.81562ZM2.59874 5.17297C3.4181 5.29994 4.24018 5.39954 5.06497 5.47176C4.90294 6.29724 4.81159 7.13503 4.79189 7.97604H1.77768C1.83817 6.99201 2.11875 6.03411 2.59874 5.17297ZM7.44064 2.20418C7.58303 2.06679 7.74692 1.9536 7.92582 1.86908C8.07267 1.79931 8.2332 1.76311 8.39578 1.76311C8.55835 1.76311 8.71889 1.79931 8.86573 1.86908C9.20619 2.04298 9.49762 2.29944 9.71339 2.61502C10.1541 3.2518 10.4806 3.96037 10.6785 4.70905C9.91836 4.75583 9.15745 4.77966 8.39578 4.78054C7.63442 4.78053 6.87346 4.7567 6.11291 4.70904C6.22244 4.3241 6.35925 3.94746 6.5223 3.58196C6.737 3.06793 7.0488 2.60013 7.44064 2.20418ZM15.0139 7.97604H11.9999C11.9803 7.13504 11.8892 6.29723 11.7275 5.47169C12.5514 5.39919 13.3732 5.29961 14.1928 5.17296C14.6728 6.03411 14.9534 6.99201 15.0139 7.97604ZM5.90853 11.2547C5.74434 10.4514 5.65161 9.63523 5.63142 8.81562H11.1602C11.1402 9.63523 11.0477 10.4514 10.8836 11.2547C10.0553 11.2004 9.22597 11.1726 8.39578 11.1715C7.56619 11.1715 6.73711 11.1992 5.90853 11.2547ZM10.883 5.53696C11.0472 6.34021 11.1399 7.15642 11.1601 7.97604H5.63133C5.65133 7.15643 5.74389 6.3402 5.90793 5.53692C6.7363 5.59127 7.56559 5.619 8.39578 5.62011C9.22537 5.62011 10.0545 5.59239 10.883 5.53696ZM11.9997 8.81562H15.0139C14.9534 9.79964 14.6728 10.7575 14.1928 11.6187C13.3735 11.4917 12.5514 11.3921 11.7266 11.3199C11.8886 10.4944 11.98 9.65662 11.9997 8.81562ZM13.6894 4.40021C12.973 4.50357 12.2545 4.5854 11.5338 4.64571C11.4043 4.16347 11.2372 3.6921 11.0342 3.23591C10.8488 2.81611 10.6156 2.41914 10.3391 2.05289C11.6753 2.4627 12.8479 3.28424 13.6894 4.40021ZM3.70573 3.70577C4.47225 2.93852 5.41529 2.37101 6.45216 2.05299C6.43642 2.07336 6.42024 2.09284 6.40474 2.11363C5.87179 2.88084 5.48358 3.73901 5.25927 4.64584C4.53855 4.5848 3.81951 4.50292 3.10214 4.40021C3.28715 4.15515 3.48883 3.92312 3.70573 3.70577ZM3.10214 12.3914C3.81852 12.2881 4.53705 12.2062 5.25773 12.1459C5.38725 12.6282 5.55431 13.0996 5.75736 13.5557C5.94274 13.9755 6.176 14.3725 6.4525 14.7388C5.11625 14.329 3.94364 13.5074 3.10214 12.3914ZM13.0858 13.0859C12.3193 13.8531 11.3763 14.4206 10.3394 14.7387C10.3551 14.7183 10.3713 14.6988 10.3868 14.678C10.9198 13.9108 11.308 13.0526 11.5323 12.1458C12.253 12.2069 12.9721 12.2887 13.6894 12.3914C13.5044 12.6365 13.3027 12.8685 13.0858 13.0859Z" fill="white" />
                          </svg>

                          <SelectValue placeholder="UAE" />
                        </SelectTrigger>

                        <SelectContent
                          className=" min-w-[120px] rounded-xl bg-white text-black shadow-lg  "
                        >
                          <SelectItem value="uae">UAE</SelectItem>
                          <SelectItem value="oman">Oman</SelectItem>
                          <SelectItem value="ksa">Saudi Arabia</SelectItem>
                          <SelectItem value="qatar">Qatar</SelectItem>
                          <SelectItem value="kuwait">Kuwait</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Border Beams */}
                      <BorderBeam
                        duration={6}
                        size={168}
                        reverse
                        className="from-transparent via-white/80 to-transparent"
                      />


                    </div>

                  </div>
                  <div className="mr-[5px] sm:mr-[20px]">
                    <SearchBox />
                  </div>
                  <SheetTrigger className="w-[25px] h-[25px] flex items-center justify-center">
                    <svg width="24" height="18" viewBox="0 0 24 18"  >
                      <path d="M0 8.29166H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                      <path d="M0 16.2917H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                      <path d="M0 1.29166H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                    </svg>

                  </SheetTrigger>
                </div>
              </div>
              <div className="flex items-center gap-3 max-w-1/2 pt-[15px]">
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
                      src="/images/logo.png"
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