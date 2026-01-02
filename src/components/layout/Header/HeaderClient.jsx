"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SearchBox from "@/components/common/SearchBox";
import HeaderSelect from "@/components/common/HeaderSelect";
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

export default function Header({ businessTypePromise, locationsPromise, lang }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // scroll sticky
  useEffect(() => {
    setOpen(false);
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 0);
    };

    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  const languageData = LANGUAGES[lang];
  const languages = Object.values(LANGUAGES);

  const changeLanguage = (newLang) => {
    const segments = currentPath.split("/");
    segments[1] = newLang; // replace "en" → "ar"
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <header>
      <div className={`w-full bg-white max-sm:hidden ${isScrolled ? "stickyHeader" : ""}`}>
        <div className="container">
          <div className="w-full flex flex-wrap items-center justify-between p-[15px_0] border-[rgba(0,0,0,0.1)] border-b ">
            {/* logo */}
            <Link
              href={`/${lang}`}
              className="flex items-center justify-center max-w-[125px] lg:max-w-[145px] xl:max-w-[175px] 2xl:max-w-[225px] 3xl:max-w-[275px] w-full"
            >
              <Image src="/images/logo.png" width="275" height="75" alt="logo" />
            </Link>
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-4  p-4 rounded-xl">
                {/* Search Box*/}
                <SearchBox />

                {/* Business Select */}

                <HeaderSelect businessTypePromise={businessTypePromise} locationsPromise={locationsPromise} />

                {/* country Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-2 cursor-pointer focus:outline-none">
                    <Image
                      src={languageData?.flag}
                      alt={languageData?.fullName}
                      width={28}
                      height={20}
                      className="rounded-sm object-cover w-[28px] h-[20px]"
                    />
                    <span className="font-medium text-[16px] uppercase">{languageData?.name}</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`cursor-pointer ${lang.code === lang.code ? "bg-accent" : ""}`}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Image src={lang.flag} alt={lang.fullName} width={20} height={20} className="rounded-sm object-cover w-[20px] h-[20px]" />
                          <span>{lang.fullName}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <div
          className={`sm:hidden relative z-1
            ${
              isScrolled
                ? "stickyHeader w-full"
                : " before:content-[''] before:block before:absolute before:top-0 before:start-0 before:w-full before:h-[250px] before:bg-gradient-to-b before:from-black before:to-black/0"
            }`}
        >
          <div
            className={`w-full  ${
              isScrolled ? "stickyHeader pt-[10px] w-full !bg-[#279689ed] backdrop-blur-[5px]" : "absolute top-0 start-0  pt-[30px]"
            }`}
          >
            <div className="container relative ">
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
                            width={17}
                            height={17}
                            className="rounded-full me-1 object-cover w-[17px] h-[17px]"
                          />

                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>

                        <SelectContent className=" min-w-[120px] rounded-xl bg-white text-black shadow-lg  ">
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
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
                    <SearchBox />
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
                      <AccordionItem value="item-1" className="border-b border-[#f4f4f4]">
                        <Link href="/" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                          <span>Home</span>
                        </Link>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-b border-[#f4f4f4]">
                        <Link href="/about" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                          <span>About Us</span>
                        </Link>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-b border-[#f4f4f4]">
                        <AccordionTrigger className="text-[12px] font-normal text-black py-[8px] w-full flex items-center  ">
                          <Link href="/service" className="flex items-center">
                            <span>Services</span>
                          </Link>
                        </AccordionTrigger>
                        <AccordionContent className="text-[12px] bg-[#671448] p-[10px] "></AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4" className="border-b border-[#f4f4f4]">
                        <Link href="/consultants" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center  ">
                          <span>Consultants</span>
                        </Link>
                      </AccordionItem>

                      <AccordionItem value="item-5" className="border-b border-[#f4f4f4]">
                        <Link href="/news" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                          <span>News & Insights </span>
                        </Link>
                      </AccordionItem>
                      <AccordionItem value="item-6" className="border-b border-[#f4f4f4]">
                        <Link href="/contact" className="text-[12px] font-normal text-black py-[8px] w-full flex items-center" aria-label="menuLink">
                          <span>Contact</span>
                        </Link>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </div>
        </div>
      </Sheet>
    </header>
  );
}
