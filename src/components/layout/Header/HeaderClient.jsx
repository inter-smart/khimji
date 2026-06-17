"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import GlobalLoader from "@/components/layout/GlobalLoader";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SearchBox from "@/components/common/SearchBox";
import HeaderSelect from "@/components/common/HeaderSelect";
import HeaderNavigation from "./header-navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BorderBeam } from "@/components/ui/border-beam";
import { useRouter } from "next/navigation";

export const LANGUAGES = {
  en: {
    code: "en",
    name: "EN",
    fullName: "English",
    flag: "https://flagcdn.com/w40/gb.png",
    isRTL: false,
  },
  ar: {
    code: "ar",
    name: "AR",
    fullName: "Arabic",
    flag: "https://flagcdn.com/w40/sa.png",
    isRTL: true,
  },
};

const navMenu = [
  {
    label: "Home",
    label_ar: "الرئيسية",
    link: "/",
  },
  {
    label: "Ventures",
    label_ar: "الأعمال التجارية",
    link: "/venture",
    hasSubmenu: true,
    subMenu: [
      { label: "Consumer Oriented", label_ar: "موجه للمستهلك", businessType: "b2c" },
      { label: "Corporate Oriented", label_ar: "موجه للشركات", businessType: "b2b" },
    ],
  },
  {
    label: "Heritage",
    label_ar: "الإرث",
    link: "/heritage",
  },
  {
    label: "ICV",
    label_ar: "القيمة المحلية المضافة",
    link: "/icv-initiatives",
  },
  {
    label: "Careers",
    label_ar: "أعمل معنا",
    link: "/career",
  },
  {
    label: "Contact",
    label_ar: "تواصل معنا",
    link: "/contact",
  },
];

export default function Header({ businessTypePromise, locationsPromise, lang, country, businessType }) {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = currentPath?.replace(/^\/(en|ar)(\/|$)/, "/") || "/";

  const navigationData = navMenu.map((item) => ({
    slug: item.link,
    name: item.label,
    name_ar: item.label_ar,
    hasSubmenu: false,
  }));

  const handleNavigationLinkClick = () => setOpen(false);

  function handleVentureClick(businessType) {
    document.cookie = `business_type=${businessType}; path=/`;
    window.dispatchEvent(new CustomEvent("businessTypeChanged", { detail: { business_type: businessType } }));
    setOpen(false);
    startTransition(() => { router.push(`/${lang}/venture`); });
  }

  // scroll sticky
  useEffect(() => {
    setOpen(false);
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 0);
    };

    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  useEffect(() => {
    let rafId = null;
    const updateHeaderHeight = () => {
      // Only update the height when not scrolled to avoid measurement changes when sticky
      if (headerRef.current && !isScrolled) {
        const height = headerRef.current.offsetHeight;
        if (height > 0) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            document.documentElement.style.setProperty("--header-height", `${height}px`);
          });
        }
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      cancelAnimationFrame(rafId);
    };
  }, [isScrolled]);

  const languageData = LANGUAGES[lang];
  const languages = Object.values(LANGUAGES);

  const changeLanguage = (newLang) => {
    const segments = (currentPath ?? "/").split("/");
    segments[1] = newLang; // replace "en" → "ar"
    const newPath = segments.join("/");
    startTransition(() => { router.push(newPath); });
  };

  return (
    <>
    {isPending && <GlobalLoader />}
    <header ref={headerRef}>
      <div className={`w-full bg-white max-sm:hidden ${isScrolled ? "stickyHeader" : ""}`}>
        <div className="container">
          <div className="relative w-full flex flex-wrap items-center justify-between p-[15px_0] border-[rgba(0,0,0,0.1)] border-b z-10">
            {/* logo */}
            <Link
              href={`/${lang}`}
              className="flex items-center justify-center max-w-[125px] lg:max-w-[145px] xl:max-w-[175px] 2xl:max-w-[225px] 3xl:max-w-[275px] w-full"
            >
              <span className="relative w-full aspect-[275/75]">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 125px,
                    (max-width: 1024px) 145px,
                    (max-width: 1280px) 175px,
                    (max-width: 1536px) 225px,
                    275px" />
              </span>
            </Link>

            <div className="hidden xl:flex lg:flex-1 lg:justify-center mx-[25px] xl:mx-[40px] 3xl:mx-[60px]">
              <HeaderNavigation
                locale={lang}
                pathname={pathname}
                menuItems={navigationData}
                onNavigationClick={handleNavigationLinkClick}
                showDarkHeader={isScrolled}
              />
            </div>

            <div className="flex items-center justify-end">

              <div className="flex items-center gap-4  p-2 xl:p-4 rounded-xl">

                {/* Search Box*/}
                <SearchBox lang={lang} businessType={businessType} country={country} />

                {/* Business Select */}

                <HeaderSelect businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} />

                {/* country Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-2 cursor-pointer focus:outline-none">
                    <Image
                      src="/images/langicon.png"
                      alt={languageData?.fullName}
                      title={languageData?.fullName}
                      width={28}
                      height={20}
                      className=" object-cover w-[25px] h-[25px] 2xl:w-[28px] 2xl:h-[28px]"
                    />
                    <span className="font-medium text-[16px] uppercase">{languageData?.name}</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40 mt-2 rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#299b8a]/10 hover:text-[#299b8a] focus:bg-[#299b8a]/10 focus:text-[#299b8a] ${languageData?.code === lang.code ? "bg-[#299b8a]/5 text-[#299b8a]" : ""}`}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Image src="/images/langicon.png" alt={lang.fullName} title={lang.fullName} width={20} height={20} className=" object-cover w-[20px] h-[20px]" />
                          <span>{lang.fullName}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <div
                className={`hidden sm:block xl:hidden relative z-1
             `}
              >
                <div
                  className={`w-full h-[25px]  ${isScrolled ? " pt-[10px] w-full " : ""
                    }`}
                >
                  <div className="relative">
                    <div className="flex items-center justify-between w-full pb-[15px] relative">

                      <div className="flex items-center">
                        <SheetTrigger className="w-[25px] h-[25px] flex items-center justify-center">
                          <svg width="24" height="18" viewBox="0 0 24 18">
                            <path d="M0 8.29166H24" stroke="#299B8A" strokeWidth="2.58333" strokeLinejoin="round" />
                            <path d="M0 16.2917H24" stroke="#299B8A" strokeWidth="2.58333" strokeLinejoin="round" />
                            <path d="M0 1.29166H24" stroke="#299B8A" strokeWidth="2.58333" strokeLinejoin="round" />
                          </svg>
                        </SheetTrigger>
                      </div>
                    </div>

                  </div>
                  <SheetContent side="right" className="h-[100vh] overflow-auto">
                    <SheetHeader>
                      <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                      </VisuallyHidden>

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
                      <div className="py-[10px] border-b border-[#f4f4f4] mb-[10px]">
                        <HeaderSelect businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} />
                      </div>
                      <SheetDescription asChild>
                        <div>
                          <Accordion type="single" collapsible>
                            {navMenu?.map((item, index) => (
                              item.hasSubmenu ? (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#f4f4f4]">
                                  <AccordionTrigger className="text-[12px] font-normal text-black py-[8px] w-full">
                                    {lang === "ar" ? item.label_ar : item.label}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="flex flex-col !ps-0 space-y-1 mt-1 mb-2">
                                      {item.subMenu?.map((sub) => (
                                        <button
                                          key={sub.businessType}
                                          onClick={() => handleVentureClick(sub.businessType)}
                                          className="text-[13px] text-gray-600 py-2 !px-0 rounded-md text-start hover:bg-[#299b8a]/10 hover:text-[#299b8a] transition-all font-medium"
                                        >
                                          {lang === "ar" ? sub.label_ar : sub.label}
                                        </button>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ) : (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#f4f4f4]">
                                  <Link
                                    href={`/${lang}${item?.link}`}
                                    className="text-[12px] font-normal text-black py-[8px] w-full flex items-center"
                                    aria-label="menuLink"
                                  >
                                    <span>{lang === "ar" ? item?.label_ar : item?.label}</span>
                                  </Link>
                                </AccordionItem>
                              )
                            ))}
                          </Accordion>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </div>
              </div>
              <div
                className={`sm:hidden relative z-1
            ${isScrolled
                    ? "stickyHeader w-full"
                    : " before:content-[''] before:block before:absolute before:top-0 before:start-0 before:w-full before:h-[250px] before:bg-gradient-to-b before:from-black before:to-black/0 before:pointer-events-none"
                  }`}
              >
                <div
                  className={`w-full  ${isScrolled ? "stickyHeader pt-[10px] w-full !bg-[#279689ed] backdrop-blur-[5px]" : "absolute top-0 start-0  pt-[30px]"
                    }`}
                >
                  <div className="container relative">
                    <div className="flex items-center justify-between w-full pb-[15px] relative after:absolute after:bottom-0 after:content-[''] after:start-0 after:w-full after:h-[1px] after:bg-white/20 ">
                      <Link href="/" className="w-[130px] xs:w-[140px] sm:w-[170px] p-[10px_0]">
                        <Image src="/images/Logo-white-footer.png" width="200" height="115" className="object-contain" alt="logo" />
                      </Link>
                      <div className="flex items-center">
                        <div className="me-[5px] sm:me-[20px]">
                          <div className="relative inline-flex rounded-full max-w-[130px]">
                            <Select value={languageData?.code} onValueChange={(lang) => changeLanguage(lang)} modal={false}>
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
                            max-w-[95px]
      "
                              >
                                {/* Globe Icon or Country Flag */}
                                <Image
                                  src={languageData?.flag}
                                  alt={languageData?.fullName}
                                  title={languageData?.fullName}
                                  width={17}
                                  height={17}
                                  className="rounded-full me-1 object-cover w-[17px] h-[17px]"
                                />

                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>

                              <SelectContent className="min-w-[120px] rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                                {languages.map((lang) => (
                                  <SelectItem 
                                    key={lang.code} 
                                    value={lang.code}
                                    className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#299b8a]/10 hover:text-[#299b8a] focus:bg-[#299b8a]/10 focus:text-[#299b8a] my-0.5"
                                  >
                                    {lang.fullName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {/* Border Beams */}

                            <BorderBeam duration={8} size={50} className="from-transparent via-white/70 to-transparent" />
                            <BorderBeam duration={8} size={50} reverse className="from-transparent via-white/70 to-transparent" />
                          </div>
                        </div>
                        <div className="me-[5px] sm:me-[20px]">
                          <SearchBox lang={lang} />
                        </div>
                        <SheetTrigger className="w-[25px] h-[25px] flex items-center justify-center">
                          <svg width="24" height="18" viewBox="0 0 24 18">
                            <path d="M0 8.29166H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                            <path d="M0 16.2917H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                            <path d="M0 1.29166H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                          </svg>
                        </SheetTrigger>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 max-w-1/2 pt-[15px] ${isScrolled ? "opacity-0 h-0" : ""}`}>
                      <div className="w-1/2">
                        <HeaderSelect businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} />
                      </div>
                    </div>
                  </div>
                  <SheetContent side="right" className="h-[100vh] overflow-auto">
                    <SheetHeader>
                      <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                      </VisuallyHidden>

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
                      <div className="py-[10px] border-b border-[#f4f4f4] mb-[10px]">
                        <HeaderSelect businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} />
                      </div>
                      <SheetDescription asChild>
                        <div>
                          <Accordion type="single" collapsible>
                            {navMenu?.map((item, index) => (
                              item.hasSubmenu ? (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#f4f4f4]">
                                  <AccordionTrigger className="text-[12px] font-normal text-black py-[8px] w-full">
                                    {lang === "ar" ? item.label_ar : item.label}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="flex flex-col ps-3">
                                      {item.subMenu?.map((sub) => (
                                        <button
                                          key={sub.businessType}
                                          onClick={() => handleVentureClick(sub.businessType)}
                                          className="text-[12px] text-black py-[6px] text-start hover:text-[#299b8a] transition-colors"
                                        >
                                          {lang === "ar" ? sub.label_ar : sub.label}
                                        </button>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ) : (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#f4f4f4]">
                                  <Link
                                    href={`/${lang}${item?.link}`}
                                    className="text-[12px] font-normal text-black py-[8px] w-full flex items-center"
                                    aria-label="menuLink"
                                  >
                                    <span>{lang === "ar" ? item?.label_ar : item?.label}</span>
                                  </Link>
                                </AccordionItem>
                              )
                            ))}
                          </Accordion>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </div>
              </div>
            </Sheet>
          </div>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen} className="z-[99999]">

        <div
          className={`sm:hidden relative z-1
            ${isScrolled
              ? "stickyHeader w-full"
              : " before:content-[''] before:block before:absolute before:top-0 before:start-0 before:w-full before:h-[250px] before:bg-gradient-to-b before:from-black before:to-black/0 before:pointer-events-none"
            }`}
        >
          <div
            className={`w-full  ${isScrolled ? "stickyHeader pt-[10px] w-full !bg-[#279689ed] backdrop-blur-[5px]" : "absolute top-0 start-0  pt-[30px]"
              }`}
          >
            <div className="container relative">
              <div className="flex items-center justify-between w-full pb-[15px] relative after:absolute after:bottom-0 after:content-[''] after:start-0 after:w-full after:h-[1px] after:bg-white/20 ">
                <Link href="/" className="w-[130px] xs:w-[140px] sm:w-[170px] p-[10px_0]">
                  <Image src="/images/Logo-white-footer.png" width="200" height="115" className="object-contain" alt="logo" />
                </Link>
                <div className="flex items-center">
                  <div className="me-[5px] sm:me-[20px]">
                    <div className="relative inline-flex rounded-full max-w-[130px]">
                      <Select value={languageData?.code} onValueChange={(lang) => changeLanguage(lang)} modal={false}>
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
                            max-w-[95px]
      "
                        >
                          <Image
                            src={languageData?.flag}
                            alt={languageData?.fullName}
                            title={languageData?.fullName}
                            width={17}
                            height={17}
                            className="rounded-full me-1 object-cover w-[17px] h-[17px]"
                          />
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent className="min-w-[120px] rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-2 shadow-xl">
                          {languages.map((lang) => (
                            <SelectItem 
                              key={lang.code} 
                              value={lang.code}
                              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#299b8a]/10 hover:text-[#299b8a] focus:bg-[#299b8a]/10 focus:text-[#299b8a] my-0.5"
                            >
                              {lang.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <BorderBeam duration={8} size={50} className="from-transparent via-white/70 to-transparent" />
                      <BorderBeam duration={8} size={50} reverse className="from-transparent via-white/70 to-transparent" />
                    </div>
                  </div>
                  <div className="me-[5px] sm:me-[20px]">
                    <SearchBox lang={lang} />
                  </div>
                  <SheetTrigger className="w-[25px] h-[25px] flex items-center justify-center">
                    <svg width="24" height="18" viewBox="0 0 24 18">
                      <path d="M0 8.29166H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                      <path d="M0 16.2917H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                      <path d="M0 1.29166H24" stroke="white" strokeWidth="2.58333" strokeLinejoin="round" />
                    </svg>
                  </SheetTrigger>
                </div>
              </div>
              <div className={`flex items-center gap-3 max-w-1/2 pt-[15px] ${isScrolled ? "opacity-0 h-0" : ""}`}>
                <div className="w-1/2">
                  <HeaderSelect businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} />
                </div>
              </div>
            </div>
            <SheetContent side="right" className="h-[100vh] overflow-auto">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>

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
                <SheetDescription asChild>
                  <div>
                    <Accordion type="single" collapsible>
                      {navMenu?.map((item, index) => (
                        item.hasSubmenu ? (
                          <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#f4f4f4]">
                            <AccordionTrigger className="text-[12px] font-normal text-black py-[8px] w-full">
                              {lang === "ar" ? item.label_ar : item.label}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col ps-0 space-y-1 mt-1 mb-2">
                                {item.subMenu?.map((sub) => (
                                  <button
                                    key={sub.businessType}
                                    onClick={() => handleVentureClick(sub.businessType)}
                                    className="text-[13px] text-gray-600 py-2 px-0 rounded-md text-start hover:bg-[#299b8a]/10 hover:text-[#299b8a] transition-all font-medium"
                                  >
                                    {lang === "ar" ? sub.label_ar : sub.label}
                                  </button>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#f4f4f4]">
                            <Link
                              href={`/${lang}${item?.link}`}
                              className="text-[12px] font-normal text-black py-[8px] w-full flex items-center"
                              aria-label="menuLink"
                            >
                              <span>{lang === "ar" ? item?.label_ar : item?.label}</span>
                            </Link>
                          </AccordionItem>
                        )
                      ))}
                    </Accordion>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </div>
        </div>
      </Sheet>
    </header>
    </>
  );
}
