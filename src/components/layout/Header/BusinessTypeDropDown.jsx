"use client";

import { use, useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BorderBeam } from "@/components/ui/border-beam";
import { useRouter } from "next/navigation";
import { DEFAULT_BUSINESS_TYPE } from "@/lib/server/constants";

export default function BusinessTypeDropDown({ businessTypePromise }) {
  const router = useRouter();
  const business_type = use(businessTypePromise);
  const data = business_type?.data || [];

  const [selectedBusiness, setSelectedBusiness] = useState(() => {
    if (typeof window !== "undefined") {
      const business = document.cookie
        .split("; ")
        .find((c) => c.startsWith("business_type="))
        ?.split("=")[1];
      return business || DEFAULT_BUSINESS_TYPE;
    }
    return DEFAULT_BUSINESS_TYPE;
  });

  // Listen for business type changes from other components (e.g., footer)
  useEffect(() => {
    const handleBusinessTypeChange = (event) => {
      setSelectedBusiness(event.detail.business_type);
    };

    window.addEventListener("businessTypeChanged", handleBusinessTypeChange);

    return () => {
      window.removeEventListener("businessTypeChanged", handleBusinessTypeChange);
    };
  }, []);

  function changeBusinessType(value) {
    document.cookie = `business_type=${value}; path=/`;
    setSelectedBusiness(value);
    router.refresh();
  }



  return (
    <div className="px-[7px] sm:px-[3px]">
      <div className="relative inline-flex rounded-full">
        <Select value={selectedBusiness}  onValueChange={changeBusinessType} modal={false}>
          <SelectTrigger
            className="
                          relative
                          text-[16px] 3xs:text-[18px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-white sm:text-black font-medium max-w-full min-h-[30px]
                           2xl:min-h-[35px] 3xl:min-h-[45px] px-3 sm:px-2 
                          border border-white/5 sm:border-black min-w-[115px] lg:min-w-[125px] rounded-[40px] sm:rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none backdrop-blur-[2px]
                          data-[state=open]:border-[#00095b]                         
                          data-[placeholder]:sm:text-black
                           data-[placeholder]:text-white  [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px]
                           after:bg-[url('/images/arrow.svg')] after:max-sm:invert-100 after:max-sm:brightness-100 after:bg-no-repeat after:bg-center
                        "
          >
            <SelectValue placeholder="Business" />
          </SelectTrigger>
          <SelectContent className="max-w-[110px] ">
            {data?.map((item) => (
              <SelectItem key={item.id} value={item.slug}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <BorderBeam
          duration={10}
          size={50}
          className="from-transparent via-white/70 to-transparent"
        />
        <BorderBeam
          duration={11}
          size={50}
          reverse
          className="from-transparent via-white/70 to-transparent"
        />
      </div>
    </div>
  );
}
