"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BorderBeam } from "@/components/ui/border-beam";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, use, useTransition } from "react";
import GlobalLoader from "@/components/layout/GlobalLoader";
import { DEFAULT_COUNTRY } from "@/lib/server/constants";

const LOCATION_AR_NAMES = {
  "united-arab-emirates": "الإمارات العربية المتحدة",
  "oman": "عُمان",
  "india": "الهند",
  "saudi-arabia": "المملكة العربية السعودية",
};

export default function LocationDropdown({ locationsPromise }) {
  const router = useRouter();
  const { lang } = useParams();
  const locations = use(locationsPromise);
  const countries = locations?.data || [];
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isPending, startTransition] = useTransition();

  // Read cookie only on client side
  useEffect(() => {
    const country = document.cookie
      .split("; ")
      .find((c) => c.startsWith("country="))
      ?.split("=")[1];
    setSelectedCountry(country || DEFAULT_COUNTRY);

    // Listen for country changes from other components (e.g., footer)
    const handleCountryChange = (event) => {
      setSelectedCountry(event.detail.country);
    };

    window.addEventListener("countryChanged", handleCountryChange);

    return () => {
      window.removeEventListener("countryChanged", handleCountryChange);
    };
  }, []);

  function changeCountry(slug) {
    document.cookie = `country=${slug}; path=/`;
    setSelectedCountry(slug);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      {isPending && <GlobalLoader />}
      <div className="px-[7px] sm:px-[3px]">
        <div className="relative inline-flex rounded-full">
          <Select
            value={selectedCountry}
            onValueChange={changeCountry}
            modal={false}
          >
            <SelectTrigger
              aria-label="Select Location"
              className="
                          relative
                          text-[16px] 3xs:text-[18px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-white sm:text-black font-medium max-w-full min-h-[30px]
                           2xl:min-h-[35px] 3xl:min-h-[45px] px-3 sm:px-2
                          border border-white/5 sm:border-black min-w-[145px] lg:min-w-[90px] lxl:min-w-[155px] rounded-[40px] sm:rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none backdrop-blur-[2px]
                          data-[state=open]:border-[#00095b]
                          data-[placeholder]:sm:text-black  !pr-[25px]
                           data-[placeholder]:text-white  [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px]
                           after:bg-[url('/images/arrow.svg')] after:max-sm:invert-100 after:max-sm:brightness-100 after:bg-no-repeat after:bg-center
                        "
            >
              <SelectValue placeholder={lang === "ar" ? "الموقع" : "Location"}>
                {selectedCountry
                  ? (lang === "ar" ? countries.find((c) => c.slug === selectedCountry)?.name_ar : null) ?? countries.find((c) => c.slug === selectedCountry)?.name ?? ""
                  : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="w-max rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-2 shadow-xl">
              {countries.map((c) => (
                <SelectItem
                  key={c.id}
                  value={c.slug}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#299b8a]/10 hover:text-[#299b8a] focus:bg-[#299b8a]/10 focus:text-[#299b8a] my-0.5"
                >
                  {lang === "ar" ? c.name_ar : c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <BorderBeam
            duration={15}
            size={60}
            reverse
            className="from-transparent via-white/70 to-transparent"
          />
          <BorderBeam
            duration={13}
            size={70}
            className="from-transparent via-white/70 to-transparent"
          />
        </div>
      </div>
    </>
  );
}
